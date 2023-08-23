import { useContext } from "react";
import leftArrow from "../../assets/icon-arrow-left.svg";
import darkContext from "../../context/dark/darkContext";
import invoiceContext from "../../context/invoice/invoiceContext";
import "./ButtonBack.scss";

const ButtonBack = () => {
	const {dark} = useContext(darkContext);
	const darkFont = dark ? 'dark-font' : ''

	const {setIsNewInvoice, setPreviewInvoice,setIsEditInvoice, setDefaultFilters, setIsInvoicesListVisible} = useContext(invoiceContext);


	/**  Sets the value false for the states isPreviewInvoice, isEditInvoice, isNewInvoice and resets invoice filtering
		* @return {void} nothing
	*/
	const onButtonBackClick = () => {
		setPreviewInvoice(false);
		setIsNewInvoice(false);
		setIsEditInvoice(false);
		setDefaultFilters()
		setIsInvoicesListVisible(true)
	}

	return (
		<div onClick={onButtonBackClick} className={`addInvoice__button-container ${darkFont}`}>
			<img src={leftArrow} alt="backArrow" />
			<button  className={darkFont}>Go back</button>
		</div>
	);
};

export default ButtonBack;
