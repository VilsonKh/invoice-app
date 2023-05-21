import ButtonBack from "./ButtonBack";
import StatusElem from "./StatusElem";
import ConfirmDelete from "./ConfirmDelete";
import { useParams } from "react-router";
import { useContext, useState } from "react";

import "../styles/InvoicePreview.scss";
import invoiceContext from "../context/invoice/invoiceContext";
import darkContext from "../context/dark/darkContext";
import EditInvoice from "./EditInvoice";

const InvoicePreview = ({ setOpenedInvoice }) => {
	const { markAsPaid, currentInvoiceData, setEditInvoice } = useContext(invoiceContext);

	const { id, description, senderAddress, clientAddress, total, createdAt, paymentDue, clientName, clientEmail, status } = currentInvoiceData[0];

	const { dark } = useContext(darkContext);
	const { invoiceId } = useParams();

	setOpenedInvoice(invoiceId);
	const [confDelete, setConfDelete] = useState(false);
	const [openEdit, setOpenEdit] = useState(false);
	const [currentStatus, setCurrentStatus] = useState(status);

	const onOpenEdit = () => {
		console.log('открывает редактор')
		setOpenEdit(true);
		console.log('изменяет контекст isEditInvoiceForm')
		setEditInvoice(true)
	}

	const onHandleOpen = () => {
		setConfDelete(true);
	};

	const onHandleClose = () => {
		setConfDelete(false);
	};

	const onMarkClick = () => {
		setCurrentStatus("paid");
		markAsPaid(id);
	};

	const dateTransform = (date) => {
		const invoiceDate = new Date(date).toLocaleDateString("en-GB", { month: "short", day: "numeric", year: "numeric" });
		return invoiceDate;
	};

	const invoiceItems = currentInvoiceData[0].items;

	const TotalItemsSM = invoiceItems.map((elem, i) => {
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

	const TotalItemsLG = invoiceItems.map((elem, e) => {
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
		<>
			{confDelete ? <ConfirmDelete confClose={onHandleClose}></ConfirmDelete> : null}
			{openEdit ? (
				<EditInvoice onClickCloseEditInvoice={setOpenEdit}></EditInvoice>
			) : (
				<div className={`invoicePreview ${dark ? "dark-nav" : ""}`}>
					<div className="container">
						<ButtonBack></ButtonBack>
						<div className={`invoicePreview__status ${dark ? "dark-header" : ""}`}>
							<p className="invoicePreview__staus-text">Status</p>
							<StatusElem status={currentStatus}></StatusElem>
							<div className={`invoicePreview__groupButtons invoicePreview__statusButtons ${dark ? "dark-header" : ""}`}>
								<button
									onClick={onOpenEdit}
									className="invoicePreview__btn-edit"
								>
									Edit
								</button>

								<button className="invoicePreview__btn-delete" onClick={onHandleOpen}>
									Delete
								</button>
								<button className="invoicePreview__btn-paid" onClick={() => markAsPaid(id)}>
									Mark as Paid
								</button>
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
							<button
								onClick={onOpenEdit}
								className="invoicePreview__btn-edit"
							>
								Edit
							</button>

							<button className="invoicePreview__btn-delete" onClick={onHandleOpen}>
								Delete
							</button>
							<button className="invoicePreview__btn-paid" onClick={onMarkClick} style={currentStatus === "paid" ? { opacity: "0.5" } : null}>
								Mark as Paid
							</button>
						</div>
					</div>
				</div>
			)}
		</>
	);
};

export default InvoicePreview;
