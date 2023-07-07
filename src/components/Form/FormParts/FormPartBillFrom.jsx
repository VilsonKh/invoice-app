import { useContext, useEffect } from "react";
import darkContext from "../../../context/dark/darkContext";
import invoiceContext from "../../../context/invoice/invoiceContext";
import { useFormContext } from "react-hook-form";

const FormPartBillFrom = () => {
	const { dark } = useContext(darkContext);
	const { invoices, currentInvoiceNumber, isNewInvoice } = useContext(invoiceContext);
	const { register } = useFormContext(
	);

	const currentInvoice = [...invoices].filter((invoice) => {
		if (invoice.invoiceId === currentInvoiceNumber) {
			return invoice;
		}
		return false;
	});

	const { senderStreet, senderCity, senderPostCode, senderCountry } = currentInvoice[0];

	console.log(senderPostCode)

	return (
		<fieldset className="form__fieldset">
			<legend className="form__legend">Bill From</legend>
			<div className="form__input-container col-12">
				<label className="form__label" htmlFor="fromStreet">
					Street Address
				</label>
				<input name="fromStreet" className={`form__input ${dark ? "dark-input" : ""}`} id="fromStreet" type="text" defaultValue={senderStreet} {...register("fromStreet")} />
			</div>
			<div className="row">
				<div className="form__input-container col-6 col-md-4">
					<label className="form__label" htmlFor="city">
						City
					</label>
					<input name="fromCity" className={`form__input ${dark ? "dark-input" : ""}`} id="fromCity" type="text" defaultValue={senderCity} {...register("fromCity")} />
				</div>
				<div className="form__input-container col-6 col-md-4">
					<label className="form__label" htmlFor="postCode">
						Post Code
					</label>
					<input name="formPostCode" className={`form__input ${dark ? "dark-input" : ""}`} id="fromPostCode" type="text" defaultValue={senderPostCode} {...register("senderPostCode")} />
				</div>
				<div className="form__input-container col-12 col-md-4">
					<label className="form__label" htmlFor="country">
						Country
					</label>
					<input name="country" className={`form__input ${dark ? "dark-input" : ""}`} id="country" type="text" defaultValue={senderCountry} {...register('senderCountry')}/>
				</div>
			</div>
		</fieldset>
	);
};

export default FormPartBillFrom;
