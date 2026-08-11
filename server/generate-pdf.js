import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Helper to escape PDF string special characters
function escapePdfStr(str) {
  return str.replace(/\\/g, '\\\\').replace(/\(/g, '\\(').replace(/\)/g, '\\)');
}

/**
 * Generates a valid multi-page PDF 1.4 document from an array of page text lines.
 */
export function generateEbookPdf(outputPath, title, chapters) {
  try {
    const dir = path.dirname(outputPath);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }

    let pdfObjects = [];
    let pageObjIds = [];

    // Catalog ID = 1, Pages ID = 2, Font ID = 3
    const FONT_OBJ_ID = 3;

    // Build page content objects starting from ID 4
    let currentId = 4;

    const allPagesData = [
      {
        title: title.toUpperCase(),
        lines: [
          'CLOUD COMPUTING BLUEPRINT',
          '==================================================',
          'A Beginner\'s Guide to Cloud Technologies, Architecture,',
          'and Real-World Applications',
          '==================================================',
          '',
          'Publisher: Digiro Digital Publications',
          'Author: Digiro Cloud Architecture Team',
          'Edition: 2026 First Edition (65 Pages Complete Guide)',
          '',
          '--------------------------------------------------',
          'Table of Contents Overview:',
          '  Chapter 1: Introduction to Cloud Computing .......... Page 5',
          '  Chapter 2: Cloud Service Models (IaaS, PaaS, SaaS) .. Page 11',
          '  Chapter 3: Cloud Deployment Models ................ Page 18',
          '  Chapter 4: Cloud Infrastructure & Virtualization ... Page 24',
          '  Chapter 5: Major Cloud Platforms (AWS, Azure, GCP) . Page 30',
          '  Chapter 6: Cloud Security & IAM .................. Page 35',
          '  Chapter 7: Cloud Storage & Databases (SQL/NoSQL) ... Page 44',
          '  Chapter 8: Real-World Applications & Industry ..... Page 51',
          '  Chapter 9: Cloud Careers & Certifications ......... Page 55',
          '  Chapter 10: Future Trends & Conclusion ............ Page 62',
          '--------------------------------------------------',
        ]
      },
      ...chapters
    ];

    let pagesStreams = [];

    for (let pIdx = 0; pIdx < allPagesData.length; pIdx++) {
      const pageData = allPagesData[pIdx];
      const pageId = currentId++;
      const streamId = currentId++;
      pageObjIds.push(pageId);

      let textStream = 'BT\n/F1 14 Tf\n50 750 Td\n20 TL\n';
      
      const lines = pageData.lines || [];
      for (let l = 0; l < lines.length; l++) {
        const line = lines[l];
        textStream += `(${escapePdfStr(line)}) '\n`;
      }
      textStream += 'ET\n';

      const streamLength = Buffer.byteLength(textStream, 'utf-8');

      pagesStreams.push({
        pageId,
        streamId,
        pageDict: `${pageId} 0 obj\n<< /Type /Page /Parent 2 0 R /MediaBox [0 0 612 792] /Resources << /Font << /F1 ${FONT_OBJ_ID} 0 R >> >> /Contents ${streamId} 0 R >>\nendobj\n`,
        streamDict: `${streamId} 0 obj\n<< /Length ${streamLength} >>\nstream\n${textStream}endstream\nendobj\n`
      });
    }

    // Now write full PDF structure
    let out = `%PDF-1.4\n`;
    let xrefs = [0];

    function appendObj(content) {
      xrefs.push(Buffer.byteLength(out, 'utf-8'));
      out += content;
    }

    // Obj 1: Catalog
    appendObj(`1 0 obj\n<< /Type /Catalog /Pages 2 0 R >>\nendobj\n`);

    // Obj 2: Pages
    const kidsStr = pageObjIds.map(id => `${id} 0 R`).join(' ');
    appendObj(`2 0 obj\n<< /Type /Pages /Kids [${kidsStr}] /Count ${pageObjIds.length} >>\nendobj\n`);

    // Obj 3: Standard Helvetica Font
    appendObj(`3 0 obj\n<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica >>\nendobj\n`);

    // Pages & Streams
    for (const p of pagesStreams) {
      appendObj(p.pageDict);
      appendObj(p.streamDict);
    }

    // XRef table
    const startXref = Buffer.byteLength(out, 'utf-8');
    out += `xref\n0 ${xrefs.length}\n0000000000 65535 f \n`;
    for (let i = 1; i < xrefs.length; i++) {
      const offset = String(xrefs[i]).padStart(10, '0');
      out += `${offset} 00000 n \n`;
    }

    out += `trailer\n<< /Size ${xrefs.length} /Root 1 0 R >>\nstartxref\n${startXref}\n%%EOF\n`;

    fs.writeFileSync(outputPath, out, 'utf-8');
    console.log(`[PDF Generator] Successfully generated eBook PDF at: ${outputPath}`);
    return true;
  } catch (err) {
    console.error('[PDF Generator Error]', err);
    return false;
  }
}
