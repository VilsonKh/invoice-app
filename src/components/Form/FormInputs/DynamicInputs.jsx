import React, { useContext, useEffect, useMemo } from "react";
import DynamicItemName from "../ErrorMessages/DynamicItemName";
import { useFormContext, useWatch } from "react-hook-form";
import darkContext from "../../../context/dark/darkContext";
import DynamicItemPrice from "../ErrorMessages/DynamicItemPrice";
import busket from "../../../assets/icon-delete.svg";
import invoiceContext from "../../../context/invoice/invoiceContext";
import { item } from "../constants";

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
			if (updateTotal >= 0) {
				setValue(`items.${index}.total`, updateTotal);
			}
		}, [index, updateTotal]);

		return <input name="total" className={`form__input form__totalPrice ${dark ? "dark-input" : ""}`} defaultValue={updateTotal} {...register(`items.${index}.total`, { required: true })} />;
	};

	//очищает все инпуты
	useEffect(() => {
		remove();
		if (isNewInvoice) {
			const inputs = document.querySelectorAll("input");
			inputs.forEach((input) => {
				//checking type is needed as cleaning all input will remove today's value
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
              <DynamicItemName index={index}/>
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
									message: `quantity on line ${index + 1}  accept only integer`,
								},
								validate: {
									numbers: (v) => parseInt(v) > 0 || `quantity on line ${index + 1}  accept only positive numbers`,
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
							<DynamicItemPrice index={index} />
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
									value: /\d/,
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
