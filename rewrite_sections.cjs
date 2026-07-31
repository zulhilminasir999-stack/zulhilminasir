const fs = require('fs');

const content = fs.readFileSync('src/pages/ProjectDetailPage.tsx', 'utf-8');

const regex = /\{\/\* Main Content Area - Light Theme \(Replicated from Video\) \*\/\}\s*<div className="w-full bg-white text-zinc-900 z-20 relative pt-16 pb-24">\s*<div className="w-full px-6 sm:px-12 lg:px-16 space-y-24">[\s\S]*?<\/div>\s*<\/div>\s*\{\/\* Section 4/m;

const match = content.match(regex);
if (!match) {
  console.log('Target section not found');
  process.exit(1);
}

const replacement = `{/* Main Content Area - Light Theme (Replicated from Video) */}
        
        {/* Section 1: Intro */}
        <section className="w-full bg-white text-zinc-900 z-20 relative pt-16 pb-12 sm:pb-16">
          <div className="w-full px-6 sm:px-12 lg:px-16">
            <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-16">
              <div className="md:col-span-4">
                <h2 className="text-3xl md:text-4xl font-medium tracking-tight text-zinc-900">{project.title}</h2>
                <p className="text-zinc-500 mt-2 text-sm">{project.subtitle}</p>
              </div>
              <div className="md:col-span-8">
                <p className="text-2xl md:text-3xl font-light leading-snug text-zinc-700">
                  {project.summary || "A digital ecosystem that transforms how athletes interact with their performance wear, creating a seamless connection between garment and user through innovative technology."}
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Section 2: Details */}
        <section className="w-full bg-white text-zinc-900 z-20 relative py-12 sm:py-16 border-t border-zinc-200">
          <div className="w-full px-6 sm:px-12 lg:px-16">
            <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-16">
              <div className="md:col-span-4">
                <a href={project.links?.[0] || "#"} className="text-2xl font-medium text-zinc-900 hover:text-zinc-600 transition-colors">
                  Visit Live Site
                </a>
              </div>
              <div className="md:col-span-8 grid grid-cols-1 sm:grid-cols-2 gap-y-12 gap-x-8">
                <div>
                  <h4 className="text-sm font-semibold text-zinc-900 mb-2">Client</h4>
                  <p className="text-zinc-600 text-sm">{project.client || "Stride Athletics"}</p>
                </div>
                <div>
                  <h4 className="text-sm font-semibold text-zinc-900 mb-2">Project Type</h4>
                  <p className="text-zinc-600 text-sm">{project.categoryLabel || "Digital Product Design"}</p>
                </div>
                <div>
                  <h4 className="text-sm font-semibold text-zinc-900 mb-2">Released</h4>
                  <p className="text-zinc-600 text-sm">{project.year || "October 11, 2024"}</p>
                </div>
                <div>
                  <h4 className="text-sm font-semibold text-zinc-900 mb-2">Technology</h4>
                  <div className="flex flex-col gap-1">
                    {(project.toolsUsed && project.toolsUsed.length > 0) ? project.toolsUsed.map(tool => (
                      <span key={tool} className="text-zinc-600 text-sm">{tool}</span>
                    )) : (
                      <>
                        <span className="text-zinc-600 text-sm">React Native</span>
                        <span className="text-zinc-600 text-sm">Motion Analysis API</span>
                        <span className="text-zinc-600 text-sm">Machine Learning</span>
                        <span className="text-zinc-600 text-sm">Cloud Architecture</span>
                      </>
                    )}
                  </div>
                </div>
                <div>
                  <h4 className="text-sm font-semibold text-zinc-900 mb-2">Timeframe</h4>
                  <p className="text-zinc-600 text-sm">3 months</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Section 3: Overview (Sticky Left) */}
        <section className="w-full bg-white text-zinc-900 z-20 relative py-12 sm:py-16 pb-24 border-t border-zinc-200">
          <div className="w-full px-6 sm:px-12 lg:px-16">
            <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-16">
              <div className="md:col-span-4 relative">
                <div className="sticky top-32">
                  <span className="text-sm text-zinc-400 mb-1 block">{project.title}</span>
                  <h2 className="text-4xl font-medium tracking-tight text-zinc-900">Overview</h2>
                </div>
              </div>
              <div className="md:col-span-8 space-y-8 text-xl font-light text-zinc-800 leading-relaxed">
                <p>{project.summary || "Our solution focused on creating an intuitive digital platform that connects with Stride's performance wear, providing real-time insights and personalized recommendations. The challenge was to make complex performance data accessible and actionable for users of all expertise levels."}</p>
                <p className="text-lg text-zinc-600 font-normal">
                  {project.challenge || "Stride Athletics had developed cutting-edge performance wear but lacked the digital interface to unlock its full potential. They needed a digital product that would help athletes understand, customize, and maximize the benefits of their smart athletic wear."}
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Section 4`;

const newContent = content.substring(0, match.index) + replacement + content.substring(match.index + match[0].length);
fs.writeFileSync('src/pages/ProjectDetailPage.tsx', newContent);
console.log('Successfully updated sections');
