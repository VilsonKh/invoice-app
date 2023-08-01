import ToClientNameInput from "../FormInputs/ToClientNameInput";
import ToClientNameMessage from "../ErrorMessages/ToClientNameMessage";
import ToClientEmailMessage from "../ErrorMessages/ToClientEmailMessage";
import ToClientEmailInput from "../FormInputs/ToClientEmailInput";
import ToClientStreetMessage from "../ErrorMessages/ToClientStreetMessage";
import ToClientStreetInput from "../FormInputs/ToClientStreetInput";
import ToClientCityMessage from "../ErrorMessages/ToClientCityMessage";
import ToClientCityInput from "../FormInputs/ToClientCityInput";
import ToClientPostCodeMessage from "../ErrorMessages/ToClientPostCodeMessage";
import ToClientPostCodeInput from "../FormInputs/ToClientPostCodeInput";
import ToClientCountryMessage from "../ErrorMessages/ToClientCountryMessage";
import ToClientCountryInput from "../FormInputs/ToClientCountryInput";
import ToClientDateInput from "../FormInputs/ToClientDateInput";
import PaymentTermsSelect from "../FormInputs/PaymentTermsSelect";
import ProjectDescriptionMessage from "../ErrorMessages/ProjectDescriptionMessage";
import InvoiceDateMessage from "../ErrorMessages/InvoiceDateMessage";
import ProjectDescriptionInput from "../FormInputs/ProjectDescriptionInput";

const FormPartBillTo = () => {
	return (
		<fieldset className="form__fieldset">
			<legend className="form__legend">Bill To</legend>
			<div className="form__input-container col-12">
				<div className="form__label-container">
					<label className="form__label" htmlFor="name">
						Client's Name
					</label>
					<ToClientNameMessage />
				</div>
				<ToClientNameInput />
			</div>
			<div className="form__input-container col-12">
				<div className="form__label-container">
					<label className="form__label" htmlFor="email">
						Client's Email
					</label>
					<ToClientEmailMessage />
				</div>
				<ToClientEmailInput />
			</div>
			<div className="form__input-container col-12">
				<div className="form__label-container">
					<label className="form__label" htmlFor="toAddress">
						Street Address
					</label>
					<ToClientStreetMessage />
				</div>
				<ToClientStreetInput />
			</div>
			<div className="row">
				<div className="form__input-container col-6 col-md-4">
					<div className="form__label-container">
						<label className="form__label" htmlFor="toCity">
							City
						</label>
						<ToClientCityMessage />
					</div>
					<ToClientCityInput/>
				</div>
				<div className="form__input-container col-6 col-md-4">
					<div className="form__label-container">
						<label className="form__label" htmlFor="toPostCode">
							Post Code
						</label>
						<ToClientPostCodeMessage/>
					</div>
					<ToClientPostCodeInput/>
				</div>
				<div className="form__input-container col-12 col-md-4">
					<div className="form__label-container">
						<label className="form__label" htmlFor="toCountry">
							Country
						</label>
						<ToClientCountryMessage/>
					</div>
					<ToClientCountryInput/>
				</div>
			</div>
			<div className="row">
				<div className="form__input-container col-12 col-md-6">
					<div className="form__label-container">
						<label className="form__label" htmlFor="date">
							Invoice Date
						</label>
						<InvoiceDateMessage/>
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
							Project Desctiption
						</label>
						<ProjectDescriptionMessage/>
					</div>
					<ProjectDescriptionInput/>
				</div>
			</div>
		</fieldset>
	);
};

export default FormPartBillTo;
