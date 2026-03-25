import { motion } from 'framer-motion';
import ReactMarkdown from 'react-markdown';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';
import type { MessageRole } from '../services/gemini';

interface ChatBubbleProps {
  role: MessageRole;
  content: string;
}

export const ChatBubble: React.FC<ChatBubbleProps> = ({ role, content }) => {
  const isUser = role === 'user';

  return (
    <motion.div
      initial={{ opacity: 0, y: 15, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
      className={twMerge(
        clsx(
          "w-full flex mb-6",
          isUser ? "justify-end" : "justify-start"
        )
      )}
    >
      <div
        className={twMerge(
          clsx(
            "max-w-[85%] rounded-3xl px-6 py-4 shadow-sm relative",
            isUser 
              ? "bg-primary-600 text-white rounded-tr-sm" 
              : "glass text-slate-800 dark:text-slate-200 rounded-tl-sm border border-slate-200 dark:border-white/5"
          )
        )}
      >
        {!isUser && (
          <div className="absolute -left-12 top-0 w-8 h-8 rounded-full bg-gradient-to-tr from-primary-600 to-primary-400 flex items-center justify-center text-white font-bold text-xs shadow-md">
            AI
          </div>
        )}
        
        <div className={clsx(
          "prose prose-sm md:prose-base leading-relaxed break-words",
          isUser ? "text-white prose-invert" : "dark:prose-invert prose-slate",
          "prose-p:last:mb-0 prose-p:first:mt-0 prose-pre:bg-slate-800 prose-pre:text-slate-200"
        )}>
          <ReactMarkdown>{content}</ReactMarkdown>
        </div>
      </div>
    </motion.div>
  );
};
