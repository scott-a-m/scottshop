import React from "react";

const FormRow = ({ name, type, value, onChangeFunc }) => {
  return (
    <div>
      <label htmlFor={name} className="block text-center text-lg">
        {name}
      </label>
      <input
        type={type}
        value={value}
        name={name}
        onChange={onChangeFunc}
        className="w-full h-8"
        required={true}
      />
    </div>
  );
};

export default FormRow;
