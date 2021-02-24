import React from "react";
import "../Components/grid.scss";
import Button from "../Components/Button/Button";
import DateInput from "../Components/DateInput/DateInput";
import Input from "../Components/Input/Input";
import Select from "../Components/Select/Select";
import { IUserForm } from "../hooks/IUseForm";
import useForm from "../hooks/useForm";
import dateInPast from "../utils/dateInPast";
import { saveUserForm } from "./form-api";
import Section from "../Components/Section/Section";

const initialValues: IUserForm = {
  firstName: {
    value: "",
    validator: (value: string) => /^(?!\s*$).+/.test(value),
    required: true,
  },
  lastName: {
    value: "",
    validator: (value: string) => /^(?!\s*$).+/.test(value),
    required: true,
  },
  birthday: {
    value: "",
    validator: (value: string) => /^\d{4}\-(0?[1-9]|1[012])\-(0?[1-9]|[12][0-9]|3[01])$/.test(value),
    required: false
  },
  userType: {
    value: "Active",
    required: false
  },
  inactivityDate: {
    value: "",
    required: false,
    validator: (value: string) => {
      let regex = /^\d{4}\-(0?[1-9]|1[012])\-(0?[1-9]|[12][0-9]|3[01])$/.test(value)
      let parts = value.split('-');
      let year = parseInt(parts[0]);
      let month = parseInt(parts[1]) - 1;
      let day = parseInt(parts[2])
      let inputDate = new Date(year, month, day);
      let now = new Date()
      return (regex && dateInPast(inputDate, now)) ? true : false;
    },
  }
}

const Form = () => {
  const {
    formValuesState,
    formValid,
    formTouched,
    handleChange,
    handleBlur,
    handleSubmit
  } = useForm({
    initialValues,
    onSubmit: () => saveUserForm()
  })

  return (
    <>
      <form onSubmit={() => handleSubmit}>
        <Section title="Personal Info">
          <div className="row">
            <div className="column">
              <Input
                required={formValuesState?.firstName.required}
                value={formValuesState?.firstName.value}
                name="firstName"
                placeholder={"First name"}
                label={"first name"}
                error={formValuesState.firstName.error}
                onChange={handleChange}
                onBlur={handleChange}
                errorText="Please, provide your first name"
              />
            </div>
            <div className="column">
              <Input
                required={formValuesState?.lastName.required}
                name="lastName"
                placeholder={"Last name"}
                label={"last name"}
                value={formValuesState?.lastName.value}
                error={formValuesState.lastName.error}
                onChange={handleChange}
                onBlur={handleChange}
                errorText="Please, provide your last name"
              />
            </div>
          </div>
          <DateInput
            required={formValuesState?.birthday.required}
            name="birthday"
            value={formValuesState?.birthday.value}
            error={formValuesState.birthday.error}
            onChange={handleChange}
            onBlur={handleChange}
            placeholder={"YYYY-MM-DD"}
            label={"Birthday"}
            errorText="Please, provide a valid format"
          />
        </Section>

        <Section title="User Managment">
          <Select
            options={["Active", "Inactive"]}
            name="userType"
            value={formValuesState.userType.value}
            label="User type"
            onChange={handleChange} />
          <DateInput
            required={formValuesState.inactivityDate.required}
            error={formValuesState.inactivityDate.error}
            name="inactivityDate"
            value={formValuesState.inactivityDate.value}
            onChange={handleChange}
            onBlur={handleChange}
            placeholder={"YYYY-MM-DD"}
            label={"User Inactivity Date"}
            errorText="Please, provide a valid format"
          />
        </Section>
        <Button disabled={!formValid || !formTouched} type="submit">SEND</Button>
      </form>
    </>
  );
};

export default Form
