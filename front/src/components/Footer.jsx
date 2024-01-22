import React from "react";
import Logo from "../img/logo.png";

const Footer = () => {
  return (
    <footer>
      <div>
        <img src={Logo} alt="" />
        <span>
          Made with ❤️ and <b>React.js</b>.
        </span>
      </div>
    </footer>
  );
};

export default Footer;
