/* eslint-disable react/prop-types */

export const Square = ({ children, isSelected, updateBoard, index }) => {
  const clasName = `square ${isSelected ? "is-selected" : ""}`;

  const handleClick = () => {
    updateBoard(index);
  };
  return (
    <div onClick={handleClick} className={clasName}>
      {children}
    </div>
  );
};