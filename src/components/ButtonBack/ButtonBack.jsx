import { useContext } from "react";
import { Link } from "react-router-dom";
import leftArrow from "../../assets/icon-arrow-left.svg";
import darkContext from "../../context/dark/darkContext";
import invoiceContext from "../../context/invoice/invoiceContext";
import "./ButtonBack.scss";

const ButtonBack = () => {
	const {dark} = useContext(darkContext);
	const darkFont = dark ? 'dark-font' : ''

	const {setNewInvoice, setPreviewInvoice,setEditInvoice, setDefaultFilters} = useContext(invoiceContext);

	const onButtonBackClick = () => {
		setPreviewInvoice(false);
		setNewInvoice(false);
		setEditInvoice(false);
		setDefaultFilters()
	}

	return (
		<div onClick={onButtonBackClick} className={`addInvoice__button-container ${dark ? 'dark-font' : ''}`}>
			<img src={leftArrow} alt="" />
			<button  className={darkFont}>Go back</button>
		</div>
	);
};

export default ButtonBack;
