import React from "react";
import { motion } from "framer-motion";

interface ChatbotOption {
  label: string;
  value: string;
  icon?: string;
}

interface ChatbotOptionsProps {
  options: ChatbotOption[];
  onOptionClick: (value: string) => void;
}

const ChatbotOptions: React.FC<ChatbotOptionsProps> = ({
  options,
  onOptionClick,
}) => {
  if (!options || options.length === 0) return null;

  return (
    <div className="flex flex-wrap gap-2">
      {options.map((option, idx) => (
        <motion.button
          key={idx}
          onClick={() => onOptionClick(option.value)}
          className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 hover:border-primary dark:hover:border-primary text-gray-700 dark:text-gray-300 text-sm px-4 py-2.5 rounded-xl shadow-sm hover:shadow-md transition-all flex items-center gap-2"
          whileHover={{ scale: 1.05, y: -2 }}
          whileTap={{ scale: 0.95 }}
        >
          {option.icon && <span>{option.icon}</span>}
          <span className="font-medium">{option.label}</span>
        </motion.button>
      ))}
    </div>
  );
};

export default ChatbotOptions;
