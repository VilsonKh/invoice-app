import { useContext } from "react";
import { Link } from "react-router-dom";
import leftArrow from "../assets/icon-arrow-left.svg";
import darkContext from "../context/dark/darkContext";
import invoiceContext from "../context/invoice/invoiceContext";
import "../styles/NewInvoice.scss";

const ButtonBack = (props) => {

	const {dark} = useContext(darkContext);
	const {onClickBack} = useContext(invoiceContext)

	const darkFont = dark ? 'dark-font' : ''

	return (
		<Link onClick={onClickBack} to='..' className={`addInvoice__button-container ${dark ? 'dark-font' : ''}`}>
			<img src={leftArrow} alt="" />
			<button onClick={props.onCloseNewInvoiceForm} className={darkFont}>Go back</button>
		</Link>
	);
};

export default ButtonBack;
