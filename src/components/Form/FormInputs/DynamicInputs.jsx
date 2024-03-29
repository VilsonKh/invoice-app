//hooks
import { useContext, useEffect, useMemo } from "react";
//components
import InputErrorMessage from "../ErrorMessage/InputErrorMessage";
//form control lib
import { useFormContext, useWatch } from "react-hook-form";
//context
import darkContext from "../../../context/dark/darkContext";
import invoiceContext from "../../../context/invoice/invoiceContext";
//assets
import busket from "../../../assets/icon-delete.svg";
//constants
import { item } from "../constants";

/** Component renders dynamic inputs
 * @param {array} fields - From react-hook-form lib. Needs to map inputs.
 * @param {function} remove - From react-hook-form lib. Needs to delete element from fields.
 * @param {function} append - From react-hook-form lib. Needs to add element ro fields.
 */
const DynamicInputs = ({ fields, remove, append }) => {
	
	const {
		register,
		control,
		setValue,
		formState: { errors },
		setFocus,
	} = useFormContext();

	const { dark } = useContext(darkContext);
	const { isNewInvoice, isEditInvoice, invoiceItems } = useContext(invoiceContext);

	/** Function watches for the quantity and price inputs changes and multiply them
	 * @param {number} index - Index of element in fields array from react-hook-form
	 * @return {element} The input with default value of multiplication
	 */
	const ShowTotal = ({ index }) => {
		const quantityWatch = useWatch({
			control,
			name: `items.${index}.quantity`,
		});

		const priceWatch = useWatch({
			control,
			name: `items.${index}.price`,
		});

		const updateTotal = useMemo(() => (+quantityWatch ?? 0) * (+priceWatch ?? 0), [quantityWatch, priceWatch]);

		useEffect(() => {
			if (!isNaN(updateTotal)) {
				setValue(`items.${index}.total`, updateTotal);
			}
		}, [index, updateTotal, quantityWatch, priceWatch]);

		return <input name="total" 
									className={`form__input form__totalPrice ${dark ? "dark-input" : ""}`} defaultValue={toString(updateTotal)} 
									{...register(`items.${index}.total`, { required: true })} />;
	};

	//clean all inputs
	useEffect(() => {
		remove();
		if (isNewInvoice) {
			const inputs = document.querySelectorAll("input");
			inputs.forEach((input) => {
				//checking type is needed as cleaning all input will remove today's date
				if(input.type !== 'date') {
					input.value = "";
				}
			});
			append(item, { shouldFocus: false });
			setFocus("fromStreet");
		} else {
			invoiceItems.forEach((item) => {
				append(item, { shouldFocus: false });
				setFocus("fromStreet");
			});
		}
		//eslint-disable-next-line
	}, [isNewInvoice, isEditInvoice]);

	return fields.map((field, index) => {
		return (
			<div className="form__item " key={field.id}>
				<div className="row ">
					<div className="form__input-container col-12 col-md-4">
						<div className="form__label-container">
							<label className="form__label" htmlFor="name">
								Item Name
							</label>
              <InputErrorMessage inputName={`items.${index}.name`}/>
						</div>
						<input
							className={`form__input ${dark ? "dark-input" : ""}`}
							id="name"
							name="name"
							type="text"
							defaultValue={field.name}
							{...register(`items.${index}.name`, {
								required: "can't be empty",
								maxLength: {
									value: 25,
									message: "should be shorter",
								},
								minLength: {
									value: 2,
									message: "should be longer",
								},
							})}
							autoFocus={false}
							aria-invalid={errors?.["items"]?.[index]?.["name"] ? "true" : "false"}
						/>
					</div>
					<div className="form__input-container col-3 col-md-2">
						<div className="form__label-container">
							<label className="form__label" htmlFor="qty">
								Qty.
							</label>
						</div>
						<input
							className={`form__input ${dark ? "dark-input" : ""}`}
							id="qty"
							defaultValue={field.quantity}
							{...register(`items.${index}.quantity`, {
								required: `quantity on line ${index + 1} can't be empty`,
								max: {
									value: 10,
									message: `quantity on line ${index + 1}  exceed max`,
								},
								pattern: {
									value: /^[0-9]*$/,
									message: `quantity on line ${index + 1}  accepts only integer`,
								},
								validate: {
									numbers: (v) => parseInt(v) > 0 || `quantity on line ${index + 1}  accepts only positive numbers`,
								},
							})}
							aria-invalid={errors?.["items"]?.[index]?.["quantity"] ? true : false}
							autoFocus={false}
						/>
					</div>
					<div className="form__input-container col-4 col-md-3">
						<div className="form__label-container">
							<label className="form__label" htmlFor="itemPrice">
								Price
							</label>
							<InputErrorMessage inputName={`items.${index}.price`}/>
						</div>

						<input
							className={`form__input ${dark ? "dark-input" : ""}`}
							name="itemPrice"
							id="itemPrice"
							defaultValue={field.price}
							{...register(`items.${index}.price`, {
								required: "can't be empty",
								max: {
									value: 99999,
									message: "exceed max",
								},
								pattern: {
									value: /^[0-9]*$/,
									message: "only numbers",
								},
								validate: {
									numbers: (v) => parseInt(v) > 0 || "only positive",
								},
							})}
							aria-invalid={errors?.["items"]?.[index]?.["price"] ? "true" : "false"}
							autoFocus={false}
						/>
					</div>
					<div className="form__input-container col-3 col-md-2">
						<div className="form__label-container">
							<label className="form__label from__label_total">Total</label>
						</div>
						<ShowTotal index={index} />
					</div>
					<div className="form__button-container col-1">
						<button data-testid="deleteButton" type="button" className="form__button" onClick={() => remove(index)} disabled={fields.length === 1 ? true : false}>
							<img src={busket} alt="" />
						</button>
					</div>
				</div>
			</div>
		);
	});
};

export default DynamicInputs;
