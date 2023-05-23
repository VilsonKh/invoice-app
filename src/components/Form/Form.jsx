//styles
import "./Form.scss";
//img
import busket from "../../assets/icon-delete.svg";
//hooks
import { useContext, useEffect, useState } from "react";
//context
import invoiceContext from "../../context/invoice/invoiceContext";
import ButtonBack from "../ButtonBack/ButtonBack";
import darkContext from "../../context/dark/darkContext";

const Form = ({ onClickCloseInvoiceForm }) => {
	const { formState, isEditInvoice, isNewInvoice, changeFormState, addNewFormfield, deleteNewFormfield, currentInvoiceNumber, addToAllInvoices,setNewInvoice,setPreviewInvoice,setEditInvoice, } = useContext(invoiceContext);

  const {dark} = useContext(darkContext)

	const { status, senderStreet, senderCity, senderPostCode, senderCountry, clientName, clientEmail, clientStreet, clientCity, clientPostCode, clientCountry, paymentDue, paymentTerms, items, description } =
		formState;

	useEffect(() => {
		if (isEditInvoice) {
			changeFormState();
		}
	}, [isEditInvoice]);

	const [savingStatus, setSavingStatus] = useState("");

	const onSaveButtonsClick = (e) => {
		setSavingStatus(e.target.getAttribute("id"));
	};

	const onSubmit = (e) => {
		e.preventDefault();
		const form = e.target;
		const formData = new FormData(form);

    console.log(formData.values('qty'))

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

		//прибавляет к дате создания инвойса выбранное количество дней
		let paymentDueInvoiceDate = new Date(formData.get("date"));
		paymentDueInvoiceDate.setDate(new Date(paymentDueInvoiceDate).getDate() + parseFloat(formData.get("select")));

    console.log(formData)
    //перебор formData для формирования объектов items
    const itemsTransform = () => {
      let itemsArr = [];
      let itemNameObj = {};
      let quantityObj = {};
      let priceObj = {};
      let total = {};
      for (let [key, value] of formData) {
        if(key === 'name') {
          itemNameObj[key] = value
        }
      }
      console.log(itemNameObj)
      return itemsArr
    }
    console.log(itemsTransform())

		//трансформирует структуру данных из FormData в идентичную массиву объектов в invoices(context)
		const transformFormData = {
      show: true,
			id: isNewInvoice ? createRandomInvoiceNumber() : currentInvoiceNumber,
			createdAt: new Date(formData.get("date")).toLocaleDateString("en-GB", { month: "short", day: "numeric", year: "numeric" }),
			description: formData.get("description"),
			paymentTerms: formData.get("select"),
			paymentDue: paymentDueInvoiceDate.toLocaleDateString("en-GB", { month: "short", day: "numeric", year: "numeric" }),
			clientName: formData.get("name"),
			clientEmail: formData.get("email"),
			status: isNewInvoice ? savingStatus : status,
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
					name: formData.get("name"),
					quantity: formData.get("qty"),
					price: formData.get("itemPrice"),
					total: formData.get("total"),
				},
			],
			total: 1800.9,
		};

    addToAllInvoices(transformFormData);
    setNewInvoice(false);
		setPreviewInvoice(false);
		setEditInvoice(false);
    
	};
  
	return (
		<div className={`formPage ${dark ? 'dark-black' : ''}`}>
			<div onClick={() => setEditInvoice(false)} className="formOverlay"></div>
			<div className={`formContainer container ${dark ? 'dark-black' : ''}`}>
				<ButtonBack onClickCloseInvoiceForm={onClickCloseInvoiceForm}></ButtonBack>
        {isEditInvoice && <h1 className={`editInvoice__heading ${dark ? 'dark-font' : ''}`}>Edit <span className="editInvoice__hash">#</span> {currentInvoiceNumber}</h1>}
				<form method="post" id="newInvoice" onSubmit={onSubmit} className={`form ${dark ? 'dark-black' : ''}`}>
					<fieldset className="form__fieldset">
						<legend className="form__legend">Bill From</legend>
						<div className="form__input-container col-12">
							<label className="form__label" htmlFor="address">
								Street Address
							</label>
							<input name="fromAddress" className={`form__input ${dark ? 'dark-input' : ''}`} id="fromAddress" type="text" defaultValue={senderStreet} />
						</div>
						<div className="row">
							<div className="form__input-container col-6 col-md-4">
								<label className="form__label" htmlFor="city">
									City
								</label>
								<input name="city" className={`form__input ${dark ? 'dark-input' : ''}`} id="city" type="text" defaultValue={senderCity} />
							</div>
							<div className="form__input-container col-6 col-md-4">
								<label className="form__label" htmlFor="postCode">
									Post Code
								</label>
								<input name="postCode" className={`form__input ${dark ? 'dark-input' : ''}`} id="postCode" type="text" defaultValue={senderPostCode} />
							</div>
							<div className="form__input-container col-12 col-md-4">
								<label className="form__label" htmlFor="country">
									Country
								</label>
								<input name="country" className={`form__input ${dark ? 'dark-input' : ''}`} id="country" type="text" defaultValue={senderCountry} />
							</div>
						</div>
					</fieldset>
					<fieldset className="form__fieldset">
						<legend className="form__legend">Bill To</legend>
						<div className="form__input-container col-12">
							<label className="form__label" htmlFor="name">
								Client's Name
							</label>
							<input className={`form__input ${dark ? 'dark-input' : ''}`} id="name" name="name" type="text" defaultValue={clientName} />
						</div>
						<div className="form__input-container col-12">
							<label className="form__label" htmlFor="email">
								Client's Email
							</label>
							<input className={`form__input ${dark ? 'dark-input' : ''}`} id="email" name="email" type="email" defaultValue={clientEmail} />
						</div>
						<div className="form__input-container col-12">
							<label className="form__label" htmlFor="toAddress">
								Street Address
							</label>
							<input className={`form__input ${dark ? 'dark-input' : ''}`} id="toAddress" name="toAddress" type="text" defaultValue={clientStreet} />
						</div>
						<div className="row">
							<div className="form__input-container col-6 col-md-4">
								<label className="form__label" htmlFor="toCity">
									City
								</label>
								<input className={`form__input ${dark ? 'dark-input' : ''}`} id="toCity" name="toCity" type="text" defaultValue={clientCity} />
							</div>
							<div className="form__input-container col-6 col-md-4">
								<label className="form__label" htmlFor="toPostCode">
									Post Code
								</label>
								<input className={`form__input ${dark ? 'dark-input' : ''}`} id="toPostCode" name="toPostCode" type="text" defaultValue={clientPostCode} />
							</div>
							<div className="form__input-container col-12 col-md-4">
								<label className="form__label" htmlFor="toCountry">
									Country
								</label>
								<input className={`form__input ${dark ? 'dark-input' : ''}`} id="toCountry" name="toCountry" type="text" defaultValue={clientCountry} />
							</div>
						</div>
						<div className="row">
							<div className="form__input-container col-12 col-md-6">
								<label className="form__label" htmlFor="date">
									Invoice Date
								</label>
								<input className={`form__input ${dark ? 'dark-input' : ''}`} id="date" type="date" name="date" defaultValue={paymentDue} />
							</div>
							<div className="form__input-container col-12 col-md-6">
								<label className="form__label" htmlFor="select">
									Payment Terms
								</label>
								<select className={`form__select ${dark ? 'dark-input' : ''}`} name="select" id="select" defaultValue={paymentTerms}>
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
								<input type="text" className={`form__input ${dark ? 'dark-input' : ''}`} id="description" name="description" defaultValue={description} />
							</div>
						</div>
					</fieldset>
					<fieldset className="form__fieldset">
						<legend className="form__legend-second">Item List</legend>
						{items.map((item, index) => {
							return (
								<div key={index} className="form__item">
									<div className="row ">
										<div className="form__input-container col-12 col-md-4">
											<label className="form__label" htmlFor="name">
												Item Name
											</label>
											<input className={`form__input ${dark ? 'dark-input' : ''}`} id="itemName" name="name" type="text" defaultValue={item.name} />
										</div>
										<div className="form__input-container col-3 col-md-1">
											<label className="form__label" htmlFor="qty">
												Qty.
											</label>
											<input className={`form__input ${dark ? 'dark-input' : ''}`} id="qty" name="qty" type="number" defaultValue={item.quantity} />
										</div>
										<div className="form__input-container col-4 col-md-3">
											<label className="form__label" htmlFor="itemPrice">
												Price
											</label>
											<input className={`form__input ${dark ? 'dark-input' : ''}`} name="itemPrice" id="itemPrice" type="number" defaultValue={item.price} />
										</div>
										<div className="form__input-container col-3 col-md-2">
											<label className="form__label">Total</label>
											<input name="total" className={`form__totalPrice ${dark ? 'dark-input' : ''}`} defaultValue={item.total} />
										</div>
										<div className="form__button-container col-2">
											<button type="button" className="form__button">
												<img onClick={() => deleteNewFormfield()} src={busket} alt="" />
											</button>
										</div>
									</div>
								</div>
							);
						})}
					</fieldset>
					<div className="form__submit-container">
						<button type="button" onClick={() => addNewFormfield()} className={`form__submit ${dark ? 'dark-light' : ''}`}>
							+ Add New Item
						</button>
					</div>
				</form>
				{isEditInvoice && (
					<div className="editInvoice__buttons">
						<button onClick={() => setEditInvoice(false)} className={`editInvoice__cancel ${dark ? 'dark-light dark-font' : ''}`}>Cancel</button>
						<button className="editInvoice__save" type="submit" form="newInvoice">
							Save Changes
						</button>
					</div>
				)}
				{isNewInvoice && (
					<div className="addInvoice__groupButtons" onClick={onSaveButtonsClick}>
						<button type="submit" form="newInvoice" id="discard" className="addInvoice__discard btn-status">
							Discard
						</button>
						<button type="submit" form="newInvoice" id="draft" className="addInvoice__draft btn-status">
							Save as Draft
						</button>
						<button type="submit" form="newInvoice" id="pending" className="addInvoice__send btn-status">
							Save & Send
						</button>
					</div>
				)}
			</div>
		</div>
	);
};

export default Form;
