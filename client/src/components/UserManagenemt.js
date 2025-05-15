import React, { useEffect, useState } from "react";

export default function UserManagement({ chatId }) {
  const [users, setUsers] = useState([]);
  const [newUser, setNewUser] = useState("");
  const [positionTag, setPositionTag] = useState("");
  const [error, setError] = useState(null);
  const token = localStorage.getItem("token");

  useEffect(() => {
    fetch(`/api/chats/${chatId}/users`, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => res.json())
      .then((data) => setUsers(data))
      .catch(() => setUsers([]));
  }, [chatId, token]);

  const addUser = async () => {
    if (!newUser.trim()) return;
    setError(null);

    try {
      const res = await fetch(`/api/chats/${chatId}/users`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ username: newUser.trim() }),
      });

      if (!res.ok) throw new Error("Ошибка добавления пользователя");

      // Обновим список
      const updatedUsers = await res.json();
      setUsers(updatedUsers);
      setNewUser("");
    } catch (err) {
      setError(err.message);
    }
  };

  const makeAdmin = async (userId) => {
    try {
      const res = await fetch(`/api/chats/${chatId}/users/${userId}/make-admin`, {
        method: "POST",
        headers: { Authorization: `Bearer ${token}` },
      });

      if (!res.ok) throw new Error("Ошибка назначения администратора");

      const updatedUsers = await res.json();
      setUsers(updatedUsers);
    } catch (err) {
      setError(err.message);
    }
  };

  const setTag = async (userId) => {
    if (!positionTag.trim()) return;
    setError(null);

    try {
      const res = await fetch(`/api/chats/${chatId}/users/${userId}/position-tag`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ positionTag }),
      });

      if (!res.ok) throw new Error("Ошибка установки должности");

      const updatedUsers = await res.json();
      setUsers(updatedUsers);
      setPositionTag("");
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div>
      <h3>Управление пользователями</h3>
      {error && <p style={{ color: "red" }}>{error}</p>}

      <div>
        <input
          type="text"
          placeholder="Имя пользователя для добавления"
          value={newUser}
          onChange={(e) => setNewUser(e.target.value)}
        />
        <button onClick={addUser}>Добавить пользователя</button>
      </div>

      <ul>
        {users.map((user) => (
          <li key={user.user_id}>
            {user.username} — {user.role} — {user.position_tag || "без должности"}

            {user.role !== "admin" && (
              <button onClick={() => makeAdmin(user.user_id)} style={{ marginLeft: "10px" }}>
                Сделать админом
              </button>
            )}

            <input
              type="text"
              placeholder="Установить должность"
              value={positionTag}
              onChange={(e) => setPositionTag(e.target.value)}
              style={{ marginLeft: "10px" }}
            />
            <button onClick={() => setTag(user.user_id)}>Установить</button>
          </li>
        ))}
      </ul>
    </div>
  );
}
