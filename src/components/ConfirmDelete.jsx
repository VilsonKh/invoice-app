import React from "react";
import "../styles/ConfirmDelete.scss";
import { useParams } from "react-router";
import { useReducer } from "react";
import invoiceReducer, { initialState } from "../context/invoice/invoiceReducer";

const ConfirmDelete = ({confClose}) => {
  const { invoiceId } = useParams();
	const [state, dispatch] = useReducer(invoiceReducer, initialState );

	const handleDeleteButton = () => {
		dispatch({type: 'DELETE_CONFIRMATION', payload: true})
	}
	return (
		<div className="confirmDelete">
			<div className="confirmDelete__overlay" >
				<div className="confirmDelete__modal">
					<h2 className="confirmDelete__title">Confirm Deletion</h2>
					<p className="confirmDelete__text">Are you sure you want to delete invoice #{invoiceId}? This action cannot be undone.</p>
					<div className="confirmDelete__buttons">
						<button className="confirmDelete__cancel" onClick={confClose}>Cancel</button>
						<button className="confirmDelete__delete" onClick={handleDeleteButton}>Delete</button>
					</div>
				</div>
			</div>
		</div>
	);
};

export default ConfirmDelete;
