# 🎓 Study Buddy Bot

An AI-powered study assistant that helps students master complex topics through intuitive explanations, analogies, and Socratic questioning. Built with React, TypeScript, and Google's Gemini AI. 

![Study Buddy Bot](https://img.shields.io/badge/AI-Study%20Buddy-00C896?style=for-the-badge&logo=google&logoColor=white)
![React](https://img.shields.io/badge/React-19-61DAFB?style=for-the-badge&logo=react&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-5.9-3178C6?style=for-the-badge&logo=typescript&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-8-646CFF?style=for-the-badge&logo=vite&logoColor=white) 

---

## ✨ Features

- 🤖 **AI-Powered Tutoring** — Uses Google Gemini 2.5 Flash for fast, intelligent responses
- 💬 **Real-Time Streaming** — Responses stream in word-by-word for a natural chat experience 
- 🌗 **Dark / Light Mode** — Toggle between themes with a smooth transition
- 📝 **Markdown Support** — AI responses render with rich formatting (bold, lists, code blocks)
- ⚡ **Smooth Animations** — Framer Motion-powered chat bubbles and UI transitions
- 📱 **Responsive Design** — Works seamlessly on desktop and mobile

---

## 🛠️ Tech Stack

| Layer       | Technology                                                       |
| ----------- | ---------------------------------------------------------------- |
| **Frontend** | React 19, TypeScript                                            |
| **Styling**  | Tailwind CSS 4                                                  |
| **AI Model** | Google Gemini 2.5 Flash via `@google/generative-ai`             |
| **Build**    | Vite 8                                                          |
| **UI/UX**    | Framer Motion, Lucide Icons, React Markdown                     |

---

## 🚀 Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (v18 or higher)
- A free [Google AI Studio](https://aistudio.google.com/) API Key

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/your-username/study-buddy-bot.git
   cd study-buddy-bot
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up your environment variables**

   Create a `.env` file in the project root:
   ```env
   VITE_GEMINI_API_KEY=your_gemini_api_key_here
   ```
   > You can get a free API key from [Google AI Studio](https://aistudio.google.com/).

4. **Start the development server**
   ```bash
   npm run dev
   ```

5. Open [http://localhost:5173](http://localhost:5173) in your browser 🎉

---

## 📁 Project Structure

```
study-buddy-bot/
├── public/                  # Static assets
├── src/
│   ├── components/
│   │   ├── ChatBubble.tsx       # Individual chat message bubble
│   │   ├── MessageInput.tsx     # Chat input with send button
│   │   ├── Sidebar.tsx          # Sidebar with new session button
│   │   ├── ThemeToggle.tsx      # Dark/Light mode toggle
│   │   └── TypingIndicator.tsx  # Animated typing dots
│   ├── context/
│   │   └── ThemeContext.tsx      # Theme state management
│   ├── services/
│   │   └── gemini.ts            # Gemini AI API integration
│   ├── App.tsx                  # Main application component
│   ├── App.css                  # App-level styles
│   ├── index.css                # Global styles & Tailwind config
│   └── main.tsx                 # Application entry point
├── .env                         # Environment variable template
├── index.html               # HTML entry point
├── package.json
├── tsconfig.json 
└── vite.config.ts
```

---

## 📜 Available Scripts

| Command          | Description                        |
| ---------------- | ---------------------------------- |
| `npm run dev`    | Start the development server       |
| `npm run build`  | Build for production               |
| `npm run preview`| Preview the production build       |
| `npm run lint`   | Run ESLint for code quality checks |



