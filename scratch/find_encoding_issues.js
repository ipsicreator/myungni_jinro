const fs = require('fs');
const path = require('path');

const walk = (dir) => {
    let results = [];
    const list = fs.readdirSync(dir);
    list.forEach((file) => {
        file = path.resolve(dir, file);
        const stat = fs.statSync(file);
        if (stat && stat.isDirectory()) {
            if (!file.includes('node_modules') && !file.includes('.next') && !file.includes('.git')) {
                results = results.concat(walk(file));
            }
        } else {
            if (file.endsWith('.ts') || file.endsWith('.tsx') || file.endsWith('.js') || file.endsWith('.json') || file.endsWith('.md')) {
                results.push(file);
            }
        }
    });
    return results;
};

const files = walk('C:/Users/chris/Desktop/myungni_next');
const issues = [];

files.forEach((file) => {
    const content = fs.readFileSync(file, 'utf8');
    // Check for replacement character (U+FFFD)
    if (content.includes('\uFFFD')) {
        issues.push({ file, type: 'replacement_char' });
    }
    // Check for question marks that seem out of place (surrounded by Korean characters)
    // Actually, searching for ? is hard because it can be valid.
    // But in this codebase, ? in the middle of Korean words is usually an encoding error.
    const koreanWithQ = content.match(/[가-힣]\?[가-힣]|[가-힣]\?|\?[가-힣]/g);
    if (koreanWithQ) {
        issues.push({ file, type: 'question_mark', samples: koreanWithQ.slice(0, 5) });
    }
});

console.log(JSON.stringify(issues, null, 2));
