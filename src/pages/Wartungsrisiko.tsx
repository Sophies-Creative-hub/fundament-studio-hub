import { useState } from "react";
import { motion } from "motion/react";

const questions = [
  { text: "Wann wurde das letzte Backup gemacht?", options: ["Heute", "Letzte Woche", "Weiß nicht / Nie"], points: [0, 5, 10] },
  { text: "Wie viele Plugins sind installiert?", options: ["Unter 10", "10 - 30", "Über 30"], points: [0, 5, 10] },
  { text: "Werden Updates automatisch eingespielt?", options: ["Ja, alles", "Nur Sicherheit", "Nein, manuell"], points: [0, 2, 8] },
  { text: "Nutzt du ein Premium-Theme (z.B. Avada, Divi)?", options: ["Nein (Custom/Leicht)", "Weiß nicht", "Ja"], points: [0, 5, 10] },
  { text: "Gibt es eine Firewall (z.B. Wordfence)?", options: ["Ja", "Weiß nicht", "Nein"], points: [0, 5, 10] },
];

export function Wartungsrisiko() {
  const [answers, setAnswers] = useState<number[]>(new Array(questions.length).fill(-1));

  const handleSelect = (qIndex: number, oIndex: number) => {
    const newAnswers = [...answers];
    newAnswers[qIndex] = oIndex;
    setAnswers(newAnswers);
  };

  const isComplete = answers.every(a => a !== -1);
  const totalScore = answers.reduce((sum, aIndex, qIndex) => {
    return sum + (aIndex !== -1 ? questions[qIndex].points[aIndex] : 0);
  }, 0);

  let riskLevel = "";
  let riskColor = "";
  let riskDesc = "";

  if (totalScore <= 10) {
    riskLevel = "Geringes Risiko";
    riskColor = "text-emerald-600";
    riskDesc = "Deine Website ist gut aufgestellt. Weiter so!";
  } else if (totalScore <= 30) {
    riskLevel = "Mittleres Risiko";
    riskColor = "text-amber-500";
    riskDesc = "Es gibt ein paar Baustellen, die du im Auge behalten solltest.";
  } else {
    riskLevel = "Hohes Risiko";
    riskColor = "text-red-500";
    riskDesc = "Achtung! Deine Website ist anfällig für Ausfälle oder Hacks. Handlungsbedarf!";
  }

  return (
    <div className="p-4 sm:p-6 md:p-12 max-w-3xl mx-auto">
      <p className="font-display text-[0.65rem] font-bold tracking-[0.22em] uppercase text-accent mb-4">Wartungsrisiko</p>
      <h1 className="font-display text-3xl md:text-4xl font-bold text-text mb-3">Wie sicher ist deine Website gerade?</h1>
      <p className="text-dim text-base leading-relaxed mb-8 md:mb-12">
        5-Minuten Risiko-Check. Finde heraus, ob deine Seite auf einem soliden Fundament steht oder bald zusammenbricht.
      </p>

      <div className="space-y-6 md:space-y-8 mb-12">
        {questions.map((q, qIndex) => (
          <div key={qIndex} className="brutal-card p-5 sm:p-6">
            <h3 className="font-display font-bold text-lg text-text mb-4">{q.text}</h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {q.options.map((opt, oIndex) => (
                <button
                  key={oIndex}
                  onClick={() => handleSelect(qIndex, oIndex)}
                  className={`px-4 py-3 rounded-xl text-sm font-medium transition-all border ${
                    answers[qIndex] === oIndex
                      ? "bg-accent text-inv border-border shadow-[1px_1px_0px_0px_#3E2723] translate-x-[1px] translate-y-[1px]"
                      : "bg-card text-text border-border shadow-[2px_2px_0px_0px_#3E2723] hover:translate-x-[1px] hover:translate-y-[1px] hover:shadow-[1px_1px_0px_0px_#3E2723]"
                  }`}
                >
                  {opt}
                </button>
              ))}
            </div>
          </div>
        ))}
      </div>

      {isComplete && (
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="brutal-card p-6 sm:p-8 text-center"
        >
          <p className="text-sm text-dim uppercase tracking-widest font-bold mb-2">Dein Ergebnis</p>
          <div className={`font-display text-3xl sm:text-4xl font-bold mb-4 ${riskColor}`}>
            {riskLevel}
          </div>
          <div className="w-full bg-card border border-border h-4 rounded-full mb-6 overflow-hidden shadow-[1px_1px_0px_0px_#3E2723] max-w-md mx-auto">
            <motion.div
              className={`h-full border-r border-border ${totalScore <= 10 ? 'bg-emerald-500' : totalScore <= 30 ? 'bg-amber-500' : 'bg-red-500'}`}
              initial={{ width: 0 }}
              animate={{ width: `${(totalScore / 50) * 100}%` }}
              transition={{ duration: 0.8, ease: "easeOut" }}
            />
          </div>
          <p className="text-base sm:text-lg text-text font-medium max-w-lg mx-auto">{riskDesc}</p>
          <p className="text-sm text-dim mt-4">Score: {totalScore} / 50</p>
        </motion.div>
      )}
    </div>
  );
}
