import { useContext } from "react";
import darkContext from "../../../context/dark/darkContext";
import invoiceContext from "../../../context/invoice/invoiceContext";
import { useFormContext } from "react-hook-form";

const FormPartBillTo = () => {

  const { dark } = useContext(darkContext);
  const {invoices, currentInvoiceNumber} = useContext(invoiceContext);
  const {register, formState: {errors}} = useFormContext()

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
      <div className="form__label-container">
        <label className="form__label" htmlFor="name">
          Client's Name
        </label>
        {errors.clientName?.type === 'required' && (
								<p role="alert" className="error-message">can't be empty</p>)}
      </div>
      <input className={`form__input ${dark ? "dark-input" : ""}`} 
             id="name" 
             name="name" 
             type="text" 
             defaultValue={clientName}  
             {...register("clientName", {required: true, mapLength: 20})}
							 aria-invalid={errors.clientName ? 'true' : 'false'}/>
    </div>
    <div className="form__input-container col-12">
      <div className="form__label-container">
        <label className="form__label" htmlFor="email">
          Client's Email
        </label>
        {errors.clientEmail?.type === 'required' && (
								<p role="alert" className="error-message">can't be empty</p>)}
      </div>
      <input className={`form__input ${dark ? "dark-input" : ""}`} 
             id="email" 
             name="email" 
             type="email" 
             defaultValue={clientEmail} 
             {...register('clientEmail', {required: true, mapLength: 20})}
             aria-invalid={errors.fromStreet ? 'true' : 'false'}/>
    </div>
    <div className="form__input-container col-12">
      <div className="form__label-container">
        <label className="form__label" htmlFor="toAddress">
          Street Address
        </label>
        {errors.clientStreet?.type === 'required' && (
								<p role="alert" className="error-message">can't be empty</p>)}
      </div>
      <input className={`form__input ${dark ? "dark-input" : ""}`} 
             id="toAddress" 
             name="toAddress" 
             type="text" 
             defaultValue={clientStreet} 
             {...register('clientStreet', {required: true, mapLength: 20})}
             aria-invalid={errors.fromStreet ? 'true' : 'false'}/>
    </div>
    <div className="row">
      <div className="form__input-container col-6 col-md-4">
        <div className="form__label-container">
          <label className="form__label" htmlFor="toCity">
            City
          </label>
          {errors.clientCity?.type === 'required' && (
								<p role="alert" className="error-message">can't be empty</p>)}
        </div>
        <input className={`form__input ${dark ? "dark-input" : ""}`} 
               id="toCity" 
               name="toCity" 
               type="text" 
               defaultValue={clientCity} 
               {...register('clientCity', {required: true, mapLength: 20})}
               aria-invalid={errors.fromStreet ? 'true' : 'false'}/>
      </div>
      <div className="form__input-container col-6 col-md-4">
        <div className="form__label-container">
          <label className="form__label" htmlFor="toPostCode">
            Post Code
          </label>
          {errors.clientPostCode?.type === 'required' && (
								<p role="alert" className="error-message">can't be empty</p>)}
        </div>
        <input className={`form__input ${dark ? "dark-input" : ""}`} 
               id="toPostCode" 
               name="toPostCode" 
               type="text" 
               defaultValue={clientPostCode}
               maxLength='6'
               {...register('clientPostCode', {required: true, mapLength: 20})}
               aria-invalid={errors.fromStreet ? 'true' : 'false'}/>
      </div>
      <div className="form__input-container col-12 col-md-4">
       <div className="form__label-container">
          <label className="form__label" htmlFor="toCountry">
            Country
          </label>
          {errors.clientCountry?.type === 'required' && (
								<p role="alert" className="error-message">can't be empty</p>)}
       </div>
        <input className={`form__input ${dark ? "dark-input" : ""}`} 
               id="toCountry" 
               name="toCountry" 
               type="text" 
               defaultValue={clientCountry} 
               {...register('clientCountry', {required: true, mapLength: 20})}
               aria-invalid={errors.clientCountry ? 'true' : 'false'}/>
      </div>
    </div>
    <div className="row">
      <div className="form__input-container col-12 col-md-6">
        <div className="form__label-container">
          <label className="form__label" htmlFor="date">
            Invoice Date
          </label>
          {errors.paymentDue?.type === 'required' && (
								<p role="alert" className="error-message">can't be empty</p>)}
        </div>
        <input className={`form__input ${dark ? "dark-input" : ""}`} 
               id="date" 
               type="date" 
               name="date" 
               defaultValue={paymentDue} 
               {...register('paymentDue', {required: true})}
               aria-invalid={errors.paymentDue ? 'true' : 'false'}/>
      </div>
      <div className="form__input-container col-12 col-md-6">
        <div className="form__label-container">
          <label className="form__label" htmlFor="select">
            Payment Terms
          </label>
          {errors.paymentsTerms?.type === 'required' && (
								<p role="alert" className="error-message">can't be empty</p>)}
        </div>
        <select className={`form__select ${dark ? "dark-input" : ""}`} 
                name="select" 
                id="select" 
                defaultValue={paymentTerms} 
                {...register('paymentTerms', {required: true})}
                aria-invalid={errors.paymentTerms ? 'true' : 'false'}>
          <option value="1">Net 1 Day</option>
          <option value="7">Net 7 Day</option>
          <option value="14">Net 14 Day</option>
          <option value="30">Net 30 Day</option>
        </select>
      </div>
      <div className="form__input-container col-12">
       <div className="form__label-container">
          <label htmlFor="" className="form__label">
            Project Desctiption
          </label>
          {errors.description?.type === 'required' && (
								<p role="alert" className="error-message">can't be empty</p>)}
       </div>
        <input type="text" 
               className={`form__input ${dark ? "dark-input" : ""}`} id="description" 
               name="description" 
               defaultValue={description} 
               {...register('description', {required: true, maxLenght: 20})}
               aria-invalid={errors.description ? 'true' : 'false'}
               />
      </div>
    </div>
  </fieldset>
  )
}

export default FormPartBillTo