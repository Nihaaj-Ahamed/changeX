import { createContext, useContext, useEffect, useState } from "react";
import { io } from "socket.io-client";
import { AuthContext } from "./authContext";
import { useNotificationStore } from "../lib/notificationStore";

export const SocketContext = createContext();

export const SocketContextProvider = ({ children }) => {
  const { currentUser } = useContext(AuthContext);
  const [socket, setSocket] = useState(null);

  useEffect(() => {
    const SOCKET_URL = import.meta.env.VITE_SOCKET_URL || "http://localhost:4000";
    const s = io(SOCKET_URL, {
      withCredentials: true,
      transports: ["websocket", "polling"],
    });
    setSocket(s);

    return () => {
      s.disconnect();
    };
  }, []);

  useEffect(() => {
    if (!currentUser?.id || !socket) return;

    const registerUser = () => {
      socket.emit("newUser", currentUser.id);
    };

    socket.on("connect", registerUser);
    if (socket.connected) {
      registerUser();
    }

    const handleIncomingMessage = (data) => {
      const activeChatId = useNotificationStore.getState().activeChatId;
      // If user currently has this exact conversation open, don't increment unread count
      if (activeChatId && activeChatId === data?.chatId) {
        return;
      }
      // On ANY other page or section, immediately increment badge and sync with DB count
      useNotificationStore.getState().increase();
      useNotificationStore.getState().fetch();
    };

    socket.on("getMessage", handleIncomingMessage);

    return () => {
      socket.off("connect", registerUser);
      socket.off("getMessage", handleIncomingMessage);
    };
  }, [currentUser?.id, socket]);

  return (
    <SocketContext.Provider value={{ socket }}>
      {children}
    </SocketContext.Provider>
  );
};
