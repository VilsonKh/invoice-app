import { useContext } from "react";
import { Link } from "react-router-dom";
import darkContext from "../context/dark/darkContext";
import "../styles/InvoicesItem.scss";
import StatusElem from "./StatusElem";

const InvoicesItem = ({ number, name, dateDue, amount, status, onShowPreview }) => {
	let price = amount.toLocaleString("en-US");
  let dateText = new Date(dateDue).toLocaleDateString('en-GB',{month: "short", day: 'numeric', year: 'numeric'});
	const {dark} = useContext(darkContext)
	return (
		<Link to={`/${number }`} key={number} number={number} className={`invoicesList__item d-flex justify-content-between ${dark ? ' dark-header' : ""}`}>

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
