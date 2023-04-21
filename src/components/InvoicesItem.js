import "../styles/InvoicesItem.scss"

const InvoicesItem = () => {
	return (
		<li className="invoicesList__item d-flex justify-content-between">
			<div className="invoicesList__item-left">
				<p className="item__number">
					<span>#</span>RT3080
				</p>
				<p className="item__date">
					Due <span>19 Aug 2021</span>
				</p>
				<p className="item__amount">
					£ <span>1,800.90</span>
				</p>
			</div>
			<div className="invoicesList__item-right">
				<p className="item__name">Jensen Huang</p>
				<div className="item__status-container d-flex align-items-center">
					<div className="item__status-icon"></div>
					<p className="item__status">Paid</p>
				</div>
			</div>
		</li>
	);
};

export default InvoicesItem;