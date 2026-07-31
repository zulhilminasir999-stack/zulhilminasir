import * as fs from 'fs';
import * as path from 'path';

const ONE_HOUR = 60 * 60 * 1000;
const now = Date.now();

function walk(dir: string, depth = 0) {
  if (depth > 6) return;
  try {
    fs.readdirSync(dir).forEach(f => {
      const p = path.join(dir, f);
      try {
        const stat = fs.statSync(p);
        if (stat.isDirectory()) {
          if (
            f !== 'node_modules' && 
            f !== 'dist' && 
            f !== '.git' &&
            f !== 'proc' && 
            f !== 'sys' && 
            f !== 'dev' &&
            !f.startsWith('.')
          ) {
            walk(p, depth + 1);
          }
        } else {
          const age = now - stat.mtimeMs;
          if (age < ONE_HOUR && !p.includes('.git/') && !p.includes('node_modules/')) {
            console.log('Modified recently:', p, '(', Math.round(age / 1000 / 60), 'mins ago, size:', stat.size, 'bytes)');
          }
        }
      } catch (e) {}
    });
  } catch (e) {}
}

console.log('Searching for recently modified files...');
walk('/app');
walk('/tmp');
console.log('Finished search.');
