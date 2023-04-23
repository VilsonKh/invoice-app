import logo from "../assets/logo.svg";
import switcher from "../assets/icon-moon.svg";
import avatar from "../assets/image-avatar.jpg"

import "../styles/Header.scss";

const Header = (props) => {
  return (
    <header className="header">
      <div className="header__container d-flex">
        <div className="header__nav d-flex align-items-center justify-content-between w-100">
          <div className="header__logo">
            <img src={logo} alt="" />
          </div>
          <button className="header__switcher">
            <img src={switcher} alt="" />
          </button>
        </div>
        <div className="header__avatar">
          <img src={avatar} alt="" />
        </div>
        
      </div>
    </header>
  )
}

export default Header;