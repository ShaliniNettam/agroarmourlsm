import sys, io
sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding='utf-8')

with open(r'c:\farmers-dev-new\Farmers-development\farm\frontend\src\contexts\LanguageContext.tsx', encoding='utf-8') as f:
    content = f.read()

# Show 300 chars after each vetDoctors occurrence
for pos in [702, 42831, 84282]:
    print(f"\n=== pos {pos} ===")
    print(repr(content[pos:pos+300]))
