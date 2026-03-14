import { useState } from "react";
import { motion } from "motion/react";

const types = [
  {
    id: "visitenkarte",
    name: "Die digitale Visitenkarte",
    desc: "Du brauchst eine saubere, schnelle Präsenz. Wenig Inhalt, aber der muss sitzen.",
    needs: ["Schnelle Ladezeit", "Klares Design", "Mobile Optimierung", "Kontaktmöglichkeit"],
    icon: "📇"
  },
  {
    id: "leadgen",
    name: "Die Lead-Maschine",
    desc: "Deine Website soll Anfragen generieren. Conversion-Rate ist alles.",
    needs: ["Starke CTAs", "Landingpages", "CRM-Anbindung", "A/B Testing fähig"],
    icon: "🎯"
  },
  {
    id: "content",
    name: "Der Content-Hub",
    desc: "Du veröffentlichst regelmäßig Artikel, Podcasts oder Videos. Struktur ist König.",
    needs: ["Gute Suchfunktion", "Kategorisierung", "Newsletter-Integration", "SEO-Fokus"],
    icon: "📚"
  },
  {
    id: "shop",
    name: "Der Shop",
    desc: "Du verkaufst Produkte direkt über die Seite. Performance = Umsatz.",
    needs: ["WooCommerce/Shopify", "Sichere Zahlungen", "Schneller Checkout", "Produktfilter"],
    icon: "🛒"
  }
];

export function WebsiteTyp() {
  const [selectedType, setSelectedType] = useState<string | null>(null);

  return (
    <div className="p-4 sm:p-6 md:p-12 max-w-4xl mx-auto">
      <p className="font-display text-[0.65rem] font-bold tracking-[0.22em] uppercase text-accent mb-4">Website Typ</p>
      <h1 className="font-display text-3xl md:text-4xl font-bold text-text mb-3">Welcher Website-Typ bist du?</h1>
      <p className="text-dim text-base leading-relaxed mb-8 md:mb-12 max-w-2xl">
        Nicht jede Website braucht alles. Finde heraus, was für dein Ziel wirklich wichtig ist und wo du sparen kannst.
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-6 mb-8 md:mb-12">
        {types.map((type, index) => (
          <motion.button
            key={type.id}
            onClick={() => setSelectedType(type.id)}
            className={`text-left p-5 sm:p-6 rounded-2xl border transition-all duration-200 ${
              selectedType === type.id
                ? "bg-accent text-inv border-border shadow-[1px_1px_0px_0px_#3E2723] translate-x-[1px] translate-y-[1px]"
                : "bg-card border-border shadow-[2px_2px_0px_0px_#3E2723] hover:translate-x-[1px] hover:translate-y-[1px] hover:shadow-[1px_1px_0px_0px_#3E2723]"
            }`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <div className="text-3xl sm:text-4xl mb-3 sm:mb-4">{type.icon}</div>
            <h3 className={`font-display font-bold text-lg sm:text-xl mb-2 ${selectedType === type.id ? "text-inv" : "text-text"}`}>
              {type.name}
            </h3>
            <p className={`text-sm leading-relaxed ${selectedType === type.id ? "text-inv/80" : "text-dim"}`}>
              {type.desc}
            </p>
          </motion.button>
        ))}
      </div>

      {selectedType && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="brutal-card p-6 sm:p-8"
        >
          <h3 className="font-display font-bold text-xl sm:text-2xl text-text mb-6">
            Darauf solltest du dich fokussieren:
          </h3>
          <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {types.find(t => t.id === selectedType)?.needs.map((need, i) => (
              <li key={i} className="flex items-center gap-3 text-text">
                <div className="w-6 h-6 rounded-full bg-accent text-inv border border-border flex items-center justify-center flex-shrink-0">
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <span className="font-medium text-sm sm:text-base">{need}</span>
              </li>
            ))}
          </ul>
          <div className="mt-8 pt-6 border-t border-border/50">
            <p className="text-dim text-sm">
              Brauchst du Hilfe bei der Umsetzung? Lass uns darüber sprechen, wie wir dein Fundament für diesen Typ optimieren können.
            </p>
          </div>
        </motion.div>
      )}
    </div>
  );
}
