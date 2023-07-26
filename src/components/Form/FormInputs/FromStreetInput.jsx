import React, { useContext } from "react";
import invoiceContext from "../../../context/invoice/invoiceContext";
import darkContext from "../../../context/dark/darkContext";
import { useFormContext } from "react-hook-form";

const FromStreetInput = () => {
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

	const { fromStreet } = currentInvoice?.[0] ?? {};

	return (
		<input
			name="fromStreet"
			className={`form__input ${dark ? "dark-input" : ""}`}
			id="fromStreet"
			type="text"
			defaultValue={fromStreet}
			{...register("fromStreet", {
				required: "can't be empty",
				maxLength: {
					value: 40,
					message: "should be shorter",
				},
				minLength: {
					value: 2,
					message: "should be longer",
				},
			})}
			aria-invalid={errors.fromStreet ? "true" : "false"}
		/>
	);
};

export default FromStreetInput;
