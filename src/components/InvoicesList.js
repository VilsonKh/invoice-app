import "../styles/InvoicesList.scss";
import InvoicesItem from "./InvoicesItem";
import Data from "../data.json";

const InvoicesList = () => {
	const elements = Data.map((invoice) => {
		const {id, paymentDue, items, clientName, status} = invoice;
				return <InvoicesItem 
					key={id}
					number={id} 
					dateDue={paymentDue} 
					amount={items[0].price} 
					name={clientName} 
					status={status}>
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
