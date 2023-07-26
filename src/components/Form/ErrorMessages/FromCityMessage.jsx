import { ErrorMessage } from "@hookform/error-message";
import { useFormContext } from "react-hook-form";

const FromCityMessage = () => {
  const {formState: {errors}} = useFormContext();
  return (
		<>
			<ErrorMessage errors={errors} name="fromCity" as={<p className="error-message"></p>} />

			<ErrorMessage
				errors={errors}
				name="fromCity"
				render={({ message }) => {
					<p>{message}</p>;
				}}
			/>
		</>
	);
};

export default FromCityMessage;
