import React, { useRef, useEffect } from "react";
import { useMessages } from "@/hooks/useMessages";
import { Message } from "@/types/chat";
import InputBox from "./InputBox";
import ChatMessage from "./ChatMessage";

interface Props {
  selectedUser: {id: string; username: string };
  loggedInUserId: string;
  token: string;
}

const ChatWindow: React.FC<Props> = ({ selectedUser, loggedInUserId, token }) => {
  const { messages, loading } = useMessages(loggedInUserId, selectedUser.id, token);
  const bottomRef = useRef<HTMLDivElement>(null);

  // Scroll to bottom when messages change
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <div className="flex flex-col h-full">
      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-2">
        {loading ? (
          <div className="text-gray-500">Loading messages...</div>
        ) : messages.length === 0 ? (
          <div className="text-gray-500 text-center mt-4">No messages yet</div>
        ) : (
          messages.map((msg: Message,idx) => <ChatMessage key={idx} message={msg} loggedInUserId={loggedInUserId} />)
        )}
        <div ref={bottomRef} />
      </div>

      {/* Input */}
      <div className="border-t p-2">
        <InputBox
          loggedInUserId={loggedInUserId}
          receiverId={selectedUser.id}
          token={token}
          //onSend={refresh} // Refresh messages after sending
        />
      </div>
    </div>
  );
};

export default ChatWindow;
