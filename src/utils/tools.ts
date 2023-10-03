export function delay(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export function formIsValid(formData: { [key: string]: string }) {
  const isValid = Object.keys(formData).every((key) =>
    Boolean(formData[key].trim())
  );
  return isValid;
}
