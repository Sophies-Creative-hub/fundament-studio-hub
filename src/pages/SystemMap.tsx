import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Map } from "lucide-react";

const nodeData: Record<string, string[]> = {
  newsletter: ['c-newsletter-email', 'c-newsletter-crm'],
  email: ['c-newsletter-email', 'c-email-onboarding'],
  buchung: ['c-buchung-onboarding', 'c-buchung-abrechnung'],
  onboarding: ['c-buchung-onboarding', 'c-email-onboarding', 'c-onboarding-crm'],
  crm: ['c-newsletter-crm', 'c-onboarding-crm', 'c-crm-abrechnung'],
  abrechnung: ['c-buchung-abrechnung', 'c-crm-abrechnung'],
};

const infoData: Record<string, any> = {
  newsletter: {
    tag: "Sichtbarkeit", tagType: "ok",
    name: "Newsletter",
    desc: "Dein Newsletter ist deine direkteste Verbindung zur Zielgruppe — unabhängig von Algorithmen. Fällt das Tool aus oder wird dein Konto gesperrt, verlierst du sofort den Kontakt zu deiner Liste. Kein Backup, kein Export = kein Sicherheitsnetz.",
    connectsLabel: "Hängt zusammen mit",
    connects: [
      { name: "E-Mail & Komm." }, { name: "CRM" }
    ]
  },
  buchung: {
    tag: "Umsatz-kritisch", tagType: "risk",
    name: "Buchung & Termine",
    desc: "Buchung ist das Tor zum Umsatz. Wenn dein Buchungstool ausfällt oder sich ändert, können Interessentinnen nicht mehr buchen. Und wenn Buchung und Onboarding nicht automatisch zusammenhängen, startest du jeden Prozess manuell neu.",
    connectsLabel: "Hängt zusammen mit",
    connects: [
      { name: "Onboarding" }, { name: "Abrechnung (oft manuell)", broken: true }
    ]
  },
  onboarding: {
    tag: "Zeitfresser", tagType: "risk",
    name: "Onboarding",
    desc: "Onboarding ist die erste Erfahrung deiner Kundin mit deiner Arbeitsweise. Läuft es manuell, kostet jede neue Kundin 1–3 Stunden Setup-Zeit. Automatisiert läuft es ohne dich — und hinterlässt trotzdem einen professionellen Eindruck.",
    connectsLabel: "Hängt zusammen mit",
    connects: [
      { name: "Buchung" }, { name: "CRM" }, { name: "E-Mail & Komm." }
    ]
  },
  abrechnung: {
    tag: "Umsatz-kritisch", tagType: "risk",
    name: "Abrechnung",
    desc: "Abrechnung ist oft der letzte manuelle Schritt — und der teuerste. Rechnungen die zu spät raus gehen, Zahlungen die du manuell verfolgst, Mahnungen die du selbst schreibst. Automatisierte Abrechnung zahlt sich innerhalb von Wochen aus.",
    connectsLabel: "Hängt zusammen mit",
    connects: [
      { name: "CRM" }, { name: "Buchung (oft getrennt)", broken: true }
    ]
  },
  crm: {
    tag: "Gedächtnis", tagType: "ok",
    name: "CRM",
    desc: "Dein CRM ist das Gedächtnis deines Business. Ohne es weißt du nicht wer gerade Kundin ist, wer bald kauft, oder wer sich schon drei Mal gemeldet hat. Viele Selbstständige führen ihr CRM im Kopf — das ist das fragile Kopf-System.",
    connectsLabel: "Hängt zusammen mit",
    connects: [
      { name: "Onboarding" }, { name: "Abrechnung" }, { name: "Newsletter" }
    ]
  },
  email: {
    tag: "Kommunikation", tagType: "ok",
    name: "E-Mail & Kommunikation",
    desc: "E-Mail ist das Rückgrat jeder Kundenbeziehung — aber auch der größte Zeitfresser wenn sie nicht strukturiert ist. Templates, Automatisierungen und klare Prozesse verwandeln E-Mail von einem Stressor in ein System.",
    connectsLabel: "Hängt zusammen mit",
    connects: [
      { name: "Newsletter" }, { name: "Onboarding" }
    ]
  }
};

