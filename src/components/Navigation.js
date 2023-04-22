import Dropdown from "./Dropdown";

import addIcon from "../assets/icon-plus.svg";
import dropArrow from "../assets/icon-arrow-down.svg";
import "../styles/Navigation.scss";

const Navigation = () => {
	return (
		<nav className="nav">
			<div className="container d-flex justify-content-between">
				<div className="nav__info">
					<h1>Invoices</h1>
					<p>
						<span>7</span> invoices
					</p>
				</div>
				
				<Dropdown></Dropdown>
				<button className="nav__addButton d-flex align-items-center">
					<div className="addButton__icon">
						<img src={addIcon} alt="" />
					</div>
					<p>New</p>
				</button>
			</div>
		</nav>
	);
};

export default Navigation;
