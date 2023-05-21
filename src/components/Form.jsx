import busket from "../assets/icon-delete.svg";
import "../styles/NewInvoice.scss";
import { useContext, useState } from "react";
import invoiceContext from "../context/invoice/invoiceContext";


const Form = ({ onClickButtonGroup, onCloseNewForm, onClickCloseEditInvoice }) => {
	const [formField, setFormField] = useState([{}]);
	const { addNewInvoice, currentInvoiceData, currentStatus, currentInvoice, isNewInvoice, isEditInvoiceForm, setNewInvoice } = useContext(invoiceContext);

	const onSubmit = (e) => {
		console.log('событие submit')
		e.preventDefault();
		const form = e.target;
		const formData = new FormData(form);

		//создает рандомный id для нового инвойса
		const createRandomInvoiceNumber = () => {
			const alphabet = "ABCDEFGHIJKLMNOPQRSTUVXYZ";
			let randomLetters = alphabet[Math.floor(Math.random() * alphabet.length)];
			let newInvoiceId = "";
			while (newInvoiceId.length < 2) {
				newInvoiceId += randomLetters;
				randomLetters = randomLetters = alphabet[Math.floor(Math.random() * alphabet.length)];
			}
			// let randomNumb = Math.floor(Math.random() * 10000);
			let randomNumb = Math.floor(Math.random() * (9999 + 1 - 1000)) + 1000
			newInvoiceId += randomNumb;
			return newInvoiceId;
		};

		//прибавляет к дате создания инвойса выбранное количество дней
		let paymentDueInvoiceDate = new Date(formData.get("date"));
		paymentDueInvoiceDate.setDate(new Date(paymentDueInvoiceDate).getDate() + parseFloat(formData.get("select")));
	

		//трансформирует структуру данных из FormData в идентичную массиву объектов в invoices(context)
		const transformFormData = {
			id: isNewInvoice && !isEditInvoiceForm ? createRandomInvoiceNumber() : currentInvoice,
			createdAt: new Date(formData.get("date")).toLocaleDateString("en-GB", { month: "short", day: "numeric", year: "numeric" }),
			description: formData.get("description"),
			paymentTerms: formData.get("select"),
			paymentDue: paymentDueInvoiceDate.toLocaleDateString("en-GB", { month: "short", day: "numeric", year: "numeric" }),
			clientName: formData.get("name"),
			clientEmail: formData.get("email"),
			status: currentStatus,
			senderAddress: {
				street: formData.get("fromAddress"),
				city: formData.get("city"),
				postCode: formData.get("postCode"),
				country: formData.get("country"),
			},
			clientAddress: {
				street: formData.get("toAddress"),
				city: formData.get("toCity"),
				postCode: formData.get("toPostCode"),
				country: formData.get("toCountry"),
			},
			items: [
				{
					name: formData.get("itemName"),
					quantity: formData.get("qty"),
					price: formData.get("itemPrice"),
					total: formData.get("total"),
				},
			],
			total: 1800.9,
		};


		//передает полученный объект в редьюсер для добавление в массив всех инвойсов
		addNewInvoice(transformFormData);
		//устанавливает флаг для определения создается новый инвойс или редактируется старый
		setNewInvoice(false);
		//изменяет state для закрытия окна формы нового инвойса
		// onCloseNewForm(false);
		//изменяет state для закрытия окна редактирования формы
		onClickCloseEditInvoice(false)
	};

	// создает дефолтные значения для формы создания нового инвойса
	let defaultInputProps = {
		senderStreet: "",
		senderCity: "",
		senderPostCode: "",
		senderCountry: "",
		clientName: "",
		clientEmail: "",
		clientStreet: "",
		clientCity: "",
		clientPostCode: "",
		clientCountry: "",
		paymentDue: "",
		paymentTerms: "",
		items: "",
		description: "",
	};


		console.log(`New: ${isNewInvoice}, Edit: ${isEditInvoiceForm}`)

	// проверка на клик по кнопке "New", если нет заполняет дефолтные значения данными из context
	if(!isNewInvoice && isEditInvoiceForm) {
		defaultInputProps.senderStreet = currentInvoiceData[0].senderAddress.street;
		defaultInputProps.senderCity = currentInvoiceData[0].senderAddress.city;
		defaultInputProps.senderPostCode = currentInvoiceData[0].senderAddress.postCode;
		defaultInputProps.senderCountry =currentInvoiceData[0].senderAddress.country;
		defaultInputProps.clientName = currentInvoiceData[0].clientName;
		defaultInputProps.clientEmail  = currentInvoiceData[0].clientEmail;
		defaultInputProps.clientStreet= currentInvoiceData[0].clientAddress.street;
		defaultInputProps.clientCity = currentInvoiceData[0].clientAddress.city;
		defaultInputProps.clientPostCode = currentInvoiceData[0].clientAddress.postCode;
		defaultInputProps.clientCountry= currentInvoiceData[0].clientAddress.country;
		defaultInputProps.paymentDue= currentInvoiceData[0].paymentDue;
		defaultInputProps.paymentTerms= currentInvoiceData[0].paymentTerms;
		defaultInputProps.items = currentInvoiceData[0].items;
		defaultInputProps.description= currentInvoiceData[0].description;
	}

console.log(defaultInputProps)


console.log(defaultInputProps.senderStreet)

	const addNewField = () => {
		if (!defaultInputProps.items) {
			return formField;
		} else {
			return defaultInputProps.items;
		}
	};

	const addField = (e) => {
		e.preventDefault();
		let newField = {};
		setFormField([...formField, newField]);
	};

	const removeField = (index) => {
		let data = [...formField];
		data.splice(index, 1);
		setFormField(data);
	};

	const submit = (event) => {
		event.preventDefault();
	};

	return (
		<form method="post" id="newInvoice" onSubmit={onSubmit} className="form">
			<fieldset className="form__fieldset">
				<legend className="form__legend">Bill From</legend>
				<div className="form__input-container col-12">
					<label className="form__label" htmlFor="address">
						Street Address
					</label>
					<input name="fromAddress" className="form__input" id="fromAddress" type="text" defaultValue={defaultInputProps.senderStreet} />
				</div>
				<div className="row">
					<div className="form__input-container col-6 col-md-4">
						<label className="form__label" htmlFor="city">
							City
						</label>
						<input name="city" className="form__input" id="city" type="text" defaultValue={defaultInputProps.senderCity} />
					</div>
					<div className="form__input-container col-6 col-md-4">
						<label className="form__label" htmlFor="postCode">
							Post Code
						</label>
						<input name="postCode" className="form__input" id="postCode" type="text" defaultValue={defaultInputProps.senderPostCode} />
					</div>
					<div className="form__input-container col-12 col-md-4">
						<label className="form__label" htmlFor="country">
							Country
						</label>
						<input name="country" className="form__input" id="country" type="text" defaultValue={defaultInputProps.senderCountry} />
					</div>
				</div>
			</fieldset>
			<fieldset className="form__fieldset">
				<legend className="form__legend">Bill To</legend>
				<div className="form__input-container col-12">
					<label className="form__label" htmlFor="name">
						Client's Name
					</label>
					<input className="form__input" id="name" name="name" type="text" defaultValue={defaultInputProps.clientName} />
				</div>
				<div className="form__input-container col-12">
					<label className="form__label" htmlFor="email">
						Client's Email
					</label>
					<input className="form__input" id="email" name="email" type="email" defaultValue={defaultInputProps.clientEmail} />
				</div>
				<div className="form__input-container col-12">
					<label className="form__label" htmlFor="toAddress">
						Street Address
					</label>
					<input className="form__input" id="toAddress" name="toAddress" type="text" defaultValue={defaultInputProps.clientStreet} />
				</div>
				<div className="row">
					<div className="form__input-container col-6 col-md-4">
						<label className="form__label" htmlFor="toCity">
							City
						</label>
						<input className="form__input" id="toCity" name="toCity" type="text" defaultValue={defaultInputProps.clientCity} />
					</div>
					<div className="form__input-container col-6 col-md-4">
						<label className="form__label" htmlFor="toPostCode">
							Post Code
						</label>
						<input className="form__input" id="toPostCode" name="toPostCode" type="text" defaultValue={defaultInputProps.clientPostCode} />
					</div>
					<div className="form__input-container col-12 col-md-4">
						<label className="form__label" htmlFor="toCountry">
							Country
						</label>
						<input className="form__input" id="toCountry" name="toCountry" type="text" defaultValue={defaultInputProps.clientCountry} />
					</div>
				</div>
				<div className="row">
					<div className="form__input-container col-12 col-md-6">
						<label className="form__label" htmlFor="date">
							Invoice Date
						</label>
						<input className="form__input" id="date" type="date" name="date" defaultValue={defaultInputProps.paymentDue} />
					</div>
					<div className="form__input-container col-12 col-md-6">
						<label className="form__label" htmlFor="select">
							Payment Terms
						</label>
						<select className="form__select" name="select" id="select" defaultValue={defaultInputProps.paymentTerms}>
							<option value="1">Net 1 Day</option>
							<option value="7">Net 7 Day</option>
							<option value="14">Net 14 Day</option>
							<option value="30">Net 30 Day</option>
						</select>
					</div>
					<div className="form__input-container col-12">
						<label htmlFor="" className="form__label">
							Project Desctiption
						</label>
						<input type="text" className="form__input" id="description" name="description" defaultValue={defaultInputProps.description} />
					</div>
				</div>
			</fieldset>
			<fieldset className="form__fieldset">
				<legend className="form__legend-second">Item List</legend>
				{addNewField().map((item, index) => {
					return (
						<div key={index} className="form__item">
							<div className="row ">
								<div className="form__input-container col-12 col-md-4">
									<label className="form__label" htmlFor="itemName">
										Item Name
									</label>
									<input className="form__input" id="itemName" name="itemName" type="text" defaultValue={item.name} />
								</div>
								<div className="form__input-container col-3 col-md-1">
									<label className="form__label" htmlFor="qty">
										Qty.
									</label>
									<input className="form__input" id="qty" name="qty" type="number" defaultValue={item.quantity} />
								</div>
								<div className="form__input-container col-4 col-md-3">
									<label className="form__label" htmlFor="itemPrice">
										Price
									</label>
									<input className="form__input" name="itemPrice" id="itemPrice" type="number" defaultValue={item.price} />
								</div>
								<div className="form__input-container col-3 col-md-2">
									<label className="form__label">Total</label>
									<input name="total" className="form__totalPrice" defaultValue={item.total} />
								</div>
								<div className="form__button-container col-2">
									<button onClick={submit} className="form__button">
										<img onClick={() => removeField(index)} src={busket} alt="" />
									</button>
								</div>
							</div>
						</div>
					);
				})}
			</fieldset>
			<div className="form__submit-container">
				<button onClick={addField} className="form__submit">
					+ Add New Item
				</button>
			</div>
		</form>
	);
};

export default Form;
