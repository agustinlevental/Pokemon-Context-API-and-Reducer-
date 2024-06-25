import Button from "@mui/material/Button";
import PropTypes from "prop-types";

const CustomButton = ({ name, onClick, disabled ,size}) => {
  return (
    <Button
      variant="contained"
      style={{ backgroundColor: "gray" }}
      onClick={onClick}
      disabled={disabled}
      size={size}
    >
      {name}
    </Button>
  );
};

CustomButton.propTypes = {
  name: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
  disabled:PropTypes.bool,
  size: PropTypes.string,
};

export default CustomButton;