import { fireEvent } from '@testing-library/react';

export const fillIn = ({labelText, value, screen}) => {
  const emailInput = screen.getByLabelText(labelText);
  fireEvent.change(emailInput, {target: {value}});
  expect(emailInput.value).toBe(value);
};

export const clickOn = (buttonText, {screen}) => {
  fireEvent(
    screen.getByText(buttonText),
    new MouseEvent('click', {
      bubbles: true,
      cancelable: true,
    }),
  );
};
