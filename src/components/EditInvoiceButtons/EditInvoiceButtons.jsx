import React, { useContext } from "react";
import darkContext from "../../context/dark/darkContext";
import { useFormContext } from "react-hook-form";
import { updateInvoice } from "../../firebase/service";
import invoiceContext from "../../context/invoice/invoiceContext";

const EditInvoiceButtons = () => {
	const { dark } = useContext(darkContext);
	const formData = useFormContext();
	const { currentInvoiceId, currentInvoiceNumber, invoices } = useContext(invoiceContext);

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
		const items = [...data.items];
		delete data.inputs;
		delete data.items;
		console.log(items)
		if (!items.length) {
			console.log(" items пустой");
		} else {
			console.log("форма отправлена");
			console.log(data)
			updateInvoice(currentInvoiceId, data, items);
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
