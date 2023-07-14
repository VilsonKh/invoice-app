//styles
import "./Form.scss";
//components
import FormPartBillFrom from "./FormParts/FormPartBillFrom";
import FormPartBillTo from "./FormParts/FormPartBillTo";
import FormPartItemsList from "./FormParts/FormPartItemsList";
import EditInvoiceButtons from "../EditInvoiceButtons/EditInvoiceButtons";
import NewInvoiceButtons from "../NewInvoiceButtons/NewInvoiceButtons";
import ButtonBack from "../ButtonBack/ButtonBack";
//hooks
import { useContext, useEffect, useMemo } from "react";
import { useForm, FormProvider, useFieldArray } from "react-hook-form";
import { DevTool } from "@hookform/devtools";
//context
import invoiceContext from "../../context/invoice/invoiceContext";
import darkContext from "../../context/dark/darkContext";
import { postNewInvoice, postNewInvoiceItems, updateInvoice } from "../../firebase/service";
import TestForm from "./TestForm";

const Form = ({ onClickCloseInvoiceForm }) => {
	const { isEditInvoice, isNewInvoice, currentInvoiceNumber, currentInvoiceId } = useContext(invoiceContext);

	const { dark } = useContext(darkContext);

	const defaultFormData = (invoicesData) => {
		return {
			senderStreet: invoicesData.senderStreet ?? "",
			senderCity: invoicesData.senderCity ?? "",
			senderPostCode: invoicesData.senderPostCode ?? "",
			senderCountry: invoicesData.senderCountry ?? "",
			clientName: invoicesData.clientName ?? "",
			clientEmail: invoicesData.clientEmail ?? "",
			clientStreet: invoicesData.clientStreet ?? "",
			clientCity: invoicesData.clientCity ?? "",
			clientPostCode: invoicesData.clientPostCode ?? "",
			clientCountry: invoicesData.clientCountry ?? "",
			paymentDue: invoicesData.paymentDue ?? "",
			paymentTerms: invoicesData.paymentTerms ?? "",
			items: invoicesData.items ?? [],
			description: invoicesData.description ?? "",
		};
	};

	const formData = useForm({
		mode: "onChange",
		defaultValues: {
			inputs: [
				{
					name: "New Input",
					quantity: 1,
					price: 1,
					total: ''

				},
			],
		},
	});

	//создает новый рандомный ID
	const createRandomInvoiceNumber = () => {
		const alphabet = "ABCDEFGHIJKLMNOPQRSTUVXYZ";
		let randomLetters = alphabet[Math.floor(Math.random() * alphabet.length)];
		let newInvoiceId = "";
		while (newInvoiceId.length < 2) {
			newInvoiceId += randomLetters;
			randomLetters = randomLetters = alphabet[Math.floor(Math.random() * alphabet.length)];
		}
		// let randomNumb = Math.floor(Math.random() * 10000);
		let randomNumb = Math.floor(Math.random() * (9999 + 1 - 1000)) + 1000;
		newInvoiceId += randomNumb;
		return newInvoiceId;
	};

	const onSubmitSave = (data) => {
		console.log("onSubmitSave");
		//суммирует items
		let itemsSum = 0;
		data.items.forEach((item) => {
			itemsSum += +item.total;
		});
		data.total = itemsSum;
		data.status = "pending";
		data.invoiceId = createRandomInvoiceNumber();
		//разделяет объект
		const items = [...data.items];
		delete data.items;
		console.log(data);
		console.log(items);
		if (!items.length) {
			console.log(" items пустой");
		} else {
			console.log("форма отправлена");
			postNewInvoice(data, items);
		}
	};

	// onSubmit={formData.handleSubmit(onSubmit)}

	return (
		<div className={`formPage ${dark ? "dark-black" : ""}`}>
			{/* onClick={() => setEditInvoice(false)} */}
			{/* <div  className="formOverlay"></div> */}
			<div className={`formContainer container ${dark ? "dark-black" : ""}`}>
				<ButtonBack onClickCloseInvoiceForm={onClickCloseInvoiceForm}></ButtonBack>
				{isEditInvoice && (
					<h1 className={`editInvoice__heading ${dark ? "dark-font" : ""}`}>
						Edit <span className="editInvoice__hash">#</span> {currentInvoiceNumber}
					</h1>
				)}
				<FormProvider {...formData}>
					{/* onSubmit={formData.handleSubmit(onSubmitSave)} */}
					<form method="post" id="newInvoice" className={`form ${dark ? "dark-black" : ""}`} onSubmit={formData.handleSubmit(onSubmitSave)}>
						<FormPartBillFrom />
						<FormPartBillTo />
						<fieldset className="form__fieldset">
							<legend className="form__legend-second">Item List</legend>
							<FormPartItemsList />
						</fieldset>
					</form>
					{/* onSubmitSave={onSubmitSave} */}
					{isEditInvoice && <EditInvoiceButtons />}
					{isNewInvoice && <NewInvoiceButtons />}
				</FormProvider>
				
				{/* <DevTool control={formData.control} /> */}
			</div>

		</div>
	);
};

