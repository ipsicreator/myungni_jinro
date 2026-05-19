// scratch/print_pdf.mjs
// Launches Playwright to render localhost:3000/report-12p and prints it as a high-quality A4 PDF.

import { chromium } from 'playwright';
import path from 'node:path';

async function run() {
  console.log('=== Launching Headless Chromium to Print PDF ===');
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage();
  
  const targetUrl = 'http://localhost:3000/report-12p';
  console.log(`Navigating to ${targetUrl}...`);
  
  try {
    // Wait until network is quiet (all styles and texts loaded)
    await page.goto(targetUrl, { waitUntil: 'networkidle', timeout: 30000 });
    
    // Set custom print styles to ensure backgrounds are printed
    await page.emulateMedia({ media: 'print' });
    
    const pdfPath = path.resolve('명리_진로_12p_보고서.pdf');
    console.log(`Printing to PDF at: ${pdfPath}`);
    
    await page.pdf({
      path: pdfPath,
      format: 'A4',
      printBackground: true,
      margin: {
        top: '20mm',
        bottom: '20mm',
        left: '15mm',
        right: '15mm'
      }
    });
    
    console.log('=== SUCCESS: PDF Printed successfully! ===');
  } catch (e) {
    console.error('PDF print failed:', e.message);
    process.exit(1);
  } finally {
    await browser.close();
  }
}

run();
