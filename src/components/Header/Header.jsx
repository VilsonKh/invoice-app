//styles
import './Header.scss';
//img
import logo from "../../assets/logo.svg";
import moon from "../../assets/icon-moon.svg";
import sun from "../../assets/icon-sun.svg";
import avatar from "../../assets/image-avatar.jpg";
//context
import darkContext from '../../context/dark/darkContext';
import { useContext } from 'react';

const Header = () => {

  const {dark, toggleDarkMode} = useContext(darkContext)

	const onChangeThemeClick = () => {
		toggleDarkMode()
		localStorage.setItem('dark', !dark)
	}



  return (
    <header className={`header ${dark ? "dark-header" : ''}`} data-testid="header">
				<div className="header__nav d-flex align-items-center justify-content-between w-100">
					<div className="header__logo">
						<img src={logo} alt="logo" />
					</div>
					<button onClick={onChangeThemeClick} data-testid="switchThemeButton" className="header__switcher">
						{dark ? <img src={sun} alt="sun" /> : <img src={moon} alt="moon" />}
					</button>
				</div>
				<div className="header__avatar">
					<img src={avatar} alt="avatar" />
				</div>
		</header>
  )
}

export default Header
