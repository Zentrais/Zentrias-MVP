import React, { useState , useRef } from "react";
import { useMessages } from "@/hooks/useMessages"
import {useAudioRecorder} from "@/hooks/useAudioRecorder"
interface Props {
  loggedInUserId: string;
  receiverId: string;
  token: string;
  //onSend: () => void;
}

const InputBox: React.FC<Props> = ({ loggedInUserId, receiverId, token }) => {
  const [text, setText] = useState("");
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const { sendNewMessage , sendNewMediaMessage } = useMessages(loggedInUserId, receiverId, token);


  const handleSendText = async () => {
    if (!text.trim()) return;
    await sendNewMessage(text);
    setText("");
    //onSend();
  };

  // IMAGE
  const handleImageSelect = async (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = e.target.files?.[0];
    if (!file) return;

    await sendNewMediaMessage(file, "IMAGE");
    e.target.value = "";
    //onSend();
  };

   // 🎧 Audio recorder hook
  const { recording, startRecording, stopRecording } = useAudioRecorder(
    async (blob) => {
      const audioFile = new File(
        [blob],
        `audio-${Date.now()}.webm`,
        { type: "audio/webm" }
      );

      await sendNewMediaMessage(audioFile, "AUDIO");
      //onSend();
    }
  );

 return (
    <div className="flex items-center gap-2 border-t p-2">
      {/* Image picker */}
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        hidden
        onChange={handleImageSelect}
      />

      <button
        onClick={() => fileInputRef.current?.click()}
        className="px-2 text-gray-500 hover:text-gray-700"
        title="Send image"
      >
        📷
      </button>

      {/* Text input */}
      <input
        type="text"
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Type a message"
        className="flex-1 rounded-md border px-3 py-2 text-sm focus:outline-none"
      />

      {/* Audio record */}
      {!recording ? (
        <button
          onClick={startRecording}
          className="px-2 text-gray-500 hover:text-gray-700"
          title="Record audio"
        >
          🎤
        </button>
      ) : (
        <button
          onClick={stopRecording}
          className="px-2 text-red-500 hover:text-red-700"
          title="Stop recording"
        >
          ⏹
        </button>
      )}

      {/* Send text */}
      <button
        onClick={handleSendText}
        className="rounded-md bg-gray-800 px-4 py-2 text-white text-sm"
      >
        Send
      </button>
    </div>
  );
};

export default InputBox;