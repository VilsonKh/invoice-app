//hooks
import { useContext } from "react";
//context
import invoiceContext from "../../../context/invoice/invoiceContext";
import darkContext from "../../../context/dark/darkContext";
//form control lib
import { useFormContext } from "react-hook-form";
//helpers
import { getFormatedDate } from "../../helpers/formatDate";

//component renders input type='date'
const ToClientDateInput = () => {
  const { invoices, 
					currentInvoiceNumber, 
					isEditInvoice, 
					isNewInvoice } = useContext(invoiceContext);

	const { dark } = useContext(darkContext);

	const {
		register,
		formState: { errors },
		setValue
	} = useFormContext();

	const currentInvoice = [...invoices].filter((invoice) => invoice.invoiceId === currentInvoiceNumber )

	const { createdAt } = currentInvoice?.[0] ?? {};
	
	//check is needed to fix bug, when react-hook-form doesn't recognize default value, 
	//as there are no default values passed into useForm hook
	if(isEditInvoice) setValue('createdAt', createdAt)

	return (
		<input
			className={`form__input ${dark ? "dark-input" : ""}`}
			id="date"
			type="date"
			defaultValue={isNewInvoice  ?	 getFormatedDate(new Date()) : createdAt}
			{...register("createdAt", { required: true })}
			aria-invalid={errors.createdAt ? "true" : "false"}
			disabled={isEditInvoice ? true : false}
		/>
	);
};

export default ToClientDateInput;
