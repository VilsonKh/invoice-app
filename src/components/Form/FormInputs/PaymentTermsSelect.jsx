import { useContext } from "react";
import darkContext from "../../../context/dark/darkContext";
import invoiceContext from "../../../context/invoice/invoiceContext";
import { useFormContext } from "react-hook-form";

const PaymentTermsSelect = () => {
  const { invoices, currentInvoiceNumber } = useContext(invoiceContext);
	const { dark } = useContext(darkContext);
	const {
		register,
	} = useFormContext();

	const currentInvoice = [...invoices].filter((invoice) => invoice.invoiceId === currentInvoiceNumber )

	const { paymentTerms } = currentInvoice?.[0] ?? {};
	return (
		<select className={`form__select ${dark ? "dark-input" : ""}`} name="select" id="select" defaultValue={paymentTerms} {...register("paymentTerms")}>
			<option value="1">Net 1 Day</option>
			<option value="7">Net 7 Day</option>
			<option value="14">Net 14 Day</option>
			<option value="30">Net 30 Day</option>
		</select>
	);
};

export default PaymentTermsSelect;
