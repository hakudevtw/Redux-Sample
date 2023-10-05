export function delay(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export function formIsValid(formData: { [key: string]: string }) {
  const isValid = Object.keys(formData).every((key) =>
    Boolean(formData[key].trim())
  );
  return isValid;
}

export function generateRandomDate(from: Date, to: Date = new Date()) {
  return new Date(
    from.getTime() + Math.random() * (to.getTime() - from.getTime())
  );
}

export function getRandomIntInclusive(min: number, max: number) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1) + min); // The maximum is inclusive and the minimum is inclusive
}
