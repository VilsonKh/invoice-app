//hooks
import { useContext } from "react";
//context
import darkContext from "../../context/dark/darkContext";
import invoiceContext from "../../context/invoice/invoiceContext";
//form control lib
import { useFormContext } from "react-hook-form";
//service
import { queryInvoiceItems, updateInvoice } from "../../firebase/service";

//component should renders, when isEditInvoice state is true
const EditInvoiceButtons = () => {
	const { dark } = useContext(darkContext);
	const { handleSubmit } = useFormContext();
	const { setIsEditInvoice, 
					setIsNewInvoice, 
					currentInvoiceId, 
					currentInvoiceNumber, 
					invoices, 
					invoiceItems, 
					getInvoiceItems } = useContext(invoiceContext);

	//function fires when user click on 'Save changes', get data, transform it and post to the firestore
	const saveChangesHandler = (data) => {
		//variable is used to accumulate sums from dynamic inputs to pass the sum into firestore
		let itemsSum = 0;
		data.items.forEach((item) => {
			itemsSum += +item.total;
		});
		data.total = itemsSum;
		//data from form doesn't consist invoice id
		data.invoiceId = currentInvoiceNumber;
		//data from form doesn't consist invoice status
		invoices.forEach((invoice) => {
			if (invoice.invoiceId === currentInvoiceNumber) {
				data.status = invoice.status;
			}
		});
		//splite dynamic inputs data to pass it into invoice subcollection in firestore
		const fieldItems = [...data.items];
		delete data.inputs;
		delete data.items;

		//accumulate item's id, which should be deleted, to pass into delete function
		let deletedItems = [];

		invoiceItems.forEach((item) => {
			fieldItems.forEach((fieldItem) => {
				if (item.itemId !== fieldItem.itemId) {
					deletedItems.push(item.itemId);
				}
			});
		});
		//update is needed to see changes immediately
		updateInvoice(currentInvoiceId, data, fieldItems, deletedItems);

		queryInvoiceItems(currentInvoiceId, getInvoiceItems)
		setIsNewInvoice(false);
		setIsEditInvoice(false);
	};

	return (
		<div className="editInvoice__buttons">
			<button
				className={`editInvoice__cancel ${dark ? "dark-light dark-font" : ""}`}
				onClick={() => {
					setIsEditInvoice(false);
					setIsNewInvoice(false);
				}}
			>
				Cancel
			</button>
			<button className="editInvoice__save" 
							type="submit" 
							form="newInvoice" 
							onClick={handleSubmit(saveChangesHandler)}>
				Save Changes
			</button>
		</div>
	);
};

export default EditInvoiceButtons;
