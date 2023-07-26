import { ErrorMessage } from "@hookform/error-message";
import { useFormContext } from "react-hook-form";

const DynamicItemName = ({index}) => {
  const {formState: {errors}} = useFormContext();
	return (
		<>
			<ErrorMessage errors={errors} name={`items.${index}.name`} as={<p className="error-message"></p>} />

			<ErrorMessage
				errors={errors}
				name={`items.${index}.name`}
				render={({ message }) => {
					<p>{message}</p>;
				}}
			/>
		</>
	);
};

export default DynamicItemName;
