import { ErrorMessage } from "@hookform/error-message";
import React from "react";
import { useFormContext } from "react-hook-form";

const ProjectDescriptionMessage = () => {
	const {
		formState: { errors },
	} = useFormContext();
	return (
		<>
			<ErrorMessage errors={errors} name="description" as={<p className="error-message"></p>} />

			<ErrorMessage
				errors={errors}
				name="description"
				render={({ message }) => {
					<p>{message}</p>;
				}}
			/>
		</>
	);
};

export default ProjectDescriptionMessage;
