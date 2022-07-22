const getPadString = (number: number, length: number, fill = '0') =>
  String(number).padStart(length, fill);

export default getPadString;
