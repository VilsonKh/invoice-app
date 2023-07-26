import { ErrorMessage } from "@hookform/error-message";
import { useFormContext } from "react-hook-form";

const FromStreetMessage = () => {
  const {formState: {errors}} = useFormContext();

	return (
		<>
			<ErrorMessage errors={errors} name="fromStreet" as={<p className="error-message"></p>} />

			<ErrorMessage
				errors={errors}
				name="fromStreet"
				render={({ message }) => {
					<p>{message}</p>;
				}}
			/>
		</>
	);
};

export default FromStreetMessage;
