const getPadString = (number: number, length: number, fill?: string) =>
  String(number).padStart(length, fill);

export default getPadString;
