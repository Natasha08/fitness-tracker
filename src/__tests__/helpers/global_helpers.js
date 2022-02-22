import { fireEvent } from '@testing-library/react';

export const fillIn = (screen, labelText) => ({
  with: (value) => {
    const input = screen.getByLabelText(labelText);
    fireEvent.change(input, {target: {value}});
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
