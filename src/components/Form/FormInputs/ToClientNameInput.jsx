import React, { useContext } from 'react'
import invoiceContext from '../../../context/invoice/invoiceContext';
import darkContext from '../../../context/dark/darkContext';
import { useFormContext } from 'react-hook-form';

const ToClientNameInput = () => {
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

	const { clientName } = currentInvoice?.[0] ?? {};
  return (
    <input
					className={`form__input ${dark ? "dark-input" : ""}`}
					id="name"
					name="name"
					type="text"
					defaultValue={clientName}
					{...register("clientName", {
						required: "can't be empty",
						maxLength: {
							value: 30,
							message: "should be shorter",
						},
						minLength: {
							value: 2,
							message: "should be longer",
						},
						pattern: {
							value: /^[A-Za-z\s]+/,
							message: "only letters",
						},
					})}
					aria-invalid={errors.clientName ? "true" : "false"}
				/>
  )
}

export default ToClientNameInput