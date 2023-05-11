import { useContext } from "react";
import { Link } from "react-router-dom";
import leftArrow from "../assets/icon-arrow-left.svg";
import darkContext from "../context/dark/darkContext";
import "../styles/NewInvoice.scss";

const ButtonBack = () => {

	const {dark} = useContext(darkContext)

	const darkFont = dark ? 'dark-font' : ''

	return (
		<Link to='..' className={`addInvoice__button-container ${dark ? 'dark-font' : ''}`}>
			<img src={leftArrow} alt="" />
			<button className={darkFont}>Go back</button>
		</Link>
	);
};

export default ButtonBack;
