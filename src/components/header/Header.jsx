import React from "react";
import { Link, useNavigate } from "react-router";
import useUser from "../../hooks/useUser";
import Button from "../ui/Button/Button";
import { LogOut } from "lucide-react";

import "./Header.scss";

const Header = ({ modals, setModals, authorized, outOfMain }) => {
  const { user, loading } = useUser();
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem("vika_token");
    navigate("/sign", { isRegister: false });
  };

  return (
    <header className="header">
      <Link to="/">
        <img
          className="header__logo"
          src="https://logos-world.net/wp-content/uploads/2021/12/Arcane-Logo.png"
          alt=""
        />
      </Link>
      {!outOfMain && (
        <nav className="header__nav">
          <Link to="/">Главная</Link>
          <a href="#cards">Карточки</a>
          <a href="#character">Персонаж</a>
        </nav>
      )}

      {!authorized ? (
        <div className="header__btns-container">
          <Button
            className="button dark outline"
            onClick={() => setModals({ ...modals, login: true })}
          >
            Войти
          </Button>
          <Button
            className="button"
            onClick={() => setModals({ ...modals, register: true })}
          >
            Зарегистрироваться
          </Button>
        </div>
      ) : (
        <div className="header__btns-container">
          <img className="user__avatar" src="" alt="" />

          {outOfMain ? (
            <button className="header__exit" onClick={logout}>
              <LogOut color="red" />
            </button>
          ) : (
            <Link className="user__content" to={`/profile/${user?.id}`}>
              <span className="user__name">{user?.name}</span>
            </Link>
          )}
        </div>
      )}
    </header>
  );
};

export default Header;
