import { useContext} from "react";
//styles
import "./InvoicePreview.scss";
//components
import ButtonBack from "../ButtonBack/ButtonBack";
import StatusElem from "../StatusElem/StatusElem";
import Form from "../Form/Form";
import ConfirmDelete from "../DeleteConf/DeleteConf";
//context
import invoiceContext from "../../context/invoice/invoiceContext";
import darkContext from "../../context/dark/darkContext";


const InvoicePreview = (setIsPreviewOpen) => {

	const { dark } = useContext(darkContext);
	const { invoices, 
					invoiceItems,
					currentInvoiceNumber, 
					setEditInvoice, 
					isEditInvoice, 
					markAsPaid, 
					isDeleteConf, 
					setDeleteConf 
				} = useContext(invoiceContext);

	const currentInvoice = [...invoices].filter((invoice) => {
		if (invoice.invoiceId === currentInvoiceNumber) {
			return invoice;
		}
	});

	const currentItems = invoiceItems.filter(item => {
		if(item.invoiceId === currentInvoiceNumber) {
			return item
		}
	})

	const { status, 
					invoiceId, 
					description, 
					senderStreet,
					senderCity,
					senderPostCode,
					senderCountry, 
					clientName, 
					clientStreet,
					clientCity,
					clientPostCode,
					clientCountry, 
					clientEmail, 
					createdAt, 
					paymentDue, 
					total 
				} = currentInvoice[0];

	

	const dateTransform = (date) => {
		const invoiceDate = new Date(date).toLocaleDateString("en-GB", { month: "short", day: "numeric", year: "numeric" });
		return invoiceDate;
	};

	const TotalItemsSM = currentItems.map((elem, i) => {
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


	const TotalItemsLG = currentItems.map((elem, i) => {
		return (
			<tr key={i}>
				<td>{elem.name}</td>
				<td className="invoicePreview__qtyCell">{elem.quantity}</td>
				<td className="invoicePreview__priceCell">{elem.price}</td>
				<td className="invoicePreview__totalCell">{elem.total}</td>
			</tr>
		);
	});

	return (
		<>
			{isEditInvoice && <Form />}
			{isDeleteConf && <ConfirmDelete />}
			<div className={`invoicePreview ${dark ? "dark-nav" : ""}`}>
				<div className="container">
					<ButtonBack setIsPreviewOpen={setIsPreviewOpen}></ButtonBack>
					<div className={`invoicePreview__status ${dark ? "dark-header" : ""}`}>
						<p className="invoicePreview__staus-text">Status</p>
						<StatusElem status={status}></StatusElem>
						<div className={`invoicePreview__groupButtons invoicePreview__statusButtons ${dark ? "dark-header" : ""}`}>
					
							<button 	onClick={() => setEditInvoice(true)}  className={`invoicePreview__btn-edit ${dark ? "dark-light dark-font_purple" : ""}`}>
								Edit
							</button>

							<button onClick={() => setDeleteConf(true)} className="invoicePreview__btn-delete">
								Delete
							</button>
							<button onClick={markAsPaid} style={status === "paid" ? { opacity: "0.5" } : null} className="invoicePreview__btn-paid">
								Mark as Paid
							</button>
						</div>
					</div>
					<div className={`invoicePreview__info ${dark ? "dark-header" : ""}`}>
						<div className="invoicePreview__heading">
							<p className="invoicePreview__number">
								#<span className={`${dark ? "dark-font" : ""}`}>{invoiceId}</span>
							</p>
							<p className="invoicePreview__description">{description}</p>
						</div>
						<div className="invoicePreview__address label">
							<p className="invoicePreview__street">{senderStreet}</p>
							<p className="invoicePreview__city">{senderCity}</p>
							<p className="invoicePreview__post">{senderPostCode}</p>
							<p className="invoicePreview__country">{senderCountry}</p>
						</div>
						<div className="invoicePreview__bill">
							<div>
								<div className="invoicePreview__bill-date">
									<label className="invoicePreview__labelDate label">Invoice Date</label>
									<p className={`invoicePreview__invoiceDate ${dark ? "dark-font" : ""}`}>
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
								<p className="invoicePreview__ToStreet">{clientStreet}</p>
								<p className="invoicePreview__ToCity">{clientCity}</p>
								<p className="invoicePreview__ToPost">{clientPostCode}</p>
								<p className="invoicePreview__ToCountry">{clientCountry}</p>
							</div>
						</div>
						<div className="invoicePreview__bill-email">
							<label className="invoicePreview__label-email label">Sent To</label>
							<p className={`invoicePreview__email big-fs ${dark ? "dark-font" : ""}`}>{clientEmail}</p>
						</div>
						<div className="invoicePreview__totalItems">
							{window.screen.width > "767" ? (<div className="invoicePreview__table-container">
									<table className={`invoicePreview__table ${dark ? "dark-light" : ""}`}>
										<thead className="invoicePreview__tableHead">
											<tr>
												<th>Item Name</th>
												<th className="invoicePreview__qtyCell">QTY.</th>
												<th className="invoicePreview__priceCell">Price</th>
												<th className="invoicePreview__totalCell">Total</th>
											</tr>
										</thead>
										<tbody>
											{TotalItemsLG}
										</tbody>
									</table>
								</div>) : (
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
						<button onClick={() => setEditInvoice(true)} className={`invoicePreview__btn-edit ${dark ? "dark-light dark-font_purple" : ""}`}>
							Edit
						</button>
						<button onClick={() => setDeleteConf(true)} className="invoicePreview__btn-delete">Delete</button>
						<button onClick={markAsPaid} className="invoicePreview__btn-paid" style={status === "paid" ? { opacity: "0.5" } : null}>
							Mark as Paid
						</button>
					</div>
				</div>
			</div>
		</>
	);
};
export default InvoicePreview;
