import React from "react";
import { motion } from "framer-motion";
import { ArrowRight, Tag } from "lucide-react";
import { useLocalizedPath } from "@/shared/i18n/LanguageContext";
import { useNavigate } from "react-router-dom";
import { ChatbotCategory } from "@/features/chatbot/types/chat.type";

interface ChatbotCategoryCardProps {
  category: ChatbotCategory;
}

const ChatbotCategoryCard: React.FC<ChatbotCategoryCardProps> = ({
  category,
}) => {
  const localizedPath = useLocalizedPath();
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(localizedPath("/shop?categoryId=" + category.id));
  };

  return (
    <motion.div
      onClick={handleClick}
      className="bg-white dark:bg-gray-800 p-4 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm cursor-pointer group hover:border-primary dark:hover:border-primary transition-colors relative overflow-hidden"
      whileHover={{ scale: 1.02, y: -2 }}
      whileTap={{ scale: 0.98 }}
    >
      <div className="flex items-start justify-between relative z-10">
        <div className="flex-1">
          <h4 className="font-semibold text-gray-900 dark:text-white mb-1 group-hover:text-primary transition-colors">
            {category.name}
          </h4>
          <p className="text-xs text-gray-500 dark:text-gray-400 line-clamp-2">
            {category.description}
          </p>
        </div>
        <div className="bg-gray-100 dark:bg-gray-700 p-2 rounded-full group-hover:bg-primary group-hover:text-white transition-colors">
          <ArrowRight className="w-4 h-4" />
        </div>
      </div>
    </motion.div>
  );
};

export default ChatbotCategoryCard;