export default Form;

// const [savingStatus, setSavingStatus] = useState("");

// const onSaveButtonsClick = (e) => {
// 	setSavingStatus(e.target.getAttribute("id"));
// };

// const onSubmit = (e) => {
// 	e.preventDefault();
// 	const form = e.target;
// 	const formData = new FormData(form);

// 	//создает новый рандомный ID
// 	const createRandomInvoiceNumber = () => {
// 		const alphabet = "ABCDEFGHIJKLMNOPQRSTUVXYZ";
// 		let randomLetters = alphabet[Math.floor(Math.random() * alphabet.length)];
// 		let newInvoiceId = "";
// 		while (newInvoiceId.length < 2) {
// 			newInvoiceId += randomLetters;
// 			randomLetters = randomLetters = alphabet[Math.floor(Math.random() * alphabet.length)];
// 		}
// 		// let randomNumb = Math.floor(Math.random() * 10000);
// 		let randomNumb = Math.floor(Math.random() * (9999 + 1 - 1000)) + 1000;
// 		newInvoiceId += randomNumb;
// 		return newInvoiceId;
// 	};

// 	//прибавляет к дате создания инвойса выбранное количество дней
// 	let paymentDueInvoiceDate = new Date(formData.get("date"));
// 	paymentDueInvoiceDate.setDate(new Date(paymentDueInvoiceDate).getDate() + parseFloat(formData.get("select")));

// 	console.log(formData);

// 	//трансформирует структуру данных из FormData в идентичную массиву объектов в invoices(context)
// 	// const transformFormData = {
// 	// 	show: true,
// 	// 	id: isNewInvoice ? createRandomInvoiceNumber() : currentInvoiceNumber,
// 	// 	createdAt: new Date(formData.get("date")).toLocaleDateString("en-GB", { month: "short", day: "numeric", year: "numeric" }),
// 	// 	description: formData.get("description"),
// 	// 	paymentTerms: formData.get("select"),
// 	// 	paymentDue: paymentDueInvoiceDate.toLocaleDateString("en-GB", { month: "short", day: "numeric", year: "numeric" }),
// 	// 	clientName: formData.get("name"),
// 	// 	clientEmail: formData.get("email"),
// 	// 	status: isNewInvoice ? savingStatus : status,
// 	// 	senderAddress: {
// 	// 		street: formData.get("fromAddress"),
// 	// 		city: formData.get("city"),
// 	// 		postCode: formData.get("postCode"),
// 	// 		country: formData.get("country"),
// 	// 	},
// 	// 	clientAddress: {
// 	// 		street: formData.get("toAddress"),
// 	// 		city: formData.get("toCity"),
// 	// 		postCode: formData.get("toPostCode"),
// 	// 		country: formData.get("toCountry"),
// 	// 	},
// 	// 	items: [
// 	// 		{
// 	// 			name: formData.get("name"),
// 	// 			quantity: formData.get("qty"),
// 	// 			price: formData.get("itemPrice"),
// 	// 			total: formData.get("total"),
// 	// 		},
// 	// 	],
// 	// 	total: 1800.9,
// 	// };

// 	// addToAllInvoices(transformFormData);
// 	setNewInvoice(false);
// 	setPreviewInvoice(false);
// 	// setEditInvoice(false);
// };
// const { status } = currentInvoice[0]
