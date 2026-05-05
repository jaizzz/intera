import { useState, useRef, useEffect } from "react";
import axios from "axios";
import ReactMarkdown from "react-markdown";
import { motion, AnimatePresence } from "framer-motion";
import { HiOutlineChatBubbleOvalLeftEllipsis, HiXMark } from "react-icons/hi2";
import { IoSend } from "react-icons/io5";
import { RiRobot2Fill, RiUser3Line } from "react-icons/ri";

type ChatMessage = {
    role: "user" | "ai";
    text: string;
};

type FloatingChatProps = {
    isAuthenticated: boolean;
};

function TypingIndicator() {
    return (
        <div className="flex items-center space-x-1 px-3 py-2 bg-gray-100 dark:bg-zinc-800 rounded-2xl w-max">
            <motion.span 
                animate={{ y: [0, -5, 0] }}
                transition={{ duration: 0.6, repeat: Infinity, delay: 0 }}
                className="w-1.5 h-1.5 bg-gray-400 rounded-full" 
            />
            <motion.span 
                animate={{ y: [0, -5, 0] }}
                transition={{ duration: 0.6, repeat: Infinity, delay: 0.15 }}
                className="w-1.5 h-1.5 bg-gray-400 rounded-full" 
            />
            <motion.span 
                animate={{ y: [0, -5, 0] }}
                transition={{ duration: 0.6, repeat: Infinity, delay: 0.3 }}
                className="w-1.5 h-1.5 bg-gray-400 rounded-full" 
            />
        </div>
    );
}

