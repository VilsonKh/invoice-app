import "../styles/InvoicesItem.scss";

const InvoicesItem = ({ number, name, dateDue, amount, status }) => {
	let price = amount.toLocaleString("en-US");
  let dateText = new Date(dateDue).toLocaleDateString('en-GB',{month: "short", day: 'numeric', year: 'numeric'});

	const StatusElem = () => {

    let statusText = "";

    if(!status) {
      return statusText = 'Processing...'
    } else {
      statusText = status[0].toUpperCase() + status.slice(1)
    }
     
		return (
			<div className={`item__status-container d-flex align-items-center ${status}-bg`}>
				<div className={`item__status-icon ${status}-icon`}></div>
				<p className={`item__status ${status}-ft`}>{statusText}</p>
			</div>
		);
	};

	return (
		<li className="invoicesList__item d-flex justify-content-between">
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
				<StatusElem></StatusElem>
			</div>
		</li>
	);
};

export default InvoicesItem;
