import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function ChatListPage() {
  const [chats, setChats] = useState([]);
  const [newChatName, setNewChatName] = useState("");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const token = localStorage.getItem("token");

  useEffect(() => {
    fetch("/api/chats", {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => res.json())
      .then((data) => {
        setChats(data);
        setLoading(false);
      })
      .catch(() => {
        setChats([]);
        setLoading(false);
      });
  }, [token]);

  const createChat = async () => {
    if (!newChatName.trim()) return;

    try {
      const res = await fetch("/api/chats/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ name: newChatName.trim() }),
      });

      if (!res.ok) throw new Error("Ошибка создания чата");

      const createdChat = await res.json();
      setChats((prev) => [...prev, createdChat]);
      setNewChatName("");
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div>
      <h2>Список чатов</h2>

      <input
        value={newChatName}
        onChange={(e) => setNewChatName(e.target.value)}
        placeholder="Название нового чата"
      />
      <button onClick={createChat}>Создать чат</button>
      {error && <p style={{ color: "red" }}>{error}</p>}

      {loading ? (
        <p>Загрузка...</p>
      ) : (
        <ul>
          {chats.map((chat) => (
            <li key={chat.id}>
              <Link to={`/${chat.id}`}>{chat.name}</Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
