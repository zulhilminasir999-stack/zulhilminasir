const fs = require('fs');

const content = fs.readFileSync('src/pages/ProjectDetailPage.tsx', 'utf-8');

let newContent = content.replace(
  /<section className="w-full bg-white text-zinc-900 z-20 relative pt-16 pb-12 sm:pb-16">/,
  '<section className="w-full bg-white text-zinc-900 z-20 sticky top-0 min-h-[70vh] flex flex-col justify-center pt-16 pb-12 sm:pb-16">'
);

newContent = newContent.replace(
  /<section className="w-full bg-white text-zinc-900 z-20 relative py-12 sm:py-16 border-t border-zinc-200">/,
  '<section className="w-full bg-white text-zinc-900 z-30 sticky top-0 min-h-[70vh] flex flex-col justify-center py-12 sm:py-16 border-t border-zinc-200 shadow-2xl">'
);

newContent = newContent.replace(
  /<section className="w-full bg-white text-zinc-900 z-20 relative py-12 sm:py-16 pb-24 border-t border-zinc-200">/,
  '<section className="w-full bg-white text-zinc-900 z-40 sticky top-0 min-h-[70vh] flex flex-col justify-center py-12 sm:py-16 pb-24 border-t border-zinc-200 shadow-2xl">'
);

fs.writeFileSync('src/pages/ProjectDetailPage.tsx', newContent);
console.log('Successfully updated sections to be sticky.');
