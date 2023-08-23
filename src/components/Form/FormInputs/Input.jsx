//hooks
import { useContext } from "react";
//context
import darkContext from "../../../context/dark/darkContext";
//form control lib
import { useFormContext } from "react-hook-form";

/**Component returns input element  with props
 * @param inputName {string} - Name for registration in react-hook-form
 * @param defaultValue {string} - Default value
 * @param type {string} - Type of input (ex. text, number)
 * @param maxLength {number} - Max length for text inputs
 * @param minLength {number} - Min length for text inputs
 * @param content {string} - Key to register input with correct parametrs
 * @return {element} Input element defined with neccessary props
*/
const Input = ({ inputName, defaultValue, type, maxLength, minLength, content }) => {
	const { dark } = useContext(darkContext);
	const {
		register,
		formState: { errors },
	} = useFormContext();

	const registerInputText = {
		required: "can't be empty",
		maxLength: {
			value: maxLength,
			message: "should be shorter",
		},
		minLength: {
			value: minLength,
			message: "should be longer",
		},
		pattern: {
			value: /^[A-Za-z\s]+$/,
			message: "incorrect input",
		},
	};

	const registerInputNumber = {
		required: "cant't be empty",
		maxLength: {
			value: maxLength,
			message: "max 8 numbers",
		},
		minLength: {
			value: minLength,
			message: "min 6 numbers",
		},
		pattern: {
			value: /^[0-9]/,
			message: "only numbers",
		},
	};

	const registerInputEmail = {
		required: "can't be empty",
		pattern: {
			//eslint-disable-next-line
			value: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g,
			message: "incorrect email",
		},
	};

	let currentInputRegister = "";

	switch (content) {
		case "text":
			currentInputRegister = registerInputText;
			break;
		case "email":
			currentInputRegister = registerInputEmail;
			break;
		case "postcode":
			currentInputRegister = registerInputNumber;
			break;
		default:
			return;
	}

	const errorIndicator = errors[inputName] ? "true" : "false";
	return (
		<input
			name={inputName}
			className={`form__input ${dark && "dark-input"}`}
			id={inputName}
			type={type}
			defaultValue={defaultValue}
			{...register(inputName, { ...currentInputRegister })}
			aria-invalid={errorIndicator}
		/>
	);
};

export default Input;
