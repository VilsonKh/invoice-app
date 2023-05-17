import ButtonBack from "./ButtonBack";
import StatusElem from "./StatusElem";
import ConfirmDelete from "./ConfirmDelete";
import { useParams } from "react-router";
import { useContext, useState } from "react";
import { useNavigate } from "react-router";

import "../styles/InvoicePreview.scss";
import invoiceContext from "../context/invoice/invoiceContext";
import darkContext from "../context/dark/darkContext";
import { Link } from "react-router-dom";
import EditInvoice from "./EditInvoice";



const InvoicePreview = ({setOpenedInvoice, openedInvoice}) => {
	const {invoices,  markAsPaid, currentInvoice, currentInvoiceData} = useContext(invoiceContext);
	const {dark} = useContext(darkContext)
	const { invoiceId } = useParams();

	setOpenedInvoice(invoiceId);

	const [confDelete,setConfDelete] = useState(false);
	const [openEdit, setOpenEdit] = useState(false)

	const onHandleOpen = () => {
		setConfDelete(true);
	}

	const onHandleClose = () => {
		setConfDelete(false);
	}

	const { id, description, senderAddress, clientAddress, total, createdAt, paymentDue, clientName, clientEmail, status } = currentInvoiceData[0];

	const dateTransform = (date) => {
		const invoiceDate = new Date(date).toLocaleDateString("en-GB", { month: "short", day: "numeric", year: "numeric" });
		return invoiceDate;
	}

	const invoiceItems = currentInvoiceData[0].items;

	const TotalItems = invoiceItems.map((elem,i) => {
		return (
			<div className="invoicePreview__list" key={i}>
				<ul className="invoicePreview__list-inner">
					<li className={`invoicePreview__list-item ${dark ? 'dark-light' : ''}`}>
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
		<>
			{confDelete ? <ConfirmDelete confClose={onHandleClose}></ConfirmDelete> : null}
			{openEdit ? <EditInvoice></EditInvoice> : <div className={`invoicePreview ${dark ? 'dark-nav' : ''}`}>
				<div className="container">
					<ButtonBack></ButtonBack>
					<div className={`invoicePreview__status ${dark ? 'dark-header' : ''}`}>
						<p className="invoicePreview__staus-text">Status</p>
						<StatusElem status={status}></StatusElem>
					</div>
					<div className={`invoicePreview__info ${dark ? 'dark-header' : ''}`}>
						<div className="invoicePreview__heading">
							<p className="invoicePreview__number">
								#<span className={`${dark ? 'dark-font' : ''}`}>{id}</span>
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
								<p className={`invoicePreview__invoiceDate ${dark ? 'dark-font' : ''}`} big-fs>{dateTransform(createdAt)}</p>
							</div>
							<div className="invoicePreview__bill-dueDate">
								<label className="invoicePreview__labelDue label">Payment Due</label>
								<p className={`invoicePreview__invoiceDue big-fs ${dark ? 'dark-font' : ''}`} >{dateTransform(paymentDue)}</p>
							</div>
							<div className="invoicePreview__bill-addressTo label">
								<label className="invoicePreview__labelDate">Bill To</label>
								<p className={`invoicePreview__clientName big-fs ${dark ? 'dark-font' : ''}`}>{clientName}</p>
								<p className="invoicePreview__ToStreet">{clientAddress.street}</p>
								<p className="invoicePreview__ToCity">{clientAddress.city}</p>
								<p className="invoicePreview__ToPost">{clientAddress.postCode}</p>
								<p className="invoicePreview__ToCountry">{clientAddress.country}</p>
							</div>
						</div>
						<div className="invoicePreview__bill-email">
							<label className="invoicePreview__label-email label">Sent To</label>
							<p className={`invoicePreview__email big-fs ${dark ? 'dark-font' : ''}`}>{clientEmail}</p>
						</div>
						{TotalItems}
						<div className={`invoicePreview__total ${dark ? 'dark-black' : ''}`}>
							<p className="invoicePreview__total-text">Amount Due</p>
							<p className="invoicePreview__total-sum">
								£ <span>{total}</span>
							</p>
						</div>
					</div>
					<div className={`invoicePreview__groupButtons ${dark ? 'dark-header' : ''}`}>
						<button onClick={() => {setOpenEdit(true)}} className="invoicePreview__btn-edit">Edit</button>
						
						<button className="invoicePreview__btn-delete" onClick={onHandleOpen}>Delete</button>
						<button className="invoicePreview__btn-paid" onClick={() => markAsPaid(id)} >Mark as Paid</button>
					</div>
			
				</div>
			</div>}
			
		</>
	);
};

export default InvoicePreview;
