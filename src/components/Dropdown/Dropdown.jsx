//styles
import "./Dropdown.scss";
//hooks
import { useContext } from "react";
//context
import darkContext from "../../context/dark/darkContext";
import invoiceContext from "../../context/invoice/invoiceContext";

const Dropdown = () => {
	const {dark} = useContext(darkContext);
	const {changeFilters, changeShownInvoices} = useContext(invoiceContext)

	const onFilterClick = (e) => {
		const currentFilter = e.target.getAttribute('id');
		if(currentFilter === null) {
			return
		}
		changeFilters(currentFilter)
		changeShownInvoices()

	}

	return (
		<div className={`nav__dropdown d-flex align-items-center ${dark ? 'dark-font' : ''}`}>
					<form className="dropdown nav__dropdown d-flex align-items-center">
						<button className={`dropdown__button ${dark ? 'dark-font' : ''}`} type="button"  data-bs-toggle="dropdown" aria-expanded="false">
							{window.screen.width > "767" ? 'Filter by status' : 'Filter'}
						</button>
						<ul onClick={(e)=> onFilterClick(e)} className="dropdown-menu">
							<li className="dropdown-item">
								<div className="dropdown__item-container">
									<input className="dropdown__input" id="draft" type="checkbox" defaultChecked/>
									<label htmlFor="draft" className="dropdown__label">
										Draft
									</label>
								</div>
							</li>
							<li className="dropdown-item">
								<div className="dropdown__item-container">
									<input className="dropdown__input" id="pending" type="checkbox" defaultChecked/>
									<label htmlFor="pending" className="dropdown__label">
										Pending
									</label>
								</div>
							</li>
							<li className="dropdown-item">
								<div className="dropdown__item-container">
									<input className="dropdown__input" id="paid" type="checkbox" defaultChecked/>
									<label htmlFor="paid" className="dropdown__label">
										Paid
									</label>
								</div>
							</li>
						</ul>
					</form>
				</div>
	);
};

export default Dropdown;
