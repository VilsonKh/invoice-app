import { useContext } from "react";
import darkContext from "../context/dark/darkContext";
import invoiceContext from "../context/invoice/invoiceContext";
import "../styles/Dropdown.scss";

const Dropdown = () => {
	const {dark} = useContext(darkContext);
	const {onFilterClick} = useContext(invoiceContext)



	return (
		<div className={`nav__dropdown d-flex align-items-center ${dark ? 'dark-font' : ''}`}>
					<form className="dropdown nav__dropdown d-flex align-items-center">
						<button className={`dropdown__button ${dark ? 'dark-font' : ''}`} type="button"  data-bs-toggle="dropdown" aria-expanded="false">
							Filter
						</button>
						<ul className="dropdown-menu">
							<li className="dropdown-item">
								<div className="dropdown__item-container">
									<input onChange={(e) => onFilterClick(e.target.id)} className="dropdown__input" id="draft" type="checkbox" defaultChecked/>
									<label htmlFor="draft" className="dropdown__label">
										Draft
									</label>
								</div>
							</li>
							<li className="dropdown-item">
								<div className="dropdown__item-container">
									<input onChange={(e) => onFilterClick(e.target.id)} className="dropdown__input" id="pending" type="checkbox" defaultChecked/>
									<label htmlFor="pending" className="dropdown__label">
										Pending
									</label>
								</div>
							</li>
							<li className="dropdown-item">
								<div className="dropdown__item-container">
									<input onChange={(e) => onFilterClick(e.target.id)} className="dropdown__input" id="paid" type="checkbox" defaultChecked/>
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
