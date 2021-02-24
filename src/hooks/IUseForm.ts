export interface IField {
    value: string,
    validator?: (value: string) => boolean,
    required: boolean,
    touched?: boolean,
    error?: boolean
}

export interface IUserForm {
    [name: string]: IField
}

