import React from "react";
import { Message } from "@/types/chat";

export const formatTime = (date: string | Date) => {
  return new Date(date).toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });
};

interface Props {
  message: Message;
  loggedInUserId: string;
}

const ChatMessage: React.FC<Props> = ({ message, loggedInUserId }) => {
  const isMine = message.senderId === loggedInUserId;

  return (
    <div className={`flex ${isMine ? "justify-end" : "justify-start"}`}>
      <div className={`relative max-w-xs px-3 py-2 rounded-lg text-sm ${isMine ? "bg-blue-50 text-gray-900 border border-blue-100 rounded-br-none" : "bg-gray-100 text-gray-900 border border-gray-200 rounded-bl-none"}`}>
        {message.type === "TEXT" && <span>{message.content}</span>}
        {message.type === "IMAGE" && <img src={message.mediaUrl} alt="sent image" className="rounded-md" />}
        {message.type === "AUDIO" && <audio src={message.mediaUrl} controls />}
      </div>
       <span
          className={`
            absolute bottom-1 right-2 text-[10px]
            ${isMine ? "text-green-100" : "text-gray-500"}
          `}
        >
          {formatTime(message.createdAt)}
        </span>
    </div>
  );
};

export default ChatMessage;


     
