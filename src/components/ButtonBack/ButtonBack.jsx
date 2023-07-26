import { useContext } from "react";
import leftArrow from "../../assets/icon-arrow-left.svg";
import darkContext from "../../context/dark/darkContext";
import invoiceContext from "../../context/invoice/invoiceContext";
import "./ButtonBack.scss";

const ButtonBack = () => {
	const {dark} = useContext(darkContext);
	const darkFont = dark ? 'dark-font' : ''

	const {setIsNewInvoice, setPreviewInvoice,setIsEditInvoice, setDefaultFilters} = useContext(invoiceContext);

	const onButtonBackClick = () => {
		setPreviewInvoice(false);
		setIsNewInvoice(false);
		setIsEditInvoice(false);
		setDefaultFilters()
	}

	return (
		<div onClick={onButtonBackClick} className={`addInvoice__button-container ${darkFont}`}>
			<img src={leftArrow} alt="" />
			<button  className={darkFont}>Go back</button>
		</div>
	);
};

export default ButtonBack;
