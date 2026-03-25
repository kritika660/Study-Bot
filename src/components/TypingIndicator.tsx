import React from 'react';
import { motion } from 'framer-motion';

export const TypingIndicator: React.FC = () => {
  return (
    <div className="w-full flex mb-6 justify-start relative">
      <div className="absolute -left-12 top-0 w-8 h-8 rounded-full bg-gradient-to-tr from-primary-600 to-primary-400 flex items-center justify-center text-white font-bold text-xs shadow-md">
        AI
      </div>
      <div className="glass rounded-3xl rounded-tl-sm px-6 py-4 flex items-center gap-2 border border-slate-200 dark:border-white/5 shadow-sm">
        <div className="text-sm text-slate-500 dark:text-slate-400 font-medium mr-2">
          Thinking
        </div>
        <motion.div
          animate={{ scale: [1, 1.2, 1] }}
          transition={{ repeat: Infinity, duration: 1, delay: 0 }}
          className="w-1.5 h-1.5 bg-primary-500 rounded-full"
        />
        <motion.div
          animate={{ scale: [1, 1.2, 1] }}
          transition={{ repeat: Infinity, duration: 1, delay: 0.2 }}
          className="w-1.5 h-1.5 bg-primary-500 rounded-full"
        />
        <motion.div
          animate={{ scale: [1, 1.2, 1] }}
          transition={{ repeat: Infinity, duration: 1, delay: 0.4 }}
          className="w-1.5 h-1.5 bg-primary-500 rounded-full"
        />
      </div>
    </div>
  );
};
