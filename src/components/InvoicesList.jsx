import "../styles/InvoicesList.scss";
import InvoicesItem from "./InvoicesItem";
import Navigation from "./Navigation";
import invoiceContext from '../context/invoice/invoiceContext';
import { useContext} from "react";
import NoInvoicesPage from "./NoInvoicesPage";
import '../styles/customBootstrap.scss';

const InvoicesList = ({onShowPreview, setClickNewInvoice}) => {

	const {invoices, filters} = useContext(invoiceContext);

	const items = () =>{
		if(invoices.length === 0) {
		return <NoInvoicesPage/>
	} else {
		const listItems = invoices.map((invoice) => {
			const {id, paymentDue, items, clientName, status} = invoice;
					return (
						<InvoicesItem key={id} number={id} dateDue={paymentDue} amount={items[0].price} name={clientName} status={status} onShowPreview={onShowPreview}></InvoicesItem>
					);
		});
		return listItems
	}}

	return (
		<section className="invoicesList">
			<Navigation onClickNewInvoice={setClickNewInvoice}/>
			{filters.length > 0 ? <div className="container">
				{<ul className="invoicesList__list">{items()}</ul>}
			</div> : <NoInvoicesPage/>}
		</section>
	);
};

export default InvoicesList;
