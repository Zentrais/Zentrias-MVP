"use client";

import React, { useState } from "react";
import ConversationList from "@/components/chat/ConversationList";
import ChatWindow from "@/components/chat/ChatWindow";
import { useAuth } from "@/hooks/useAuth";
import { SocketProvider } from "@/contexts/SocketContext";

export default function ChatPage() {
  const { token, userId: loggedInUserId } = useAuth();
  const [selectedUser, setSelectedUser] = useState<{ id: string; username: string } | null>(null);

  if (!loggedInUserId || !token) {
    return <div className="flex justify-center items-center h-screen text-gray-500">Please login first</div>;
  }

  return (
    <SocketProvider token={token}>
    <div className="flex h-screen">
      {/* Left: Conversation List */}
      <div className="w-1/4 border-r">
        <ConversationList
          userId={loggedInUserId}
          token={token}
          onSelect={(user) => setSelectedUser(user)}
        />
      </div>

      {/* Right: Chat Window */}
      <div className="w-3/4">
        {selectedUser ? (
          <ChatWindow
            selectedUser={selectedUser}
            loggedInUserId={loggedInUserId}
            token={token}
          />
        ) : (
          <div className="flex justify-center items-center h-full text-gray-500">
            Select a conversation
          </div>
        )}
      </div>
    </div>
    </SocketProvider>
  );
}
