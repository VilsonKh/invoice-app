import busket from "../assets/icon-delete.svg";
import "../styles/NewInvoice.scss";
import { useContext, useState } from "react";
import invoiceContext from "../context/invoice/invoiceContext";

const Form = ({onClickButtonGroup}) => {
	const [formField, setFormField] = useState([{}]);

	const { addNewInvoice, currentInvoiceData, currentStatus , currentInvoice} = useContext(invoiceContext);

	const onSubmit = (e) => {
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
			let randomNumb = Math.floor(Math.random() * 10000);
			newInvoiceId += randomNumb;
			return newInvoiceId
		};

		//прибавляет к дате создания инвойса выбранное количество дней
		let paymentDueInvoiceDate = new Date(formData.get('date'));
		paymentDueInvoiceDate.setDate(new Date(paymentDueInvoiceDate).getDate() + parseFloat(formData.get('select')))

		//трансформирует структуру данных из FormData в идентичную массиву объектов в invoices(context)
		const transformFormData = {
			id: currentInvoice || createRandomInvoiceNumber(),
			createdAt: new Date(formData.get('date')).toLocaleDateString("en-GB", { month: "short", day: "numeric", year: "numeric" }),
			description: formData.get('description'),
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

			addNewInvoice(transformFormData);
	};
	const currentInvoiceObj = currentInvoiceData[0];
	const senderStreet = currentInvoiceObj?.senderAddress?.street,
		senderCity = currentInvoiceObj?.senderAddress?.city,
		senderPostCode = currentInvoiceObj?.senderAddress?.postCode,
		senderCountry = currentInvoiceObj?.senderAddress?.country,
		clientName = currentInvoiceObj?.clientName,
		clientEmail = currentInvoiceObj?.clientEmail,
		clientStreet = currentInvoiceObj?.clientAddress?.street,
		clientCity = currentInvoiceObj?.clientAddress?.city,
		clientPostCode = currentInvoiceObj?.clientAddress?.postCode,
		clientCountry = currentInvoiceObj?.clientAddress?.country,
		paymentDue = currentInvoiceObj?.paymentDue,
		paymentTerms = currentInvoiceObj?.paymentTerms,
		items = currentInvoiceObj?.items ?? "",
		description = currentInvoiceObj?.description;

	const addNewField = () => {
		if (!items) {
			return formField;
		} else {
			return items;
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
					<input name="fromAddress" className="form__input" id="fromAddress" type="text" defaultValue={senderStreet} />
				</div>
				<div className="row">
					<div className="form__input-container col-6">
						<label className="form__label" htmlFor="city">
							City
						</label>
						<input name="city" className="form__input" id="city" type="text" defaultValue={senderCity} />
					</div>
					<div className="form__input-container col-6">
						<label className="form__label" htmlFor="postCode">
							Post Code
						</label>
						<input name="postCode" className="form__input" id="postCode" type="text" defaultValue={senderPostCode} />
					</div>
					<div className="form__input-container col-12">
						<label className="form__label" htmlFor="country">
							Country
						</label>
						<input name="country" className="form__input" id="country" type="text" defaultValue={senderCountry} />
					</div>
				</div>
			</fieldset>
			<fieldset className="form__fieldset">
				<legend className="form__legend">Bill To</legend>
				<div className="form__input-container col-12">
					<label className="form__label" htmlFor="name">
						Client's Name
					</label>
					<input className="form__input" id="name" name="name" type="text" defaultValue={clientName} />
				</div>
				<div className="form__input-container col-12">
					<label className="form__label" htmlFor="email">
						Client's Email
					</label>
					<input className="form__input" id="email" name="email" type="email" defaultValue={clientEmail} />
				</div>
				<div className="form__input-container col-12">
					<label className="form__label" htmlFor="toAddress">
						Street Address
					</label>
					<input className="form__input" id="toAddress" name="toAddress" type="text" defaultValue={clientStreet} />
				</div>
				<div className="row">
					<div className="form__input-container col-6">
						<label className="form__label" htmlFor="toCity">
							City
						</label>
						<input className="form__input" id="toCity" name="toCity" type="text" defaultValue={clientCity} />
					</div>
					<div className="form__input-container col-6">
						<label className="form__label" htmlFor="toPostCode">
							Post Code
						</label>
						<input className="form__input" id="toPostCode" name="toPostCode" type="text" defaultValue={clientPostCode} />
					</div>
					<div className="form__input-container col-12">
						<label className="form__label" htmlFor="toCountry">
							Country
						</label>
						<input className="form__input" id="toCountry" name="toCountry" type="text" defaultValue={clientCountry} />
					</div>
				</div>
				<div className="row">
					<div className="form__input-container col-12">
						<label className="form__label" htmlFor="date">
							Invoice Date
						</label>
						<input className="form__input" id="date" type="date" name="date" defaultValue={paymentDue} />
					</div>
					<div className="form__input-container col-12">
						<label className="form__label" htmlFor="select">
							Payment Terms
						</label>
						<select className="form__select" name="select" id="select" defaultValue={paymentTerms}>
							<option value="1">Net 1 Day</option>
							<option value="7">Net 7 Day</option>
							<option value="14">Net 14 Day</option>
							<option value="30">Net 30 Day</option>
						</select>
					</div>
					<div className="form__input-container col-12">
						<label htmlFor="" className="form__label">Project Desctiption</label>
						<input type="text" className="form__input" id="description" name="description" defaultValue={description}/>
					</div>
				</div>
			</fieldset>
			<fieldset className="form__fieldset">
				<legend className="form__legend-second">Item List</legend>
				{addNewField().map((item, index) => {
					return (
						<div key={index} className="form__item">
							<div>
								<div className="form__input-container col-12">
									<label className="form__label" htmlFor="itemName">
										Item Name
									</label>
									<input className="form__input" id="itemName" name="itemName" type="text" defaultValue={item.name} />
								</div>
							</div>
							<div className="row">
								<div className="form__input-container col-3">
									<label className="form__label" htmlFor="qty">
										Qty.
									</label>
									<input className="form__input" id="qty" name="qty" type="number" defaultValue={item.quantity} />
								</div>
								<div className="form__input-container col-4">
									<label className="form__label" htmlFor="itemPrice">
										Price
									</label>
									<input className="form__input" name="itemPrice" id="itemPrice" type="number" defaultValue={item.price} />
								</div>
								<div className="form__input-container col-3">
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
