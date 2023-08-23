//styles
import "./InvoicesList.scss";
//components
import Navigation from "../Navigation/Navigation";
import NoInvoicesPage from "../NoInvoicesPage/NoInvoicesPage";
import InvoicesItem from "../InvoicesItem/InvoicesItem";
//hooks
import { useContext } from "react";
//context
import invoiceContext from "../../context/invoice/invoiceContext";
//service
import { queryInvoiceItems, useQueryAllInvoicesData } from "../../firebase/service";

const InvoicesList = () => {
	const { invoices, setCurrentInvoiceNumber, setPreviewInvoice, setCurrentInvoiceId, getInvoiceItems, isPending, filters, setIsInvoicesListVisible } = useContext(invoiceContext);

	useQueryAllInvoicesData();

	const items = () => {
		if (invoices.length === 0) {
			return <NoInvoicesPage />;
		} else {
			const listItems = invoices.map((invoice) => {
				const { invoiceId, id, paymentDue, clientName, status, total } = invoice;
				return <InvoicesItem key={id} id={id} number={invoiceId} dateDue={paymentDue} name={clientName} status={status} total={total} />;
			});
			return listItems;
		}
	};

	const getCurrentInvoiceNumber = async (e) => {
		const target = e.target.closest(".invoicesList__item");
		if (target === null) {
			return;
		} else {
			const currentInvoiceNumber = target.getAttribute("data-number");
			const currentInvoiceId = target.getAttribute("id");
			setCurrentInvoiceNumber(currentInvoiceNumber);
			setCurrentInvoiceId(currentInvoiceId);
			await queryInvoiceItems(currentInvoiceId, getInvoiceItems);
		}
		setPreviewInvoice(true);
	};

	return (
		<section className="invoicesList">
			<Navigation />
			{filters.length > 0 ? (
				<div className="container">
					{
						<ul onClick={(e) => getCurrentInvoiceNumber(e)} className="invoicesList__list">
								{isPending ? <span className="loader"></span> : items()}
						</ul>
					}
				</div>
			) : (  
				<NoInvoicesPage /> 
			)}
		</section>
	);
};

export default InvoicesList;
