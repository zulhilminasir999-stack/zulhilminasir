const fs = require('fs');

function fixFile(file) {
  let content = fs.readFileSync(file, 'utf8');
  const target1 = '<span className="relative z-10 text-white font-bold tracking-tight">Get In Touch</span>';
  const target2 = '<span className="relative z-10 text-[14px] md:text-inherit text-white font-bold tracking-tight">Get In Touch</span>';
  const target3 = '<span className="relative z-10 text-white font-bold tracking-tight text-[14px] md:text-inherit">Get In Touch</span>';

  let changed = false;

  if (content.includes(target1)) {
    content = content.replace(target1, '<span className="relative z-10 text-white font-normal tracking-normal text-[14px] md:text-inherit">Get In Touch</span>');
    changed = true;
  }
  
  if (content.includes(target2)) {
    content = content.replace(target2, '<span className="relative z-10 text-[14px] md:text-inherit text-white font-normal tracking-normal">Get In Touch</span>');
    changed = true;
  }
  
  if (content.includes(target3)) {
    content = content.replace(target3, '<span className="relative z-10 text-[14px] md:text-inherit text-white font-normal tracking-normal">Get In Touch</span>');
    changed = true;
  }

  // Also replace any generic font-bold tracking-tight in Get In Touch just in case
  const genericRegex = /<span className="([^"]*)font-bold tracking-tight([^"]*)">Get In Touch<\/span>/g;
  if (genericRegex.test(content)) {
    content = content.replace(genericRegex, '<span className="$1font-normal tracking-normal$2">Get In Touch</span>');
    changed = true;
  }
  
  if (changed) {
    fs.writeFileSync(file, content);
    console.log(`Fixed ${file}`);
  } else {
    console.log(`No changes needed in ${file}`);
  }
}

fixFile('src/pages/ProjectDetailPage.tsx');
fixFile('src/pages/CaseStudyPage.tsx');
