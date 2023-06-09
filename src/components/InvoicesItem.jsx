import { useContext } from "react";
import { Link, useLinkClickHandler, useParams } from "react-router-dom";
import darkContext from "../context/dark/darkContext";
import invoiceContext from "../context/invoice/invoiceContext";
import "../styles/InvoicesItem.scss";
import StatusElem from "./StatusElem";
import arrowRight from '../assets/icon-arrow-right.svg';

const InvoicesItem = ({ number, name, dateDue, amount, status }) => {
	let price = amount.toLocaleString("en-US");
  let dateText = new Date(dateDue).toLocaleDateString('en-GB',{month: "short", day: 'numeric', year: 'numeric'});
	const {dark} = useContext(darkContext)
	const {addCurrentInvoice} = useContext(invoiceContext)

	const onHandleClick = (e) => {
		const currentInvoice = e.target.getAttribute('number');
		console.log(currentInvoice)
	}

	return (
		<Link to={`/${number }`} key={number} number={number} className={`invoicesList__item d-flex justify-content-between ${dark ? ' dark-header' : ""}`} onClick={(e)=>{addCurrentInvoice(number)}}>

				<div className={`invoicesList__item-left ${dark ? 'dark-header' : ''}`}>
					<p className="item__number">
						<span>#</span>
						{number}
					</p>
					<p className="item__date">
						Due <span>{dateText}</span>
					</p>
					<p className="item__amount">
						£ <span>{price}</span>
					</p>
				</div>
				<div className="invoicesList__item-right">
					<p className="item__name">{name}</p>
					<StatusElem status={status}></StatusElem>
					<img className="item__arrowRight" src={arrowRight} alt="" />
				</div>

		</Link>
	);
};

export default InvoicesItem;
