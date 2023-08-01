import { ErrorMessage } from "@hookform/error-message";
import React from "react";
import { useFormContext } from "react-hook-form";

const ToClientPostCodeMessage = () => {
  const {formState: {errors}} = useFormContext();
	return (
		<>
			<ErrorMessage errors={errors} name="clientPostCode" as={<p className="error-message"></p>} />

			<ErrorMessage
				errors={errors}
				name="clientPostCode"
				render={({ message }) => {
					<p>{message}</p>;
				}}
			/>
		</>
	);
};

export default ToClientPostCodeMessage;