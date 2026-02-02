import React from "react";
import ReactMarkdown from "react-markdown";

interface ChatbotMessageContentProps {
  content: string;
}

const ChatbotMessageContent: React.FC<ChatbotMessageContentProps> = ({
  content,
}) => {
  return (
    <div className="text-sm leading-relaxed break-words">
      <ReactMarkdown
        components={{
          a: ({ node, ...props }) => (
            <a
              {...props}
              target="_blank"
              rel="noopener noreferrer"
              className="underline font-medium hover:opacity-80"
            />
          ),
          ul: ({ node, ...props }) => (
            <ul {...props} className="list-disc pl-4 my-2" />
          ),
          ol: ({ node, ...props }) => (
            <ol {...props} className="list-decimal pl-4 my-2" />
          ),
          li: ({ node, ...props }) => <li {...props} className="my-1" />,
          p: ({ node, ...props }) => (
            <p {...props} className="my-1 last:mb-0 first:mt-0" />
          ),
          strong: ({ node, ...props }) => (
            <strong {...props} className="font-semibold" />
          ),
          h1: ({ node, ...props }) => (
            <h1 {...props} className="text-lg font-bold my-2" />
          ),
          h2: ({ node, ...props }) => (
            <h2 {...props} className="text-base font-bold my-2" />
          ),
          h3: ({ node, ...props }) => (
            <h3 {...props} className="text-sm font-bold my-2" />
          ),
        }}
      >
        {content || ""}
      </ReactMarkdown>
    </div>
  );
};

export default ChatbotMessageContent;
