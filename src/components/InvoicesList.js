import "../styles/InvoicesList.scss";
import InvoicesItem from "./InvoicesItem";
import jsonData from "../data.json";

const InvoicesList = ({onShowPreview}) => {
	const data = [...jsonData];
		
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
			<div className="container">
				<ul className="invoicesList__list">{elements}</ul>
			</div>
		</section>
	);
};

export default InvoicesList;
