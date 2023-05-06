import ButtonBack from "./ButtonBack";
import StatusElem from "./StatusElem";
import jsonData from "../data.json";
import { useParams } from "react-router";

import "../styles/InvoicePreview.scss";

const InvoicePreview = ({onHandleDelete, setOpenedInvoice}) => {
	const data = [...jsonData];

	const { invoiceId } = useParams();
	setOpenedInvoice(invoiceId)

	const singleData = data.filter((el) => el.id === invoiceId);
	const { id, description, senderAddress, clientAddress, total, createdAt, paymentDue, clientName, clientEmail, status } = singleData[0];

	const dateTransform = (date) => {
		const invoiceDate = new Date(date).toLocaleDateString("en-GB", { month: "short", day: "numeric", year: "numeric" });
		return invoiceDate;
	}

	const invoiceItems = singleData[0].items;

	const TotalItems = invoiceItems.map((elem,i) => {
		return (
			<div className="invoicePreview__list" key={i}>
				<ul className="invoicePreview__list-inner">
					<li className="invoicePreview__list-item">
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

	return (
		<div className="invoicePreview">
			<div className="container">
				<ButtonBack></ButtonBack>
				<div className="invoicePreview__status">
					<p className="invoicePreview__staus-text">Status</p>
					<StatusElem status={status}></StatusElem>
				</div>
				<div className="invoicePreview__info">
					<div className="invoicePreview__heading">
						<p className="invoicePreview__number">
							#<span>{id}</span>
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
						<div className="invoicePreview__bill-date">
							<label className="invoicePreview__labelDate label">Invoice Date</label>
							<p className="invoicePreview__invoiceDate big-fs">{dateTransform(createdAt)}</p>
						</div>
						<div className="invoicePreview__bill-dueDate">
							<label className="invoicePreview__labelDue label">Payment Due</label>
							<p className="invoicePreview__invoiceDue big-fs">{dateTransform(paymentDue)}</p>
						</div>
						<div className="invoicePreview__bill-addressTo label">
							<label className="invoicePreview__labelDate">Bill To</label>
							<p className="invoicePreview__clientName big-fs">{clientName}</p>
							<p className="invoicePreview__ToStreet">{clientAddress.street}</p>
							<p className="invoicePreview__ToCity">{clientAddress.city}</p>
							<p className="invoicePreview__ToPost">{clientAddress.postCode}</p>
							<p className="invoicePreview__ToCountry">{clientAddress.country}</p>
						</div>
					</div>
					<div className="invoicePreview__bill-email">
						<label className="invoicePreview__label-email label">Sent To</label>
						<p className="invoicePreview__email big-fs">{clientEmail}</p>
					</div>
					{TotalItems}
					<div className="invoicePreview__total">
						<p className="invoicePreview__total-text">Grand Total</p>
						<p className="invoicePreview__total-sum">
							£ <span>{total}</span>
						</p>
					</div>
				</div>
				<div className="invoicePreview__groupButtons">
					<button className="invoicePreview__btn-edit">Edit</button>
					<button className="invoicePreview__btn-delete" >Delete</button>
					<button className="invoicePreview__btn-paid" onClick={onHandleDelete}>Mark as Paid</button>
				</div>
			</div>
		</div>
	);
};

export default InvoicePreview;
