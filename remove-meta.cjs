const fs = require('fs');
const path = require('path');

const srcDir = path.join(__dirname, 'src');

const forbiddenKeywords = [
  /actor/i,
  /actress/i,
  /director/i,
  /directed/i,
  /voice\b/i,
  /voiced\b/i,
  /filmed\b/i,
  /portrays/i,
  /portrayed/i,
  /release date/i,
  /released in theaters/i,
  /filming/i,
  /production oversight/i,
  /continuity error/i,
  /box office/i,
  /composer/i
];

function containsForbidden(text) {
  for (const regex of forbiddenKeywords) {
    if (regex.test(text)) {
      return true;
    }
  }
  return false;
}

function processFile(filePath) {
  let content = fs.readFileSync(filePath, 'utf8');
  
  // A robust regex to match a full question object inside the array
  // We look for objects starting with "{" and ending with "}," or "}"
  // Because objects can contain nested braces or arrays, we'll split by "{" and "}" and balance them?
  // Or simply match:  \{\s*"id"[^}]+?\}
  // Since there are nested arrays (options: []), a simple regex [^{}] might fail.
  // Let's use a balancing loop or simple string parsing.
  
  let newContent = '';
  let inArray = false;
  let braceCount = 0;
  let currentObj = '';
  
  for (let i = 0; i < content.length; i++) {
    const char = content[i];
    
    if (char === '{' && content.slice(i, i+15).includes('id:')) {
      // Potentially start of an object if we are inside an array
      // Actually the files are perfectly formatted with 2 space indents
    }
  }

  // Instead of parsing, let's just do a regex that matches the standard format.
  // Standard format:
  //   {
  //     "id": 1,
  //     "question": "...",
  //     "options": [ ... ],
  //     "answer": "...",
  //     "evidence": "..."
  //   },
  // OR without quotes around keys.
  
  const objectRegex = /^[ \t]*\{[\s\S]*?\n[ \t]*\},?/gm;
  
  const matches = content.match(objectRegex);
  if (!matches) return;

  let changed = false;
  for (const match of matches) {
    if (containsForbidden(match)) {
      console.log(`Removing from ${path.basename(filePath)}:\n${match.substring(0, 100)}...\n`);
      content = content.replace(match, '');
      changed = true;
    }
  }

  if (changed) {
    fs.writeFileSync(filePath, content, 'utf8');
    console.log(`Updated ${filePath}`);
  }
}

fs.readdirSync(srcDir).forEach(file => {
  if (file.endsWith('Trivia.ts')) {
    processFile(path.join(srcDir, file));
  }
});
