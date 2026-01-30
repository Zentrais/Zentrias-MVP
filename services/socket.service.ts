import { io, Socket } from "socket.io-client";
import { Message } from "@/types/chat";
import { uploadMedia } from "./chat.api"; // your existing media upload service
import { api } from "./axios";

let socket: Socket | null = null;


/**
 * Connects to Socket.IO server
 * @param token JWT auth token
 * @returns Socket instance
 */
export const connectSocket = (token: string): Socket => {
  if (!socket) {
    socket = io("http://chat-alb-1799367065.us-east-1.elb.amazonaws.com", {
      auth: { token },
      transports: ["websocket"],
    });

    socket.on("connect", () => {
      console.info("[socket] connected:", socket?.id);
    });

    socket.on("disconnect", (reason) => {
      console.warn("[socket] disconnected:", reason);
    });

    socket.on("connect_error", (err) => {
      console.error("[socket] connection error:", err.message);
    });
  }

  return socket;
};

export const getSocket = () => socket;


//Disconnects socket
export const disconnectSocket = () => {
  socket?.disconnect();
  socket = null;
};

//Send a TEXT message via socket
export const sendTextMessage = (message: {
  receiverId: string;
  content: string;
}) => {
  if (!socket) return console.error("❌ Socket not connected!");
  if (!socket.connected) return console.error("❌ Socket not connected yet!");
  socket.emit("send_message", { ...message, type: "TEXT" });
};

/**
Send a MEDIA message via socket
 * 1. Upload media first
 * 2. Emit message with media URL
 */

export const sendMediaMessage = async (
  file: File,
  receiverId: string,
  type: "IMAGE" | "AUDIO",
  token: string
) => {
  if (!socket) return console.error("❌ Socket not connected!");
  const { mediaKey } = await uploadMedia(file, receiverId, type, token);

// Send socket message with media URL
  const message: Partial<Message> = {
    receiverId,
    mediaUrl: mediaKey, // backend will resolve media URL
    type,
  };
  socket.emit("send_message", message);
};

//Listen for incoming messages
export const onNewMessage = (cb: (msg: Message) => void) => {
  if (!socket){console.error("❌ Socket not initialized for listener"); return;}
  socket.on("receive_message", cb);
};

//Stop listening for incoming messages
export const offNewMessage = () => {
  if (!socket) return;
  socket.off("receive_message");
};
