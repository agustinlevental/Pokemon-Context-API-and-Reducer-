import Button from "@mui/material/Button";
import PropTypes from "prop-types";
import CircularProgress from '@mui/material/CircularProgress';

const CustomButton = ({ name, onClick, disabled ,size,loading }) => {
  return (
    <Button
    variant="contained"
    style={{ backgroundColor: "gray" }}
    onClick={onClick}
    disabled={disabled || loading} // Disable button while loading
    size={size}
  >
    {loading ?  <CircularProgress /> : name}
  </Button>
  );
};

CustomButton.propTypes = {
  name: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
  disabled:PropTypes.bool,
  size: PropTypes.string,
  loading :PropTypes.bool
};

export default CustomButton;