const connections = [
  { id: 'c-newsletter-email', x1: 60, y1: 50, x2: 240, y2: 50 },
  { id: 'c-newsletter-crm', x1: 60, y1: 50, x2: 60, y2: 320 },
  { id: 'c-email-onboarding', x1: 240, y1: 50, x2: 150, y2: 230 },
  { id: 'c-buchung-onboarding', x1: 150, y1: 140, x2: 150, y2: 230 },
  { id: 'c-buchung-abrechnung', x1: 150, y1: 140, x2: 240, y2: 320, broken: true },
  { id: 'c-onboarding-crm', x1: 150, y1: 230, x2: 60, y2: 320 },
  { id: 'c-crm-abrechnung', x1: 60, y1: 320, x2: 240, y2: 320 },
];

const nodes = [
  { id: 'newsletter', cx: 60, cy: 50, r: 30, lines: ['News-', 'letter'] },
  { id: 'email', cx: 240, cy: 50, r: 30, lines: ['E-Mail', '& Komm.'] },
  { id: 'buchung', cx: 150, cy: 140, r: 34, lines: ['Buchung', '& Termine'], isCenter: true },
  { id: 'onboarding', cx: 150, cy: 230, r: 30, lines: ['Onbo-', 'arding'] },
  { id: 'crm', cx: 60, cy: 320, r: 30, lines: ['CRM'] },
  { id: 'abrechnung', cx: 240, cy: 320, r: 30, lines: ['Abrech-', 'nung'] },
];

