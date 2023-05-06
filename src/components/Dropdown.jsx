import "../styles/Dropdown.scss";

const Dropdown = () => {
	return (
		<div className="nav__dropdown d-flex align-items-center">
					<form className="dropdown nav__dropdown d-flex align-items-center">
						<button className="dropdown__button" type="button"  data-bs-toggle="dropdown" aria-expanded="false">
							Filter
						</button>
						<ul className="dropdown-menu">
							<li className="dropdown-item">
								<div className="dropdown__item-container">
									<input className="dropdown__input" id="draft" type="checkbox" />
									<label htmlFor="draft" className="dropdown__label">
										Draft
									</label>
								</div>
							</li>
							<li className="dropdown-item">
								<div className="dropdown__item-container">
									<input className="dropdown__input" id="pending" type="checkbox" />
									<label htmlFor="pending" className="dropdown__label">
										Pending
									</label>
								</div>
							</li>
							<li className="dropdown-item">
								<div className="dropdown__item-container">
									<input className="dropdown__input" id="paid" type="checkbox" />
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
