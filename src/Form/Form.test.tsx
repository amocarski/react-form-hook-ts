import { fireEvent, render } from "@testing-library/react";
import React from "react";
import Form from "./Form";

describe('Form', () => {
    it('Submit button should be disabled on init', () => {
        const { getByTestId } = render(<Form />)
        const submitButton = getByTestId('sendButton')
        expect(submitButton).toBeDisabled()
    })
    it('Submit button should be disabled on invalid form', () => {
        const { getByPlaceholderText, getByTestId } = render(<Form />)
        const submitButton = getByTestId('sendButton')
        const firstNameInput = getByPlaceholderText('First name')
        fireEvent.change(firstNameInput, { target: { value: '' } })
        expect(submitButton).toBeDisabled()
    })
    it('Submit button should be enabled on valid form', () => {
        const { getByPlaceholderText, getByTestId } = render(<Form />)
        const firstNameInput = getByPlaceholderText('First name')
        const lastNameInput = getByPlaceholderText('Last name')
        fireEvent.change(firstNameInput, { target: { value: 'Adam' } })
        fireEvent.change(lastNameInput, { target: { value: 'Mocarski' } })
        const submitButton = getByTestId('sendButton')
        expect(submitButton).toBeEnabled();
    })
});