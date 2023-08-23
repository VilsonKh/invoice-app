import { useContext } from "react";
//styles
import "./InvoicePreview.scss";
//components
import ButtonBack from "../ButtonBack/ButtonBack";
import StatusElem from "../StatusElem/StatusElem";
import ConfirmDelete from "../ConfirmDelete/ConfirmDelete";
//context
import invoiceContext from "../../context/invoice/invoiceContext";
import darkContext from "../../context/dark/darkContext";
import PreviewButtons from "../PreviewButtons/PreviewButtons";
import { CSSTransition } from "react-transition-group";
import { useRef } from "react";
import { tabWidth } from "../helpers/const";

//renders preview component when isPreview invoice state is true
const InvoicePreview = () => {
	const { dark } = useContext(darkContext);
	const { invoices, 
					invoiceItems, 
					currentInvoiceNumber, 
					isPreviewInvoice, 
					setIsInvoicesListVisible} = useContext(invoiceContext);

	const currentInvoice = [...invoices].filter((invoice) => invoice.invoiceId === currentInvoiceNumber )

	const {
		status,
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
		paymentTerms,
		total,
	} = currentInvoice?.[0] ?? {};

	//increases the 'created' date by the number of days defined by user in form 
	const paymentDue = new Date(new Date(createdAt).setDate(new Date(createdAt).getDate() + parseInt(paymentTerms)));

	//transforms date into UK format
	const dateTransform = (date) => {
		const invoiceDate = new Date(date).toLocaleDateString("en-GB", { month: "short", day: "numeric", year: "numeric" });
		return invoiceDate;
	};

	//returns a list items for mobile and tabs
	const TotalItemsSM = invoiceItems.map((elem, i) => {
		return (
			<li key={i} className={`invoicePreview__list-item ${dark ? "dark-light" : ""}`}>
				<div className="invoicePreview__list-item-left">
					<p className="invoicePreview__itemName">{elem.name}</p>
					<p className="invoicePreview__qtySum">
						<span>{elem.quantity}</span> x £ <span>{parseInt(elem.price).toFixed()}</span>
					</p>
				</div>
				<div className="invoicePreview__list-item-right">
					£<span>{parseInt(elem.total).toFixed()}</span>
				</div>
			</li>
		);
	});
	//returns a list items for desktop
	const TotalItemsLG = invoiceItems.map((elem, i) => {
		return (
			<tr key={i}>
				<td>{elem.name}</td>
				<td className="invoicePreview__qtyCell">{elem.quantity}</td>
				<td className="invoicePreview__priceCell">{"£ " + parseInt(elem.price).toFixed().toLocaleString("en-GB")}</td>
				<td className="invoicePreview__totalCell">{"£ " + parseInt(elem.total).toFixed().toLocaleString("en-GB")}</td>
			</tr>
		);
	});

	const nodeRef = useRef(null)
	return (
		<>
			<ConfirmDelete />
			<CSSTransition
			in={isPreviewInvoice}
			timeout={500}
			classNames="translate"
			mountOnEnter
			unmountOnExit
			nodeRef={nodeRef}
			onEntering={() => {
				setIsInvoicesListVisible(false)
			}}
		>
				<div ref={nodeRef} className={`invoicePreview ${dark ? "dark-black" : ""}`} data-testid="invoicePreview">
					<div className="container">
						<ButtonBack/>
						<div className={`invoicePreview__status ${dark ? "dark-header" : ""}`}>
							<p className="invoicePreview__status-text">Status</p>
							<StatusElem status={status}></StatusElem>
							{window.screen.width > tabWidth ? <PreviewButtons status={status}/> : null}
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
										<p className={`invoicePreview__invoiceDate ${dark ? "dark-font" : ""}`}>{dateTransform(createdAt)}</p>
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
								{window.screen.width > tabWidth ? (
									<div className="invoicePreview__table-container">
										<table className={`invoicePreview__table ${dark ? "dark-light" : ""}`}>
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
									<div className="invoicePreview__list">
										<ul className="invoicePreview__list-inner">{TotalItemsSM}</ul>
									</div>
								)}
	
								<div className={`invoicePreview__total ${dark ? "dark-black" : ""}`}>
									<p className="invoicePreview__total-text">Amount Due</p>
									<p className="invoicePreview__total-sum">
										£ <span>{parseInt(total).toFixed().toLocaleString("en-GB")}</span>
									</p>
								</div>
							</div>
						</div>
						{window.screen.width < tabWidth ? <PreviewButtons status={status}/> : null}
					</div>
				</div>
			</CSSTransition>
		</>
	);
};
export default InvoicePreview;
