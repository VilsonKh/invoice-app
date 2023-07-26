import { ErrorMessage } from "@hookform/error-message";
import React from "react";
import { useFormContext } from "react-hook-form";

const ToClientCountryMessage = () => {
  const {formState: {errors}} = useFormContext();
	return (
		<>
			<ErrorMessage errors={errors} name="clientCountry" as={<p className="error-message"></p>} />

			<ErrorMessage
				errors={errors}
				name="clientCountry"
				render={({ message }) => {
					<p>{message}</p>;
				}}
			/>
		</>
	);
};

export default ToClientCountryMessage;
