import React, { useState } from "react";
import { motion } from "framer-motion";
import { Ticket, Check, Info } from "lucide-react";
import { toast } from "@/shared/hooks/use-toast";

export interface Voucher {
  code: string;
  discount: string;
  description: string;
  expiryDate: string;
}

interface ChatbotVoucherCardProps {
  voucher: Voucher;
  onApply: (voucher: Voucher) => void;
}

const ChatbotVoucherCard: React.FC<ChatbotVoucherCardProps> = ({
  voucher,
  onApply,
}) => {
  const [isApplied, setIsApplied] = useState(false);
  const [codeInput, setCodeInput] = useState("");
  const [error, setError] = useState<string | null>(null);

  const handleApply = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (isApplied) return;

    const entered = codeInput.trim().toUpperCase();
    const valid = voucher.code.trim().toUpperCase();

    if (!entered) {
      setError("Please enter a voucher code");
      return;
    }

    if (entered !== valid) {
      setError("Invalid voucher code");
      return;
    }

    setError(null);
    onApply(voucher);
    setIsApplied(true);
    toast({
      title: "Voucher Applied",
      description: `Code ${voucher.code} applied successfully`,
    });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -4 }}
      className="bg-white dark:bg-gray-800 rounded-3xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 cursor-pointer border border-gray-100 dark:border-gray-700 relative group"
    >
      {/* Decorative Circles for Ticket Effect */}
      <div className="absolute -left-3 top-1/2 -translate-y-1/2 w-6 h-6 bg-gray-50 dark:bg-gray-900 rounded-full"></div>
      <div className="absolute -right-3 top-1/2 -translate-y-1/2 w-6 h-6 bg-gray-50 dark:bg-gray-900 rounded-full"></div>

      <div className="p-5 flex flex-col gap-4">
        <div className="text-center pb-2 border-b border-gray-100 dark:border-gray-700 mb-2">
          <h4 className="text-sm font-semibold text-gray-700 dark:text-gray-200">
            Apply Voucher Simulation
          </h4>
        </div>
        {/* Header */}
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary">
              <Ticket className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-gray-900 dark:text-white">
                {voucher.discount}
              </h3>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                Limited Time Offer
              </p>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="space-y-2">
          <p className="text-sm text-gray-600 dark:text-gray-300">
            {voucher.description}
          </p>
          <div className="flex items-center gap-2 text-xs text-gray-400">
            <span>Expires: {voucher.expiryDate}</span>
          </div>
        </div>

        {/* Input Section */}
        <div className="space-y-2">
          <div className="bg-gray-50 dark:bg-gray-900 rounded-xl p-3 border border-gray-200 dark:border-gray-700">
            <label className="text-xs text-gray-500 dark:text-gray-400 block mb-1">
              Enter voucher code
            </label>
            <input
              value={codeInput}
              onChange={(e) => setCodeInput(e.target.value)}
              placeholder={`e.g., ${voucher.code}`}
              className="w-full bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg px-3 py-2 text-sm text-gray-800 dark:text-gray-200 outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary dark:focus:border-primary transition-all"
            />
            {error && (
              <div className="mt-2 flex items-center gap-2 text-xs text-red-600 dark:text-red-500">
                <Info className="w-3.5 h-3.5" />
                <span>{error}</span>
              </div>
            )}
            {!error && !isApplied && (
              <div className="mt-2 flex items-center gap-2 text-xs text-gray-400">
                <Info className="w-3.5 h-3.5" />
                <span>Example: {voucher.code}</span>
              </div>
            )}
          </div>
        </div>

        {/* Action Button */}
        <button
          onClick={handleApply}
          disabled={isApplied}
          className={`w-full py-2.5 rounded-xl font-medium text-sm transition-all flex items-center justify-center gap-2 ${isApplied
            ? "bg-green-500 text-white cursor-default"
            : "bg-primary text-white hover:bg-primary/90 hover:shadow-lg hover:shadow-primary/20"
            }`}
        >
          {isApplied ? (
            <>
              <Check className="w-4 h-4" />
              Applied
            </>
          ) : (
            "Apply Voucher"
          )}
        </button>
      </div>
    </motion.div>
  );
};

export default ChatbotVoucherCard;
