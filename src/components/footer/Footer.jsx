import React from "react";

import "./Footer.scss";

const Footer = () => {
  return (
    <footer id="footer" className="footer">
      <div className="footer__grid">
        <div>
          <img
            className="header__logo"
            src="https://logos-world.net/wp-content/uploads/2021/12/Arcane-Logo.png"
            alt=""
          />
          <p>Лучшая википедия по Arcane</p>
        </div>

        <div className="footer__social">
          <a href="#">VK</a>
          <a href="#">Instagram</a>
          <a href="#">YouTube</a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
