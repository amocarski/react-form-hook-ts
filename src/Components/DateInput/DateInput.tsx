import React, { ChangeEvent } from "react";
import "./../Input/input.scss";

const DateInput = (props: {
  label: string;
  placeholder: string;
  required?: boolean;
  name: string;
  value: string;
  errorText?: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  onBlur?: (e: ChangeEvent<HTMLInputElement>) => void;
  error?: boolean;
}) => {
  const { label, required = false, onChange, onBlur, error, errorText, ...rest } = props;

  return (
    <div className={error ? "danger input" : "input"}>
      <span className={"label"}>{label}{required ? "*" : ""}</span>
      <input
        required={required}
        type="text"
        onChange={onChange}
        onBlur={onBlur}
        {...rest}
      />
      {error ? <span data-testid="helperText" className={"helper-text"}>{errorText}</span> : null}
    </div>
  );
};

export default DateInput;
