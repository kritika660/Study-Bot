import { useState, useRef, useEffect } from 'react';
import { Sidebar } from './components/Sidebar';
import { ChatBubble } from './components/ChatBubble';
import { MessageInput } from './components/MessageInput';
import { TypingIndicator } from './components/TypingIndicator';
import { sendMessageToGemini } from './services/gemini';
import type { ChatMessage } from './services/gemini';

function App() {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'welcome-1',
      role: 'assistant',
      content: 'Hello! I am your AI Study Buddy. What topic would you like to master today? I can explain complex concepts, quiz you, or help you understand your lecture notes.',
      timestamp: Date.now()
    }
  ]);
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isLoading]);

  const handleSendMessage = async (text: string) => {
    const newUserMessage: ChatMessage = {
      id: Date.now().toString(),
      role: 'user',
      content: text,
      timestamp: Date.now()
    };

    setMessages(prev => [...prev, newUserMessage]);
    setIsLoading(true);

    try {
      // Add a placeholder for the assistant's streaming response
      const assistantMessageId = (Date.now() + 1).toString();

      setMessages(prev => [
        ...prev,
        {
          id: assistantMessageId,
          role: 'assistant',
          content: '',
          timestamp: Date.now()
        }
      ]);

      const apiHistory = [...messages, newUserMessage].map(m => ({
        role: m.role,
        content: m.content
      }));

      await sendMessageToGemini(apiHistory, (chunkText) => {
        setMessages(prev => prev.map(msg => 
          msg.id === assistantMessageId 
            ? { ...msg, content: chunkText }
            : msg
        ));
      });

    } catch (error) {
      console.error(error);
      const errorMessageId = (Date.now() + 2).toString();
      setMessages(prev => [
        ...prev,
        {
          id: errorMessageId,
          role: 'assistant',
          content: `**Error:** Unable to connect to Gemini API. Details: ${error instanceof Error ? error.message : String(error)}`,
          timestamp: Date.now()
        }
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleNewSession = () => {
    setMessages([
      {
        id: Date.now().toString(),
        role: 'assistant',
        content: "Let's start a new study session! What are we focusing on now?",
        timestamp: Date.now()
      }
    ]);
  };

  return (
    <div className="flex h-screen w-full overflow-hidden bg-light-bg dark:bg-dark-bg selection:bg-primary-500/30">
      <Sidebar onNewSession={handleNewSession} />
      
      <main className="flex-1 flex flex-col relative z-0">
        {/* Background Decorative Elements */}
        <div className="absolute top-[-10%] left-[-10%] w-96 h-96 bg-primary-400/20 dark:bg-primary-600/10 rounded-full blur-[100px] pointer-events-none -z-10" />
        <div className="absolute bottom-[-10%] right-[-5%] w-[500px] h-[500px] bg-sky-400/10 dark:bg-sky-600/5 rounded-full blur-[120px] pointer-events-none -z-10" />

        <div className="flex-1 overflow-y-auto w-full pt-8 pb-32 px-4 scroll-smooth">
          <div className="max-w-4xl mx-auto flex flex-col justify-end min-h-full pb-4">
            {messages.map((msg) => (
              <ChatBubble key={msg.id} role={msg.role} content={msg.content} />
            ))}
            {isLoading && <TypingIndicator />}
            <div ref={messagesEndRef} />
          </div>
        </div>

        <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-light-bg dark:from-dark-bg  via-light-bg/80 dark:via-dark-bg/80 to-transparent">
          <div className="max-w-4xl mx-auto">
             <MessageInput onSendMessage={handleSendMessage} isLoading={isLoading} />
             <div className="text-center mt-2 lg:mb-2 mb-0">
               <span className="text-[10px] text-slate-500 font-medium tracking-wide">AI-generated responses can be inaccurate. Double-check important facts.</span>
             </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;
