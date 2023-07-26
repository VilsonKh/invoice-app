import React, { useContext } from 'react'
import invoiceContext from '../../../context/invoice/invoiceContext';
import darkContext from '../../../context/dark/darkContext';
import { useFormContext } from 'react-hook-form';

const FromCountryInput = () => {
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

	const { fromCountry } = currentInvoice?.[0] ?? {};

  return (
    <input
						name="country"
						className={`form__input ${dark ? "dark-input" : ""}`}
						id="country"
						type="text"
						defaultValue={fromCountry}
						{...register("fromCountry", {
							required: "can't be empty",
							maxLength: {
								value: 25,
								message: "should be shorter",
							},
							minLength: {
								value: 2,
								message: "should be longer",
							},
							pattern: {
								value: /^[A-Za-z\s]+$/,
								message: "incorrect country",
							},
						})}
						aria-invalid={errors.fromStreet ? "true" : "false"}
					/>
  )
}

export default FromCountryInput