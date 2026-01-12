import { useState, useEffect, useRef  } from "react";
import { getMessages } from "@/services/chat.api";
import {  sendTextMessage, sendMediaMessage, onNewMessage, offNewMessage } from "@/services/socket.service";


import { Message } from "@/types/chat";

export const useMessages = (loggedInUserId: string | null, selectedUserId: string | null, token: string | null) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(true);
  const socketRef = useRef<any>(null);

  const fetchMessages = async () => {
    if (!loggedInUserId || !selectedUserId || !token) return;
    setLoading(true);
    const data = await getMessages(loggedInUserId, selectedUserId, token);
    setMessages(data);
    setLoading(false);
  };

  // Send a message
  const sendNewMessage = async (
    content: string,
  ) => {
    if (!loggedInUserId || !selectedUserId || !token) return;

    await sendTextMessage({ receiverId: selectedUserId, content });

    // Refresh messages after sending
    await fetchMessages();
  };
  
  // Send media message
  const sendNewMediaMessage = async (
    file: File,
    type: "IMAGE" | "AUDIO",
  ) => {
    if (!loggedInUserId || !selectedUserId || !token) return;

    await sendMediaMessage(file, selectedUserId, type, token);
    // Refresh messages after sending
    await fetchMessages();
  };

  
 // Real-time listener
  useEffect(() => {
    if (!selectedUserId) return;

    const handleNew = (msg: Message) => {
      // Only add message if it belongs to this conversation
      if (
        msg.senderId === selectedUserId ||
        msg.receiverId === selectedUserId
      ) {
        setMessages((prev) => [...prev, msg]);
      }
    };

    onNewMessage(handleNew);
    return () => offNewMessage();
  }, [selectedUserId]);
  

  // Initial fetch when chat opens
  useEffect(() => {
    fetchMessages();
  }, [selectedUserId, loggedInUserId, token]);

  


  return { messages, loading,  fetchMessages, sendNewMessage , sendNewMediaMessage };
};

