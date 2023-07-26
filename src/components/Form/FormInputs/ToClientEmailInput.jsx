import React, { useContext } from 'react'
import invoiceContext from '../../../context/invoice/invoiceContext';
import darkContext from '../../../context/dark/darkContext';
import { useFormContext } from 'react-hook-form';

const ToClientEmailInput = () => {
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

	const { clientEmail } = currentInvoice?.[0] ?? {};
  return (
    <input
					className={`form__input ${dark ? "dark-input" : ""}`}
					id="email"
					name="email"
					type="email"
					defaultValue={clientEmail}
					{...register("clientEmail", {
						required: "can't be empty",
						pattern: {
							//eslint-disable-next-line
							value: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g,
							message: "incorrect email",
						},
					})}
					aria-invalid={errors.fromStreet ? "true" : "false"}
				/>
  )
}

export default ToClientEmailInput