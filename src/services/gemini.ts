import { GoogleGenerativeAI } from '@google/generative-ai';

const genAI = new GoogleGenerativeAI(import.meta.env.VITE_GEMINI_API_KEY || '');

export const SYSTEM_PROMPT = `You are an elite academic tutor and an AI Study Buddy. 
Your goal is to explain complex topics using analogies, clear steps, and Socratic questioning.
Always format your responses elegantly using Markdown, including bold text, bullet points, and code blocks where appropriate.
If a student asks a direct question, first provide a concise intuitive answer, then break down the fundamentals using an analogy, and finally ask a guiding question to test their understanding.`;

export type MessageRole = 'user' | 'assistant';

export interface ChatMessage {
  id: string;
  role: MessageRole;
  content: string;
  timestamp: number;
}

export const sendMessageToGemini = async (
  messages: { role: MessageRole; content: string }[],
  onChunk: (text: string) => void
) => {
  if (!import.meta.env.VITE_GEMINI_API_KEY) {
    throw new Error('API Key is missing. Please add VITE_GEMINI_API_KEY to your .env file.');
  }

  try {
    const model = genAI.getGenerativeModel({
      model: "gemini-2.5-flash",
      systemInstruction: SYSTEM_PROMPT,
    });

    // Gemini requires the history to start with a 'user' message. 
    // We filter out the first message if it's the bot's initial greeting.
    const startIndex = messages.length > 0 && messages[0].role === 'assistant' ? 1 : 0;
    const history = messages.slice(startIndex, -1).map(msg => ({
      role: msg.role === 'assistant' ? 'model' : 'user',
      parts: [{ text: msg.content }]
    }));
    
    const latestMessage = messages[messages.length - 1].content;

    const chat = model.startChat({
        history: history,
    });

    const result = await chat.sendMessageStream(latestMessage);

    let fullText = '';
    for await (const chunk of result.stream) {
      const chunkText = chunk.text();
      fullText += chunkText;
      onChunk(fullText);
    }
    
    return fullText;
  } catch (error) {
    console.error('Error communicating with Gemini:', error);
    throw error;
  }
};
