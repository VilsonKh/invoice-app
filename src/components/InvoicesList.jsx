import "../styles/InvoicesList.scss";
import InvoicesItem from "./InvoicesItem";
import Navigation from "./Navigation";
import invoiceContext from '../context/invoice/invoiceContext';
import { useContext, useEffect, useState } from "react";
import darkContext from "../context/dark/darkContext";
import dataJson from '../data.json';


const InvoicesList = ({onShowPreview}) => {

	const{dark} = useContext(darkContext);
	const {invoices, newInvoiceForm, getInvoices, addCurrentInvoice} = useContext(invoiceContext);
	const [initialInvoices,setInitialInvoices] = useState([])
	
	useEffect (() => {
		getInvoices();
		setInitialInvoices(invoices)

	},[])




	const listItems = invoices.map((invoice) => {
		const {id, paymentDue, items, clientName, status} = invoice;
				return <InvoicesItem 
					key={id}
					number={id} 
					dateDue={paymentDue} 
					amount={items[0].price} 
					name={clientName} 
					status={status}
			  	onShowPreview={onShowPreview}
					
					>
				</InvoicesItem>;
	});

	return (
		<section className="invoicesList">
			<Navigation/>
			<div className="container">
				<ul className="invoicesList__list">{listItems}</ul>
			</div>
		</section>
	);
};

export default InvoicesList;
