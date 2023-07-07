import { useCallback, useContext, useEffect, useMemo, useState } from "react";
import invoiceContext from "../../../context/invoice/invoiceContext";
import darkContext from "../../../context/dark/darkContext";
//img
import busket from "../../../assets/icon-delete.svg";
import { useFieldArray, useFormContext } from "react-hook-form";
import { Item } from "../constants";

const FormPartItemsList = (formData) => {
	const { register } = useFormContext();
	const { dark } = useContext(darkContext);
	const { invoiceItems, currentInvoiceNumber, addNewFormfield, isNewInvoice } = useContext(invoiceContext);

	const { control } = useFormContext();

	const [items, setItems] = useState([]);

	useEffect(() => {
		const currentItems = [];

		invoiceItems.forEach((item) => {
			if (item.invoiceId === currentInvoiceNumber) {
				currentItems.push(item);
			}
		});
		setItems(currentItems.length === 0 ? [new Item()] : currentItems);
	}, [invoiceItems, currentInvoiceNumber]);

	//очищает все инпуты
	useEffect(() => {
		if (isNewInvoice) {
			const inputs = document.querySelectorAll("input");
			inputs.forEach((input) => {
				input.value = "";
			});
		}
	}, [isNewInvoice]);

	const addNewItem = () => {
		setItems((prev) => [...prev, new Item()]);
	};

	// const deleteFormField = (e) => {
	// 	const currentIndex = e.target.closest('.form__item').getAttribute('index')
	// 	console.log(currentIndex)
	// 	const newInputFields = [...inputField]
	// 	newInputFields.splice(currentIndex, 1)
	// 	console.log(newInputFields)
	// 	setInputField([...newInputFields])
	// }

	const deleteItem = (id) => {
		const newItems = items.filter((item) => item.itemId !== id)
		setItems(newItems)
	}

	console.log(items);

	const renderItems = items.map((field, index) => {
		return (
			<div className="form__item" key={field.itemId}>
				<div className="row ">
					<div className="form__input-container col-12 col-md-4">
						<label className="form__label" htmlFor="name">
							Item Name
						</label>
						<input className={`form__input ${dark ? "dark-input" : ""}`} id="itemName" name="name" type="text" defaultValue={field.name} {...register("name" + index)} />
					</div>
					<div className="form__input-container col-3 col-md-1">
						<label className="form__label" htmlFor="qty">
							Qty.
						</label>
						<input className={`form__input ${dark ? "dark-input" : ""}`} id="qty" name="qty" type="number" defaultValue={field.quantity} {...register("quantity" + index)} />
					</div>
					<div className="form__input-container col-4 col-md-3">
						<label className="form__label" htmlFor="itemPrice">
							Price
						</label>
						<input className={`form__input ${dark ? "dark-input" : ""}`} name="itemPrice" id="itemPrice" type="text" defaultValue={field.price} {...register("price" + index)} />
					</div>
					<div className="form__input-container col-3 col-md-2">
						<label className="form__label">Total</label>
						<input name="total" className={`form__totalPrice ${dark ? "dark-input" : ""}`} defaultValue={field.total} {...register("total" + index)} />
					</div>
					<div className="form__button-container col-2">
						<button type="button" className="form__button" onClick={() => deleteItem(field.itemId)}>
							<img src={busket} alt="" />
						</button>
					</div>
				</div>
			</div>
		);
	});

	return (
		<>
			{renderItems}
			<div className="form__submit-container">
				<button type="button" className={`form__submit ${dark ? "dark-light" : ""}`} onClick={addNewItem}>
					+ Add New Item
				</button>
			</div>
		</>
	);
};

export default FormPartItemsList;
