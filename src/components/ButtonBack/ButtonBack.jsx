//hooks
import { useContext } from "react";
//context
import darkContext from "../../context/dark/darkContext";
import invoiceContext from "../../context/invoice/invoiceContext";
//assets
import leftArrow from "../../assets/icon-arrow-left.svg";
//styles
import "./ButtonBack.scss";

//componenet is used to navigate backwards and reset opening states
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
