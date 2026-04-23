const fs = require('fs');
const path = require('path');

const filePath = path.join('C:', 'Users', 'chris', 'Desktop', 'myungni_next', 'src', 'lib', 'reportForm.ts');

try {
    const content = fs.readFileSync(filePath, 'utf8');
    console.log(content);
} catch (err) {
    console.error(err);
}
