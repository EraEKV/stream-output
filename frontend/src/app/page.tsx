"use client"

import { useEffect, useState } from 'react';
import Message from './components/Message';
import useWebSocket from '@/lib/hooks/useWebsocket';

interface MessageData {
  sender: string;
  text: string;
}

export default function Home() {
  const { messages, sendMessage } = useWebSocket('ws://localhost:5000');
  const [prompt, setPrompt] = useState<string>('');
  const [userMessage, setUserMessage] = useState<string | null>(null);

  const handleSend = () => {
    if (prompt.trim() !== '') {
      sendMessage(prompt);
      setUserMessage(prompt); // Устанавливаем сообщение пользователя как текущее
      setPrompt('');
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSend();
    }
  };

  useEffect(() => {
    if (messages.length > 0) {
      const newMessage = messages[messages.length - 1] as unknown as MessageData;
      setUserMessage(newMessage.text); // Устанавливаем последнее сообщение от сервера как текущее
      setPrompt('');
    }
    console.log(messages)
  }, [messages]);

  return (
    <div className="flex flex-col h-screen font-mono">
      {/* Header обрезан */}
      <div className="flex-1 overflow-auto p-6">
        <div className="space-y-4">
          {/* Выводим сообщение пользователя */}
          {userMessage && <Message key={`user`} sender={"me"} text={userMessage} />}
          {/* Выводим сообщение от сервера */}
          {messages.length > 0 && <Message key={`server`} sender={"AI"} text={messages[messages.length - 1]} />}
        </div>
      </div>
      <div className="bg-background border-t px-6 py-4 flex items-center gap-2">
        <input 
          type="text"
          value={prompt}
          placeholder="Type your message..." 
          onChange={(e) => setPrompt(e.target.value)}
          onKeyPress={handleKeyPress}
          className="flex-1 resize-none rounded-lg px-4 py-4 pr-12 text-lg font-mono border-2 border-gray-300" 
        />
        <button
          onClick={handleSend}
          className="bg-primary-foreground text-black px-4 py-2 rounded-lg hover:bg-primary-hover transition-colors duration-200"
        >
          Send
        </button>
      </div>
    </div>
  );
}
