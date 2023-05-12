import "../styles/InvoicesList.scss";
import InvoicesItem from "./InvoicesItem";
import Navigation from "./Navigation";
import invoiceContext from '../context/invoice/invoiceContext';
import { useContext, useEffect, useState } from "react";
import darkContext from "../context/dark/darkContext";
import dataJson from '../data.json';
import NoInvoicesPage from "./NoInvoicesPage";


const InvoicesList = ({onShowPreview}) => {


	const {invoices, filters} = useContext(invoiceContext);

	

	
	const items = () =>{
		if(invoices.length === 0) {
		return <NoInvoicesPage/>
	} else {
		const listItems = invoices.map((invoice) => {
			const {id, paymentDue, items, clientName, status} = invoice;
					return <ul className="invoicesList__list">
						<InvoicesItem 
						key={id}
						number={id} 
						dateDue={paymentDue} 
						amount={items[0].price} 
						name={clientName} 
						status={status}
						onShowPreview={onShowPreview}
						>
					</InvoicesItem>
					</ul>
					;
		});
		return listItems
	}}

	return (
		<section className="invoicesList">
			<Navigation/>
			{filters.length > 0 ? <div className="container">
				{items()}
			</div> : <NoInvoicesPage/>}
		</section>
	);
};

export default InvoicesList;
