import "../styles/InvoicesList.scss";
import InvoicesItem from "./InvoicesItem";
import Navigation from "./Navigation";
import invoiceContext from '../context/invoice/invoiceContext';
import { useContext } from "react";
import darkContext from "../context/dark/darkContext";


const InvoicesList = ({onShowPreview, currentInvoice, isDelete}) => {

	const{dark} = useContext(darkContext);
	const {invoices} = useContext(invoiceContext);
	
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
