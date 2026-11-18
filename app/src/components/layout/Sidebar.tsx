import React from 'react';
import { 
  LayoutDashboard, 
  Users, 
  UserCheck, 
  Crosshair, 
  Target, 
  GitCompare, 
  ShieldCheck, 
  Layers, 
  Award, 
  FileCheck2,
  ChevronRight,
  ShieldAlert
} from 'lucide-react';
import type { NavigationTab } from '../../types';

interface SidebarProps {
  activeTab: NavigationTab;
  setActiveTab: (tab: NavigationTab) => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ activeTab, setActiveTab }) => {
  const navItems: { id: NavigationTab; label: string; icon: React.ReactNode; badge?: string }[] = [
    { id: 'overview', label: 'Executive Overview', icon: <LayoutDashboard size={18} /> },
    { id: 'squad-requirements', label: 'Squad Requirements', icon: <Users size={18} />, badge: 'Provisional' },
    { id: 'acquisition-board', label: 'Acquisition Board', icon: <UserCheck size={18} />, badge: '50 Players' },
    { id: 'batter-intelligence', label: 'Batter Intelligence', icon: <Crosshair size={18} /> },
    { id: 'bowler-intelligence', label: 'Bowler Intelligence', icon: <Target size={18} /> },
    { id: 'comparison', label: 'Player Comparison', icon: <GitCompare size={18} /> },
    { id: 'reliability', label: 'Player Reliability', icon: <ShieldCheck size={18} /> },
    { id: 'squad-builder', label: 'Squad Builder', icon: <Layers size={18} />, badge: 'Interactive' },
    { id: 'decisions', label: 'Acquisition Decisions', icon: <Award size={18} /> },
    { id: 'data-quality', label: 'Data Quality & Audit', icon: <FileCheck2 size={18} />, badge: 'Verified' },
  ];

  return (
    <aside className="w-64 bg-[#090E1A] border-r border-[#1E2D4A] flex flex-col shrink-0 h-screen sticky top-0 select-none z-20">
      {/* Brand & Crest */}
      <div className="p-5 border-b border-[#1E2D4A] flex items-center gap-3">
        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#EA1A85] to-[#1E3A8A] flex items-center justify-center shadow-lg shadow-[#EA1A85]/20 ring-1 ring-white/20 shrink-0">
          <span className="font-black text-white text-base tracking-tighter">RR</span>
        </div>
        <div className="overflow-hidden">
          <div className="flex items-center gap-1.5">
            <h1 className="font-bold text-white text-base tracking-tight leading-none">SupeRR Selector</h1>
          </div>
          <p className="text-[11px] font-semibold text-[#EA1A85] tracking-wider uppercase mt-1">2027 Intelligence</p>
        </div>
      </div>

      {/* Franchise Season Pill */}
      <div className="px-4 py-2.5 bg-[#0C1424] border-b border-[#16223B] flex items-center justify-between text-xs">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
          <span className="text-slate-300 font-medium text-[11px]">IPL 2027 Cycle</span>
        </div>
        <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-[#EA1A85]/15 text-[#EA1A85] border border-[#EA1A85]/30">
          RR FRANCHISE
        </span>
      </div>

      {/* Navigation List */}
      <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto">
        <div className="px-3 pb-2 text-[10px] font-semibold text-slate-400 uppercase tracking-wider">
          Decision Modules
        </div>
        {navItems.map((item) => {
          const isActive = activeTab === item.id;
          return (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`w-full flex items-center justify-between px-3 py-2.5 rounded-lg text-xs font-medium transition-all group ${
                isActive
                  ? 'bg-gradient-to-r from-[#EA1A85]/20 to-[#1E3A8A]/20 text-white border border-[#EA1A85]/50 shadow-sm shadow-[#EA1A85]/10'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-[#121C30]'
              }`}
            >
              <div className="flex items-center gap-3">
                <span className={`transition-colors ${isActive ? 'text-[#EA1A85]' : 'text-slate-400 group-hover:text-slate-200'}`}>
                  {item.icon}
                </span>
                <span className="truncate">{item.label}</span>
              </div>
              <div className="flex items-center gap-1.5">
                {item.badge && (
                  <span className={`text-[9px] px-1.5 py-0.5 rounded font-semibold ${
                    isActive 
                      ? 'bg-[#EA1A85]/30 text-white' 
                      : 'bg-[#19263E] text-slate-400'
                  }`}>
                    {item.badge}
                  </span>
                )}
                <ChevronRight 
                  size={14} 
                  className={`transition-transform ${isActive ? 'text-[#EA1A85] translate-x-0.5' : 'text-slate-600 opacity-0 group-hover:opacity-100'}`} 
                />
              </div>
            </button>
          );
        })}
      </nav>

      {/* Critical Data Warning Notice */}
      <div className="p-3 mx-3 mb-3 rounded-lg bg-[#141A29] border border-amber-500/20 text-[11px] text-slate-400">
        <div className="flex items-center gap-1.5 text-amber-400 font-semibold mb-1">
          <ShieldAlert size={13} />
          <span>Real-World Reality</span>
        </div>
        <p className="text-[10px] leading-relaxed text-slate-400">
          8 of 10 original targets are retained by rivals. Alternative pool is vital for 2027.
        </p>
      </div>

      {/* Footer Info */}
      <div className="p-3 border-t border-[#1E2D4A] bg-[#070B14] text-[10px] text-slate-400 flex items-center justify-between">
        <span>Verified Analytical Model</span>
        <span className="text-emerald-400 font-mono">v2027.1</span>
      </div>
    </aside>
  );
};
