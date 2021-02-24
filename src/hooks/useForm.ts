import { useState, useEffect, useRef, useCallback, ChangeEvent } from "react";
import { IField, IUserForm } from "./IUseForm";

const useForm = (props: {
    initialValues: IUserForm,
    onSubmit: () => void
}) => {
    const { initialValues, onSubmit } = props;
    const formRendered = useRef<boolean>(true);
    const [formValid, setFormValid] = useState<boolean>(false);
    const [formValuesState, setFormValues] = useState<IUserForm>(initialValues);
    const [formTouched, setTouched] = useState<boolean>(false);
    const isFormInValid = useCallback(() => Object.values(formValuesState).filter((el: IField) => el.required).some((el: IField) => el.error === true), [formValuesState])
    const isFormTouched = useCallback(() => Object.values(formValuesState).filter((el: IField) => el.required).every((el: IField) => el.touched === true), [formValuesState])

    useEffect(() => {
        if (formRendered.current) {
            setFormValues(initialValues)
        }
        setFormValid(!isFormInValid());
        setTouched(isFormTouched);
        formRendered.current = false;
    }, [formValuesState, initialValues, isFormInValid, isFormTouched]);

    const handleChange = useCallback((event: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { target } = event;
        const { name, value } = target;
        event.persist();
        const required = formValuesState[name].required;
        const validator = formValuesState[name].validator ? formValuesState?.[name]?.validator?.(value) : true;
        const error = required ? !validator : (value.length === 0 ? false : !validator);
        setFormValues({
            ...formValuesState,
            [name]: { ...formValuesState[name], value, touched: true, error, required }
        });
    }, [formValuesState]);

    const handleBlur = (event: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        // 
    };

    const handleSubmit = (event: ChangeEvent) => {
        if (event) event.preventDefault();
        onSubmit();
        setFormValues(initialValues);
    };

    return {
        formValuesState,
        formValid,
        formTouched,
        handleChange,
        handleBlur,
        handleSubmit
    };
};

export default useForm;