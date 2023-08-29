export const handleIntUseStateSetterFromHTMLInputElement = (
  event: React.ChangeEvent<HTMLInputElement>,
  StateSetter: React.Dispatch<React.SetStateAction<number | null | undefined>>
) => {
  const input = event.target.value;
  const newValue = parseInt(input);
  StateSetter(isNaN(newValue) ? null : newValue);
};

export const handleFloatUseStateSetterFromHTMLInputElement = (
  event: React.ChangeEvent<HTMLInputElement>,
  StateSetter: React.Dispatch<React.SetStateAction<number | null | undefined>>
) => {
  const input = event.target.value;
  const newValue = parseFloat(input);
  StateSetter(isNaN(newValue) ? null : newValue);
};

export const handleStringUseStateSetterFromHTMLInputElement = (
  event: React.ChangeEvent<HTMLInputElement>,
  StateSetter: React.Dispatch<React.SetStateAction<string>>
) => {
  const input = event.target.value;
  StateSetter(input);
};
