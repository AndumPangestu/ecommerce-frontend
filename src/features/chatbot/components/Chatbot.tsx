import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import { useNavigate } from "react-router-dom";
import { useLocalizedPath } from "@/shared/i18n/LanguageContext";
import { useChatbot } from "@/features/chatbot/context/ChatbotContext";
import ChatbotProductCard from "./ChatbotProductCard";
import ChatbotProductComparison from "./ChatbotProductComparison";
import { useChatHistory } from "../hooks/useChatHistory";
import { useSendMessage } from "../hooks/useSendMessage";
import { Product } from "@/features/product/types/product.type";

interface Message {
  id: string;
  text?: string;
  sender: "user" | "bot";
  timestamp: Date;
  products?: Product[];
  type?: "text" | "product" | "options" | "comparison";
  options?: { label: string; value: string; icon?: string }[];
}

const Chatbot: React.FC = () => {
  const { isOpen, openChatbot, closeChatbot } = useChatbot();
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      text: "Hi! Welcome to Andelevate Shop ✨\nI'm your personal shopping assistant.",
      sender: "bot",
      timestamp: new Date(),
      type: "text",
    },
    {
      id: "2",
      text: "How can I help you discover your perfect style today?",
      sender: "bot",
      timestamp: new Date(),
      type: "options",
      options: [
        { label: "New Arrivals", value: "Show me new arrivals", icon: "✨" },
        { label: "Sale Items", value: "Show me sale items", icon: "🏷️" },
        { label: "Best Sellers", value: "Show me best sellers", icon: "🔥" },
        { label: "Find Products", value: "Help me find a product", icon: "🔍" },
      ],
    },
  ]);
  const [inputValue, setInputValue] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [unreadCount, setUnreadCount] = useState(0);
  const [showScrollButton, setShowScrollButton] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const messagesContainerRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const navigate = useNavigate();
  const localizedPath = useLocalizedPath();
  const { data: chatHistoryData } = useChatHistory();
  const { mutate: sendMessage } = useSendMessage();

  const scrollToBottom = (smooth = true) => {
    messagesEndRef.current?.scrollIntoView({
      behavior: smooth ? "smooth" : "auto",
    });
  };

  useEffect(() => {
    if (chatHistoryData?.data && chatHistoryData.data.length > 0) {
      const allMessages = chatHistoryData.data.flatMap(
        (session) => session.messages,
      );

      const mappedMessages: Message[] = allMessages.map((msg) => {
        let type: Message["type"] = "text";
        let products: Product[] | undefined = undefined;
        let text = msg.content;

        if (msg.intent === "product_view" && msg.type === "ai") {
          try {
            products = JSON.parse(msg.content);
            type = "product";
            text = undefined;
          } catch (e) {
            console.error("Failed to parse product data", e);
          }
        }

        return {
          id: msg.id.toString(),
          text: text,
          sender: msg.type === "human" ? "user" : "bot",
          timestamp: new Date(msg.createdAt),
          type: type,
          products: products,
        };
      });

      if (mappedMessages.length > 0) {
        setMessages(mappedMessages);
      }
    }
  }, [chatHistoryData]);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height = `${Math.min(textareaRef.current.scrollHeight, 96)}px`;
    }
  }, [inputValue]);

  useEffect(() => {
    const container = messagesContainerRef.current;
    if (!container) return;

    const handleScroll = () => {
      const { scrollTop, scrollHeight, clientHeight } = container;
      const isNearBottom = scrollHeight - scrollTop - clientHeight < 100;
      setShowScrollButton(!isNearBottom);
    };

    container.addEventListener("scroll", handleScroll);
    return () => container.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (isOpen) {
      setUnreadCount(0);
    }
  }, [isOpen]);

  const handleSend = async (text?: string) => {
    if (!text?.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: text,
      sender: "user",
      timestamp: new Date(),
      type: "text",
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputValue("");
    setIsTyping(true);

    sendMessage(
      { message: userMessage.text || "" },
      {
        onSuccess: (response) => {
          let type: Message["type"] = "text";
          let products: Product[] | undefined = undefined;
          let options: Message["options"] | undefined = undefined;

          if (response.intent === "product_discovery" && response.data) {
            type = "product";
            products = response.data;
          }

          if (response.suggestionQuestions) {
            if (type === "text") {
              type = "options";
            }
            options = response.suggestionQuestions.map((q) => ({
              label: q,
              value: q,
            }));
          }

          const botMessage: Message = {
            id: (Date.now() + 1).toString(),
            sender: "bot",
            timestamp: new Date(),
            text: response.message,
            products: products,
            type: type,
            options: options,
          };

          setMessages((prev) => [...prev, botMessage]);
          setIsTyping(false);

          if (!isOpen) {
            setUnreadCount((prev) => prev + 1);
          }
        },
        onError: () => {
          setIsTyping(false);
          const errorMessage: Message = {
            id: (Date.now() + 1).toString(),
            sender: "bot",
            timestamp: new Date(),
            text: "Sorry, I'm having trouble connecting right now. Please try again later.",
            type: "text",
          };
          setMessages((prev) => [...prev, errorMessage]);
        },
      },
    );
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const quickReplies = [
    { id: 1, text: "Show me winter jackets", icon: "🧥" },
    { id: 2, text: "What's on sale?", icon: "🏷️" },
    { id: 3, text: "Under Rp 500K", icon: "💰" },
    { id: 4, text: "Compare products", icon: "⚖️" },
  ];

  const handleQuickReply = (text: string) => {
    handleSend(text);
  };

  const handleViewProductDetails = (product: Product) => {
    // We don't close the chatbot here, allowing it to persist across navigation
    // The user can manually close it if they wish
    navigate(localizedPath(`/product/${product.id}`));
  };

  return (
    <div
      className={cn(
        "fixed bottom-6 right-6 z-50",
        isOpen ? "sm:bottom-6 sm:right-6" : "",
      )}
    >
      <AnimatePresence>
        {isOpen ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 20 }}
            transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
            className="fixed inset-0 sm:inset-auto sm:static w-full h-full sm:w-[420px] sm:h-[600px] bg-gray-50 dark:bg-gray-900 sm:rounded-3xl shadow-2xl flex flex-col overflow-hidden"
          >
            {/* Header */}
            <div className="bg-primary p-4 flex items-center justify-between relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-r from-primary via-primary/90 to-primary opacity-50"></div>

              <div className="flex items-center gap-3 relative z-10">
                <motion.div
                  animate={{ rotate: [0, 14, -8, 14, -4, 10, 0] }}
                  transition={{
                    duration: 2.5,
                    ease: "easeInOut",
                    repeat: Infinity,
                    repeatDelay: 1,
                  }}
                  style={{ originX: 0.7, originY: 0.7 }}
                >
                  <svg
                    className="w-8 h-8 text-white"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1.5}
                      d="M7 11.5V14m0-2.5v-6a1.5 1.5 0 113 0m-3 6a1.5 1.5 0 00-3 0v2a7.5 7.5 0 0015 0v-5a1.5 1.5 0 00-3 0m-6-3V11m0-5.5v-1a1.5 1.5 0 013 0v1m0 0V11m0-5.5a1.5 1.5 0 013 0v3m0 0V11"
                    />
                  </svg>
                </motion.div>
                <div>
                  <p className="text-white font-semibold text-sm">
                    Andelevate Assistant
                  </p>
                  <p className="text-white/80 text-xs">Ready to help</p>
                </div>
              </div>
              <motion.button
                onClick={() => closeChatbot()}
                className="text-white hover:bg-white/20 rounded-full p-1.5 transition-colors relative z-10"
                whileHover={{ scale: 1.1, rotate: 90 }}
                whileTap={{ scale: 0.9 }}
              >
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </motion.button>
            </div>

            {/* Messages */}
            <div
              ref={messagesContainerRef}
              className="flex-1 overflow-y-auto p-4 space-y-4 custom-scrollbar relative"
            >
              {messages.map((message, index) => (
                <motion.div
                  key={message.id}
                  initial={{ opacity: 0, y: 10, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  transition={{ duration: 0.3, delay: index * 0.05 }}
                  className={`flex ${message.sender === "user" ? "justify-end" : "justify-start"}`}
                >
                  {message.type === "product" && message.products ? (
                    <div className="w-full space-y-3">
                      {message.text && (
                        <motion.div
                          whileHover={{ scale: 1.02 }}
                          className="max-w-[85%] bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-200 rounded-2xl rounded-bl-sm px-4 py-2.5 shadow-sm"
                        >
                          <p className="text-sm leading-relaxed">
                            {message.text}
                          </p>
                        </motion.div>
                      )}
                      <div className="grid grid-cols-1 gap-3">
                        {message.products.map((product) => (
                          <ChatbotProductCard
                            key={product.id}
                            product={product}
                            onViewDetails={handleViewProductDetails}
                          />
                        ))}
                      </div>
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="flex items-center gap-2 text-xs text-gray-400 dark:text-gray-500 pl-2"
                      >
                        <p>
                          {message.timestamp.toLocaleTimeString([], {
                            hour: "2-digit",
                            minute: "2-digit",
                          })}
                        </p>
                      </motion.div>
                    </div>
                  ) : message.type === "options" && message.options ? (
                    <div className="w-full space-y-3">
                      {message.text && (
                        <motion.div
                          whileHover={{ scale: 1.02 }}
                          className="max-w-[85%] bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-200 rounded-2xl rounded-bl-sm px-4 py-2.5 shadow-sm"
                        >
                          <p className="text-sm leading-relaxed">
                            {message.text}
                          </p>
                        </motion.div>
                      )}
                      <div className="flex flex-wrap gap-2">
                        {message.options.map((option, idx) => (
                          <motion.button
                            key={idx}
                            onClick={() => handleQuickReply(option.value)}
                            className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 hover:border-primary dark:hover:border-primary text-gray-700 dark:text-gray-300 text-sm px-4 py-2.5 rounded-xl shadow-sm hover:shadow-md transition-all flex items-center gap-2"
                            whileHover={{ scale: 1.05, y: -2 }}
                            whileTap={{ scale: 0.95 }}
                          >
                            <span>{option.icon}</span>
                            <span className="font-medium">{option.label}</span>
                          </motion.button>
                        ))}
                      </div>
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="flex items-center gap-2 text-xs text-gray-400 dark:text-gray-500 pl-2"
                      >
                        <p>
                          {message.timestamp.toLocaleTimeString([], {
                            hour: "2-digit",
                            minute: "2-digit",
                          })}
                        </p>
                      </motion.div>
                    </div>
                  ) : message.type === "comparison" && message.products ? (
                    <div className="w-full space-y-3">
                      {message.text && (
                        <motion.div
                          whileHover={{ scale: 1.02 }}
                          className="max-w-[85%] bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-200 rounded-2xl rounded-bl-sm px-4 py-2.5 shadow-sm"
                        >
                          <p className="text-sm leading-relaxed">
                            {message.text}
                          </p>
                        </motion.div>
                      )}
                      <ChatbotProductComparison
                        products={message.products}
                        onViewDetails={handleViewProductDetails}
                      />
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="flex items-center gap-2 text-xs text-gray-400 dark:text-gray-500 pl-2"
                      >
                        <p>
                          {message.timestamp.toLocaleTimeString([], {
                            hour: "2-digit",
                            minute: "2-digit",
                          })}
                        </p>
                      </motion.div>
                    </div>
                  ) : (
                    <motion.div
                      whileHover={{ scale: 1.02 }}
                      className={`max-w-[75%] rounded-2xl px-4 py-2.5 ${
                        message.sender === "user"
                          ? "bg-primary text-white rounded-br-sm shadow-md"
                          : "bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-200 rounded-bl-sm shadow-sm"
                      }`}
                    >
                      <p className="text-sm leading-relaxed whitespace-pre-wrap break-words">
                        {message.text}
                      </p>
                      <p
                        className={`text-xs mt-1 ${
                          message.sender === "user"
                            ? "text-white/60"
                            : "text-gray-400 dark:text-gray-500"
                        }`}
                      >
                        {message.timestamp.toLocaleTimeString([], {
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </p>
                    </motion.div>
                  )}
                </motion.div>
              ))}

              {isTyping && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex justify-start"
                >
                  <div className="bg-gray-100 dark:bg-gray-800 rounded-2xl rounded-bl-sm px-4 py-3 flex items-center gap-1 shadow-sm">
                    <motion.div
                      className="w-2 h-2 bg-gray-400 rounded-full"
                      animate={{ y: [0, -5, 0] }}
                      transition={{ duration: 0.6, repeat: Infinity, delay: 0 }}
                    ></motion.div>
                    <motion.div
                      className="w-2 h-2 bg-gray-400 rounded-full"
                      animate={{ y: [0, -5, 0] }}
                      transition={{
                        duration: 0.6,
                        repeat: Infinity,
                        delay: 0.2,
                      }}
                    ></motion.div>
                    <motion.div
                      className="w-2 h-2 bg-gray-400 rounded-full"
                      animate={{ y: [0, -5, 0] }}
                      transition={{
                        duration: 0.6,
                        repeat: Infinity,
                        delay: 0.4,
                      }}
                    ></motion.div>
                  </div>
                </motion.div>
              )}

              <div ref={messagesEndRef} />

              <AnimatePresence>
                {showScrollButton && (
                  <motion.button
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0 }}
                    onClick={() => scrollToBottom()}
                    className="sticky bottom-4 left-1/2 -translate-x-1/2 bg-primary text-white rounded-full p-2 shadow-lg hover:shadow-xl transition-shadow z-10"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <svg
                      className="w-5 h-5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M19 14l-7 7m0 0l-7-7m7 7V3"
                      />
                    </svg>
                  </motion.button>
                )}
              </AnimatePresence>
            </div>

            {/* Quick Replies */}
            {!isTyping && messages.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="px-4 pb-2 flex gap-2 overflow-x-auto scrollbar-none"
              >
                {quickReplies.map((reply) => (
                  <motion.button
                    key={reply.id}
                    onClick={() => handleQuickReply(reply.text)}
                    className="flex-shrink-0 px-4 py-2 bg-white dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full text-xs text-gray-700 dark:text-gray-300 transition-colors flex items-center gap-2 border border-gray-200 dark:border-gray-700 shadow-sm"
                    whileHover={{ scale: 1.05, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <span>{reply.icon}</span>
                    <span className="font-medium">{reply.text}</span>
                  </motion.button>
                ))}
              </motion.div>
            )}

            {/* Input */}
            <div className="p-4 border-t border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900">
              <div className="flex items-end gap-2">
                <div className="flex-1 bg-gray-50 dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 focus-within:border-primary dark:focus-within:border-primary focus-within:ring-2 focus-within:ring-primary/20 transition-all">
                  <textarea
                    ref={textareaRef}
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    onKeyDown={handleKeyDown}
                    placeholder="Ask about products..."
                    rows={1}
                    className="w-full px-4 py-3 bg-transparent text-gray-800 dark:text-gray-200 text-sm resize-none outline-none placeholder-gray-400 dark:placeholder-gray-500 max-h-24"
                  />
                </div>
                <motion.button
                  onClick={() => handleSend(inputValue)}
                  disabled={!inputValue.trim()}
                  className={`p-3 rounded-2xl transition-all ${
                    inputValue.trim()
                      ? "bg-primary hover:shadow-lg text-white"
                      : "bg-gray-200 dark:bg-gray-800 text-gray-400 cursor-not-allowed"
                  }`}
                  whileHover={inputValue.trim() ? { scale: 1.05 } : {}}
                  whileTap={inputValue.trim() ? { scale: 0.95 } : {}}
                >
                  <motion.svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    initial={{ rotate: 90 }}
                    animate={
                      inputValue.trim()
                        ? { rotate: [90, 75, 90] }
                        : { rotate: 90 }
                    }
                    transition={{ duration: 0.3 }}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
                    />
                  </motion.svg>
                </motion.button>
              </div>
              <p className="text-xs text-gray-400 dark:text-gray-500 mt-2 text-center">
                Press Enter to send • Shift+Enter for new line
              </p>
            </div>
          </motion.div>
        ) : (
          <motion.button
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            exit={{ scale: 0 }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => openChatbot()}
            className="relative w-16 h-16 bg-primary rounded-full shadow-2xl flex items-center justify-center text-white hover:shadow-primary/50 transition-shadow group"
          >
            <motion.div
              className="absolute inset-0 rounded-full bg-primary"
              animate={{ scale: [1, 1.2, 1], opacity: [0.5, 0, 0.5] }}
              transition={{ duration: 2, repeat: Infinity }}
            ></motion.div>

            <AnimatePresence>
              {unreadCount > 0 && (
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  exit={{ scale: 0 }}
                  className="absolute -top-1 -right-1 w-6 h-6 bg-red-500 rounded-full flex items-center justify-center text-white text-xs font-bold shadow-lg"
                >
                  {unreadCount}
                </motion.div>
              )}
            </AnimatePresence>

            <motion.svg
              className="w-8 h-8 relative z-10"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              animate={{ rotate: [0, 10, -10, 0] }}
              transition={{ duration: 0.5, repeat: Infinity, repeatDelay: 3 }}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
              />
            </motion.svg>

            <motion.div
              initial={{ opacity: 0, x: 10 }}
              whileHover={{ opacity: 1, x: 0 }}
              className="absolute right-full mr-3 px-3 py-1.5 bg-gray-900 text-white text-sm rounded-lg whitespace-nowrap pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity"
            >
              Need help shopping?
              <div className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-full w-2 h-2 bg-gray-900 rotate-45"></div>
            </motion.div>
          </motion.button>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Chatbot;
