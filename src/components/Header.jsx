import logo from "../assets/logo.svg";
import moon from "../assets/icon-moon.svg";
import sun from "../assets/icon-sun.svg";
import avatar from "../assets/image-avatar.jpg";

import "../styles/Header.scss";
import { useContext } from "react";
import darkContext from "../context/dark/darkContext";

const Header = (props) => {
	const { dark, toggleDarkMode } = useContext(darkContext);

	return (
		<header className={`header ${dark ? "dark-header" : ''}`}>
			<div className="header__container d-flex">
				<div className="header__nav d-flex align-items-center justify-content-between w-100">
					<div className="header__logo">
						<img src={logo} alt="" />
					</div>
					<button onClick={toggleDarkMode} className="header__switcher">
						{dark ? <img src={sun} alt="sun" /> : <img src={moon} alt="moon" />}
					</button>
				</div>
				<div className="header__avatar">
					<img src={avatar} alt="" />
				</div>
			</div>
		</header>
	);
};

export default Header;
