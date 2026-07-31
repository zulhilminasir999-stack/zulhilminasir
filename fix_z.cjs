const fs = require('fs');

const content = fs.readFileSync('src/pages/ProjectDetailPage.tsx', 'utf-8');

let newContent = content.replace(
  /<div className="relative bg-zinc-900 z-10 w-full" style={{ height: "300vh" }}>/,
  '<div className="relative bg-zinc-900 z-50 w-full" style={{ height: "200vh" }}>'
);

newContent = newContent.replace(
  /<div className="w-full bg-white text-zinc-900 z-30 relative pt-24 pb-24 border-t border-zinc-200">/,
  '<div className="w-full bg-white text-zinc-900 z-50 relative pt-24 pb-24 border-t border-zinc-200">'
);

fs.writeFileSync('src/pages/ProjectDetailPage.tsx', newContent);
console.log('Fixed z-indexes');
