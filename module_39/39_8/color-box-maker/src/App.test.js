import { render, fireEvent } from '@testing-library/react';
import App from './App';

test('renders learn react link', () => {
  console.log("APP")
  const {queryByText,getByDisplayValue} = render(<App />);

  const colorInput = getByDisplayValue("blue");
  expect(colorInput).toBeInTheDocument();

  const widthInput = getByDisplayValue("400px");
  expect(widthInput).toBeInTheDocument();

  const heightInput = getByDisplayValue("100px");
  expect(heightInput).toBeInTheDocument();

  expect(queryByText('X')).not.toBeInTheDocument()

  const btn = queryByText("Create a new Box!");

  fireEvent.change(colorInput, {target: {value: 'red'}})

  expect(getByDisplayValue('red')).toBeInTheDocument()

  fireEvent.click(btn)

  expect(queryByText('X')).toBeInTheDocument()
  
});
