const fs = require('fs');
const path = require('path');

const filePath = path.join('C:', 'Users', 'chris', 'Desktop', 'myungni_next', 'recovered_text.txt');

try {
    const content = fs.readFileSync(filePath, 'utf8');
    console.log('First 100 characters:');
    console.log(content.substring(0, 100));
    console.log('Character codes of first 20 characters:');
    for (let i = 0; i < 20; i++) {
        console.log(`${content[i]}: ${content.charCodeAt(i)}`);
    }
} catch (err) {
    console.error(err);
}
