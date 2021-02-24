import React, { ChangeEvent } from "react";
import "./select.scss";

const Select = (props: {
    label: string;
    placeholder?: string;
    onChange: (e: ChangeEvent<HTMLSelectElement>) => void;
    onBlur?: (e: ChangeEvent<HTMLSelectElement>) => void;
    error?: boolean;
    name: string;
    value: string;
    required?: boolean;
    options: Array<any>
}) => {
    const { label, onChange, onBlur, error = false, options, required = false, ...rest } = props;
    const sufix = label?.toLowerCase();

    return (
        <div className={error ? "select danger" : "select"}>
            <span className={"label"}>{label}{required ? "*" : ""}</span>
            <select {...rest} onChange={onChange} onBlur={onBlur} >
                {options.map((selectOption: any) => <option key={selectOption} defaultValue={options[0]} value={selectOption}>{selectOption}</option>)}
            </select>
            {error ? <span className={"helper-text"}>Please, provide your {sufix}</span> : null}
        </div>
    );
};

export default Select;