// src/components/ChatWindow.js
import React, { useEffect, useState, useRef } from "react";
import socket from "../utils/socket";

export default function ChatWindow({ chatId, userId, token }) {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const messagesEndRef = useRef(null);

  // Скроллим вниз при обновлении сообщений
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    // Подключаемся к серверу
    socket.connect();

    // Входим в чат (комнату)
    socket.emit("joinChat", chatId);

    // Загружаем историю сообщений через API
    fetch(`/api/messages/${chatId}`, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => res.json())
      .then((data) => {
        setMessages(data);
        scrollToBottom();
      })
      .catch(() => {
        setMessages([]);
      });

    // Слушаем новые сообщения от сервера
    socket.on("newMessage", (msg) => {
      setMessages((prev) => [...prev, msg]);
      scrollToBottom();
    });

    // Очистка при демонтировании
    return () => {
      socket.emit("leaveChat", chatId);
      socket.off("newMessage");
      socket.disconnect();
    };
  }, [chatId, token]);

  const sendMessage = () => {
    if (!input.trim()) return;
    socket.emit("sendMessage", {
      chatId,
      senderId: userId,
      text: input.trim(),
      replyTo: null,
    });
    setInput("");
  };

  return (
    <div className="chat-window">
      <div className="messages" style={{ height: "60vh", overflowY: "auto", border: "1px solid #ccc", padding: "10px", marginBottom: "10px" }}>
        {messages.map((m) => (
          <div key={m.id} className="message" style={{ marginBottom: "8px" }}>
            <b>{m.sender_id}</b>: {m.text}
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      <div className="input-area" style={{ display: "flex" }}>
        <input
          type="text"
          placeholder="Введите сообщение..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && sendMessage()}
          style={{ flexGrow: 1, padding: "8px" }}
        />
        <button onClick={sendMessage} style={{ padding: "8px 12px" }}>
          Отправить
        </button>
      </div>
    </div>
  );
}

