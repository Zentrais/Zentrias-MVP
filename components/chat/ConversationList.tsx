import React from "react";
import { ChatItem as ChatItemType } from "@/types/chat";
import ChatItem from "./ChatItem";
import { useChats } from "@/hooks/useChat";

interface Props {
  userId: string;
  token: string;
  onSelect: (user: { id: string; username: string }) => void;
}

const ConversationList: React.FC<Props> = ({ userId, token, onSelect }) => {
  const { chats, loading } = useChats(userId, token);

  if (loading) return <div className="p-4 text-gray-500">Loading chats...</div>;

  if (chats.length === 0) return <div className="p-4 text-gray-500">No conversations yet</div>;

  return (
    <div className="overflow-y-auto h-full">
      {chats.map((chat: ChatItemType) => (
        <ChatItem
          key={chat.chatUserId}
          chat={chat}
          onClick={() => onSelect({ id: chat.chatUserId, username: chat.chatUsername })}
        />
      ))}
    </div>
  );
};

export default ConversationList;
