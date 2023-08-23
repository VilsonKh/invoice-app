//hooks
import { useContext } from "react";
//context
import darkContext from "../../../context/dark/darkContext";
import invoiceContext from "../../../context/invoice/invoiceContext";
//form contol lib
import { useFormContext } from "react-hook-form";

//component renders and register a select tag
const PaymentTermsSelect = () => {
  const { invoices, currentInvoiceNumber } = useContext(invoiceContext);
	const { dark } = useContext(darkContext);
	const {
		register,
	} = useFormContext();

	const currentInvoice = [...invoices].filter((invoice) => invoice.invoiceId === currentInvoiceNumber )

	const { paymentTerms } = currentInvoice?.[0] ?? {};
	return (
		<select className={`form__select ${dark ? "dark-input" : ""}`} 
						name="select" 
						id="select" 
						defaultValue={paymentTerms} 
						{...register("paymentTerms")}>
			<option value="1">Net 1 Day</option>
			<option value="7">Net 7 Days</option>
			<option value="14">Net 14 Days</option>
			<option value="30">Net 30 Days</option>
		</select>
	);
};

export default PaymentTermsSelect;
