import { render, fireEvent, screen } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect"; 

import Header from "./Header";
import DarkContext from "../../context/dark/darkContext";
import DarkState from "../../context/dark/darkState";

test("при нажатии на кнопку происходит переключение dark в true", () => {
	render(
		<DarkState>
			<Header />
		</DarkState>
	);

	// Находим кнопку переключателя темы по атрибуту data-testid
	const switchButton = screen.getByTestId("switchThemeButton");

	// Имитируем клик на кнопке
	fireEvent.click(switchButton);

	const header = screen.getByTestId("header");
	expect(header.classList.contains("dark-header")).toBe(true);
});

test("клик на кнопку должен добавить класс темного оформления", () => {
	let dark = false;

	const toggleDarkMode = () => {
		dark = true;
	};
	render(
		<DarkContext.Provider value={{ dark: dark, toggleDarkMode }}>
			<Header />
		</DarkContext.Provider>
	);

	const switchButton = screen.getByTestId("switchThemeButton");

	// Имитируем клик на кнопке
	fireEvent.click(switchButton);

	// Проверяем, что значение dark изменилось на true
	expect(dark).toBe(true);
});
