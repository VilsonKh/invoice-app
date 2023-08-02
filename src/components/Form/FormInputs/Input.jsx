import React, { useContext } from "react";
import darkContext from "../../../context/dark/darkContext";
import { useFormContext } from "react-hook-form";

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
			message: "incorrect city",
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
