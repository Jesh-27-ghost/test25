const fs = require('fs');
const file = 'src/index.css';
let content = fs.readFileSync(file);
if (content[0] === 0xFF && content[1] === 0xFE) {
  let str = content.toString('utf16le');
  fs.writeFileSync(file, str, 'utf8');
  console.log('Converted to UTF-8!');
} else if (content[0] === 0x00 || content[1] === 0x00) {
  let str = content.toString('utf16le');
  fs.writeFileSync(file, str, 'utf8');
} else {
  // Try to remove null bytes if improperly converted already
  let str = content.toString('utf8');
  if (str.includes('\u0000')) {
    str = str.replace(/\0/g, '');
    fs.writeFileSync(file, str, 'utf8');
    console.log('Removed null bytes!');
  } else {
    console.log('No conversion needed or already UTF-8');
  }
}
