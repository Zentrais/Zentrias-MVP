import { api } from "./axios";
import { ChatItem, Message } from "@/types/chat";

//fetch user chats
export const getUserChats = async (
  token: string,
  userId: string
): Promise<ChatItem[]> => {
  const res = await api.get(`/messages/chats/${userId}`, {
    headers: { Authorization: `Bearer ${token}` },
  });

  return res.data;
};

//fetch messages between loggedInUser and selectedUser
export const getMessages = async (
  loggedInUserId: string,
  selectedUserId: string,
  token: string
): Promise<Message[]> => {
  const res = await api.get(`/messages/${loggedInUserId}`, {
    headers: { Authorization: `Bearer ${token}` },
  });

  return res.data.filter(
    (msg) =>
      (msg.senderId === loggedInUserId &&
        msg.receiverId === selectedUserId) ||
      (msg.senderId === selectedUserId &&
        msg.receiverId === loggedInUserId)
  );
};

//upload media file (image/audio)
export const uploadMedia = async (
  file: File,
  receiverId: string,
  type: "IMAGE" | "AUDIO",
  token: string
) => {
  const formData = new FormData();
  formData.append("file", file);
  formData.append("receiverId", receiverId);
  formData.append("type", type);

  const res = await api.post("/upload/media", formData, {
    headers: { Authorization: `Bearer ${token}` },
  });

  return res.data;
};

