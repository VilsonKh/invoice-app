import { Link } from "react-router-dom";
import leftArrow from "../assets/icon-arrow-left.svg";
import "../styles/NewInvoice.scss";

const ButtonBack = () => {
	return (
		<Link to='..' className="addInvoice__button-container">
			<img src={leftArrow} alt="" />
			<button>Go back</button>
		</Link>
	);
};

export default ButtonBack;
