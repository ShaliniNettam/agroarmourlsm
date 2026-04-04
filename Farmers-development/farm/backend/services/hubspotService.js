const hubspot = require('@hubspot/api-client');

class HubSpotService {
  constructor() {
    this.client = null;
    this.enabled = false;
    this._init();
  }

  _init() {
    const token = process.env.HUBSPOT_ACCESS_TOKEN;
    if (!token) {
      console.warn('⚠️  HUBSPOT_ACCESS_TOKEN not set – HubSpot sync disabled');
      return;
    }
    this.client = new hubspot.Client({ accessToken: token });
    this.enabled = true;
    console.log('✅ HubSpot CRM service initialized');
  }

  /**
   * Create or update a HubSpot contact when a user registers.
   * Uses email as the unique identifier; falls back gracefully if
   * the contact already exists (409 → update instead).
   */
  async syncContact({ email, name, phone }) {
    if (!this.enabled) return null;

    const [firstname, ...lastParts] = (name || '').split(' ');
    const lastname = lastParts.join(' ') || '';

    const properties = {
      email: email || '',
      firstname,
      lastname,
      phone: phone || '',
      company: 'AgroArmor User',
      lifecyclestage: 'lead',
    };

    try {
      // Try to create a new contact
      const response = await this.client.crm.contacts.basicApi.create({
        properties,
        associations: [],
      });
      console.log(`🟢 HubSpot: Contact created – ${email || phone}`);
      return response;
    } catch (err) {
      // 409 = contact already exists → update instead
      if (err.code === 409 || err.statusCode === 409) {
        return this._updateExistingContact(email, properties);
      }
      console.error('🔴 HubSpot syncContact error:', err.message || err);
      return null;
    }
  }

  /**
   * Update an existing contact by email.
   */
  async _updateExistingContact(email, properties) {
    try {
      // Search for the contact by email
      const searchResponse = await this.client.crm.contacts.searchApi.doSearch({
        filterGroups: [
          {
            filters: [
              { propertyName: 'email', operator: 'EQ', value: email },
            ],
          },
        ],
        properties: ['email'],
        limit: 1,
      });

      if (searchResponse.results && searchResponse.results.length > 0) {
        const contactId = searchResponse.results[0].id;
        const updated = await this.client.crm.contacts.basicApi.update(
          contactId,
          { properties }
        );
        console.log(`🟡 HubSpot: Contact updated – ${email}`);
        return updated;
      }
    } catch (updateErr) {
      console.error('🔴 HubSpot update error:', updateErr.message || updateErr);
    }
    return null;
  }

  /**
   * Track a custom event (login, purchase, etc.)
   * Requires HubSpot Custom Behavioral Events (Marketing Hub Enterprise).
   * Silently skips if the feature is unavailable.
   */
  async trackEvent(email, eventName, eventProperties = {}) {
    if (!this.enabled) return null;
    try {
      await this.client.apiRequest({
        method: 'POST',
        path: '/events/v3/send',
        body: {
          email,
          eventName,
          properties: eventProperties,
          occurredAt: new Date().toISOString(),
        },
      });
      console.log(`📊 HubSpot event tracked: ${eventName} for ${email}`);
    } catch (err) {
      // Non-critical – log and move on
      console.warn(`⚠️  HubSpot trackEvent (${eventName}):`, err.message || err);
    }
    return null;
  }
}

module.exports = new HubSpotService();
