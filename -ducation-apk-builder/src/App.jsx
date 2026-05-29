import { Routes, Route, Link } from "react-router-dom";
import Home from "./pages/Home.jsx";
import Converter from "./pages/Converter.jsx";
import BatchConvert from "./pages/BatchConvert.jsx";
import QuizGenerator from "./pages/QuizGenerator.jsx";
import Templates from "./pages/Templates.jsx";
import History from "./pages/History.jsx";
import Settings from "./pages/Settings.jsx";
import Documentation from "./pages/Documentation.jsx";
import Admin from "./pages/Admin.jsx";

export default function App() {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col">
      <header className="sticky top-0 z-40 backdrop-blur bg-slate-950/80 border-b border-white/10">
        <nav className="max-w-6xl mx-auto flex items-center gap-2 px-4 py-3 overflow-x-auto">
          <Link to="/" className="font-bold text-base mr-2 whitespace-nowrap">eduformat-ai-converter</Link>
          <div className="flex gap-1 ml-auto">
          <Link to="/" className="px-3 py-2 rounded-lg text-sm text-slate-300 hover:bg-white/10 hover:text-white transition">Home</Link>
          <Link to="/converter" className="px-3 py-2 rounded-lg text-sm text-slate-300 hover:bg-white/10 hover:text-white transition">Converter</Link>
          <Link to="/batch-convert" className="px-3 py-2 rounded-lg text-sm text-slate-300 hover:bg-white/10 hover:text-white transition">Batch Converter</Link>
          <Link to="/quiz-generator" className="px-3 py-2 rounded-lg text-sm text-slate-300 hover:bg-white/10 hover:text-white transition">Quiz Generator</Link>
          <Link to="/templates" className="px-3 py-2 rounded-lg text-sm text-slate-300 hover:bg-white/10 hover:text-white transition">Templates</Link>
          <Link to="/history" className="px-3 py-2 rounded-lg text-sm text-slate-300 hover:bg-white/10 hover:text-white transition">History</Link>
          <Link to="/settings" className="px-3 py-2 rounded-lg text-sm text-slate-300 hover:bg-white/10 hover:text-white transition">Settings</Link>
          <Link to="/documentation" className="px-3 py-2 rounded-lg text-sm text-slate-300 hover:bg-white/10 hover:text-white transition">Documentation</Link>
          <Link to="/admin" className="px-3 py-2 rounded-lg text-sm text-slate-300 hover:bg-white/10 hover:text-white transition">Admin Dashboard</Link>
          </div>
        </nav>
      </header>
      <main className="flex-1">
        <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/converter" element={<Converter />} />
        <Route path="/batch-convert" element={<BatchConvert />} />
        <Route path="/quiz-generator" element={<QuizGenerator />} />
        <Route path="/templates" element={<Templates />} />
        <Route path="/history" element={<History />} />
        <Route path="/settings" element={<Settings />} />
        <Route path="/documentation" element={<Documentation />} />
        <Route path="/admin" element={<Admin />} />
        </Routes>
      </main>
      <footer className="border-t border-white/10 py-4 text-center text-xs text-slate-500">
        © 2026 eduformat-ai-converter
      </footer>
    </div>
  );
}
