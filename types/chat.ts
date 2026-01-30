export interface Message {
  senderId: string;
  receiverId: string;
  type: "TEXT" | "IMAGE" | "AUDIO";
  content?: string;
  mediaUrl?: string;
  createdAt: string;
}

export interface ChatItem {
  chatUserId: string;
  chatUsername: string;
  lastMessage: string;
  lastMessageType: "TEXT" | "IMAGE" | "AUDIO";
  lastMessageTime: string;
}