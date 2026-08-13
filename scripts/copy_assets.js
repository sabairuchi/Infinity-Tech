const fs = require('fs');
const path = require('path');

const srcCover = "C:\\Users\\kisha\\.gemini\\antigravity-ide\\brain\\a08d7ad0-aeac-4fe8-9126-34faae49561e\\media__1786599162751.jpg";
const srcDesc = "C:\\Users\\kisha\\.gemini\\antigravity-ide\\brain\\a08d7ad0-aeac-4fe8-9126-34faae49561e\\media__1786599175561.jpg";
const srcPdf = "C:\\Users\\kisha\\.gemini\\antigravity-ide\\brain\\a08d7ad0-aeac-4fe8-9126-34faae49561e\\media__1786599144300.pdf";

const destDir = path.join(__dirname, '..', 'public', 'assets');
if (!fs.existsSync(destDir)) {
  fs.mkdirSync(destDir, { recursive: true });
}

fs.copyFileSync(srcCover, path.join(destDir, 'python_for_data_cover.jpg'));
fs.copyFileSync(srcDesc, path.join(destDir, 'python_for_data_description.jpg'));
fs.copyFileSync(srcPdf, path.join(destDir, 'python_for_data.pdf'));

console.log('Successfully copied assets to public/assets!');

const coverBase64 = 'data:image/jpeg;base64,' + fs.readFileSync(srcCover).toString('base64');
const descBase64 = 'data:image/jpeg;base64,' + fs.readFileSync(srcDesc).toString('base64');

const tsContent = `export const PYTHON_FOR_DATA_COVER_BASE64 = ${JSON.stringify(coverBase64)};\nexport const PYTHON_FOR_DATA_DESC_BASE64 = ${JSON.stringify(descBase64)};\n`;
fs.writeFileSync(path.join(__dirname, '..', 'src', 'data', 'pythonDataAssets.ts'), tsContent);

console.log('Successfully generated src/data/pythonDataAssets.ts!');
