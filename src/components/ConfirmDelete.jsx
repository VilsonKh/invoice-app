import React, { useContext } from "react";
import "../styles/ConfirmDelete.scss";
import { useParams } from "react-router";
import invoiceContext from "../context/invoice/invoiceContext";
const ConfirmDelete = ({confClose}) => {
  const { invoiceId } = useParams();
	
	const {deleteButtonClick} = useContext(invoiceContext);
	
	return (
		<div className="confirmDelete">
			<div className="confirmDelete__overlay" >
				<div className="confirmDelete__modal">
					<h2 className="confirmDelete__title">Confirm Deletion</h2>
					<p className="confirmDelete__text">Are you sure you want to delete invoice #{invoiceId}? This action cannot be undone.</p>
					<div className="confirmDelete__buttons">
						<button className="confirmDelete__cancel" onClick={confClose}>Cancel</button>
						<button className="confirmDelete__delete" onClick={deleteButtonClick}>Delete</button>
					</div>
				</div>
			</div>
		</div>
	);
};

export default ConfirmDelete;