export function SystemMap() {
  const [activeNode, setActiveNode] = useState<string | null>(null);

  const activeConnections = activeNode ? nodeData[activeNode] : [];

  return (
    <div className="p-4 sm:p-6 md:p-12 max-w-5xl mx-auto">
      <style>{`
        .map-canvas { background: #fff; border: 1px solid var(--color-border); border-radius: 1rem; box-shadow: 2px 2px 0px 0px #3E2723; overflow: hidden; position: relative; aspect-ratio: 3/4; }
        .map-canvas svg { width: 100%; height: 100%; }
        .node-circle { cursor: pointer; transition: all 0.2s; }
        .node-circle:hover .node-bg, .node-circle.active .node-bg { fill: var(--color-highlight); }
        .node-circle:hover .node-label, .node-circle.active .node-label { fill: #FFFFFF; font-weight: 700; }
        .node-bg { fill: #FFFFFF; stroke: var(--color-border); stroke-width: 1.5; transition: fill 0.2s; }
        .node-bg.center { fill: var(--color-accent); stroke: var(--color-accent); }
        .node-label { fill: var(--color-text); font-family: 'Outfit', sans-serif; font-size: 9px; font-weight: 600; text-anchor: middle; dominant-baseline: middle; pointer-events: none; transition: fill 0.2s; }
        .node-label.center { fill: #FFFFFF; font-size: 10px; }
        .connection { stroke: var(--color-border); stroke-width: 1.5; fill: none; transition: stroke 0.3s, stroke-width 0.3s, opacity 0.3s; }
        .connection.active { stroke: var(--color-highlight); stroke-width: 2; opacity: 1; }
        .connection.broken { stroke: var(--color-accent); stroke-dasharray: 5 3; stroke-width: 2; opacity: 0.8; }
        .connection.dimmed { opacity: 0.15; }
      `}</style>

      <p className="font-display text-[0.65rem] font-bold tracking-[0.22em] uppercase text-accent mb-4">System-Visualisierung</p>
      <h1 className="font-display text-3xl md:text-4xl font-bold text-text mb-3">Wie hängt alles zusammen?</h1>
      <p className="text-dim text-base leading-relaxed mb-8 md:mb-12 max-w-2xl">
        Klick auf einen Bereich und sieh was passiert, wenn er wegfällt.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
        
        {/* SVG MAP */}
        <div className="map-canvas">
          <svg viewBox="0 0 300 400" xmlns="http://www.w3.org/2000/svg">
            {/* Connections */}
            {connections.map(c => {
              let className = "connection";
              if (activeNode) {
                if (activeConnections.includes(c.id)) {
                  className += " active";
                } else {
                  className += " dimmed";
                }
              }
              return (
                <line 
                  key={c.id} 
                  id={c.id} 
                  className={className} 
                  x1={c.x1} y1={c.y1} x2={c.x2} y2={c.y2} 
                />
              );
            })}

            {/* Nodes */}
            {nodes.map(n => (
              <g 
                key={n.id} 
                className={`node-circle ${activeNode === n.id ? 'active' : ''}`} 
                onClick={() => setActiveNode(n.id)}
              >
                <circle className={`node-bg ${n.isCenter ? 'center' : ''}`} cx={n.cx} cy={n.cy} r={n.r} />
                {n.lines.map((line, i) => (
                  <text 
                    key={i} 
                    className={`node-label ${n.isCenter ? 'center' : ''}`} 
                    x={n.cx} 
                    y={n.cy + (i === 0 && n.lines.length > 1 ? -3 : i === 1 ? 8 : 0)}
                  >
                    {line}
                  </text>
                ))}
              </g>
            ))}
          </svg>
        </div>

        {/* INFO PANEL */}
        <div className="brutal-card p-7 min-h-[300px] flex flex-col">
          <AnimatePresence mode="wait">
            {!activeNode ? (
              <motion.div 
                key="default"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
                className="flex flex-col justify-center items-center flex-1 text-center text-dim"
              >
                <Map className="w-10 h-10 mb-4 opacity-40" />
                <p className="text-sm leading-relaxed max-w-[250px]">
                  Klick auf einen Bereich in der System-Map um zu sehen, wie er mit dem Rest zusammenhängt — und was passiert wenn er wegfällt.
                </p>
              </motion.div>
            ) : (
              <motion.div 
                key={activeNode}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
                className="flex flex-col flex-1"
              >
                {(() => {
                  const info = infoData[activeNode];
                  return (
                    <>
                      <span className={`inline-block font-display text-[0.58rem] font-bold tracking-[0.12em] uppercase rounded-full px-3 py-1 mb-4 self-start ${
                        info.tagType === 'ok' ? 'bg-highlight/10 text-highlight' : 
                        info.tagType === 'risk' ? 'bg-accent/10 text-accent' : 
                        'bg-accent/20 text-accent'
                      }`}>
                        {info.tag}
                      </span>
                      <h3 className="font-display text-xl font-bold text-text mb-2">{info.name}</h3>
                      <p className="font-sans text-sm text-dim leading-relaxed flex-1 mb-5">
                        {info.desc}
                      </p>
                      <div className="pt-4 border-t border-border mt-auto">
                        <p className="font-display text-[0.6rem] font-bold tracking-[0.15em] uppercase text-dim mb-2">
                          {info.connectsLabel}
                        </p>
                        <div className="flex flex-wrap gap-2">
                          {info.connects.map((c: any, i: number) => (
                            <span key={i} className={`font-display text-[0.65rem] font-bold rounded-full px-2.5 py-1 ${
                              c.broken 
                                ? 'bg-accent/10 text-accent line-through' 
                                : 'bg-highlight/10 text-highlight'
                            }`}>
                              {c.name}
                            </span>
                          ))}
                        </div>
                      </div>
                    </>
                  );
                })()}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      <div className="max-w-[860px] mx-auto mt-12 px-4 md:px-8">
        <div className="brutal-card p-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="font-display font-bold text-text">Mehr entdecken</p>
          <div className="flex flex-wrap gap-3">
            <a href="/" className="brutal-btn-secondary text-sm">Alle Tools →</a>
            <a href="https://deine-wordpress-seite.de/aktionsplan" target="_blank" rel="noopener noreferrer" className="brutal-btn-secondary text-sm">Persönlicher Aktionsplan →</a>
          </div>
        </div>
      </div>
    </div>
  );
}

