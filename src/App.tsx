import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Layout } from "./components/Layout";
import { Home } from "./pages/Home";
import { FundamentTracker } from "./pages/FundamentTracker";
import { TechStack } from "./pages/TechStack";
import { VorherNachher } from "./pages/VorherNachher";
import { Wartungsrisiko } from "./pages/Wartungsrisiko";
import { WebsiteTyp } from "./pages/WebsiteTyp";
import { SystemMap } from "./pages/SystemMap";
import { Gesundheit } from "./pages/Gesundheit";
import { GamesHub } from './pages/games/GamesHub';
import { SwipeTheBloat } from './pages/games/SwipeTheBloat';
import { WhackABug } from './pages/games/WhackABug';
import { TechStackTower } from './pages/games/TechStackTower';

export default function App() {
  return (
    <BrowserRouter basename="/fundament-studio-hub">
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="fundament-tracker" element={<FundamentTracker />} />
          <Route path="tech-stack" element={<TechStack />} />
          <Route path="vorher-nachher" element={<VorherNachher />} />
          <Route path="wartungsrisiko" element={<Wartungsrisiko />} />
          <Route path="website-typ" element={<WebsiteTyp />} />
          <Route path="system-map" element={<SystemMap />} />
          <Route path="gesundheit" element={<Gesundheit />} />
          <Route path="arcade" element={<GamesHub />} />
          <Route path="arcade/swipe-the-bloat" element={<SwipeTheBloat />} />
          <Route path="arcade/whack-a-bug" element={<WhackABug />} />
          <Route path="arcade/tech-stack-tower" element={<TechStackTower />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
