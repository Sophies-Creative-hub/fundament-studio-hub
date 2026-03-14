import { useState } from "react";
import { Link, Outlet, useLocation } from "react-router-dom";
import { cn } from "../lib/utils";
import { LayoutDashboard, CheckSquare, Layers, SlidersHorizontal, ShieldAlert, UserCircle, Network, HeartPulse, Menu, X, ChevronLeft, ChevronRight, Gamepad2 } from "lucide-react";

const navigation = [
  { name: "Übersicht", href: "/", icon: LayoutDashboard },
  { name: "Fundament Tracker", href: "/fundament-tracker", icon: CheckSquare },
  { name: "Tech Stack", href: "/tech-stack", icon: Layers },
  { name: "Vorher / Nachher", href: "/vorher-nachher", icon: SlidersHorizontal },
  { name: "Wartungsrisiko", href: "/wartungsrisiko", icon: ShieldAlert },
  { name: "Website Typ", href: "/website-typ", icon: UserCircle },
  { name: "System Map", href: "/system-map", icon: Network },
  { name: "Gesundheit", href: "/gesundheit", icon: HeartPulse },
  { name: "Arcade", href: "/arcade", icon: Gamepad2 },
];

export function Layout() {
  const location = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isCollapsed, setIsCollapsed] = useState(false);

  const closeMenu = () => setIsMobileMenuOpen(false);

  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-bg">
      {/* Mobile Header */}
      <div className="md:hidden flex items-center justify-between p-4 bg-card border-b border-border sticky top-0 z-40">
        <div>
          <h1 className="font-display font-bold text-lg text-text">Fundament Studio</h1>
          <p className="text-[10px] text-dim uppercase tracking-widest font-display font-semibold">Tools & Checks</p>
        </div>
        <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className="p-2 text-text hover:bg-border/50 rounded-lg transition-colors">
          {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Sidebar */}
      <div className={cn(
        "fixed inset-y-0 left-0 z-50 bg-card border-r border-border flex flex-col transform transition-all duration-300 ease-in-out md:relative md:translate-x-0",
        isMobileMenuOpen ? "translate-x-0 w-64" : "-translate-x-full md:translate-x-0",
        isCollapsed ? "md:w-20" : "md:w-64"
      )}>
        <div className={cn("p-6 hidden md:flex items-center", isCollapsed ? "justify-center px-2" : "justify-between")}>
          {!isCollapsed && (
            <div>
              <h1 className="font-display font-bold text-xl text-text">Fundament Studio</h1>
              <p className="text-xs text-dim mt-1 uppercase tracking-widest font-display font-semibold">Tools & Checks</p>
            </div>
          )}
          <button 
            onClick={() => setIsCollapsed(!isCollapsed)} 
            className="p-1.5 rounded-md hover:bg-border/50 text-dim hover:text-text transition-colors"
          >
            {isCollapsed ? <ChevronRight className="w-5 h-5" /> : <ChevronLeft className="w-5 h-5" />}
          </button>
        </div>
        <nav className="flex-1 px-4 py-4 md:py-0 space-y-1 overflow-y-auto">
          {navigation.map((item) => {
            const isActive = location.pathname === item.href;
            return (
              <Link
                key={item.name}
                to={item.href}
                onClick={closeMenu}
                className={cn(
                  "flex items-center gap-3 py-2.5 rounded-xl text-sm font-medium transition-all group border",
                  isCollapsed ? "justify-center px-0" : "px-3",
                  isActive
                    ? "bg-accent text-inv border-border shadow-[2px_2px_0px_0px_#3E2723] translate-x-[1px] translate-y-[1px]"
                    : "border-transparent text-dim hover:text-text hover:border-border hover:shadow-[2px_2px_0px_0px_#3E2723]"
                )}
                title={isCollapsed ? item.name : undefined}
              >
                <item.icon className={cn("w-5 h-5 shrink-0", isActive ? "text-inv" : "text-dim group-hover:text-text")} />
                {!isCollapsed && <span className="truncate">{item.name}</span>}
              </Link>
            );
          })}
        </nav>
        <div className="p-4 border-t border-border">
          <a
            href="https://deine-wordpress-seite.de"
            target="_blank"
            rel="noopener noreferrer"
            className={cn(
              "brutal-btn w-full",
              isCollapsed ? "px-0" : "px-4"
            )}
            title={isCollapsed ? "Zur Hauptseite" : undefined}
          >
            {isCollapsed ? <LayoutDashboard className="w-4 h-4" /> : "Zur Hauptseite →"}
          </a>
        </div>
      </div>

      {/* Mobile Overlay */}
      {isMobileMenuOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 md:hidden backdrop-blur-sm"
          onClick={closeMenu}
        />
      )}

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto w-full">
        <Outlet />
      </main>
    </div>
  );
}
