import { useFormContext } from "react-hook-form";
import { postNewInvoice } from "../../firebase/service";
import { useContext } from "react";
import invoiceContext from "../../context/invoice/invoiceContext";
import { getFormatedDate } from "../helpers/formatDate";
import { createRandomInvoiceNumber } from "../helpers/createInvoiceNumber";

const NewInvoiceButtons = () => {
	const formData = useFormContext();
	const {setIsNewInvoice, setIsEditInvoice} = useContext(invoiceContext)
		//создает новый рандомный ID


	const newInvoiceSubmitHandler = (data, e) => {

		//суммирует items
		let itemsSum = 0;
		data.items.forEach((item) => {
			itemsSum += +item.total;
		});
		data.total = itemsSum;
		const status = e.target.getAttribute('id')
		data.status = status;
		data.invoiceId = createRandomInvoiceNumber();

		const paymentDue = new Date(new Date(data.createdAt).setDate(new Date(data.createdAt).getDate() + parseInt(data.paymentTerms)));
		data.paymentDue = getFormatedDate(paymentDue)


		//разделяет объект
		const items = [...data.items];
		delete data.items;
		delete data.inputs;

		if (!items.length) {
		} else {
			postNewInvoice(data, items);
		}
		setIsNewInvoice(false)
		setIsEditInvoice(false)	
	};

	return (
		// onClick={onSaveButtonsClick}
		<div className="addInvoice__groupButtons">
			<button type="submit" form="newInvoice" id="discard" className="addInvoice__discard btn-status" onClick={() => setIsNewInvoice(false)}>
				Discard
			</button>
			<button type="submit" form="newInvoice" id="draft" className="addInvoice__draft btn-status" onClick={formData.handleSubmit((data, e) => newInvoiceSubmitHandler(data, e))}>
				Save as Draft
			</button>
			<button type="submit" form="newInvoice" id="pending" className="addInvoice__send btn-status" onClick={formData.handleSubmit((data, e) => newInvoiceSubmitHandler(data, e))}>
				Save & Send
			</button>
		</div>
	);
};

export default NewInvoiceButtons;
