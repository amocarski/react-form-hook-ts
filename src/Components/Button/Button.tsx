import React from "react";
import './button.scss'

const Button = (props: any) => {
    const { children, disabled = true, ...rest } = props;
    return (
        <button {...rest} data-testid="sendButton" disabled={disabled} className={'button'}>{children}</button>
    )
}

export default Button;