import { ErrorMessage } from "@hookform/error-message";
import React from "react";
import { useFormContext } from "react-hook-form";

const ToClientEmailMessage = () => {
  const {formState: {errors}} = useFormContext();
	return (
		<>
			<ErrorMessage errors={errors} name="clientEmail" as={<p className="error-message"></p>} />

			<ErrorMessage
				errors={errors}
				name="clientEmail"
				render={({ message }) => {
					<p>{message}</p>;
				}}
			/>
		</>
	);
};

export default ToClientEmailMessage;
