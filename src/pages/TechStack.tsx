import { motion } from "motion/react";

const stack = [
  {
    category: "CMS & Basis",
    items: [
      { name: "WordPress", desc: "Das Fundament. Open Source, flexibel, gehört dir.", icon: "W" },
      { name: "GeneratePress", desc: "Das Theme. Extrem leichtgewichtig, schnell und stabil.", icon: "G" },
      { name: "GenerateBlocks", desc: "Der Builder. Keine Bloatware, nur sauberes HTML/CSS.", icon: "B" },
    ]
  },
  {
    category: "Performance & Sicherheit",
    items: [
      { name: "WP Rocket", desc: "Caching. Macht die Seite messbar schneller.", icon: "R" },
      { name: "Wordfence", desc: "Firewall & Malware-Scan. Sicherheit geht vor.", icon: "F" },
      { name: "UpdraftPlus", desc: "Backups. Automatisiert und extern gespeichert.", icon: "U" },
    ]
  },
  {
    category: "SEO & Analyse",
    items: [
      { name: "The SEO Framework", desc: "SEO. Ohne Werbung, ohne Schnickschnack, macht einfach seinen Job.", icon: "S" },
      { name: "Plausible Analytics", desc: "Tracking. Datenschutzfreundlich, ohne Cookies, leichtgewichtig.", icon: "P" },
    ]
  }
];

export function TechStack() {
  return (
    <div className="p-4 sm:p-6 md:p-12 max-w-4xl mx-auto">
      <p className="font-display text-[0.65rem] font-bold tracking-[0.22em] uppercase text-accent mb-4">Tech Stack</p>
      <h1 className="font-display text-3xl md:text-4xl font-bold text-text mb-3">Mein Tech-Stack — und warum ich ihn nutze.</h1>
      <p className="text-dim text-base leading-relaxed mb-8 md:mb-12 max-w-2xl">
        Kein Baukasten-Chaos. Nur Tools, die sich bewährt haben.
      </p>

      <div className="space-y-10 md:space-y-12">
        {stack.map((group, groupIndex) => (
          <motion.div 
            key={group.category}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: groupIndex * 0.1 }}
          >
            <h2 className="font-display text-xl font-bold text-text mb-4 md:mb-6 border-b border-border pb-2">{group.category}</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
              {group.items.map((item, itemIndex) => (
                <motion.div 
                  key={item.name}
                  className="brutal-card brutal-card-hover p-5 md:p-6"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: (groupIndex * 0.1) + (itemIndex * 0.05) }}
                >
                  <div className="w-10 h-10 rounded-xl bg-accent text-inv border border-border shadow-[1px_1px_0px_0px_#3E2723] flex items-center justify-center font-display font-bold text-lg mb-4">
                    {item.icon}
                  </div>
                  <h3 className="font-display font-bold text-text mb-2">{item.name}</h3>
                  <p className="text-sm text-dim leading-relaxed">{item.desc}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
