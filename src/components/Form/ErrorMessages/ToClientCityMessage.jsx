import { ErrorMessage } from "@hookform/error-message";
import { useFormContext } from "react-hook-form";

const ToClientCityMessage = () => {
  const {formState: {errors}} = useFormContext();
	return (
		<>
			<ErrorMessage errors={errors} name="clientCity" as={<p className="error-message"></p>} />

			<ErrorMessage
				errors={errors}
				name="clientCity"
				render={({ message }) => {
					<p>{message}</p>;
				}}
			/>
		</>
	);
};

export default ToClientCityMessage;
