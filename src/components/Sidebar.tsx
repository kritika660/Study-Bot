import { BookOpen, History, MessageSquare, Plus } from 'lucide-react';
import { ThemeToggle } from './ThemeToggle';

interface SidebarProps {
  onNewSession: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ onNewSession }) => {
  return (
    <div className="w-64 h-full flex flex-col glass-panel">
      {/* Header */}
      <div className="p-4 flex items-center gap-3 border-b border-light-border dark:border-dark-border">
        <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-primary-600 to-primary-400 flex items-center justify-center shadow-lg shadow-primary-500/30">
          <BookOpen className="w-5 h-5 text-white" />
        </div>
        <h1 className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary-600 to-primary-400 dark:from-primary-400 dark:to-primary-200">
          StudyBuddy
        </h1>
      </div>

      {/* New Chat Button */}
      <div className="p-4">
        <button
          onClick={onNewSession}
          className="w-full flex items-center gap-2 px-4 py-2.5 bg-primary-600 hover:bg-primary-700 text-white rounded-xl transition-all duration-200 shadow-md hover:shadow-lg shadow-primary-600/20 font-medium"
        >
          <Plus className="w-4 h-4" />
          <span>New Session</span>
        </button>
      </div>

      {/* History Area */}
      <div className="flex-1 overflow-y-auto p-4 pt-0">
        <div className="flex items-center gap-2 mb-3 px-2 text-xs font-semibold text-slate-500 uppercase tracking-wider">
          <History className="w-3.5 h-3.5" />
          <span>Recent Sessions</span>
        </div>
        
        <div className="space-y-1">
          {/* Mock history item for demonstration */}
          <button className="w-full flex items-center gap-3 px-3 py-2 text-sm text-slate-700 dark:text-slate-300 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors text-left group">
            <MessageSquare className="w-4 h-4 text-slate-400 group-hover:text-primary-500" />
            <span className="truncate">Quantum Physics Intro</span>
          </button>
          <button className="w-full flex items-center gap-3 px-3 py-2 text-sm text-slate-700 dark:text-slate-300 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors text-left group">
            <MessageSquare className="w-4 h-4 text-slate-400 group-hover:text-primary-500" />
            <span className="truncate">React Hooks Review</span>
          </button>
        </div>
      </div>

      {/* Footer / Theme Toggle */}
      <div className="p-4 border-t border-light-border dark:border-dark-border flex items-center justify-between">
        <div className="text-sm font-medium text-slate-600 dark:text-slate-400">Settings</div>
        <ThemeToggle />
      </div>
    </div>
  );
};
