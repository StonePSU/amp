import React from "react";

export function FloatingLabelInput({
  name,
  label,
  type,
  value,
  inputClassList,
  labelClassList,
  handleChange,
  required
}) {
  const labelClasses = `control-label ${labelClassList}`;
  const req = { required };
  return (
    <div className="control">
      <input
        type={type}
        name={name}
        required
        value={value}
        className={inputClassList}
        onChange={handleChange}
        {...req}
      />
      {type !== "hidden" ?
        <label htmlFor={name} className={labelClasses}>
          {label}
        </label>
        : null}
    </div>
  );
}
