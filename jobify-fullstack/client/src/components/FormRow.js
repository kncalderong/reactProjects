import React from "react";

const FormRow = ({ type, name, value, handleChange, labelText }) => {
  return (
    <div className="form-row">
      <label htmlFor={name} className="form-label">
        {labelText || name}
      </label>
      <input
        type={type}
        className="form-input"
        value={value}
        onChange={handleChange}
        name={name}
      />
    </div>
  );
};

export default FormRow;
