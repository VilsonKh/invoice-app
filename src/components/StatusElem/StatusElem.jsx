import { useContext } from "react";
import "./StatusElem.scss";
import darkContext from "../../context/dark/darkContext";

// component receives status like 'paid', 'pending' of 'paid' and renders with correct theme
const StatusElem = ({ status }) => {
	const { dark } = useContext(darkContext);
	let statusText = "";

	!status ? statusText = "Processing..." : statusText = status[0].toUpperCase() + status.slice(1);
	
	return (
		<div className={`item__status-container d-flex align-items-center ${status}-bg`}>
			<div className={`item__status-icon ${status}-icon ${dark && status === "draft" ? "dark-bg" : ""}`}></div>
			<p className={`item__status ${status}-ft ${dark && status === "draft" ? "dark-font" : ""} `}>{statusText}</p>
		</div>
	);
};

export default StatusElem;
