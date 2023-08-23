//components
import ToClientDateInput from "../FormInputs/ToClientDateInput";
import PaymentTermsSelect from "../FormInputs/PaymentTermsSelect";
import InputErrorMessage from "../ErrorMessage/InputErrorMessage";
import Input from "../FormInputs/Input";
//context
import invoiceContext from "../../../context/invoice/invoiceContext";
//hooks
import { useContext } from "react";
//form conrol lib
import { useFormContext } from "react-hook-form";

//component renders fieldset with input
const FormPartBillTo = () => {

	const { invoices, currentInvoiceNumber } = useContext(invoiceContext);
	const {formState: {errors}} = useFormContext();

	const currentInvoice = [...invoices].filter((invoice) => invoice.invoiceId === currentInvoiceNumber )

	const { clientName, 
					clientEmail, 
					clientStreet, 
					clientCity, 
					clientPostCode,
					clientCountry,
					description,
				} = currentInvoice?.[0] ?? {};

	return (
		<fieldset className="form__fieldset">
			<legend className="form__legend">Bill To</legend>
			<div className="form__input-container col-12">
				<div className="form__label-container">
					<label className="form__label" htmlFor="name">
						Client's Name
					</label>
					<InputErrorMessage inputName={'clientName'} errors={errors}/>
				</div>
				<Input inputName={'clientName'} 
								 defaultValue={clientName} 
								 type={"text"}
								 maxLength={20}
								 minLength={2}
								 content={"text"}/>
			</div>
			<div className="form__input-container col-12">
				<div className="form__label-container">
					<label className="form__label" htmlFor="email">
						Client's Email
					</label>
					<InputErrorMessage inputName={'clientEmail'} errors={errors}/>
				</div>
				<Input inputName={'clientEmail'} 
								 defaultValue={clientEmail} 
								 type={"text"}
								 maxLength={20}
								 minLength={2}
								 content={"email"}/>
			</div>
			<div className="form__input-container col-12">
				<div className="form__label-container">
					<label className="form__label" htmlFor="toAddress">
						Street Address
					</label>
					<InputErrorMessage inputName={'clientStreet'} errors={errors}/>
				</div>
				<Input inputName={'clientStreet'} 
								 defaultValue={clientStreet} 
								 type={"text"}
								 maxLength={20}
								 minLength={2}
								 content={"text"}/>
			</div>
			<div className="row">
				<div className="form__input-container col-6 col-md-4">
					<div className="form__label-container">
						<label className="form__label" htmlFor="toCity">
							City
						</label>
						<InputErrorMessage inputName={'clientCity'} errors={errors}/>
					</div>
					<Input inputName={'clientCity'} 
								 defaultValue={clientCity} 
								 type={"text"}
								 maxLength={20}
								 minLength={2}
								 content={"text"}/>
				</div>
				<div className="form__input-container col-6 col-md-4">
					<div className="form__label-container">
						<label className="form__label" htmlFor="toPostCode">
							Post Code
						</label>
						<InputErrorMessage inputName={'clientPostCode'} errors={errors}/>
					</div>
					<Input inputName={'clientPostCode'} 
								 defaultValue={clientPostCode} 
								 type={"text"}
								 maxLength={8}
								 minLength={6}
								 content={"postcode"}/>
				</div>
				<div className="form__input-container col-12 col-md-4">
					<div className="form__label-container">
						<label className="form__label" htmlFor="toCountry">
							Country
						</label>
						<InputErrorMessage inputName={'clientCountry'} errors={errors}/>
					</div>
					<Input inputName={'clientCountry'} 
								 defaultValue={clientCountry} 
								 type={"text"}
								 maxLength={20}
								 minLength={2}
								 content={"text"}/>
				</div>
			</div>
			<div className="row">
				<div className="form__input-container col-12 col-md-6">
					<div className="form__label-container">
						<label className="form__label" htmlFor="date">
							Invoice Date
						</label>
						<InputErrorMessage inputName={'createdAt'} errors={errors}/>
					</div>
					<ToClientDateInput/>
				</div>
				<div className="form__input-container col-12 col-md-6">
					<div className="form__label-container">
						<label className="form__label" htmlFor="select">
							Payment Terms
						</label>
					</div>
					<PaymentTermsSelect/>
				</div>
				<div className="form__input-container col-12">
					<div className="form__label-container">
						<label htmlFor="" className="form__label">
							Project Description
						</label>
						<InputErrorMessage inputName={'description'} errors={errors}/>
					</div>
					<Input inputName={'description'} 
								 defaultValue={description} 
								 type={"text"}
								 maxLength={40}
								 minLength={2}
								 content={"text"}/>
				</div>
			</div>
		</fieldset>
	);
};

export default FormPartBillTo;
