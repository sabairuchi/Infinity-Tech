import fs from 'fs';
import path from 'path';

const artifactsDir = 'C:\\Users\\kisha\\.gemini\\antigravity-ide\\brain\\a08d7ad0-aeac-4fe8-9126-34faae49561e';
const coverPath = path.join(artifactsDir, 'media__1786604351649.jpg');
const descPath = path.join(artifactsDir, 'media__1786604362435.jpg');

const coverBase64 = fs.readFileSync(coverPath).toString('base64');
const descBase64 = fs.readFileSync(descPath).toString('base64');

const content = `// Base64 Data URLs for Advanced UX Design eBook
export const ADVANCED_UX_DESIGN_COVER_BASE64 = 'data:image/jpeg;base64,${coverBase64}';
export const ADVANCED_UX_DESIGN_DESC_BASE64 = 'data:image/jpeg;base64,${descBase64}';
`;

const targetFile = path.join(process.cwd(), 'src', 'data', 'uxDesignAssets.ts');
fs.writeFileSync(targetFile, content);
console.log('Successfully generated src/data/uxDesignAssets.ts');
