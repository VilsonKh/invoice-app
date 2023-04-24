import ButtonBack from "./ButtonBack";
import "../styles/InvoicePreview.scss";
import StatusElem from "./StatusElem";

const InvoicePreview = ({onHidePreview}) => {
	return (
		<div className="invoicePreview">
			<div className="container">
				<ButtonBack onClick={onHidePreview}></ButtonBack>
				<div className="invoicePreview__status">
					<p className="invoicePreview__staus-text">Status</p>
					<StatusElem></StatusElem>
				</div>
				<div className="invoicePreview__info">
					<div className="invoicePreview__heading">
						<p className="invoicePreview__number">
							#<span>XM9141</span>
						</p>
						<p className="invoicePreview__description">Graphic Design</p>
					</div>
					<div className="invoicePreview__address label">
						<p className="invoicePreview__street">19 Union Terrace</p>
						<p className="invoicePreview__city">London</p>
						<p className="invoicePreview__post">E1 3EZ</p>
						<p className="invoicePreview__country">United Kingdom</p>
					</div>
					<div className="invoicePreview__bill">
						<div className="invoicePreview__bill-date">
							<label className="invoicePreview__labelDate label">Invoice Date</label>
							<p className="invoicePreview__invoiceDate big-fs">21 Aug 2021</p>
						</div>
						<div className="invoicePreview__bill-dueDate">
							<label className="invoicePreview__labelDue label">Payment Due</label>
							<p className="invoicePreview__invoiceDue big-fs">20 Sept 2021</p>
						</div>
						<div className="invoicePreview__bill-addressTo label">
							<label className="invoicePreview__labelDate">Bill To</label>
							<p className="invoicePreview__clientName big-fs">Alex Grim</p>
							<p className="invoicePreview__ToStreet">84 Church</p>
							<p className="invoicePreview__ToCity">Brodford</p>
							<p className="invoicePreview__ToPost">BD19PB</p>
							<p className="invoicePreview__ToCountry">United Kingdom</p>
						</div>
					</div>
					<div className="invoicePreview__bill-email">
						<label className="invoicePreview__label-email label">Sent To</label>
						<p className="invoicePreview__email big-fs">alexgrim@mail.com</p>
					</div>

					<div className="invoicePreview__list">
						<ul className="invoicePreview__list-inner">
							<li className="invoicePreview__list-item">
								<div className="invoicePreview__list-item-left">
									<p className="invoicePreview__itemName">Banner Design</p>
									<p className="invoicePreview__qtySum">
										<span>1</span> x £ <span>156.00</span>
									</p>
								</div>
								<div className="invoicePreview__list-item-right">
									£<span>156.00</span>
								</div>
							</li>
						</ul>
					</div>
					<div className="invoicePreview__total">
						<p className="invoicePreview__total-text">Grand Total</p>
						<p className="invoicePreview__total-sum">
							£ <span>556.00</span>
						</p>
					</div>
				</div>
				<div className="invoicePreview__groupButtons">
					<button className="invoicePreview__btn-edit">Edit</button>
					<button className="invoicePreview__btn-delete">Delete</button>
					<button className="invoicePreview__btn-paid">Mark as Paid</button>
				</div>
			</div>
		</div>
	);
};

export default InvoicePreview;
