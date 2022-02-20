import { fireEvent } from '@testing-library/react';

export const fillIn = ({labelText, value, app}) => {
  const emailInput = app.getByLabelText(labelText);
  fireEvent.change(emailInput, {target: {value}});
  expect(emailInput.value).toBe(value);
};

export const clickOn = (buttonText, {app}) => {
  fireEvent(
    app.getByText(buttonText),
    new MouseEvent('click', {
      bubbles: true,
      cancelable: true,
    }),
  );
};
