import React, { ChangeEvent } from "react";
import "./input.scss";

const Input = (props: {
  label: string;
  placeholder: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  onBlur?: (e: ChangeEvent<HTMLInputElement>) => void;
  error?: boolean;
  errorText?: string;
  name: string;
  value: string;
  required?: boolean;
}) => {
  const { label, onChange, onBlur, error, required, errorText, ...rest } = props;

  return (
    <div className={error ? "danger input" : "input"}>
      <span className={"label"}>{label}{required ? "*" : ""}</span>
      <input {...rest} type="text" onChange={onChange} onBlur={onBlur} />
      {error ? <span data-testid="helperText" className={"helper-text"}>{errorText}</span> : null}
    </div>
  );
};

export default Input;