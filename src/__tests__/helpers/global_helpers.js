import { fireEvent } from '@testing-library/react';

export const fillIn = (screen, labelText) => ({
  with: (value) => {
    const emailInput = screen.getByLabelText(labelText);
    fireEvent.change(emailInput, {target: {value}});
    expect(emailInput.value).toBe(value);
  }
});

export const clickOn = (screen, buttonText) => {
  fireEvent(
    screen.getByText(buttonText),
    new MouseEvent('click', {
      bubbles: true,
      cancelable: true,
    }),
  );
};
