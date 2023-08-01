import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect"; 
import StatusElem from "./StatusElem";
import darkContext from "../../context/dark/darkContext";
import DarkState from "../../context/dark/darkState";

function renderStatusElem(status) {
	const dark = true;

	render(
			<darkContext.Provider value={{ dark }}>
				<StatusElem status={status}/>
			</darkContext.Provider>
	);
}

test('компонент Status отражает корректный статус', () => {
  renderStatusElem('draft');
  const statusText = screen.getByText(/draft/i)
  expect(statusText).toBeInTheDocument()
})

test('не должен добавляться класс темной темы', () => {
    render(
      <DarkState>
        <StatusElem status="draft"/>
      </DarkState>
    )
    
    const statusText = screen.getByText(/draft/i)
    expect(statusText.classList.contains('dark-font')).toBe(false);
    expect(statusText.classList.contains('draft-ft')).toBe(true);
});

test('компоненту status присваивается дефолтное значение, если не переданы props', () => {
  render(
    <DarkState>
      <StatusElem/>
    </DarkState>
  )

  const statusText = screen.getByText('Processing...')
  expect(statusText).toBeInTheDocument();
})

