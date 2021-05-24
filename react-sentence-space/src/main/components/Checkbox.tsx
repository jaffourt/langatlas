import React from "react";

const Checkbox = ({ label, isSelected, onCheckboxChange, ID }) => (
  <div className="form-check">
    <label>
      <input
        type="checkbox"
        name={label}
        checked={isSelected}
        onChange={onCheckboxChange}
        className={ID}
      />
      {label}
    </label>
  </div>
);

export default Checkbox;