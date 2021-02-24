import { act, renderHook } from "@testing-library/react-hooks"
import useForm from "./useForm"

describe('useForm hook', () => {
    it('should return untouched initial values on init', () => {
        const initialValues = {
            firstName: {
                value: "",
                required: false
            }
        }
        // const elements = {
        //     firstName: {
        //         name: 'firstName',
        //         localName: 'input',
        //         required: true,
        //         value: ""
        //     }
        // }
        const onSubmit = jest.fn();
        // const formRef = jest.spyOn(React, 'useRef').mockReturnValueOnce({ current: { current: { elements } } });
        const { result } = renderHook(() => useForm({ initialValues, onSubmit }))
        expect(result.current.formValuesState).toMatchObject(initialValues)
    })
    it('should form be touched after field touch', () => {
        const initialValues = {
            firstName: {
                value: "",
                required: false,
                touched: false
            }
        }
        const onSubmit = jest.fn();
        const { result } = renderHook(() => useForm({ initialValues, onSubmit }))
        act(() => {
            result.current.handleChange({ target: { name: "firstName", value: "Adam" }, persist: jest.fn() } as any)
        })
        expect(result.current.formTouched).toBeTruthy()
    })
    it('should form be invalid after field has an error', () => {
        const initialValues = {
            firstName: {
                value: "",
                required: true
            }
        }
        const onSubmit = jest.fn();
        const { result } = renderHook(() => useForm({ initialValues, onSubmit }))
        act(() => {
            result.current.handleChange({ target: { name: "firstName", value: "" }, persist: jest.fn() } as any)
        })
        expect(result.current.formValid).toBeTruthy()
    })
    it('should submit valid form', () => {
        const initialValues = {
            firstName: {
                value: "",
                required: false
            }
        }
        const onSubmit = jest.fn();
        const { result } = renderHook(() => useForm({ initialValues, onSubmit }))
        act(() => {
            result.current.handleChange({ target: { name: "firstName", value: "Adam" }, persist: jest.fn() } as any)
        })

        act(() => {
            result.current.handleSubmit({ preventDefault: jest.fn() } as any)
        })

        expect(onSubmit).toBeCalled()
    })
})