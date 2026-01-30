import React from "react";
import { ChatItem as ChatItemType } from "@/types/chat";

interface Props {
  chat: ChatItemType;
  onClick: () => void;
}

const ChatItem: React.FC<Props> = ({ chat, onClick }) => {
  return (
    <div
      className="p-4 border-b cursor-pointer hover:bg-gray-100"
      onClick={onClick}
    >
      <div className="font-semibold">{chat.chatUsername}</div>
      <div className="text-sm text-gray-500 truncate">{chat.lastMessage}</div>
      <div className="text-xs text-gray-400">{chat.lastMessageTime}</div>
    </div>
  );
};

export default ChatItem;
