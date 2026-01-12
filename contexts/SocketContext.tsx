// context/SocketContext.tsx
import React, { createContext, useContext, useEffect } from "react";
import { connectSocket, disconnectSocket, getSocket } from "@/services/socket.service";

const SocketContext = createContext<ReturnType<typeof getSocket> | null>(null);

export const SocketProvider: React.FC<{ token: string; children: React.ReactNode }> = ({
  token,
  children,
}) => {
  useEffect(() => {
    if (token) {
      connectSocket(token);
    }
    return () => {
      disconnectSocket();
    };
  }, [token]);

  return (
    <SocketContext.Provider value={getSocket()}>
      {children}
    </SocketContext.Provider>
  );
};

export const useSocket = () => useContext(SocketContext);

// context/SocketContext.tsx
// "use client";

// import React, { createContext, useContext, useEffect, useState } from "react";
// import { connectSocket, disconnectSocket } from "@/services/socket.service";
// import type { Socket } from "socket.io-client";

// const SocketContext = createContext<Socket | null>(null);

// export const SocketProvider: React.FC<{ token: string; children: React.ReactNode }> = ({
//   token,
//   children,
// }) => {
//   const [socketInstance, setSocketInstance] = useState<Socket | null>(null);

//   useEffect(() => {
//     if (!token) return;

//     const socket = connectSocket(token);
//     setSocketInstance(socket);

//     return () => disconnectSocket();
//   }, [token]);

//   return <SocketContext.Provider value={socketInstance}>{children}</SocketContext.Provider>;
// };

// export const useSocket = () => useContext(SocketContext);
