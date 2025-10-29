import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageSquare, X, Send, User, Bot } from 'lucide-react';
import { GoogleGenAI, Chat } from '@google/genai';
import { personalInfo, skills, experiences, projects } from '../constants';

interface Message {
    text: string;
    sender: 'user' | 'bot';
}

const Chatbot: React.FC = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState<Message[]>([
        { sender: 'bot', text: "Hello! I'm Sathish's AI assistant. Ask me anything about his skills, projects, or experience." }
    ]);
    const [input, setInput] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [chat, setChat] = useState<Chat | null>(null);
    const messagesEndRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const initChat = async () => {
            if (!process.env.API_KEY) {
                console.error("API Key is not configured.");
                setMessages(prev => [...prev, { sender: 'bot', text: "Sorry, the AI assistant is not configured correctly." }]);
                return;
            }
            try {
                const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

                // Create a string with all portfolio info
                const portfolioContext = `
                    Sathish's Summary: ${personalInfo.summary}.
                    Sathish's Skills: ${skills.map(s => `${s.category}: ${s.items.join(', ')}`).join('; ')}.
                    Sathish's Work Experience: ${experiences.map(e => `${e.role} at ${e.company}: ${e.description.join(' ')}`).join('; ')}.
                    Sathish's Projects: ${projects.map(p => `${p.title}: ${p.description}`).join('; ')}.
                `;

                const newChat = ai.chats.create({
                    model: 'gemini-2.5-flash',
                    config: {
                        systemInstruction: `You are Sathish M.'s personal AI assistant, a friendly and enthusiastic guide to his professional portfolio. Your mission is to provide clear, helpful, and engaging answers about his skills, projects, and work experience.

Here's how to interact:
- **Be Conversational:** Chat like a knowledgeable colleague, not a robot. Use a positive and professional tone.
- **Stay Focused:** Your expertise is Sathish. All your answers must be based strictly on the provided CONTEXT.
- **Handle Irrelevant Questions Gracefully:** If asked about something unrelated to Sathish's portfolio (like the weather or general knowledge), politely steer the conversation back. For example, say: 'That's a great question! However, my expertise is focused on Sathish's work. Can I tell you about his AI projects or his full-stack development skills instead?'
- **Be Proactive:** If a user asks about a skill, you could mention a project where he used that skill.
- **Keep it Clear & Concise:** Provide direct answers without being overly verbose.

Use the following information as your single source of truth.
CONTEXT: ${portfolioContext}`,
                    },
                });
                setChat(newChat);
            } catch (error) {
                console.error("Failed to initialize chat:", error);
                setMessages(prev => [...prev, { sender: 'bot', text: "Sorry, I'm having trouble connecting right now." }]);
            }
        };
        initChat();
    }, []);

    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages]);

    const handleSend = async () => {
        if (!input.trim() || isLoading || !chat) return;

        const userMessage: Message = { sender: 'user', text: input };
        setMessages(prev => [...prev, userMessage]);
        setInput('');
        setIsLoading(true);

        try {
            const response = await chat.sendMessage({ message: input });
            const botMessage: Message = { sender: 'bot', text: response.text };
            setMessages(prev => [...prev, botMessage]);
        } catch (error) {
            console.error("Chat error:", error);
            const errorMessage: Message = { sender: 'bot', text: "Sorry, something went wrong. Please try again." };
            setMessages(prev => [...prev, errorMessage]);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <>
            <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => setIsOpen(true)}
                className="fixed bottom-8 right-8 z-[60] bg-primary text-white p-4 rounded-full shadow-xl"
                aria-label="Open chat"
            >
                <MessageSquare size={24} />
            </motion.button>

            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: 50 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 50 }}
                        className="fixed bottom-24 right-8 z-[70] w-full max-w-sm h-[60vh] bg-light-surface dark:bg-surface rounded-xl shadow-2xl flex flex-col overflow-hidden border border-primary/20"
                    >
                        {/* Header */}
                        <div className="flex justify-between items-center p-4 border-b border-primary/20">
                            <h3 className="font-bold text-lg">AI Assistant</h3>
                            <button onClick={() => setIsOpen(false)} className="p-1 hover:bg-light-background dark:hover:bg-background rounded-full">
                                <X size={20} />
                            </button>
                        </div>

                        {/* Messages */}
                        <div className="flex-1 p-4 overflow-y-auto space-y-4">
                            {messages.map((msg, index) => (
                                <div key={index} className={`flex items-start gap-3 ${msg.sender === 'user' ? 'justify-end' : ''}`}>
                                    {msg.sender === 'bot' && <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center flex-shrink-0 text-white"><Bot size={20} /></div>}
                                    <div className={`max-w-xs px-4 py-2 rounded-xl ${msg.sender === 'user' ? 'bg-primary text-white rounded-br-none' : 'bg-light-background dark:bg-background rounded-bl-none'}`}>
                                        <p className="text-sm">{msg.text}</p>
                                    </div>
                                    {msg.sender === 'user' && <div className="w-8 h-8 rounded-full bg-secondary flex items-center justify-center flex-shrink-0 text-white"><User size={20} /></div>}
                                </div>
                            ))}
                            {isLoading && (
                                <div className="flex items-start gap-3">
                                    <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center flex-shrink-0 text-white"><Bot size={20} /></div>
                                    <div className="max-w-xs px-4 py-2 rounded-xl bg-light-background dark:bg-background rounded-bl-none">
                                        <div className="flex items-center gap-1.5">
                                            <span className="h-2 w-2 bg-primary rounded-full animate-bounce [animation-delay:-0.3s]"></span>
                                            <span className="h-2 w-2 bg-primary rounded-full animate-bounce [animation-delay:-0.15s]"></span>
                                            <span className="h-2 w-2 bg-primary rounded-full animate-bounce"></span>
                                        </div>
                                    </div>
                                </div>
                            )}
                            <div ref={messagesEndRef} />
                        </div>

                        {/* Input */}
                        <div className="p-4 border-t border-primary/20">
                            <form onSubmit={(e) => { e.preventDefault(); handleSend(); }} className="flex items-center gap-2">
                                <input
                                    type="text"
                                    value={input}
                                    onChange={(e) => setInput(e.target.value)}
                                    placeholder="Ask a question..."
                                    className="flex-1 px-4 py-2 bg-light-background dark:bg-background rounded-full border border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-primary focus:outline-none"
                                />
                                <button type="submit" disabled={isLoading || !input.trim()} className="p-3 bg-primary text-white rounded-full disabled:bg-gray-400">
                                    <Send size={18} />
                                </button>
                            </form>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
};

export default Chatbot;