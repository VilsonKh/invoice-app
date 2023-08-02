import { ErrorMessage } from "@hookform/error-message";

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
