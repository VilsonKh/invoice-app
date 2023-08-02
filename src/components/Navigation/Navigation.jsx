//styles
import "./Navigation.scss";
//components
import Dropdown from "../Dropdown/Dropdown";
//img
import addIcon from "../../assets/icon-plus.svg";
//hooks
import { useContext } from "react";
//context
import darkContext from "../../context/dark/darkContext";
import invoiceContext from "../../context/invoice/invoiceContext";

const Navigation = () => {
	const { dark} = useContext(darkContext);
	const {invoices,setIsNewInvoice} = useContext(invoiceContext)

	return (
		<nav className={"nav"}>
			<div className="container d-flex justify-content-between">
				<div className="nav__info">
					<h1  className={`${dark ? 'dark-font' : ''}`}>Invoices</h1>
					<p>
						{window.screen.width > '767' ? <span>{`There are ${invoices.length} total invoices`}</span> : <span>{`${invoices.length} invoices`}</span> }
					</p>
				</div>
				
				<Dropdown></Dropdown>
				<button type="button" onClick={() => setIsNewInvoice(true)} data-testid="newInvoiceButton" className="nav__addButton d-flex align-items-center ">
					<div className="addButton__icon">
						<img src={addIcon} alt="" />
					</div>
					<p>New <span>Invoice</span></p> 
				</button>
			</div>
		</nav>
	);
};

export default Navigation;
