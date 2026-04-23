const fs = require('fs');
const path = require('path');

const xmlPath = path.join('C:', 'Users', 'chris', 'Desktop', 'myungni_next', 'temp_docx', 'word', 'document.xml');
const outputPath = path.join('C:', 'Users', 'chris', 'Desktop', 'myungni_next', 'recovered_text.txt');

try {
    const xml = fs.readFileSync(xmlPath, 'utf8');
    // Extract text between <w:t> and </w:t>
    const matches = xml.match(/<w:t[^>]*>(.*?)<\/w:t>/g);
    if (matches) {
        const text = matches.map(m => m.replace(/<w:t[^>]*>|<\/w:t>/g, '')).join(' ');
        // The text might be split across multiple <w:t> tags even within a word.
        // But for our purposes, we want to recover the whole thing.
        // Actually, docx often splits text at formatting boundaries.
        // A better way is to join them into paragraphs.
        
        const paragraphs = xml.match(/<w:p[^>]*>(.*?)<\/w:p>/g);
        if (paragraphs) {
            const pText = paragraphs.map(p => {
                const ts = p.match(/<w:t[^>]*>(.*?)<\/w:t>/g);
                return ts ? ts.map(t => t.replace(/<w:t[^>]*>|<\/w:t>/g, '')).join('') : '';
            }).join('\n');
            fs.writeFileSync(outputPath, pText, 'utf8');
            console.log(`Extracted text to ${outputPath}`);
        }
    } else {
        console.log('No text found in XML');
    }
} catch (err) {
    console.error('Error:', err);
}
