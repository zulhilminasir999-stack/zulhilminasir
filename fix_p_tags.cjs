const fs = require('fs');

const content = fs.readFileSync('src/pages/ProjectDetailPage.tsx', 'utf-8');

let newContent = content.replace(
  /<div className="md:col-span-8 space-y-8 text-xl font-light text-zinc-800 leading-relaxed">\s*<p>\{project\.summary/m,
  '<div className="md:col-span-8 space-y-8 text-2xl md:text-3xl font-light leading-snug text-zinc-700">\n                <p>{project.summary'
);

newContent = newContent.replace(
  /<p className="text-lg text-zinc-600 font-normal">\s*\{project\.challenge/m,
  '<p>\n                  {project.challenge'
);

newContent = newContent.replace(
  /<div className="md:col-span-8 space-y-6 text-xl font-light text-zinc-700 leading-relaxed">\s*<p>\{project\.challenge/m,
  '<div className="md:col-span-8 space-y-6 text-2xl md:text-3xl font-light leading-snug text-zinc-700">\n                <p>{project.challenge'
);

fs.writeFileSync('src/pages/ProjectDetailPage.tsx', newContent);
console.log('Fixed paragraph styling');
