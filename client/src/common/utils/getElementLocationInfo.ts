const getMiddlePointX = (e: any) => {
  const { x, width } = e.currentTarget.getBoundingClientRect();

  const middlePointX = width / 2 + x;

  return middlePointX;
};

const getMiddlePointY = (e: any) => {
  const { y, height } = e.currentTarget.getBoundingClientRect();

  const middlePointY = height / 2 + y;

  return middlePointY;
};

const isCursorLeftX = (e: any) => {
  const { x, width } = e.currentTarget.getBoundingClientRect();

  const middlePointX = width / 2 + x;

  return e.clientX < middlePointX;
};

export { getMiddlePointX, getMiddlePointY, isCursorLeftX };
