import { ErrorMessage } from "@hookform/error-message";
import { useFormContext } from "react-hook-form";

const FromPostCodeMessage = () => {
  const {formState: {errors}} = useFormContext();
	return (
		<>
			<ErrorMessage errors={errors} name="senderPostCode" as={<p className="error-message"></p>} />

			<ErrorMessage
				errors={errors}
				name="senderPostCode"
				render={({ message }) => {
					<p>{message}</p>;
				}}
			/>
		</>
	);
};

export default FromPostCodeMessage;
