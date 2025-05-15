import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function ChatList() {
  const [chats, setChats] = useState([]);
  const token = localStorage.getItem("token");

  useEffect(() => {
    fetch("/api/chats", {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => res.json())
      .then((data) => {
        setChats(data);
      })
      .catch(() => {
        setChats([]);
      });
  }, [token]);

  if (!chats.length) return <p>Чатов нет или загрузка...</p>;

  return (
    <ul>
      {chats.map((chat) => (
        <li key={chat.id}>
          <Link to={`/${chat.id}`}>{chat.name}</Link>
        </li>
      ))}
    </ul>
  );
}
