import React from "react";
import "../styles/ConfirmDelete.scss";
import { useParams } from "react-router";
import { useState } from "react";


const ConfirmDelete = ({confClose}) => {
  const { invoiceId } = useParams();

	return (
		<div className="confirmDelete">
			<div className="confirmDelete__overlay" onClick={confClose}>
				<div className="confirmDelete__modal">
					<h2 className="confirmDelete__title">Confirm Deletion</h2>
					<p className="confirmDelete__text">Are you sure you want to delete invoice #{invoiceId}? This action cannot be undone.</p>
					<div className="confirmDelete__buttons">
						<button className="confirmDelete__cancel" onClick={confClose}>Cancel</button>
						<button className="confirmDelete__delete">Delete</button>
					</div>
				</div>
			</div>
		</div>
	);
};

export default ConfirmDelete;
