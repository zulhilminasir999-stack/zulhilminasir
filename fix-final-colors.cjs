const fs = require('fs');

function fixFile(file) {
  let content = fs.readFileSync(file, 'utf8');

  // Change text-zinc-400 to text-white/70
  content = content.replace(/text-zinc-400/g, 'text-white/70');
  
  // Change text-zinc-100 to text-white
  content = content.replace(/text-zinc-100/g, 'text-white');

  fs.writeFileSync(file, content);
  console.log(`Fixed ${file}`);
}

fixFile('src/pages/ProjectDetailPage.tsx');
fixFile('src/pages/CaseStudyPage.tsx');
