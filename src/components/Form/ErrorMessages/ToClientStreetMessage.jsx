import { ErrorMessage } from "@hookform/error-message";
import { useFormContext } from "react-hook-form";

const ToClientStreetMessage = () => {
  const {formState: {errors}} = useFormContext();
	return (
		<>
			<ErrorMessage errors={errors} name="clientStreet" as={<p className="error-message"></p>} />

			<ErrorMessage
				errors={errors}
				name="clientStreet"
				render={({ message }) => {
					<p>{message}</p>;
				}}
			/>
		</>
	);
};

export default ToClientStreetMessage;
