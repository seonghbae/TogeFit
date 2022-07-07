/* eslint-disable jsx-a11y/interactive-supports-focus */
/* eslint-disable jsx-a11y/control-has-associated-label */

const ArrowButton = (props: {
  className?: any;
  style?: any;
  onClick?: any;
}) => {
  // eslint-disable-next-line react/prop-types
  const { className, style, onClick } = props;
  return (
    <div
      role="button"
      className={className}
      style={{ ...style, display: 'block' }}
      onClick={onClick}
      onKeyUp={onClick}
    />
  );
};

export default ArrowButton;
