import React, { useContext } from 'react'
import invoiceContext from '../../../context/invoice/invoiceContext';
import darkContext from '../../../context/dark/darkContext';
import { useFormContext } from 'react-hook-form';

const ToClientStreetInput = () => {
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

	const { clientStreet } = currentInvoice?.[0] ?? {};
  return (
    <input
					className={`form__input ${dark ? "dark-input" : ""}`}
					id="toAddress"
					name="toAddress"
					type="text"
					defaultValue={clientStreet}
					{...register("clientStreet", {
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
					aria-invalid={errors.fromStreet ? "true" : "false"}
				/>
  )
}

export default ToClientStreetInput