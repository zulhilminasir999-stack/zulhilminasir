const fs = require('fs');

const content = fs.readFileSync('src/pages/ProjectDetailPage.tsx', 'utf-8');

let newContent = content.replace(
  /<div className="w-full bg-white text-zinc-900 z-50 relative pt-24 pb-24 border-t border-zinc-200">/,
  '<div className="w-full bg-white text-zinc-900 z-50 sticky top-0 min-h-[70vh] flex flex-col justify-center pt-24 pb-24 border-t border-zinc-200 shadow-2xl">'
);

fs.writeFileSync('src/pages/ProjectDetailPage.tsx', newContent);
console.log('Fixed Section 5 sticky');
