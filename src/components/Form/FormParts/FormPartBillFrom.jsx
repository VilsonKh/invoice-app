import Input from "../FormInputs/Input";
import InputErrorMessage from "../ErrorMessage/InputErrorMessage";
import { useContext } from "react";
import invoiceContext from "../../../context/invoice/invoiceContext";
import { useFormContext } from "react-hook-form";

const FormPartBillFrom = () => {
  const { invoices, currentInvoiceNumber } = useContext(invoiceContext);
  const {formState: {errors}} = useFormContext();

	const currentInvoice = [...invoices].filter((invoice) => invoice.invoiceId === currentInvoiceNumber )
		

	const { fromCity, fromStreet, senderPostCode, fromCountry} = currentInvoice?.[0] ?? {};

	return (
		<fieldset className="form__fieldset">
			<legend className="form__legend">Bill From</legend>
			<div className="form__input-container col-12">
				<div className="form__label-container">
					<label className="form__label" htmlFor="fromStreet">
						Street Address
					</label>
					<InputErrorMessage inputName={"fromStreet"} errors={errors}/>
				</div>
				<Input inputName={'fromStreet'} 
							 defaultValue={fromStreet} 
							 type={"text"}
							 maxLength={40}
							 minLength={2}
							 content={"text"}/>
			</div>
			<div className="row">
				<div className="form__input-container col-6 col-md-4">
					<div className="form__label-container">
						<label className="form__label" htmlFor="city">
							City
						</label>
						<InputErrorMessage inputName={"fromCity"} errors={errors}/>
					</div>
					<Input inputName={'fromCity'} 
								 defaultValue={fromCity} 
								 type={"text"}
								 maxLength={20}
								 minLength={2}
								 content={"text"}/>
				</div>
				<div className="form__input-container col-6 col-md-4">
					<div className="form__label-container">
						<label className="form__label" htmlFor="senderPostCode">
							Post Code
						</label>
						<InputErrorMessage inputName={"senderPostCode"} errors={errors}/>
					</div>
					<Input inputName={'senderPostCode'} 
								 defaultValue={senderPostCode} 
								 type={"text"}
								 maxLength={8}
								 minLength={6}
								 content={"postcode"}/>
				</div>
				<div className="form__input-container col-12 col-md-4">
					<div className="form__label-container">
						<label className="form__label" htmlFor="country">
							Country
						</label>
						<InputErrorMessage inputName={"fromCountry"} errors={errors}/>
					</div>	
					<Input inputName={'fromCountry'} 
								 defaultValue={fromCountry} 
								 type={"text"}
								 maxLength={20}
								 minLength={2}
								 content={"text"}/>
				</div>
			</div>
		</fieldset>
	);
};

export default FormPartBillFrom;
