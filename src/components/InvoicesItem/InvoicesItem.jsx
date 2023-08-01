//styles
import "./InvoicesItem.scss";
//components
import StatusElem from "../StatusElem/StatusElem";
//img
import arrowRight from "../../assets/icon-arrow-right.svg";
//hooks
import { useContext } from "react";
import darkContext from "../../context/dark/darkContext";

const InvoicesItem = ({ id, number, name, dateDue, status, total }) => {
	const { dark } = useContext(darkContext);
	let dateText = new Date(dateDue).toLocaleDateString("en-GB", { month: "short", day: "numeric", year: "numeric" });

	const invoiceTotal = parseInt(total).toFixed(2);

	return (
		<li key={number} id={id} data-number={number} data-testid="invoiceItem" className={`invoicesList__item ${dark ? " dark-header" : ""}`}>
			<p className="item__number">
				<span>#</span>
				{number}
			</p>
			<p className="item__date">
				Due <span>{dateText}</span>
			</p>
			<p className="item__name">{name}</p>
			<p className="item__amount">
				£ <span>{invoiceTotal > 1000000 ? (+invoiceTotal / 1000000).toFixed(1) + " mln." : invoiceTotal.toLocaleString("en-GB")}</span>
			</p>
			<StatusElem status={status}></StatusElem>
			<img className="item__arrowRight" src={arrowRight} alt="" />
		</li>
	);
};

export default InvoicesItem;
