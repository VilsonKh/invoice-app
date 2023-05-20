import Dropdown from "./Dropdown";

import addIcon from "../assets/icon-plus.svg";
import dropArrow from "../assets/icon-arrow-down.svg";
import "../styles/Navigation.scss";
import { Link } from "react-router-dom";
import { useContext } from "react";
import darkContext from "../context/dark/darkContext";
import invoiceContext from "../context/invoice/invoiceContext";

const Navigation = (props) => {
	const { dark} = useContext(darkContext);
	const {invoices, onClickAdd} = useContext(invoiceContext)
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
				<button className="nav__addButton d-flex align-items-center" onClick={()=> props.onClickNewInvoice(true)}>
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
