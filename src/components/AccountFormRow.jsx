import React from "react";

const AccountFormRow = ({ name, type, value, onChangeFunc }) => {
  return (
    <div>
      <label className="block" htmlFor={name}>
        {name}
      </label>
      <input
        type={type}
        value={value}
        name={name}
        onChange={onChangeFunc}
        className="w-80 py-1"
        required={true}
      />
    </div>
  );
};

export default AccountFormRow;
