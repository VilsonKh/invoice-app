import { useContext } from "react";
//styles
import './InvoicePreview.scss'
//components
import ButtonBack from "../ButtonBack/ButtonBack";
import StatusElem from "../StatusElem/StatusElem";
//context
import invoiceContext from "../../context/invoice/invoiceContext";
import darkContext from "../../context/dark/darkContext";

const InvoicePreview = (setIsPreviewOpen) => {
	const { dark } = useContext(darkContext);
  const {invoices,currentInvoiceNumber} = useContext(invoiceContext)

  const currentInvoices = [...invoices].filter((invoice) => {
    if(invoice.id === currentInvoiceNumber) {
      return invoice
    }
  });
  const {status,id,description,senderAddress, clientName,clientAddress,clientEmail,createdAt,paymentDue,items,total} = currentInvoices[0];

  const dateTransform = (date) => {
		const invoiceDate = new Date(date).toLocaleDateString("en-GB", { month: "short", day: "numeric", year: "numeric" });
		return invoiceDate;
	};

  const TotalItemsSM = items.map((elem, i) => {
		return (
			<div className="invoicePreview__list" key={i}>
				<ul className="invoicePreview__list-inner">
					<li className={`invoicePreview__list-item ${dark ? "dark-light" : ""}`}>
						<div className="invoicePreview__list-item-left">
							<p className="invoicePreview__itemName">{elem.name}</p>
							<p className="invoicePreview__qtySum">
								<span>1</span> x £ <span>{elem.price}</span>
							</p>
						</div>
						<div className="invoicePreview__list-item-right">
							£<span>{elem.total}</span>
						</div>
					</li>
				</ul>
			</div>
		);
	});

	const TotalItemsLG = items.map((elem, e) => {
		return (
			<tr>
				<td>{elem.name}</td>
				<td className="invoicePreview__qtyCell">1</td>
				<td className="invoicePreview__priceCell">{elem.price}</td>
				<td className="invoicePreview__totalCell">{elem.total}</td>
			</tr>
		);
	});

	return (
		<div className={`invoicePreview ${dark ? "dark-nav" : ""}`}>
			<div className="container">
				<ButtonBack setIsPreviewOpen={setIsPreviewOpen}></ButtonBack>
				<div className={`invoicePreview__status ${dark ? "dark-header" : ""}`}>
					<p className="invoicePreview__staus-text">Status</p>
					<StatusElem status={status}></StatusElem>
					<div className={`invoicePreview__groupButtons invoicePreview__statusButtons ${dark ? "dark-header" : ""}`}>
						<button className="invoicePreview__btn-edit">Edit</button>

						<button className="invoicePreview__btn-delete">Delete</button>
						<button className="invoicePreview__btn-paid">Mark as Paid</button>
					</div>
				</div>
				<div className={`invoicePreview__info ${dark ? "dark-header" : ""}`}>
					<div className="invoicePreview__heading">
						<p className="invoicePreview__number">
							#<span className={`${dark ? "dark-font" : ""}`}>{id}</span>
						</p>
						<p className="invoicePreview__description">{description}</p>
					</div>
					<div className="invoicePreview__address label">
						<p className="invoicePreview__street">{senderAddress.street}</p>
						<p className="invoicePreview__city">{senderAddress.city}</p>
						<p className="invoicePreview__post">{senderAddress.postCode}</p>
						<p className="invoicePreview__country">{senderAddress.country}</p>
					</div>
					<div className="invoicePreview__bill">
						<div>
							<div className="invoicePreview__bill-date">
								<label className="invoicePreview__labelDate label">Invoice Date</label>
								<p className={`invoicePreview__invoiceDate ${dark ? "dark-font" : ""}`} big-fs>
									{dateTransform(createdAt)}
								</p>
							</div>
							<div className="invoicePreview__bill-dueDate">
								<label className="invoicePreview__labelDue label">Payment Due</label>
								<p className={`invoicePreview__invoiceDue big-fs ${dark ? "dark-font" : ""}`}>{dateTransform(paymentDue)}</p>
							</div>
						</div>
						<div className="invoicePreview__bill-addressTo label">
							<label className="invoicePreview__labelDate">Bill To</label>
							<p className={`invoicePreview__clientName big-fs ${dark ? "dark-font" : ""}`}>{clientName}</p>
							<p className="invoicePreview__ToStreet">{clientAddress.street}</p>
							<p className="invoicePreview__ToCity">{clientAddress.city}</p>
							<p className="invoicePreview__ToPost">{clientAddress.postCode}</p>
							<p className="invoicePreview__ToCountry">{clientAddress.country}</p>
						</div>
					</div>
					<div className="invoicePreview__bill-email">
						<label className="invoicePreview__label-email label">Sent To</label>
						<p className={`invoicePreview__email big-fs ${dark ? "dark-font" : ""}`}>{clientEmail}</p>
					</div>
					<div className="invoicePreview__totalItems">
						{window.screen.width > "767" ? (
							<div className="invoicePreview__table-container">
								<table className="invoicePreview__table">
									<thead className="invoicePreview__tableHead">
										<tr>
											<th>Item Name</th>
											<th className="invoicePreview__qtyCell">QTY.</th>
											<th className="invoicePreview__priceCell">Price</th>
											<th className="invoicePreview__totalCell">Total</th>
										</tr>
									</thead>
									<tbody>{TotalItemsLG}</tbody>
								</table>
							</div>
						) : (
							TotalItemsSM
						)}
						<div className={`invoicePreview__total ${dark ? "dark-black" : ""}`}>
							<p className="invoicePreview__total-text">Amount Due</p>
							<p className="invoicePreview__total-sum">
								£ <span>{total}</span>
							</p>
						</div>
					</div>
				</div>
				<div className={`invoicePreview__groupButtons ${dark ? "dark-header" : ""}`}>
					<button className="invoicePreview__btn-edit">
						Edit
					</button>

					<button className="invoicePreview__btn-delete" >
						Delete
					</button>
					<button className="invoicePreview__btn-paid" style={status === "paid" ? { opacity: "0.5" } : null}>
						Mark as Paid
					</button>
				</div>
			</div>
		</div>
	);
};
export default InvoicePreview;
