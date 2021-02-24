import { fireEvent, render } from "@testing-library/react";
import React, { ChangeEvent } from "react";
import Select from "./Select";


describe('Select', () => {
    const props = {
        label: "User type",
        onChange: (e: ChangeEvent<HTMLSelectElement>) => true,
        name: "userType",
        value: "",
        options: ["Active", "Inactive"]
    }
    it('should set a value', () => {
        const { queryByText, getByText } = render(<Select {...props} />)
        expect(queryByText('User type')).toBeInTheDocument()
        fireEvent.change(getByText('Active'), {
            target: { value: props.options[1] }
        })
        expect(getByText('Active').value).toEqual(props.options[1])
    })
})