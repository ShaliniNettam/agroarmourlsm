with open(r'c:\farmers-dev-new\Farmers-development\farm\frontend\src\contexts\LanguageContext.tsx', encoding='utf-8') as f:
    content = f.read()

import re

# Find all language section starts
en_pos = content.find("const en = {")
hi_pos = content.find("const hi = {")
kn_pos = content.find("const kn = {")
print(f"en section starts at: {en_pos}")
print(f"hi section starts at: {hi_pos}")
print(f"kn section starts at: {kn_pos}")
print()

# Find vetClinics occurrences with context
for m in re.finditer(r'vetClinics[^:]*:', content):
    pos = m.start()
    lang = 'en' if pos < hi_pos else ('hi' if pos < kn_pos else 'kn')
    print(f"vetClinics at pos={pos} ({lang}): {content[pos:pos+80]}")

print()
# Find appointments occurrences
for m in re.finditer(r'appointments[^:]*:', content):
    pos = m.start()
    lang = 'en' if pos < hi_pos else ('hi' if pos < kn_pos else 'kn')
    print(f"appointments at pos={pos} ({lang}): {content[pos:pos+80]}")

print()
# Find vetPatientsComingSoon
for m in re.finditer(r'vetPatientsComingSoon[^:]*:', content):
    pos = m.start()
    lang = 'en' if pos < hi_pos else ('hi' if pos < kn_pos else 'kn')
    print(f"vetPatientsComingSoon at pos={pos} ({lang}): {content[pos:pos+80]}")
