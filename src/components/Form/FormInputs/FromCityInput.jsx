import React, { useContext } from 'react'
import invoiceContext from '../../../context/invoice/invoiceContext';
import darkContext from '../../../context/dark/darkContext';
import { useFormContext } from 'react-hook-form';

const FromCityInput = () => {
  const { invoices, currentInvoiceNumber } = useContext(invoiceContext);
	const { dark } = useContext(darkContext);
	const {
		register,
		formState: { errors },
	} = useFormContext();

	const currentInvoice = [...invoices].filter((invoice) => {
		if (invoice.invoiceId === currentInvoiceNumber) {
			return invoice;
		}
		return false;
	});

	const { fromCity } = currentInvoice?.[0] ?? {};

  return (
    <input
						name="fromCity"
						className={`form__input ${dark ? "dark-input" : ""}`}
						id="fromCity"
						type="text"
						defaultValue={fromCity}
						{...register("fromCity", {
							required: "can't be empty",
							maxLength: {
								value: 20,
								message: "should be shorter",
							},
							minLength: {
								value: 2,
								message: "should be longer",
							},
							pattern: {
								value: /^[A-Za-z\s]+$/,
								message: "incorrect city"
							}
						})}
						aria-invalid={errors.fromCity ? "true" : "false"}
					/>
  )
}

export default FromCityInput