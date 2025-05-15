import ChatWindow from "../components/ChatWindow";
import ChatList from "../components/ChatList";
import { useParams, Navigate } from "react-router-dom";
import React from "react";

export default function ChatPage() {
  const { chatId } = useParams();
  const token = localStorage.getItem("token");
  const userId = localStorage.getItem("userId");

  if (!token || !userId) {
    return <Navigate to="/login" />;
  }

  return (
    <div style={{ display: "flex", gap: "20px" }}>
      <div style={{ flex: 1 }}>
        <ChatList />
      </div>
      <div style={{ flex: 3 }}>
        {chatId ? (
          <>
            <h2>Чат №{chatId}</h2>
            <ChatWindow chatId={chatId} userId={userId} token={token} />
          </>
        ) : (
          <p>Выберите чат слева</p>
        )}
      </div>
    </div>
  );
}
