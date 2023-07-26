import { useContext } from "react";
import invoiceContext from "../../../context/invoice/invoiceContext";
import darkContext from "../../../context/dark/darkContext";
import { useFormContext } from "react-hook-form";

const ToClientPostCodeInput = () => {
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

	const { clientPostCode } = currentInvoice?.[0] ?? {};
	return (
		<input
			className={`form__input ${dark ? "dark-input" : ""}`}
			id="toPostCode"
			name="clientPostCode"
			defaultValue={clientPostCode}
			{...register("clientPostCode", {
				required: "cant't be empty",
				maxLength: {
					value: 8,
					message: "max 8 numbers",
				},
				minLength: {
					value: 6,
					message: "min 6 numbers",
				},
				pattern: {
					value: /^[0-9]+$/,
					message: "only numbers",
				},
			})}
			aria-invalid={errors.fromStreet ? "true" : "false"}
		/>
	);
};

export default ToClientPostCodeInput;
