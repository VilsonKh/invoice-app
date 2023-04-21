import "../styles/InvoicesList.scss";
import InvoicesItem from "./InvoicesItem";
const InvoicesList = () => {
	return (
		<section className="invoicesList">
		<div className="container">
			  <ul className="invoicesList__list">
	  			<InvoicesItem></InvoicesItem>
	  		</ul>
		</div>
		</section>
	);
};

export default InvoicesList;
