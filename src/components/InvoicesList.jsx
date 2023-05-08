import "../styles/InvoicesList.scss";
import InvoicesItem from "./InvoicesItem";
import jsonData from "../data.json";
import Navigation from "./Navigation";



const InvoicesList = ({onShowPreview, currentInvoice, isDelete}) => {
	const data = [...jsonData];

	// const onDelete = () => {
	// 	console.log(`deleted ${currentInvoice}`);
	// 	return data.splice(data.findIndex(elem => elem.id === currentInvoice), 1)
	// }

	const elements = data.map((invoice) => {
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
				<ul className="invoicesList__list">{elements}</ul>
			</div>
		</section>
	);
};

export default InvoicesList;
