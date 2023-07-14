import { useContext, useEffect, useRef } from "react";
import darkContext from "../../../context/dark/darkContext";
import invoiceContext from "../../../context/invoice/invoiceContext";
import { useFormContext } from "react-hook-form";
import { ErrorMessage } from "@hookform/error-message";

const FormPartBillFrom = () => {
	const { dark } = useContext(darkContext);
	const { invoices, currentInvoiceNumber, isNewInvoice, isEditInvoice } = useContext(invoiceContext);
	const {
		register,
		formState: { errors },
		setFocus,
	} = useFormContext();

	const currentInvoice = [...invoices].filter((invoice) => {
		if (invoice.invoiceId === currentInvoiceNumber) {
			return invoice;
		}
		return false;
	});

	const { fromStreet, fromCity, senderPostCode, fromCountry } = currentInvoice?.[0] ?? {};

	return (
		<fieldset className="form__fieldset">
			<legend className="form__legend">Bill From</legend>
			<div className="form__input-container col-12">
				<div className="form__label-container">
					<label className="form__label" htmlFor="fromStreet">
						Street Address
					</label>
					{errors.fromStreet?.type === "required" && (
						<p role="alert" className="error-message">
							can't be empty
						</p>
					)}
				</div>
				<input
					name="fromStreet"
					className={`form__input ${dark ? "dark-input" : ""}`}
					id="fromStreet"
					type="text"
					defaultValue={fromStreet}
					{...register("fromStreet", { required: true, maxLength: 20 })}
					aria-invalid={errors.fromStreet ? "true" : "false"}
				/>
			</div>
			<div className="row">
				<div className="form__input-container col-6 col-md-4">
					<div className="form__label-container">
						<label className="form__label" htmlFor="city">
							City
						</label>
						{errors.fromStreet?.type === "required" && (
							<p role="alert" className="error-message">
								can't be empty
							</p>
						)}
					</div>
					<input
						name="fromCity"
						className={`form__input ${dark ? "dark-input" : ""}`}
						id="fromCity"
						type="text"
						defaultValue={fromCity}
						{...register("fromCity", { required: { value: true }, maxLength: 20 })}
						aria-invalid={errors.fromCity ? "true" : "false"}
					/>
				</div>
				<div className="form__input-container col-6 col-md-4">
					<div className="form__label-container">
						<label className="form__label" htmlFor="postCode">
							Post Code
						</label>
						{/* {errors.fromStreet?.type === 'required' && (
								<p role="alert" className="error-message">can't be empty</p>)} */}
						{/* <ErrorMessage errors={errors} name='senderPostCode'/> */}

						<ErrorMessage errors={errors} name="senderPostCode" render={({ message }) => <p className="error-message">{message}</p>} />
					</div>
					<input
						name="formPostCode"
						className={`form__input ${dark ? "dark-input" : ""}`}
						id="fromPostCode"
						type="text"
						defaultValue={senderPostCode}
						maxLength="6"
						{...register("senderPostCode", {
							required: "cant't be empty",
							maxLength: {
								value: 6,
								message: "max length is 6",
							},
						})}
						aria-invalid={errors.senderPostCode ? "true" : "false"}
					/>
				</div>
				<div className="form__input-container col-12 col-md-4">
					<div className="form__label-container">
						<label className="form__label" htmlFor="country">
							Country
						</label>
						{errors.fromCountry?.type === "required" && (
							<p role="alert" className="error-message">
								can't be empty
							</p>
						)}
					</div>
					<input
						name="country"
						className={`form__input ${dark ? "dark-input" : ""}`}
						id="country"
						type="text"
						defaultValue={fromCountry}
						{...register("fromCountry", { required: true, mapLength: 20 })}
						aria-invalid={errors.fromStreet ? "true" : "false"}
					/>
				</div>
			</div>
		</fieldset>
	);
};

export default FormPartBillFrom;
