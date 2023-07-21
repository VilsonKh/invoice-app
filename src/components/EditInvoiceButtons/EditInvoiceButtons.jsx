import React, { useContext } from "react";
import darkContext from "../../context/dark/darkContext";
import { useFormContext } from "react-hook-form";
import { updateInvoice } from "../../firebase/service";
import invoiceContext from "../../context/invoice/invoiceContext";

const EditInvoiceButtons = () => {
	const { dark } = useContext(darkContext);
	const formData = useFormContext();
	const { currentInvoiceId, currentInvoiceNumber, invoices, invoiceItems} = useContext(invoiceContext);

console.log(invoiceItems)

	const saveChangesHandler = (data) => {
		let itemsSum = 0;
		data.items.forEach((item) => {
			itemsSum += +item.total;
		});
		data.total = itemsSum;
    data.invoiceId = currentInvoiceNumber
		// необходимо для сохранения статуса инвойса, так как форма его не содержит
		invoices.forEach((invoice) => {
			if(invoice.invoiceId === currentInvoiceNumber) {
				data.status = invoice.status
			}
		})
		//разделяет объект
		const fieldItems = [...data.items];
		delete data.inputs;
		delete data.items;

		let deletedItems = [];
		console.log(fieldItems)


		invoiceItems.forEach((item) => {
			fieldItems.forEach((fieldItem) => {
				if(item.itemId !== fieldItem.itemId) {
					deletedItems.push(item.itemId)
				}
			})
		})

		console.log(deletedItems)


		if (!fieldItems.length) {
			console.log("items пустой");
		} else {
			console.log("форма отправлена");
			
			console.log(data)
			updateInvoice(currentInvoiceId, data, fieldItems, deletedItems);
		}
	};

	//суммирует items

	return (
		<div className="editInvoice__buttons">
			{/* onClick={() => setEditInvoice(false)}  */}
			<button className={`editInvoice__cancel ${dark ? "dark-light dark-font" : ""}`}>Cancel</button>
			{/* onClick={formData.handleSubmit(onSubmitSave)} */}
			<button className="editInvoice__save" type="submit" form="newInvoice" onClick={formData.handleSubmit(saveChangesHandler)}>
				Save Changes
			</button>
		</div>
	);
};

export default EditInvoiceButtons;
