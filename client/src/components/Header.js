import React from "react";
import { Link, useNavigate } from "react-router-dom";

export default function Header() {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const logout = () => {
    localStorage.clear();
    navigate("/login");
  };

  return (
    <header style={{ padding: "10px"}}>
      <nav>
        {!token && (
          <>
            <Link to="/login" style={{ marginRight: "15px" }}>
              Войти
            </Link>
            <Link to="/register">Регистрация</Link>
          </>
        )}
        {token && (
          <>
            <Link to="/" style={{ marginRight: "15px" }}>
              Чаты
            </Link>
            <button onClick={logout} style={{ marginLeft: "15px" }}>
              Выйти
            </button>
          </>
        )}
      </nav>
    </header>
  );
}
