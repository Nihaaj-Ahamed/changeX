import { useContext, useState } from "react";
import { createPortal } from "react-dom";
import "./chat.scss";
import { AuthContext } from "../../context/authContext";
import apiRequest from "../../lib/apiRequest";
import { format } from "timeago.js";
import { SocketContext } from "../../context/SocketContext";
import { useEffect } from "react";
import { useRef } from "react";
import { useNotificationStore } from "../../lib/notificationStore";

function Chat({ chats: chatsProp, activeChat, closeChat }) {
  const [chats, setChats] = useState(chatsProp || []);
  const [chat, setChat] = useState(null);
  const [opening, setOpening] = useState(!!activeChat);
  const { currentUser } = useContext(AuthContext);
  const { socket } = useContext(SocketContext);

  const messagesEndRef = useRef();
  const decrease = useNotificationStore((state) => state.decrease);
  const increase = useNotificationStore((state) => state.increase);
  const isOverlay = !!activeChat;

  useEffect(() => {
    if (chatsProp) setChats(chatsProp);
  }, [chatsProp]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [chat]);

  const handleOpenChat = async (id, receiver) => {
    try {
      const res = await apiRequest.get("/chats/" + id);
      if (!res.data.seenBy.includes(currentUser.id)) {
        decrease();
      }
      setChat({ ...res.data, receiver });
      setChats((prev) =>
        prev.map((c) =>
          c.id === id
            ? { ...c, seenBy: [...(c.seenBy || []), currentUser.id] }
            : c,
        ),
      );
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    if (!activeChat?.receiver?.id || !currentUser) {
      setOpening(false);
      return;
    }

    if (activeChat.receiver.id === currentUser.id) {
      setOpening(false);
      return;
    }

    let cancelled = false;

    const openFromListing = async () => {
      setOpening(true);
      try {
        const listRes = await apiRequest.get("/chats");
        if (cancelled) return;
        const list = listRes.data || [];
        setChats(list);

        let existing = list.find(
          (c) => c.receiver?.id === activeChat.receiver.id,
        );

        if (!existing) {
          const created = await apiRequest.post("/chats", {
            receiverId: activeChat.receiver.id,
          });
          if (cancelled) return;
          existing = { ...created.data, receiver: activeChat.receiver };
          setChats((prev) => [...prev, existing]);
        }

        const res = await apiRequest.get("/chats/" + existing.id);
        if (cancelled) return;
        if (!res.data.seenBy?.includes(currentUser.id)) {
          decrease();
        }
        setChat({
          ...res.data,
          receiver: existing.receiver || activeChat.receiver,
        });
        setChats((prev) =>
          prev.map((c) =>
            c.id === existing.id
              ? { ...c, seenBy: [...(c.seenBy || []), currentUser.id] }
              : c,
          ),
        );
      } catch (err) {
        console.log(err);
      } finally {
        if (!cancelled) setOpening(false);
      }
    };

    openFromListing();
    return () => {
      cancelled = true;
    };
  }, [activeChat?.receiver?.id, currentUser?.id, decrease]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData(e.target);
    const text = formData.get("text");
    if (!text) return;
    try {
      const res = await apiRequest.post("/messages/" + chat.id, { text });
      setChat((prev) => ({ ...prev, messages: [...prev.messages, res.data] }));
      e.target.reset();
      socket?.emit("sendMessage", {
        receiverId: chat.receiver.id,
        data: { ...res.data, chatId: chat.id },
      });
    } catch (err) {
      console.log(err);
    }
  };

  const chatRef = useRef(chat);
  chatRef.current = chat;

  useEffect(() => {
    if (!socket) return;

    const handleGetMessage = (data) => {
      const openChat = chatRef.current;
      if (openChat && data?.chatId === openChat.id) {
        setChat((prev) => {
          if (prev.messages?.some((m) => m.id === data.id)) return prev;
          return { ...prev, messages: [...(prev.messages || []), data] };
        });
        apiRequest.put("/chats/read/" + openChat.id).catch(() => {});
      } else {
        setChats((prev) => {
          const chatItem = prev.find((c) => c.id === data?.chatId);
          if (!chatItem || chatItem.seenBy?.includes(currentUser.id)) {
            increase();
          }
          return prev;
        });
      }

      setChats((prev) => {
        const chatItem = prev.find((c) => c.id === data?.chatId);
        if (!chatItem) {
          apiRequest
            .get("/chats")
            .then((res) => {
              setChats(res.data);
            })
            .catch((err) => console.log(err));
          return prev;
        } else {
          return prev.map((c) => {
            if (c.id === data?.chatId) {
              const isChatOpen = openChat && data.chatId === openChat.id;
              return {
                ...c,
                lastMessage: data.text,
                seenBy: isChatOpen
                  ? [...(c.seenBy || []), currentUser.id]
                  : (c.seenBy || []).filter((id) => id !== currentUser.id),
              };
            }
            return c;
          });
        }
      });
    };

    socket.on("getMessage", handleGetMessage);
    return () => {
      socket.off("getMessage", handleGetMessage);
    };
  }, [socket, currentUser?.id, increase]);

  const handleClose = () => {
    setChat(null);
    closeChat?.();
  };

  const chatUi = (
    <div className={`chat${isOverlay ? " overlay" : ""}`}>
      {!isOverlay && (
        <div className="messages">
          <h1>Messages</h1>
          {chats?.map((c) => (
            <div
              className="message"
              key={c.id}
              style={{
                backgroundColor:
                  c.seenBy?.includes(currentUser.id) || chat?.id === c.id
                    ? "var(--glass-bg)"
                    : "var(--accent-primary)",
                color:
                  c.seenBy?.includes(currentUser.id) || chat?.id === c.id
                    ? "var(--text-primary)"
                    : "#000000",
                border:
                  c.seenBy?.includes(currentUser.id) || chat?.id === c.id
                    ? "1px solid var(--glass-border)"
                    : "none",
              }}
              onClick={() => handleOpenChat(c.id, c.receiver)}
            >
              <img src={c.receiver.avatar || "/noAvathar.png"} alt="" />
              <span>{c.receiver.username}</span>
              <p style={{ color: "inherit" }}>{c.lastMessage}</p>
            </div>
          ))}
        </div>
      )}
      {isOverlay && opening && !chat && (
        <div className="chatBox">
          <div className="top">
            <div className="user">
              <img
                src={activeChat.receiver.avatar || "/noAvathar.png"}
                alt=""
              />
              {activeChat.receiver.username}
            </div>
            <span className="close" onClick={handleClose}>
              X
            </span>
          </div>
          <div className="center">
            <p>Opening chat...</p>
          </div>
        </div>
      )}
      {chat && (
        <div className="chatBox">
          <div className="top">
            <div className="user">
              <img src={chat.receiver.avatar || "/noAvathar.png"} alt="" />
              {chat.receiver.username}
            </div>
            <span className="close" onClick={handleClose}>
              X
            </span>
          </div>
          <div className="center">
            {chat.messages?.map((message) => (
              <div
                className="chatMessage"
                style={{
                  alignSelf:
                    message.userId === currentUser.id
                      ? "flex-end"
                      : "flex-start",
                  textAlign:
                    message.userId === currentUser.id ? "right" : "left",
                }}
                key={message.id}
              >
                <p>{message.text}</p>
                <span>{format(message.createdAt)}</span>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>
          <div className="bottom">
            <form onSubmit={handleSubmit}>
              <textarea name="text" placeholder="Type a message..." />
              <button type="submit">Send</button>
            </form>
          </div>
        </div>
      )}
    </div>
  );

  if (isOverlay) {
    return createPortal(chatUi, document.body);
  }

  return chatUi;
}

export default Chat;
