import { ErrorMessage } from "@hookform/error-message";
import React from "react";
import { useFormContext } from "react-hook-form";

const DynamicItemPrice = ({index}) => {
  const {formState: {errors}} = useFormContext();
	return (
		<>
			<ErrorMessage errors={errors} name={`items.${index}.price`} as={<p className="error-message"></p>} />

			<ErrorMessage
				errors={errors}
				name={`items.${index}.price`}
				render={({ message }) => {
					<p>{message}</p>;
				}}
			/>
		</>
	);
};

export default DynamicItemPrice;
