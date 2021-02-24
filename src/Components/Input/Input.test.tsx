import { render } from "@testing-library/react";
import React from "react";
import Input from "./Input";

describe('Input', () => {
    const props = {
        label: "first name",
        placeholder: "First name",
        onChange: (e: any) => true,
        name: "firstName",
        value: ""
    }
    it('Invalid input field value should trigger an error helper text', () => {
        const { queryByTestId } = render(<Input {...props} error={true} />)
        expect(queryByTestId('helperText')).toBeInTheDocument()
    })
    it('Valid input field value shouldnt trigger an error helper text', () => {
        const { queryByTestId } = render(<Input {...props} error={false} />)
        expect(queryByTestId('helperText')).not.toBeInTheDocument()
    })

})