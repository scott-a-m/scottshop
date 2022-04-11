import React from "react";

const AccountFormRow = ({ name, type, value, onChangeFunc }) => {
  return (
    <div>
      <label className="block text-sm xs:text-base" htmlFor={name}>
        {name}
      </label>
      <input
        type={type}
        value={value}
        name={name}
        onChange={onChangeFunc}
        className="p-1 w-full rounded-md"
        required={true}
      />
    </div>
  );
};

export default AccountFormRow;
