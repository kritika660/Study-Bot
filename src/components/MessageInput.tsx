import React, { useState, useRef, useEffect } from 'react';
import { Send, Sparkles } from 'lucide-react';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

interface MessageInputProps {
  onSendMessage: (message: string) => void;
  isLoading: boolean;
}

export const MessageInput: React.FC<MessageInputProps> = ({ onSendMessage, isLoading }) => {
  const [message, setMessage] = useState('');
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const adjustHeight = () => {
    const textarea = textareaRef.current;
    if (textarea) {
      textarea.style.height = 'auto';
      textarea.style.height = `${Math.min(textarea.scrollHeight, 160)}px`;
    } 
  }; 

  useEffect(() => {
    adjustHeight();
  }, [message]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (message.trim() && !isLoading) {
      onSendMessage(message.trim());
      setMessage('');
      if (textareaRef.current) {
        textareaRef.current.style.height = 'auto';
      }
    } 
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  return (
    <div className="w-full glass-header rounded-2xl p-2 relative shadow-sm transition-all focus-within:ring-2 focus-within:ring-primary-500/50">
      <form onSubmit={handleSubmit} className="flex items-end gap-2 relative">
        <div className="absolute left-3 bottom-3 text-primary-500">
          <Sparkles className="w-5 h-5 opacity-70" />
        </div>
        <textarea
          ref={textareaRef}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Ask your study buddy anything..."
          disabled={isLoading}
          rows={1}
          className={twMerge(
            clsx(
              "w-full bg-transparent resize-none outline-none py-3 pl-10 pr-4 text-slate-800 dark:text-slate-200 placeholder-slate-400 dark:placeholder-slate-500",
              "transition-all duration-200"
            )
          )}
          style={{ minHeight: '48px', maxHeight: '160px' }}
        />
        <button
          type="submit"
          disabled={!message.trim() || isLoading}
          className="mb-1 p-2 rounded-xl bg-primary-600 hover:bg-primary-700 disabled:opacity-50 disabled:hover:bg-primary-600 text-white transition-colors duration-200 flex-shrink-0 flex items-center justify-center h-[40px] w-[40px]"
          aria-label="Send message"
        >
          <Send className="w-4 h-4 ml-0.5" />
        </button>
      </form>
    </div>
  );
};

