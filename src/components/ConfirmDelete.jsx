import React, { useContext } from "react";
import "../styles/ConfirmDelete.scss";
import { useParams } from "react-router";
import invoiceContext from "../context/invoice/invoiceContext";
import darkContext from "../context/dark/darkContext";
import {Link} from 'react-router-dom';


const ConfirmDelete = ({confClose}) => {
  const { invoiceId } = useParams();
	
	const {deleteButtonClick} = useContext(invoiceContext);
	const {dark} = useContext(darkContext)
	
	return (
		<div className={`confirmDelete ${dark ? 'dark-header' : ''}`}>
			<div className="confirmDelete__overlay" >
				<div className={`confirmDelete__modal ${dark ? 'dark-header' : ''}`}>
					<h2 className="confirmDelete__title">Confirm Deletion</h2>
					<p className="confirmDelete__text">Are you sure you want to delete invoice #{invoiceId}? This action cannot be undone.</p>
					<div className="confirmDelete__buttons">
						<button className="confirmDelete__cancel" onClick={confClose}>Cancel</button>
						<Link style={{'color': 'white !important'}} to='/' className="confirmDelete__delete" onClick={deleteButtonClick}>Delete</Link>
					</div>
				</div>
			</div>
		</div>
	);
};

export default ConfirmDelete;
