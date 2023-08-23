import { ErrorMessage } from "@hookform/error-message";

//component render error message component from react-hook-form with passed props
const InputErrorMessage = ({inputName, errors}) => {
	return (
		<>
			<ErrorMessage errors={errors} name={inputName} as={<p className="error-message"></p>} />

			<ErrorMessage
				errors={errors}
				name={inputName}
				render={({ message }) => {
					<p>{message}</p>;
				}}
			/>
		</>
	);
};

export default InputErrorMessage;
