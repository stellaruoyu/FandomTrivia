const fs = require('fs');
const path = require('path');

const books = [
    { file: 'harrypotterbook3.md', varName: 'HARRY_POTTER_POA_TRIVIA', title: 'Harry Potter: Prisoner of Azkaban (Book 3, Chapters 1-9)' },
    { file: 'harrypotterbook4.md', varName: 'HARRY_POTTER_GOF_TRIVIA', title: 'Harry Potter: Goblet of Fire (Book 4, Chapters 1-10)' },
    { file: 'harrypotterbook5.md', varName: 'HARRY_POTTER_OOTP_TRIVIA', title: 'Harry Potter: Order of the Phoenix (Book 5, Chapters 1-9)' },
    { file: 'harrypotterbook6.md', varName: 'HARRY_POTTER_HBP_TRIVIA', title: 'Harry Potter: Half-Blood Prince (Book 6, Chapters 1-8)' },
    { file: 'harrypotterbook7.md', varName: 'HARRY_POTTER_DH_TRIVIA', title: 'Harry Potter: Deathly Hallows (Book 7, Chapters 1-9)' }
];

const dir = 'c:/Users/ruoyu/OneDrive/Documents/Project/FandomTrivia/FandomTrivia/public/images';
let output = '';

for (const b of books) {
    const content = fs.readFileSync(path.join(dir, b.file), 'utf8');

    // Robustly extract all JSON arrays in the file
    let allQuestions = [];
    const lines = content.split('\n');
    let insideArray = false;
    let currentArrayString = '';

    for (let i = 0; i < lines.length; i++) {
        const line = lines[i];
        if (line.trim() === '[') {
            insideArray = true;
            currentArrayString = '[\n';
        } else if (line.trim() === ']' && insideArray) {
            insideArray = false;
            currentArrayString += ']\n';
            try {
                const parsed = JSON.parse(currentArrayString);
                allQuestions.push(...parsed);
            } catch (e) {
                console.error('Error parsing array in ' + b.file + ' at line ' + i);
                console.error(e);
            }
            currentArrayString = '';
        } else if (insideArray) {
            currentArrayString += line + '\n';
        }
    }

    if (allQuestions.length === 0) {
        console.error('No valid JSON extracted from ' + b.file);
        continue;
    }

    output += `\n// --- ${b.title} ---\n\n`;
    output += `export const ${b.varName}: MCTriviaQuestion[] = [\n`;

    allQuestions.forEach((q, i) => {
        let options = q.options;
        if (q.type === 'true_false' && (!options || options.length === 0)) {
            options = ["True", "False"];
        }

        let evidenceStr = '';
        if (q.evidence) {
            evidenceStr = `"${q.evidence.context.replace(/"/g, '\\"')}" — Chapter ${q.evidence.chapter}`;
        }

        output += `  {
    id: ${i + 1},
    question: ${JSON.stringify(q.question)},
    options: ${JSON.stringify(options || [])},
    answer: ${JSON.stringify(q.correct_answer || q.answer)},
`;
        if (evidenceStr) {
            output += `    evidence: ${JSON.stringify(evidenceStr)},\n`;
        }
        output += `  },\n`;
    });
    output += `];\n`;
    console.log('Successfully processed: ' + b.varName + ' with ' + allQuestions.length + ' questions.');
}

const constantsPath = 'c:/Users/ruoyu/OneDrive/Documents/Project/FandomTrivia/FandomTrivia/src/constants.ts';
fs.appendFileSync(constantsPath, output);
console.log('Appended all to constants.ts');
