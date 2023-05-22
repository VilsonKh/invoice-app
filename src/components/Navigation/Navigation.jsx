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

const Navigation = ({onClickOpenNewInvoiceForm}) => {
	const { dark} = useContext(darkContext);
	const {invoices,setNewInvoice} = useContext(invoiceContext)

	const onClickButton = (e)=> {
		e.preventDefault()
		console.log(true)
		setNewInvoice(true);

	}
	return (
		<nav className={`nav ${dark ? "dark-nav" : ''}`}>
			<div className="container d-flex justify-content-between">
				<div className="nav__info">
					<h1>Invoices</h1>
					<p>
						<span>{invoices.length}</span> invoices
					</p>
				</div>
				
				<Dropdown></Dropdown>
				<button onClick={(e)=>onClickButton(e)} className="nav__addButton d-flex align-items-center ">
					<div className="addButton__icon">
						<img src={addIcon} alt="" />
					</div>
					<p>New</p> 
				</button>
			</div>
		</nav>
	);
};

export default Navigation;
