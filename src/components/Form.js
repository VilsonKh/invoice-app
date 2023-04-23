import busket from "../assets/icon-delete.svg"
import "../styles/NewInvoice.scss";
import { useState } from "react";

const Form = (props) => {

  const [formData,setFormData] = useState({})

   const handleBillFromStreet = (e) => {
    setFormData({
      billFrom:{
        ...formData.billFrom,
        street: e.target.value
      }
    })
  }

  const handleBillFromCity = (e) => {
    setFormData({
      billFrom:{
        ...formData.billFrom,
        city: e.target.value
      }
    })
  }

  const handleBillFromPost = (e) => {
    setFormData({
      billFrom:{
        ...formData.billFrom,
        postCode: e.target.value
      }
    })
  }

  const handleBillFromCountry = (e) => {
    setFormData({
      billFrom:{
        ...formData.billFrom,
        country: e.target.value
      }
    })
  }

  const handleBillToClientName = (e) => {
    setFormData({
      billTo:{
        ...formData.billTo,
        clientName: e.target.value
      }
    })
  }

  const handleBillToClientEmail = (e) => {
    setFormData({
      billTo:{
        ...formData.billTo,
        clientEmail: e.target.value
      }
    })
  }

  const handleBillToStreet = (e) => {
    setFormData({
      billTo:{
        ...formData.billTo,
        street: e.target.value
      }
    })
  }

  const handleBillToCity = (e) => {
    setFormData({
      billTo:{
        ...formData.billTo,
        city: e.target.value
      }
    })
  }

  const handleBillToPost = (e) => {
    setFormData({
      billTo:{
        ...formData.billTo,
        postCode: e.target.value
      }
    })
  }

  const handleBillToCountry = (e) => {
    setFormData({
      billTo:{
        ...formData.billTo,
        country: e.target.value
      }
    })
  }

  const handleBillToDate = (e) => {
    setFormData({
      billTo:{
        ...formData.billTo,
        date: new Date(e.target.value)
      }
    })
  }

  const handleBillToTerm = (e) => {
    setFormData({
      billTo:{
        ...formData.billTo,
        term: e.target.value
      }
    })
  }

  const handleItemName = (e) => {
    setFormData({
      itemList:{
        ...formData.itemList,
        itemName: e.target.value
      }
    })
  }

  const handleItemQty = (e) => {
    setFormData({
      itemList:{
        ...formData.itemList,
        quantity: e.target.value
      }
    })
  }

  const handleItemPrice = (e) => {
    setFormData({
      itemList:{
        ...formData.itemList,
        price: e.target.value
      }
    })
  }

const onSubmitDraft = (e) => {
  e.preventDefault();
  const form = e.target;
  const formData = new FormData(form)
  console.log(formData)
}

  

  return (
    <form className="form" onSubmitDraft={onSubmitDraft}>
					<fieldset className="form__fieldset">
						<legend className="form__legend">Bill From</legend>
						<div className="form__input-container col-12">
							<label className="form__label" htmlFor="address">
								Street Address
							</label>
							<input onChange={handleBillFromStreet} className="form__input" id="address" type="text" />
						</div>
						<div className="row">
							<div className="form__input-container col-6">
								<label className="form__label" htmlFor="city">
									City
								</label>
								<input onChange={handleBillFromCity} className="form__input" id="city" type="text" />
							</div>
							<div className="form__input-container col-6">
								<label className="form__label" htmlFor="postCode">
									Post Code
								</label>
								<input onChange={handleBillFromPost} className="form__input" id="postCode" type="text" />
							</div>
							<div className="form__input-container col-12">
								<label className="form__label" htmlFor="country">
									Country
								</label>
								<input onChange={handleBillFromCountry} className="form__input" id="country" type="text" />
							</div>
						</div>
					</fieldset>
					<fieldset className="form__fieldset">
						<legend className="form__legend">Bill To</legend>
						<div className="form__input-container col-12">
							<label className="form__label" htmlFor="name">
								Client's Name
							</label>
							<input onChange={handleBillToClientName} className="form__input" id="name" name="id" type="text" />
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
							<input onChange={handleBillToStreet} className="form__input" id="toAddress" name="toAddress" type="text" />
						</div>
						<div className="row">
							<div className="form__input-container col-6">
								<label className="form__label" htmlFor="toCountry">
									City
								</label>
								<input onChange={handleBillToCity} className="form__input" id="toCountry" name="toCountry" type="text" />
							</div>
							<div className="form__input-container col-6">
								<label className="form__label" htmlFor="toPostCode">
									Post Code
								</label>
								<input onChange={handleBillToPost} className="form__input" id="toPostCode" name="toPostCode" type="text" />
							</div>
							<div className="form__input-container col-12">
								<label className="form__label" htmlFor="toCountry">
									Country
								</label>
								<input onChange={handleBillToCountry} className="form__input" id="toCountry" name="toCountry" type="text" />
							</div>
						</div>
						<div className="row">
							<div className="form__input-container col-12">
								<label className="form__label" htmlFor="date">
									Invoice Date
								</label>
								<input onChange={handleBillToDate} className="form__input" id="date" type="date" name="date"/>
							</div>
							<div className="form__input-container col-12">
								<label className="form__label" htmlFor="select">
									Payment Terms
								</label>
								<select onChange={handleBillToTerm} className="form__select" name="select" id="select">
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
						<div className="form__item">
							<div>
								<div className="form__input-container col-12">
									<label className="form__label" htmlFor="itemName">
										Item Name
									</label>
									<input onChange={handleItemName} className="form__input" id="itemName" name="itemName" type="text" />
								</div>
							</div>
							<div className="row">
								<div className="form__input-container col-3">
									<label className="form__label" htmlFor="qty">
										Qty.
									</label>
									<input onChange={handleItemQty} className="form__input" id="qty" name="qty" type="number" />
								</div>
								<div className="form__input-container col-4">
									<label className="form__label" htmlFor="itemName">
										Price
									</label>
									<input onChange={handleItemPrice} className="form__input" name="itemName" id="itemName" type="number" />
								</div>
								<div className="form__input-container col-3">
									<label className="form__label">Total</label>
									<p className="form__totalPrice">0</p>
								</div>
								<div className="form__button-container col-2">
									<button className="form__button">
										<img src={busket} alt="" />
									</button>
								</div>
							</div>
						</div>
						<div className="form__item">
							<div>
								<div className="form__input-container col-12">
									<label className="form__label" htmlFor="itemName">
										Item Name
									</label>
									<input className="form__input" id="itemName" name="itemName" type="text" />
								</div>
							</div>
							<div className="row">
								<div className="form__input-container col-3">
									<label className="form__label" htmlFor="qty">
										Qty.
									</label>
									<input className="form__input" id="qty" name='qty' type="number" />
								</div>
								<div className="form__input-container col-4">
									<label className="form__label" htmlFor="itemName">
										Price
									</label>
									<input className="form__input" id="itemName" name="itemName" type="number" />
								</div>
								<div className="form__input-container col-3">
									<label className="form__label">Total</label>
									<p className="form__totalPrice">0</p>
								</div>
								<div className="form__button-container col-2">
									<button className="form__button">
										<img src={busket} alt="" />
									</button>
								</div>
							</div>
						</div>
          
					</fieldset>
          <div className="form__submit-container">
            <button  className="form__submit" >+ Add New Item</button>
          </div>
				</form>
  )
}

export default Form