export default function FloatingChat({ isAuthenticated }: FloatingChatProps) {
    const STORAGE_KEY = "intera_chat_history";
    const EXPIRATION_TIME = 10 * 60 * 1000;

    const [isChatOpen, setIsChatOpen] = useState(false);
    const [messages, setMessages] = useState<ChatMessage[]>([]);
    const [input, setInput] = useState("");
    const [loading, setLoading] = useState(false);

    const messagesEndRef = useRef<HTMLDivElement>(null);
    const textareaRef = useRef<HTMLTextAreaElement>(null);

    useEffect(() => {
        const savedData = localStorage.getItem(STORAGE_KEY);
        if (savedData) {
            const { messages: savedMessages, timestamp } = JSON.parse(savedData);
            const isExpired = Date.now() - timestamp > EXPIRATION_TIME;

            if (isExpired) {
                localStorage.removeItem(STORAGE_KEY);
                setMessages([
                    {
                        role: "ai",
                        text: "Halo 👋 Saya Intera, asisten wisata internasional untuk Indonesia dan Jepang. Ada yang bisa saya bantu?",
                    },
                ]);
            } else {
                setMessages(savedMessages);
            }
        } else {
            setMessages([
                {
                    role: "ai",
                    text: "Halo 👋 Saya Intera, asisten wisata internasional untuk Indonesia dan Jepang. Ada yang bisa saya bantu?",
                },
            ]);
        }
    }, []);

    useEffect(() => {
        if (messages.length > 0) {
            localStorage.setItem(
                STORAGE_KEY,
                JSON.stringify({
                    messages,
                    timestamp: Date.now(),
                })
            );
        }
    }, [messages]);

    useEffect(() => {
        const interval = setInterval(() => {
            const savedData = localStorage.getItem(STORAGE_KEY);
            if (savedData) {
                const { timestamp } = JSON.parse(savedData);
                if (Date.now() - timestamp > EXPIRATION_TIME) {
                    localStorage.removeItem(STORAGE_KEY);
                    setMessages([
                        {
                            role: "ai",
                            text: "Halo 👋 Saya Intera, asisten wisata internasional untuk Indonesia dan Jepang. Ada yang bisa saya bantu?",
                        },
                    ]);
                }
            }
        }, 30000);

        return () => clearInterval(interval);
    }, []);

    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages, loading]);

    const sendMessage = async () => {
        if (!input.trim() || loading || !isAuthenticated) return;

        const userMessage = input;
        setInput("");
        setLoading(true);

        if (textareaRef.current) {
            textareaRef.current.style.height = "auto";
        }

        setMessages((prev) => [...prev, { role: "user", text: userMessage }]);

        try {
            const response = await axios.post("/api/chat", {
                message: userMessage,
            });

            setMessages((prev) => [
                ...prev,
                { role: "ai", text: response.data.reply },
            ]);
        } catch {
            setMessages((prev) => [
                ...prev,
                {
                    role: "ai",
                    text: "Maaf, terjadi kesalahan saat memproses pertanyaan. Mohon coba lagi nanti.",
                },
            ]);
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            {/* Floating Button */}
            <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setIsChatOpen(!isChatOpen)}
                className="fixed bottom-6 right-4 lg:right-12 z-50 w-16 h-16 rounded-full bg-primary text-white shadow-2xl flex items-center justify-center transition-colors group overflow-hidden"
            >
                <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity" />
                <AnimatePresence mode="wait">
                    {isChatOpen ? (
                        <motion.div
                            key="close"
                            initial={{ opacity: 0, rotate: -90 }}
                            animate={{ opacity: 1, rotate: 0 }}
                            exit={{ opacity: 0, rotate: 90 }}
                            transition={{ duration: 0.2 }}
                        >
                            <HiXMark size={32} />
                        </motion.div>
                    ) : (
                        <motion.div
                            key="open"
                            initial={{ opacity: 0, scale: 0.5 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.5 }}
                            transition={{ duration: 0.2 }}
                            className="relative"
                        >
                            <HiOutlineChatBubbleOvalLeftEllipsis size={32} />
                            {!isChatOpen && messages.length === 1 && (
                                <span className="absolute -top-1 -right-1 flex h-3 w-3">
                                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-secondary opacity-75"></span>
                                    <span className="relative inline-flex rounded-full h-3 w-3 bg-secondary"></span>
                                </span>
                            )}
                        </motion.div>
                    )}
                </AnimatePresence>
            </motion.button>

            {/* Chat Window */}
            <AnimatePresence>
                {isChatOpen && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9, y: 20, transformOrigin: "bottom right" }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.9, y: 20 }}
                        className="fixed bottom-24 right-6 lg:right-12 z-50 w-85 xsm:w-96 h-[550px] max-h-[calc(100vh-140px)] bg-white/95 dark:bg-zinc-900/95 backdrop-blur-xl rounded-2xl shadow-theme-xl flex flex-col dark:border-zinc-800 overflow-hidden"
                    >
                        {/* Header */}
                        <div className="relative px-5 py-4 bg-primary text-white flex items-center gap-3 shadow-lg">
                            <div className="relative">
                                <div className="w-10 h-10 rounded-xl bg-white/20 flex items-center justify-center backdrop-blur-sm border border-white/30">
                                    <RiRobot2Fill size={22} className="text-white" />
                                </div>
                                <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-green-500 border-2 border-primary rounded-full">
                                    <span className="absolute inset-0 rounded-full bg-green-500 animate-ping opacity-75"></span>
                                </div>
                            </div>
                            <div>
                                <h2 className="text-base font-bold leading-none mb-1">Intera AI</h2>
                                <p className="text-[10px] text-white/80 flex items-center gap-1.5 font-medium uppercase tracking-wider">
                                    Online • Asisten Wisata
                                </p>
                            </div>
                            <button
                                onClick={() => setIsChatOpen(false)}
                                className="ml-auto p-2 hover:bg-white/10 rounded-full transition-colors"
                            >
                                <HiXMark size={20} />
                            </button>
                        </div>

                        {/* Messages Area */}
                        <div className="flex-1 p-4 space-y-4 overflow-y-auto custom-scrollbar bg-gray-50/50 dark:bg-zinc-900/50">
                            {messages.map((msg, index) => (
                                <motion.div
                                    key={index}
                                    initial={{ opacity: 0, y: 10, scale: 0.95 }}
                                    animate={{ opacity: 1, y: 0, scale: 1 }}
                                    transition={{ duration: 0.3, delay: index * 0.05 }}
                                    className={`flex items-end gap-2 ${
                                        msg.role === "user" ? "flex-row-reverse" : "flex-row"
                                    }`}
                                >
                                    {/* Avatar */}
                                    <div className={`shrink-0 w-8 h-8 rounded-lg flex items-center justify-center ${
                                        msg.role === "user" 
                                            ? "bg-secondary/10 text-secondary" 
                                            : "bg-primary/10 text-primary"
                                    }`}>
                                        {msg.role === "user" ? <RiUser3Line size={16} /> : <RiRobot2Fill size={16} />}
                                    </div>

                                    {/* Bubble */}
                                    <div
                                        className={`max-w-[75%] px-4 py-2.5 rounded-2xl text-sm leading-relaxed shadow-sm
                                            ${msg.role === "user"
                                                ? "bg-linear-to-br from-primary to-blue-600 text-white rounded-br-none"
                                                : "bg-white dark:bg-zinc-800 text-gray-800 dark:text-gray-100 rounded-bl-none border border-gray-100 dark:border-zinc-700"
                                            }`}
                                    >
                                        <div className="prose prose-sm dark:prose-invert prose-p:my-0 prose-headings:text-inherit prose-strong:text-inherit max-w-none">
                                            <ReactMarkdown>{msg.text}</ReactMarkdown>
                                        </div>
                                    </div>
                                </motion.div>
                            ))}

                            {loading && (
                                <motion.div 
                                    initial={{ opacity: 0 }} 
                                    animate={{ opacity: 1 }}
                                    className="flex items-center gap-2"
                                >
                                    <div className="shrink-0 w-8 h-8 rounded-lg bg-primary/10 text-primary flex items-center justify-center">
                                        <RiRobot2Fill size={16} />
                                    </div>
                                    <TypingIndicator />
                                </motion.div>
                            )}

                            <div ref={messagesEndRef} />
                        </div>

                        {/* Input Area */}
                        <div className="p-4 bg-white dark:bg-zinc-900 border-t dark:border-zinc-800">
                            {!isAuthenticated ? (
                                <div className="text-center py-2">
                                    <p className="text-xs text-gray-500 mb-2">Silakan login untuk bertanya kepada Intera AI</p>
                                    <a 
                                        href="/login" 
                                        className="text-xs font-semibold text-primary hover:underline"
                                    >
                                        Login Sekarang
                                    </a>
                                </div>
                            ) : (
                                <div className="relative flex items-end gap-2 bg-gray-100 dark:bg-zinc-800 rounded-xl p-2 focus-within:ring-2 focus-within:ring-primary/20 transition-all border border-transparent focus-within:border-primary/30">
                                    <textarea
                                        ref={textareaRef}
                                        value={input}
                                        rows={1}
                                        onChange={(e) => {
                                            setInput(e.target.value);
                                            const el = textareaRef.current;
                                            if (el) {
                                                el.style.height = "auto";
                                                el.style.height = Math.min(el.scrollHeight, 120) + "px";
                                            }
                                        }}
                                        onKeyDown={(e) => {
                                            if (e.key === "Enter" && !e.shiftKey) {
                                                e.preventDefault();
                                                sendMessage();
                                            }
                                        }}
                                        placeholder="Ketik pesan anda di sini..."
                                        disabled={loading}
                                        className="flex-1 resize-none bg-transparent border-none px-2 py-1.5 text-sm focus:border-none focus:outline-none focus:ring-0 dark:text-white placeholder:text-gray-400 dark:placeholder:text-zinc-500 max-h-32 custom-scrollbar"
                                    />

                                    <motion.button
                                        whileHover={{ scale: 1.1 }}
                                        whileTap={{ scale: 0.9 }}
                                        onClick={sendMessage}
                                        disabled={!input.trim() || loading}
                                        className="h-9 w-9 flex items-center justify-center rounded-lg bg-primary text-white shadow-md disabled:opacity-50 disabled:scale-100 transition-all shrink-0"
                                    >
                                        {loading ? (
                                            <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                        ) : (
                                            <IoSend size={16} />
                                        )}
                                    </motion.button>
                                </div>
                            )}
                            <div className="mt-3 text-[10px] text-center text-gray-400 dark:text-zinc-500 flex items-center justify-center gap-1">
                                Powered by <span className="font-semibold text-gray-500 dark:text-zinc-400">Intera AI Core</span>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}
