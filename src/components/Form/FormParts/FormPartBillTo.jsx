import { useContext } from "react";
import darkContext from "../../../context/dark/darkContext";
import invoiceContext from "../../../context/invoice/invoiceContext";
import { useFormContext } from "react-hook-form";

const FormPartBillTo = () => {

  const { dark } = useContext(darkContext);
  const {invoices, currentInvoiceNumber} = useContext(invoiceContext);
  const {register} = useFormContext()

  const currentInvoice = [...invoices].filter((invoice) => {
		if (invoice.invoiceId === currentInvoiceNumber) {
			return invoice;
		}
		return false
	});
  
	const {
    clientName,
    clientEmail,
    clientStreet,
    clientCity,
    clientPostCode,
    clientCountry,
    paymentDue,
    paymentTerms,
    description
  } = currentInvoice?.[0] ?? {}

  return (
    <fieldset className="form__fieldset">
    <legend className="form__legend">Bill To</legend>
    <div className="form__input-container col-12">
      <label className="form__label" htmlFor="name">
        Client's Name
      </label>
      <input className={`form__input ${dark ? "dark-input" : ""}`} id="name" name="name" type="text" defaultValue={clientName}  {...register('clientName')}/>
    </div>
    <div className="form__input-container col-12">
      <label className="form__label" htmlFor="email">
        Client's Email
      </label>
      <input className={`form__input ${dark ? "dark-input" : ""}`} id="email" name="email" type="email" defaultValue={clientEmail} {...register('clientEmail')}/>
    </div>
    <div className="form__input-container col-12">
      <label className="form__label" htmlFor="toAddress">
        Street Address
      </label>
      <input className={`form__input ${dark ? "dark-input" : ""}`} id="toAddress" name="toAddress" type="text" defaultValue={clientStreet} {...register('clientStreet')}/>
    </div>
    <div className="row">
      <div className="form__input-container col-6 col-md-4">
        <label className="form__label" htmlFor="toCity">
          City
        </label>
        <input className={`form__input ${dark ? "dark-input" : ""}`} id="toCity" name="toCity" type="text" defaultValue={clientCity} {...register('clientCity')}/>
      </div>
      <div className="form__input-container col-6 col-md-4">
        <label className="form__label" htmlFor="toPostCode">
          Post Code
        </label>
        <input className={`form__input ${dark ? "dark-input" : ""}`} id="toPostCode" name="toPostCode" type="text" defaultValue={clientPostCode} {...register('clientPostCode')}/>
      </div>
      <div className="form__input-container col-12 col-md-4">
        <label className="form__label" htmlFor="toCountry">
          Country
        </label>
        <input className={`form__input ${dark ? "dark-input" : ""}`} id="toCountry" name="toCountry" type="text" defaultValue={clientCountry} {...register('clientCountry')}/>
      </div>
    </div>
    <div className="row">
      <div className="form__input-container col-12 col-md-6">
        <label className="form__label" htmlFor="date">
          Invoice Date
        </label>
        <input className={`form__input ${dark ? "dark-input" : ""}`} id="date" type="date" name="date" defaultValue={paymentDue} {...register('paymentDue')}/>
      </div>
      <div className="form__input-container col-12 col-md-6">
        <label className="form__label" htmlFor="select">
          Payment Terms
        </label>
        <select className={`form__select ${dark ? "dark-input" : ""}`} name="select" id="select" defaultValue={paymentTerms} {...register('paymentTerms')}>
          <option value="1">Net 1 Day</option>
          <option value="7">Net 7 Day</option>
          <option value="14">Net 14 Day</option>
          <option value="30">Net 30 Day</option>
        </select>
      </div>
      <div className="form__input-container col-12">
        <label htmlFor="" className="form__label">
          Project Desctiption
        </label>
        <input type="text" className={`form__input ${dark ? "dark-input" : ""}`} id="description" name="description" defaultValue={description} {...register('description')}/>
      </div>
    </div>
  </fieldset>
  )
}

export default FormPartBillTo