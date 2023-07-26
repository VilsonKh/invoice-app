import { useContext } from "react";
import invoiceContext from "../../../context/invoice/invoiceContext";
import darkContext from "../../../context/dark/darkContext";
import { useFormContext } from "react-hook-form";
import { getFormatedDate } from "../../helpers/formatDate";

const ToClientDateInput = () => {
  const { invoices, currentInvoiceNumber, isEditInvoice, isNewInvoice } = useContext(invoiceContext);
	const { dark } = useContext(darkContext);
	const {
		register,
		formState: { errors },
    setValue
	} = useFormContext();

	const currentInvoice = [...invoices].filter((invoice) => {
		if (invoice.invoiceId === currentInvoiceNumber) {
			return invoice;
		}
		return false;
	});

	const { createdAt } = currentInvoice?.[0] ?? {};

  if (isNewInvoice) {
		setValue("createdAt", getFormatedDate(new Date()));
	} else {
		setValue("createdAt", createdAt);
	}
	return (
		<input
			className={`form__input ${dark ? "dark-input" : ""}`}
			id="date"
			type="date"
			defaultValue={createdAt}
			{...register("createdAt", { required: true })}
			aria-invalid={errors.createdAt ? "true" : "false"}
			disabled={isEditInvoice ? true : false}
		/>
	);
};

export default ToClientDateInput;
