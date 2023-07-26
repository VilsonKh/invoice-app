import FromStreetInput from "../FormInputs/FromStreetInput";
import FromCityInput from "../FormInputs/FromCityInput";
import FromPostCodeInput from "../FormInputs/FromPostCodeInput";
import FromCountryInput from "../FormInputs/FromCountryInput";
import FromStreetMessage from "../ErrorMessages/FromStreetMessage";
import FromCityMessage from "../ErrorMessages/FromCityMessage";
import FromPostCodeMessage from "../ErrorMessages/FromPostCodeMessage";
import FromCountryMessage from "../ErrorMessages/FromCountryMessage";

const FormPartBillFrom = () => {
	return (
		<fieldset className="form__fieldset">
			<legend className="form__legend">Bill From</legend>
			<div className="form__input-container col-12">
				<div className="form__label-container">
					<label className="form__label" htmlFor="fromStreet">
						Street Address
					</label>
					<FromStreetMessage/>
				</div>
				<FromStreetInput />
			</div>
			<div className="row">
				<div className="form__input-container col-6 col-md-4">
					<div className="form__label-container">
						<label className="form__label" htmlFor="city">
							City
						</label>
						<FromCityMessage/>
					</div>
					<FromCityInput />
				</div>
				<div className="form__input-container col-6 col-md-4">
					<div className="form__label-container">
						<label className="form__label" htmlFor="senderPostCode">
							Post Code
						</label>
						<FromPostCodeMessage/>
					</div>
					<FromPostCodeInput />
				</div>
				<div className="form__input-container col-12 col-md-4">
					<div className="form__label-container">
						<label className="form__label" htmlFor="country">
							Country
						</label>
						<FromCountryMessage/>
					</div>	
					<FromCountryInput />
				</div>
			</div>
		</fieldset>
	);
};

export default FormPartBillFrom;
