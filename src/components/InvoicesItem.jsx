import { useContext } from "react";
import { Link, useLinkClickHandler, useParams } from "react-router-dom";
import darkContext from "../context/dark/darkContext";
import invoiceContext from "../context/invoice/invoiceContext";
import "../styles/InvoicesItem.scss";
import StatusElem from "./StatusElem";

const InvoicesItem = ({ number, name, dateDue, amount, status }) => {
	let price = amount.toLocaleString("en-US");
  let dateText = new Date(dateDue).toLocaleDateString('en-GB',{month: "short", day: 'numeric', year: 'numeric'});
	const {dark} = useContext(darkContext)
	const {addCurrentInvoice} = useContext(invoiceContext)

	const onHandleClick = (e) => {
		const currentInvoice = e.target.getAttribute('number');
		console.log(currentInvoice)
	}

	console.log(number)

	return (
		<Link to={`/${number }`} key={number} number={number} className={`invoicesList__item d-flex justify-content-between ${dark ? ' dark-header' : ""}`} onClick={(e)=>{addCurrentInvoice(e.target.getAttribute('number'))}}>

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
				</div>

		</Link>
	);
};

export default InvoicesItem;
