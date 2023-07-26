import React, { useContext } from 'react'
import invoiceContext from '../../../context/invoice/invoiceContext';
import darkContext from '../../../context/dark/darkContext';
import { useFormContext } from 'react-hook-form';

const FromPostCodeInput = () => {

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

	const { senderPostCode } = currentInvoice?.[0] ?? {};

  return (
    <input
						name="senderPostCode"
						className={`form__input ${dark ? "dark-input" : ""}`}
						id="senderPostCode"
						defaultValue={senderPostCode}
						{...register("senderPostCode", {
							required: "cant't be empty",
							maxLength: {
								value: 6,
								message: "max 6 numbers",
							},
							minLength: {
								value: 6,
								message: "min 6 numbers",
							},
							pattern: {
								value: /^[0-9]/,
								message: "only numbers",
							},
						})}
						aria-invalid={errors.senderPostCode ? "true" : "false"}
					/>
  )
}

export default FromPostCodeInput