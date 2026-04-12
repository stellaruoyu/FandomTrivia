const fs = require('fs');
const path = require('path');

const srcDir = 'c:/Users/ruoyu/OneDrive/Documents/Project/FandomTrivia';

const parseMarkdown = (filename, arrayName) => {
  const mdPath = path.join(srcDir, filename);
  if (!fs.existsSync(mdPath)) {
    console.error('File not found:', mdPath);
    return '';
  }
  const content = fs.readFileSync(mdPath, 'utf8');
  const jsonMatch = content.match(/\[\s*\{[\s\S]*\}\s*\]/);
  if (jsonMatch) {
    const jsonStr = jsonMatch[0];
    try {
      const parsed = JSON.parse(jsonStr);
      const finalArray = parsed.map((item, index) => {
        return {
          id: index + 1,
          question: item.question,
          options: item.options || (item.type === 'true_false' ? ["True", "False"] : []),
          correctAnswer: item.correct_answer,
          explanation: `Source: ${item.evidence.book}${item.evidence.chapter ? ' - ' + item.evidence.chapter : ''}. "${item.evidence.context.replace(/"/g, "'")}"`
        };
      });
      return `export const ${arrayName}: MCTriviaQuestion[] = ${JSON.stringify(finalArray, null, 2)};\n`;
    } catch (e) {
      console.error('JSON Parse error in', mdPath, e);
      return '';
    }
  }
  return '';
};

let output = '\n// --- TOY STORY TRIVIA ---\n';
output += parseMarkdown('toystory.md', 'TOY_STORY_1_TRIVIA');
output += parseMarkdown('toystory2.md', 'TOY_STORY_2_TRIVIA');
output += parseMarkdown('toystory3.md', 'TOY_STORY_3_TRIVIA');
output += parseMarkdown('toystory4.md', 'TOY_STORY_4_TRIVIA');

output += `
export const TOY_STORY_RANDOM_TRIVIA: MCTriviaQuestion[] = [
  ...TOY_STORY_1_TRIVIA,
  ...TOY_STORY_2_TRIVIA,
  ...TOY_STORY_3_TRIVIA,
  ...TOY_STORY_4_TRIVIA,
].sort(() => 0.5 - Math.random()).slice(0, 15);
`;

const constantsPath = 'src/constants.ts';
let constantsContent = fs.readFileSync(constantsPath, 'utf8');
constantsContent += output;

// Add Grades
const grades = `
export const TOY_STORY_GRADES = [
  { threshold: 95, label: 'Star Command Ranger', color: 'text-green-400', character: { name: 'Buzz Lightyear', image: '/images/toystory.jpg', desc: 'To infinity and beyond! You are a true Space Ranger.' } },
  { threshold: 80, label: 'Sheriff', color: 'text-amber-500', character: { name: 'Woody', image: '/images/toystory.jpg', desc: 'You are the favorite deputy! Outstanding knowledge.' } },
  { threshold: 60, label: 'Roundup Gang', color: 'text-orange-400', character: { name: 'Jessie', image: '/images/toystory.jpg', desc: 'Yee-haw! You know your stuff.' } },
  { threshold: 40, label: 'Pizza Planet Alien', color: 'text-emerald-400', character: { name: 'Little Green Men', image: '/images/toystory.jpg', desc: 'The claw has chosen you... but you need more practice.' } },
  { threshold: 0, label: 'Lost Toy', color: 'text-slate-400', character: { name: 'Sid\\'s Mutant Toys', image: '/images/toystory.jpg', desc: 'You might need some repair work back at Andy\\'s room.' } },
];
`;
constantsContent += grades;

// Inject to UNIVERSES
const tsUniverse = `  {
    id: 'toy-story',
    title: 'Toy Story Box',
    description: 'To infinity and beyond. Play the ultimate Toy Story franchise trivia.',
    image: '/images/toystory.jpg',
    color: 'blue-500',
    buttonText: 'Open the Toy Box'
  },`;

constantsContent = constantsContent.replace('export const UNIVERSES: Universe[] = [', 'export const UNIVERSES: Universe[] = [\n' + tsUniverse);

fs.writeFileSync(constantsPath, constantsContent);
console.log('Successfully added Toy Story sets to constants.ts');
