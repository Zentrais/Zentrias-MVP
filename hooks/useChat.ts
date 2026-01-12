import { useState, useEffect } from "react";
import { getUserChats } from "@/services/chat.api";
import { ChatItem } from "@/types/chat";

export const useChats = (userId: string | null, token: string | null) => {
  const [chats, setChats] = useState<ChatItem[]>([]);
  const [loading, setLoading] = useState(false);

  const fetchChats = async () => {
    if (!userId || !token) return;
    setLoading(true);
    const data = await getUserChats(token, userId);
    setChats(data);
    setLoading(false);
  };

  useEffect(() => {
    fetchChats();
  }, [userId, token]);

  return { chats, loading, refresh: fetchChats };
};
