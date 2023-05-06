import { Link } from "react-router-dom";
import "../styles/InvoicesItem.scss";
import StatusElem from "./StatusElem";

const InvoicesItem = ({ number, name, dateDue, amount, status, onShowPreview }) => {
	let price = amount.toLocaleString("en-US");
  let dateText = new Date(dateDue).toLocaleDateString('en-GB',{month: "short", day: 'numeric', year: 'numeric'});

	return (
		<Link to={`/${number }`} key={number} number={number} className="invoicesList__item d-flex justify-content-between">

				<div className="invoicesList__item-left">
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
