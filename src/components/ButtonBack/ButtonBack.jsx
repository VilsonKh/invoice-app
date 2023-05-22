import { useContext } from "react";
import { Link } from "react-router-dom";
import leftArrow from "../../assets/icon-arrow-left.svg";
import darkContext from "../../context/dark/darkContext";
import invoiceContext from "../../context/invoice/invoiceContext";
import "./ButtonBack.scss";

const ButtonBack = ({setIsPreviewOpen}) => {

	const {dark} = useContext(darkContext);


	const darkFont = dark ? 'dark-font' : ''

	return (
		<div onClick={()=>setIsPreviewOpen(false)} className={`addInvoice__button-container ${dark ? 'dark-font' : ''}`}>
			<img src={leftArrow} alt="" />
			<button  className={darkFont}>Go back</button>
		</div>
	);
};

export default ButtonBack;
