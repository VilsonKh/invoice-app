import { ErrorMessage } from "@hookform/error-message";
import React from "react";
import { useFormContext } from "react-hook-form";

const ToClientNameMessage = () => {
  const {formState: {errors}} = useFormContext();
	return (
		<>
			<ErrorMessage errors={errors} name="clientName" as={<p className="error-message"></p>} />

			<ErrorMessage
				errors={errors}
				name="clientName"
				render={({ message }) => {
					<p>{message}</p>;
				}}
			/>
		</>
	);
};

export default ToClientNameMessage;
