import { useFormContext } from "react-hook-form";
import { postNewInvoice } from "../../firebase/service";
import { useContext } from "react";
import invoiceContext from "../../context/invoice/invoiceContext";
import { getFormatedDate } from "../helpers/formatDate";

const NewInvoiceButtons = () => {
	const formData = useFormContext();
	const {setIsNewInvoice, setIsEditInvoice} = useContext(invoiceContext)
		//создает новый рандомный ID
		const createRandomInvoiceNumber = () => {
			const alphabet = "ABCDEFGHIJKLMNOPQRSTUVXYZ";
			let randomLetters = alphabet[Math.floor(Math.random() * alphabet.length)];
			let newInvoiceId = "";
			while (newInvoiceId.length < 2) {
				newInvoiceId += randomLetters;
				randomLetters = randomLetters = alphabet[Math.floor(Math.random() * alphabet.length)];
			}
			let randomNumb = Math.floor(Math.random() * (9999 + 1 - 1000)) + 1000;
			newInvoiceId += randomNumb;
			return newInvoiceId;
		};

	const saveAsDraftHandler = (data) => {
		//суммирует items
		let itemsSum = 0;
		data.items.forEach((item) => {
			itemsSum += +item.total;
		});
		data.total = itemsSum;
		data.status = "draft";
		data.invoiceId = createRandomInvoiceNumber();

		const paymentDue = new Date(new Date(data.createdAt).setDate(new Date(data.createdAt).getDate() + parseInt(data.paymentTerms)));
		data.paymentDue = getFormatedDate(paymentDue);

		//разделяет объект
		const items = [...data.items];
		delete data.items;
		if (!items.length) {
		} else {
			postNewInvoice(data, items);
		}
	};

	const saveAsPendingHandler = (data) => {
		//суммирует items
		let itemsSum = 0;
		data.items.forEach((item) => {
			itemsSum += +item.total;
		});
		data.total = itemsSum;
		data.status = "pending";
		data.invoiceId = createRandomInvoiceNumber();

		const paymentDue = new Date(new Date(data.createdAt).setDate(new Date(data.createdAt).getDate() + parseInt(data.paymentTerms)));
		data.paymentDue = getFormatedDate(paymentDue)


		//разделяет объект
		const items = [...data.items];
		delete data.items;
		delete data.inputs;
		console.log(data)

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
			<button type="submit" form="newInvoice" id="draft" className="addInvoice__draft btn-status" onClick={formData.handleSubmit(saveAsDraftHandler)}>
				Save as Draft
			</button>
			<button type="submit" form="newInvoice" id="pending" className="addInvoice__send btn-status" onClick={formData.handleSubmit(saveAsPendingHandler)}>
				Save & Send
			</button>
		</div>
	);
};

export default NewInvoiceButtons;
