import busket from "../assets/icon-delete.svg"
import "../styles/NewInvoice.scss";
import { useContext, useState } from "react";
import invoiceContext from "../context/invoice/invoiceContext";

const Form = (props) => {
  const [formField,setFormField] = useState([{value: ''}])
	const {addNewInvoice} = useContext(invoiceContext)

  const onSubmit = (e) => {
  e.preventDefault();
  const form = e.target;
  const formData = new FormData(form)
	const today = new Date().toLocaleString()
	const transformFormData = {
    "id": null,
    "createdAt": today,
    "paymentDue": null,
    "description": null,
    "paymentTerms": formData.select,
    "clientName": formData.name,
    "clientEmail": formData.email,
    "status": "paid",
    "senderAddress": {
      "street": formData.fromAddress,
      "city": formData.city,
      "postCode": formData.postCode,
      "country": formData.country
    },
    "clientAddress": {
      "street": formData.toAddress,
      "city": formData.toCity,
      "postCode": formData.toPostCode,
      "country": formData.toCountry
    },
    "items": [
      {
        "name": formData.itemName,
        "quantity": formData.qty,
        "price": formData.itemPrice,
        "total": formData.total
      }
    ],
    "total": 1800.90
  }

	console.log(transformFormData)
	addNewInvoice(transformFormData)
}

const addField = (e) => {
  e.preventDefault()
  let newField = {};
  setFormField([...formField,newField])
}

const removeField = (index) => {
    let data = [...formField];
    data.splice(index,1);
    setFormField(data);
}

const submit = (event) => {
  event.preventDefault()
}

  return (
    <form method="post" id='newInvoice' onSubmit={onSubmit} className="form">
					<fieldset className="form__fieldset">
						<legend className="form__legend">Bill From</legend>
						<div className="form__input-container col-12">
							<label className="form__label" htmlFor="address">
								Street Address
							</label>
							<input name="fromAddress" className="form__input" id="fromAddress" type="text" />
						</div>
						<div className="row">
							<div className="form__input-container col-6">
								<label className="form__label" htmlFor="city">
									City
								</label>
								<input name="city" className="form__input" id="city" type="text" />
							</div>
							<div className="form__input-container col-6">
								<label className="form__label" htmlFor="postCode">
									Post Code
								</label>
								<input name="postCode" className="form__input" id="postCode" type="text" />
							</div>
							<div className="form__input-container col-12">
								<label className="form__label" htmlFor="country">
									Country
								</label>
								<input name="country" className="form__input" id="country" type="text" />
							</div>
						</div>
					</fieldset>
					<fieldset className="form__fieldset">
						<legend className="form__legend">Bill To</legend>
						<div className="form__input-container col-12">
							<label className="form__label" htmlFor="name">
								Client's Name
							</label>
							<input className="form__input" id="name" name="name" type="text" />
						</div>
						<div className="form__input-container col-12">
							<label className="form__label" htmlFor="email">
								Client's Email
							</label>
							<input className="form__input" id="email" name="email" type="email" />
						</div>
						<div className="form__input-container col-12">
							<label className="form__label" htmlFor="toAddress">
								Street Address
							</label>
							<input className="form__input" id="toAddress" name="toAddress" type="text" />
						</div>
						<div className="row">
							<div className="form__input-container col-6">
								<label className="form__label" htmlFor="toCity">
									City
								</label>
								<input className="form__input" id="toCity" name="toCity" type="text" />
							</div>
							<div className="form__input-container col-6">
								<label className="form__label" htmlFor="toPostCode">
									Post Code
								</label>
								<input className="form__input" id="toPostCode" name="toPostCode" type="text" />
							</div>
							<div className="form__input-container col-12">
								<label className="form__label" htmlFor="toCountry">
									Country
								</label>
								<input className="form__input" id="toCountry" name="toCountry" type="text" />
							</div>
						</div>
						<div className="row">
							<div className="form__input-container col-12">
								<label className="form__label" htmlFor="date">
									Invoice Date
								</label>
								<input className="form__input" id="date" type="date" name="date"/>
							</div>
							<div className="form__input-container col-12">
								<label className="form__label" htmlFor="select">
									Payment Terms
								</label>
								<select className="form__select" name="select" id="select">
									<option value="1">Net 1 Day</option>
									<option value="7">Net 7 Day</option>
									<option value="14">Net 14 Day</option>
									<option value="30">Net 30 Day</option>
								</select>
							</div>
						</div>
					</fieldset>
					<fieldset className="form__fieldset">
						<legend className="form__legend-second">Item List</legend>
						{formField.map((input, index) => {
              return (
              <div key={index} className="form__item">
							<div>
								<div className="form__input-container col-12">
									<label className="form__label" htmlFor="itemName">
										Item Name
									</label>
									<input  className="form__input" id="itemName" name="itemName" type="text" />
								</div>
							</div>
							<div className="row">
								<div className="form__input-container col-3">
									<label className="form__label" htmlFor="qty">
										Qty.
									</label>
									<input  className="form__input" id="qty" name="qty" type="number" />
								</div>
								<div className="form__input-container col-4">
									<label className="form__label" htmlFor="itemPrice">
										Price
									</label>
									<input  className="form__input" name="itemPrice" id="itemPrice" type="number" />
								</div>
								<div className="form__input-container col-3">
									<label className="form__label">Total</label>
									<input name="total" className="form__totalPrice" defaultValue={0}/>
								</div>
								<div className="form__button-container col-2">
									<button onClick={submit} className="form__button" >
										<img onClick={()=>removeField(index)} src={busket}  alt="" />
									</button>
								</div>
							</div>
						  </div>
              )
            })}					        
					</fieldset>
          <div className="form__submit-container">
            <button onClick={addField} className="form__submit" >+ Add New Item</button>
          </div>
				</form>
  )
}

export default Form