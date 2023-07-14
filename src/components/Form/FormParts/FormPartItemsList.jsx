import { useCallback, useContext, useEffect, useMemo, useState } from "react";
import invoiceContext from "../../../context/invoice/invoiceContext";
import darkContext from "../../../context/dark/darkContext";
//img
import busket from "../../../assets/icon-delete.svg";
import { useFieldArray, useForm, useFormContext, useWatch } from "react-hook-form";
import { item } from "../constants";

const FormPartItemsList = (formData) => {
	const { dark } = useContext(darkContext);
	const { invoiceItems, isNewInvoice } = useContext(invoiceContext);

	const {
		register,
		control,
		setValue,
		formState: { errors },
		setFocus
	} = useFormContext();

	const { fields, append, remove, unpdate } = useFieldArray({
		control,
		name: "items",
		rules: { minLength: 1, maxLength: 3 },
		
	});

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

		return <input name="total" className={`form__totalPrice ${dark ? "dark-input" : ""}`} defaultValue={updateTotal} {...register(`items.${index}.total`, { required: true })} />;
	};


	// useEffect(() => {
	// 	invoiceItems.forEach((item) => {
	// 		append(item);
	// 	});
	// }, [isNewInvoice]);

	// фиксит баг дополнительного рендера
	// useEffect(() => {
	// 	remove(878);
	// }, [remove]);


	//очищает все инпуты
	useEffect(() => {
		remove();
		if (isNewInvoice) {
			const inputs = document.querySelectorAll("input");
			inputs.forEach((input) => {
				input.value = "";
			})
			append(item, {shouldFocus: false});
			setFocus('fromStreet')
		} else {
			invoiceItems.forEach((item) => {
				append(item, {shouldFocus: false});
				setFocus('fromStreet')
			});
		}
	}, [isNewInvoice]);

	const renderItems = fields.map((field, index) => {
		return (
			<div className="form__item" key={field.id}>
				<div className="row ">
					<div className="form__input-container col-12 col-md-4">
						<div className="form__label-container">
							<label className="form__label" htmlFor="name">
								Item Name
							</label>
						</div>
						<input
							className={`form__input ${dark ? "dark-input" : ""}`}
							id="name"
							name="name"
							type="text"
							defaultValue={field.name}
							{...register(`items.${index}.name`, { required: true })}
							autoFocus={false}
							// {...register(`items.${index}.name`)}
							// aria-invalid={`errors.items.${index}.name` ? "true" : "false"}
						/>
					</div>
					<div className="form__input-container col-3 col-md-1">
						<div className="form__label-container">
							<label className="form__label" htmlFor="qty">
								Qty.
							</label>
							{`errors.items.${index}.quantity` === "required" && (
								<p role="alert" className="error-message">
									can't be empty
								</p>
							)}
						</div>
						<input
							className={`form__input ${dark ? "dark-input" : ""}`}
							id="qty"
							type="number"
							defaultValue={field.quantity}
							{...register(`items.${index}.quantity`, { required: { value: true, valueAsNumber: true, validate: ((value) => value > 0)} })}
							// {...register(`items.${index}.quantity`)}
							aria-invalid={errors?.["items"]?.[index]?.["quantity"] ? true : false}
							autoFocus={false}
						/>
					</div>
					<div className="form__input-container col-4 col-md-3">
						<div className="form__label-container">
							<label className="form__label" htmlFor="itemPrice">
								Price
							</label>
						</div>
						<input
							className={`form__input ${dark ? "dark-input" : ""}`}
							name="itemPrice"
							id="itemPrice"
							type="number"
							defaultValue={field.price}
							{...register(`items.${index}.price`, { required: { value: true, valueAsNumber: true, max: 9999 } })}
							aria-invalid={errors?.["items"]?.[index]?.["price"] ? "true" : "false"}
							autoFocus={false}
						/>
					</div>
					<div className="form__input-container col-3 col-md-2">
						<div className="form__label-container">
							<label className="form__label">Total</label>
						</div>
						<ShowTotal index={index} />
					</div>
					<div className="form__button-container col-2">
						<button type="button" className="form__button" onClick={() => remove(index)} disabled={fields.length === 1 ? true : false}>
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
				<button type="button" className={`form__submit ${dark ? "dark-light" : ""}`} onClick={() => append(item)}>
					+ Add New Item
				</button>
			</div>
		</>
	);
};

export default FormPartItemsList;
