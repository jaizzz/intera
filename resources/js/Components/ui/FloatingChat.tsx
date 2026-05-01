import { useState, useRef, useEffect } from "react";
import axios from "axios";
import ReactMarkdown from "react-markdown";
import { HiOutlineChatBubbleOvalLeftEllipsis, HiXMark } from "react-icons/hi2";
import { IoSend } from "react-icons/io5";

type ChatMessage = {
    role: "user" | "ai";
    text: string;
};

type FloatingChatProps = {
    isAuthenticated: boolean;
};

function TypingIndicator() {
    return (
        <div className="flex items-center space-x-1 px-3 py-2">
            <span className="w-1 h-1 bg-gray-400 rounded-full animate-bounce [animation-delay:-0.3s]" />
            <span className="w-1 h-1 bg-gray-400 rounded-full animate-bounce [animation-delay:-0.15s]" />
            <span className="w-1 h-1 bg-gray-400 rounded-full animate-bounce" />
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

    // Initial load and expiration check
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
                        text: "Halo 👋 Saya Intera, asisten wisata internasional untuk Indonesia dan Jepang.",
                    },
                ]);
            } else {
                setMessages(savedMessages);
            }
        } else {
            setMessages([
                {
                    role: "ai",
                    text: "Halo 👋 Saya Intera, asisten wisata internasional untuk Indonesia dan Jepang.",
                },
            ]);
        }
    }, []);

    // Save to localStorage when messages change
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

    // Background check for expiration
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
                            text: "Halo 👋 Saya Intera, asisten wisata internasional untuk Indonesia dan Jepang.",
                        },
                    ]);
                }
            }
        }, 30000); // Check every 30 seconds

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
                    text: "Maaf, terjadi kesalahan saat memproses pertanyaan.",
                },
            ]);
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            {/* Floating Button */}
            <button
                onClick={() => setIsChatOpen(!isChatOpen)}
                className="fixed bottom-6 right-4 lg:right-12 z-50 w-14 h-14 rounded-full bg-primary text-white shadow-lg flex items-center justify-center hover:bg-primary/90 transition"
            >
                {isChatOpen ? (
                    <HiXMark size={28} />
                ) : (
                    <HiOutlineChatBubbleOvalLeftEllipsis size={28} />
                )}
            </button>

            {/* Chat Window */}
            <div
                className={`
                    fixed bottom-22 right-6 lg:right-12 z-50 
                    w-80 xsm:w-90 h-130 max-h-[calc(100vh-210px)] 
                    bg-white dark:bg-zinc-800 rounded-xl shadow-xl 
                    flex flex-col origin-bottom-right 
                    transition-all duration-300 ease-in-out
                    ${isChatOpen 
                        ? "opacity-100 scale-100 translate-y-0 pointer-events-auto visible" 
                        : "opacity-0 scale-95 translate-y-10 pointer-events-none invisible"
                    }
                `}
            >
                {/* Header */}
                <div className="flex items-center justify-between px-4 py-3 border-b dark:border-zinc-700">
                    <h2 className="text-sm font-semibold">Intera</h2>
                    <button
                        onClick={() => setIsChatOpen(false)}
                        className="text-gray-500 hover:text-gray-700"
                    >
                        ✕
                    </button>
                </div>

                {/* Messages */}
                <div className="flex-1 p-4 space-y-3 overflow-y-auto">
                    {messages.map((msg, index) => (
                        <div
                            key={index}
                            className={`flex ${
                                msg.role === "user"
                                    ? "justify-end"
                                    : "justify-start"
                            }`}
                        >
                            <div
                                className={`max-w-[80%] rounded-lg px-3 py-2 text-sm
                                    ${
                                        msg.role === "user"
                                            ? "bg-primary text-white"
                                            : "bg-gray-200 dark:bg-zinc-700 text-gray-800 dark:text-gray-100"
                                    }`}
                            >
                                <ReactMarkdown>{msg.text}</ReactMarkdown>
                            </div>
                        </div>
                    ))}

                    {loading && (
                        <div className="text-xs text-gray-500">
                            <TypingIndicator />
                        </div>
                    )}

                    <div ref={messagesEndRef} />
                </div>

                {/* Input */}
                <div className="border-t dark:border-zinc-700 p-3">
                    <div className="flex gap-2 items-end">
                        {/* Textarea */}
                        <textarea
                            ref={textareaRef}
                            value={input}
                            rows={1}
                            onChange={(e) => {
                                setInput(e.target.value);

                                const el = textareaRef.current;
                                if (el) {
                                    el.style.height = "auto";
                                    el.style.height =
                                        Math.min(el.scrollHeight, 120) +
                                        "px";
                                }
                            }}
                            onKeyDown={(e) => {
                                if (e.key === "Enter" && !e.shiftKey) {
                                    e.preventDefault();
                                    sendMessage();
                                }
                            }}
                            placeholder={
                                isAuthenticated
                                    ? "Tulis pertanyaan..."
                                    : "Login untuk mulai bertanya..."
                            }
                            disabled={!isAuthenticated || loading}
                            className="
                                flex-1
                                resize-none
                                rounded-lg
                                border
                                px-3 py-2
                                text-xs
                                leading-relaxed
                                max-h-30
                                overflow-auto

                                focus:outline-none
                                focus:ring-0
                                focus:border-gray-300

                                dark:bg-zinc-700
                                dark:text-white
                                dark:border-zinc-600
                                scrollbar-none
                            "
                        />

                        {/* Send Button */}
                        <button
                            onClick={sendMessage}
                            disabled={!isAuthenticated || loading}
                            className="
                                h-10 w-10
                                flex items-center justify-center
                                rounded-lg
                                bg-primary
                                hover:bg-primary/90
                                text-white
                                disabled:opacity-50
                                shrink-0
                            "
                        >
                            <IoSend size={18} />
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
}
