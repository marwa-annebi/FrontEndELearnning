import { Grid, makeStyles } from "@material-ui/core";
import { React, useEffect } from "react";
import { TextField } from "@material-ui/core";
import { useForm, Form } from "./../../useForm";
import controls from "./../../Controls/controls";


export default function UsersForm(props) {
  const initialFValues = {
    id: 0,
    first_name: '',
    email: '',
    password: '',
    isAdmin: false,
    isTeacher: false,
}
  const { addOrEdit, recordForEdit } = props;
  const validate = (fieldValues = values) => {
    let temp = { ...errors };
    if ("first_name" in fieldValues)
      temp.first_name = fieldValues.first_name ? "" : "This field is required.";
    if ("email" in fieldValues)
      temp.email = /$^|.+@.+..+/.test(fieldValues.email)
        ? ""
        : "Email is not valid.";
    if ("password" in fieldValues)
      temp.password =
        fieldValues.password.length > 9 ? "" : "Minimum 10 required.";

    setErrors({
      ...temp,
    });

    if (fieldValues == values) return Object.values(temp).every((x) => x == "");
  };
  const { values, setValues, errors, setErrors, handleInputChange, resetForm } =
    useForm(initialFValues, true, validate);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      addOrEdit(values, resetForm);
    }
  };
  useEffect(() => {
    if (recordForEdit != null)
        setValues({
            ...recordForEdit
        })
}, [recordForEdit])


  return (
    <Form onSubmit={handleSubmit}>
      <Grid container>
        <Grid item xs={6}>
          <controls.Input
            label="First name"
            value={values.first_name}
            onChange={handleInputChange}
            error={errors.first_name}
          ></controls.Input>
          <controls.Input
            label="email"
        value={values.email}
            onChange={handleInputChange}
            error={errors.email}
          ></controls.Input>

          <controls.Input
            label="password"
            value={values.password}
            onChange={handleInputChange}
            error={errors.password}
          ></controls.Input>
        </Grid>

        <Grid item xs={6}>
          <controls.Checkbox
            name="isAdmin"
            label="Admin"
            value={values.isAdmin}
            onChange={handleInputChange}
          />
          <controls.Checkbox
            name="isTeacher"
            label="Teacher"
            value={values.isTeacher}
            onChange={handleInputChange}
          />
          <div>
            <controls.Button type="submit" text="Submit" />
            <controls.Button text="Reset" color="default" onClick={resetForm} />
          </div>
        </Grid>
      </Grid>
    </Form>
  );
}
