import fs from 'fs';
import path from 'path';

const artifactsDir = 'C:\\Users\\kisha\\.gemini\\antigravity-ide\\brain\\a08d7ad0-aeac-4fe8-9126-34faae49561e';
const targetDir = path.join(process.cwd(), 'public', 'assets');

if (!fs.existsSync(targetDir)) {
  fs.mkdirSync(targetDir, { recursive: true });
}

const copyFiles = [
  // Python for Data
  { src: 'media__1786599162751.jpg', dest: 'python_for_data_cover.jpg' },
  { src: 'media__1786599175561.jpg', dest: 'python_for_data_description.jpg' },
  { src: 'media__1786599144300.pdf', dest: 'python_for_data.pdf' },

  // Advanced UX Design
  { src: 'media__1786604351649.jpg', dest: 'advanced_ux_design_cover.jpg' },
  { src: 'media__1786604362435.jpg', dest: 'advanced_ux_design_description.jpg' },
  { src: 'media__1786604336899.pdf', dest: 'advanced_ux_design.pdf' },
];

copyFiles.forEach(({ src, dest }) => {
  const srcPath = path.join(artifactsDir, src);
  const destPath = path.join(targetDir, dest);
  if (fs.existsSync(srcPath)) {
    fs.copyFileSync(srcPath, destPath);
    console.log(`Successfully copied ${src} -> public/assets/${dest}`);
  } else {
    console.warn(`Source file not found: ${srcPath}`);
  }
});
