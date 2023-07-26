import React, { useContext } from 'react'
import invoiceContext from '../../../context/invoice/invoiceContext';
import darkContext from '../../../context/dark/darkContext';
import { useFormContext } from 'react-hook-form';

const ToClientCountryInput = () => {
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

	const { clientCountry } = currentInvoice?.[0] ?? {};
  return (
    <input
    className={`form__input ${dark ? "dark-input" : ""}`}
    id="toCountry"
    name="toCountry"
    type="text"
    defaultValue={clientCountry}
    {...register("clientCountry", {
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
        message: "incorrect city",
      },
    })}
    aria-invalid={errors.clientCountry ? "true" : "false"}
  />
  )
}

export default ToClientCountryInput