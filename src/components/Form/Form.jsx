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
import { useContext, useRef } from "react";
import { useForm, FormProvider } from "react-hook-form";
//context
import invoiceContext from "../../context/invoice/invoiceContext";
import darkContext from "../../context/dark/darkContext";
import { postNewInvoice } from "../../firebase/service";
//animations
import { CSSTransition } from "react-transition-group";

const Form = ({ onClickCloseInvoiceForm, animate }) => {
	const { isEditInvoice, isNewInvoice, currentInvoiceNumber, setEditInvoice, setNewInvoice } = useContext(invoiceContext);

	const { dark } = useContext(darkContext);

	const formData = useForm({
		mode: "onChange",
		defaultValues: {
			inputs: [
				{
					name: "New Input",
					quantity: 1,
					price: 1,
					total: "",
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
		if (!items.length) {
			console.log(" items пустой");
		} else {
			console.log("форма отправлена");
			postNewInvoice(data, items);
		}
	};

	const backdropHandler = () => {
		setNewInvoice(false);
		setEditInvoice(false);
	};

	const nodeRef = useRef(null);

	console.log(animate);

	return (
		<CSSTransition in={isNewInvoice} 
									 timeout={500} 
									 classNames="translate" 
									 nodeRef={nodeRef}
									 unmountOnExit
								   >
			<div className={`formPage ${dark ? "dark-black" : ""}`} >
				<div className="formOverlay" onClick={backdropHandler}></div>
				<div className={`formContainer container ${dark ? "dark-black" : ""}`} ref={nodeRef}>
					{isEditInvoice ? <ButtonBack onClickCloseInvoiceForm={onClickCloseInvoiceForm}></ButtonBack> : <h2 className="editInvoice__heading">New Invoice</h2>}
					{isEditInvoice && (
						<h1 className={`editInvoice__heading ${dark ? "dark-font" : ""}`}>
							Edit <span className="editInvoice__hash">#</span> {currentInvoiceNumber}
						</h1>
					)}
					<FormProvider {...formData}>
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
		</CSSTransition>
	);
};

export default Form;
