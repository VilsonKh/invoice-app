import React, { useContext } from "react";
import darkContext from "../../context/dark/darkContext";
import { useFormContext } from "react-hook-form";
import { updateInvoice } from "../../firebase/service";
import invoiceContext from "../../context/invoice/invoiceContext";

const EditInvoiceButtons = () => {
	const { dark } = useContext(darkContext);
	const formData = useFormContext();
	const { setIsEditInvoice, setIsNewInvoice, currentInvoiceId, currentInvoiceNumber, invoices, invoiceItems} = useContext(invoiceContext);


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

		//собирает id items, которые надо удалить, чтобы передать в функцию и удалить
		let deletedItems = [];

		invoiceItems.forEach((item) => {
			fieldItems.forEach((fieldItem) => {
				if(item.itemId !== fieldItem.itemId) {
					deletedItems.push(item.itemId)
				}
			})
		})

		if (!fieldItems.length) {
		} else {
			updateInvoice(currentInvoiceId, data, fieldItems, deletedItems);
			setIsNewInvoice(false)
			setIsEditInvoice(false)	
		}
	};

	return (
		<div className="editInvoice__buttons">
			<button className={`editInvoice__cancel ${dark ? "dark-light dark-font" : ""}`} onClick={() => {setIsEditInvoice(false); setIsNewInvoice(false)}}>Cancel</button>
			<button className="editInvoice__save" type="submit" form="newInvoice" onClick={formData.handleSubmit(saveChangesHandler)}>
				Save Changes
			</button>
		</div>
	);
};

export default EditInvoiceButtons;
