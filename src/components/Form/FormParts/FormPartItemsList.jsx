import { useContext, useState } from "react";
import invoiceContext from "../../../context/invoice/invoiceContext";
import darkContext from "../../../context/dark/darkContext";
//img
import busket from "../../../assets/icon-delete.svg";
import { useFormContext } from "react-hook-form";

const FormPartItemsList = () => {
	const {register} = useFormContext()
	const { dark } = useContext(darkContext);
	const { invoiceItems, currentInvoiceNumber, addNewFormfield } = useContext(invoiceContext);



	const currentItems = invoiceItems.filter((item) => {
		if (item.invoiceId === currentInvoiceNumber) {
			return item;
		}
		return false;
	});
	const [inputField, setInputField] = useState(currentItems);


	const deleteFormField = (e) => {
		const currentIndex = e.target.closest('.form__item').getAttribute('index')
		console.log(currentIndex)
		const newInputFields = [...inputField]
		newInputFields.splice(currentIndex, 1)
		console.log(newInputFields)
		setInputField([...newInputFields])
		
	}

	const items = inputField.map((item, index) => {
		return (
				<div className="form__item" key={index} index={index}>
					<div className="row ">
						<div className="form__input-container col-12 col-md-4">
							<label className="form__label" htmlFor="name">
								Item Name
							</label>
							<input className={`form__input ${dark ? "dark-input" : ""}`} id="itemName" name="name" type="text" defaultValue={item.name} {...register('name')}/>
						</div>
						<div className="form__input-container col-3 col-md-1">
							<label className="form__label" htmlFor="qty">
								Qty.
							</label>
							<input className={`form__input ${dark ? "dark-input" : ""}`} id="qty" name="qty" type="number" defaultValue={item.quantity} {...register('quantity')} />
						</div>
						<div className="form__input-container col-4 col-md-3">
							<label className="form__label" htmlFor="itemPrice">
								Price
							</label>
							<input className={`form__input ${dark ? "dark-input" : ""}`} name="itemPrice" id="itemPrice" type="number" defaultValue={item.price} {...register('price')}/>
						</div>
						<div className="form__input-container col-3 col-md-2">
							<label className="form__label">Total</label>
							<input name="total" className={`form__totalPrice ${dark ? "dark-input" : ""}`} defaultValue={item.total} {...register('total')}/>
						</div>
						<div className="form__button-container col-2">
							<button type="button" className="form__button">
								<img src={busket} alt="" 	onClick={(e) => deleteFormField(e)}/>
							
							</button>
						</div>
					</div>
				</div>

		);
	});

	return (
		<>
			{items}
			<div className="form__submit-container">
				<button type="button" onClick={() => setInputField((prev) => [...prev, {invoiceId: currentInvoiceNumber}])} className={`form__submit ${dark ? "dark-light" : ""}`}>
					+ Add New Item
				</button>
			</div>
		</>
	);
};

export default FormPartItemsList;
