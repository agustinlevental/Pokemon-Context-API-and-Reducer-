
import  { useState } from 'react';
import pikachu from "./assets/pikachu.png";
import atacktrueno from "./assets/atacktrueno.png";

const PikachuIcon = ({ className }) => {
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseEnter = () => setIsHovered(true);
  const handleMouseLeave = () => setIsHovered(false);

  return (
    <img
      src={isHovered ? atacktrueno : pikachu} // Use a ternary operator to set src
      width={50}
      height={50}
      alt="Pikachu"
      className={className}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    />
  );
};

export default PikachuIcon;