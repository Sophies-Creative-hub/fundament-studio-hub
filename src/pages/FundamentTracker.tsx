import { useState } from "react";
import { motion } from "motion/react";

const questions = [
  "Lädt deine Seite in unter 2 Sekunden?",
  "Weißt du genau, wo deine Domain liegt und wer Zugriff hat?",
  "Hast du ein automatisiertes, tägliches Backup?",
  "Ist deine Seite auf dem neuesten Stand (Core, Plugins, Theme)?",
  "Gibt es ein klares Ziel für jeden Besucher (Call to Action)?",
  "Ist das Design auf dem Smartphone genauso gut wie am Desktop?",
  "Hast du ein SSL-Zertifikat (Schloss-Symbol im Browser)?",
  "Weißt du, wie viele Besucher du im Monat hast?",
  "Kannst du Texte und Bilder selbst ändern, ohne einen Entwickler zu fragen?",
  "Ist deine Seite rechtssicher (Impressum, Datenschutzerklärung, Cookie-Banner)?",
];

export function FundamentTracker() {
  const [checked, setChecked] = useState<boolean[]>(new Array(questions.length).fill(false));

  const toggleCheck = (index: number) => {
    const newChecked = [...checked];
    newChecked[index] = !newChecked[index];
    setChecked(newChecked);
  };

  const score = checked.filter(Boolean).length;
  const percentage = (score / questions.length) * 100;

  let resultMessage = "";
  if (score === 10) resultMessage = "Perfekt! Dein Fundament ist grundsolide.";
  else if (score >= 7) resultMessage = "Gut, aber es gibt noch Lücken. Lass uns die schließen.";
  else if (score >= 4) resultMessage = "Achtung! Dein Fundament wackelt. Handlungsbedarf.";
  else resultMessage = "Kritisch! Wir müssen dringend reden.";

  return (
    <div className="p-4 sm:p-6 md:p-12 max-w-3xl mx-auto">
      <p className="font-display text-[0.65rem] font-bold tracking-[0.22em] uppercase text-accent mb-4">Fundament Tracker</p>
      <h1 className="font-display text-3xl md:text-4xl font-bold text-text mb-3">Wie stabil ist dein digitales Fundament?</h1>
      <p className="text-dim text-base leading-relaxed mb-8 md:mb-12">
        10-Punkte Check. Sei ehrlich zu dir selbst.
      </p>

      <div className="brutal-card p-4 sm:p-6 md:p-8 mb-8">
        <div className="space-y-4">
          {questions.map((q, i) => (
            <label
              key={i}
              className="flex items-start gap-3 sm:gap-4 p-3 sm:p-4 rounded-lg hover:bg-bg/50 cursor-pointer transition-colors border border-transparent hover:border-border/50"
            >
              <div className="relative flex items-center justify-center mt-0.5 shrink-0">
                <input
                  type="checkbox"
                  className="peer sr-only"
                  checked={checked[i]}
                  onChange={() => toggleCheck(i)}
                />
                <div className="w-6 h-6 rounded-md border border-border peer-checked:bg-accent peer-checked:border-border transition-all flex items-center justify-center shadow-[1px_1px_0px_0px_#3E2723]">
                  <motion.svg
                    initial={{ scale: 0 }}
                    animate={{ scale: checked[i] ? 1 : 0 }}
                    className="w-4 h-4 text-inv"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={3}
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </motion.svg>
                </div>
              </div>
              <span className={`text-sm sm:text-base leading-relaxed transition-colors ${checked[i] ? 'text-text' : 'text-dim'}`}>
                {q}
              </span>
            </label>
          ))}
        </div>
      </div>

      <div className="brutal-card p-6 sm:p-8 text-center">
        <div className="font-display text-5xl font-bold text-accent mb-2">
          {score} <span className="text-2xl text-dim">/ 10</span>
        </div>
        <div className="w-full bg-card border border-border h-4 rounded-full mb-4 overflow-hidden shadow-[1px_1px_0px_0px_#3E2723]">
          <motion.div
            className="h-full bg-accent border-r border-border"
            initial={{ width: 0 }}
            animate={{ width: `${percentage}%` }}
            transition={{ duration: 0.5, ease: "easeOut" }}
          />
        </div>
        <p className="font-display font-bold text-lg text-text">{resultMessage}</p>
      </div>
    </div>
  );
}
