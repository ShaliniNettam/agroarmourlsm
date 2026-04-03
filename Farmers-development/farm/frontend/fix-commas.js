const fs = require('fs');
const path = require('path');
const langs = ['hi','ta','mr','pa','ml','kn','gu','bn','or'];
const dir = path.join(__dirname, 'src/i18n');
langs.forEach(lang => {
  const file = path.join(dir, lang + '.ts');
  if (!fs.existsSync(file)) return;
  let content = fs.readFileSync(file, 'utf8');
  // Fix missing comma: if a line ending with " is immediately followed by a key line
  const fixed = content.replace(/(")\n(\s+\w+:)/g, (match, q, next) => {
    // Only fix if there's no comma already
    return q + ',\n' + next;
  });
  if (fixed !== content) {
    fs.writeFileSync(file, fixed);
    console.log('Fixed: ' + lang + '.ts');
  } else {
    console.log('OK: ' + lang + '.ts');
  }
});
