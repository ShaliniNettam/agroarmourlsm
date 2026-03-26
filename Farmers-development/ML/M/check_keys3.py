import sys
import io
sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding='utf-8')

with open(r'c:\farmers-dev-new\Farmers-development\farm\frontend\src\contexts\LanguageContext.tsx', encoding='utf-8') as f:
    content = f.read()

import re

# Find language section starts - look for the translations object
en_pos = content.find("en: {")
hi_pos = content.find("hi: {")
kn_pos = content.find("kn: {")
print(f"en section: {en_pos}, hi section: {hi_pos}, kn section: {kn_pos}")

# Also try alternate patterns
for pat in ["'en':", '"en":', "en :", "translations = {"]:
    p = content.find(pat)
    print(f"  '{pat}' at {p}")

# Find vetDoctors to understand structure
for m in re.finditer(r'vetDoctors:', content):
    pos = m.start()
    print(f"vetDoctors at {pos}: {repr(content[pos:pos+60])}")

# Find vetClinicsComingSoon
for m in re.finditer(r'vetClinicsComingSoon:', content):
    pos = m.start()
    print(f"vetClinicsComingSoon at {pos}: {repr(content[pos:pos+80])}")

# Find vetPatientsComingSoon
for m in re.finditer(r'vetPatientsComingSoon:', content):
    pos = m.start()
    print(f"vetPatientsComingSoon at {pos}: {repr(content[pos:pos+80])}")

# Find vetAppointmentsComingSoon
for m in re.finditer(r'vetAppointmentsComingSoon:', content):
    pos = m.start()
    print(f"vetAppointmentsComingSoon at {pos}: {repr(content[pos:pos+80])}")
