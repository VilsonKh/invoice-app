import { ErrorMessage } from "@hookform/error-message";
import React from "react";
import { useFormContext } from "react-hook-form";

const FromCountryMessage = () => {
  const {formState: {errors}} = useFormContext();
	return (
		<>
			<ErrorMessage errors={errors} name="fromCountry" as={<p className="error-message"></p>} />

			<ErrorMessage
				errors={errors}
				name="fromCountry"
				render={({ message }) => {
					<p>{message}</p>;
				}}
			/>
		</>
	);
};

export default FromCountryMessage;
