import { render } from "@testing-library/react";
import React from "react";
import DateInput from "./DateInput";

describe('DateInput', () => {
    const props = {
        label: "first name",
        placeholder: "First name",
        onChange: (e: any) => true,
        name: "firstName",
        value: ""
    }
    it('Invalid input field value should trigger an error helper text', () => {
        const { queryByTestId } = render(<DateInput {...props} error={true} />)
        expect(queryByTestId('helperText')).toBeInTheDocument()
    })
    it('Valid input field value shouldnt trigger an error helper text', () => {
        const { queryByTestId } = render(<DateInput {...props} error={false} />)
        expect(queryByTestId('helperText')).not.toBeInTheDocument()
    })

})