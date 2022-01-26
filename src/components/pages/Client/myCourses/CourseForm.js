import { Fab, Grid, makeStyles } from "@material-ui/core";
import { React, useEffect, useState } from "react";
import { TextField } from "@material-ui/core";
import { useForm } from "../../../useForm.js";
import controls from "../../../Controls/controls.js";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import DatePicker from "@mui/lab/DatePicker";
import ErrorMessage from "../../../ErrorMessage.js";
import { Col, Form, Row, Button } from "react-bootstrap";
import AddIcon from "@mui/icons-material/Add";

export default function CourseForm(props) {
  const initialFValues = {
    id: 0,
    title: "",
    description: "",
    date: "",
    imageUrl: "",
  };
  const [selectedFile, setSelectedFile] = useState(null);
  const { addOrEdit, recordForEdit } = props;
  const [picMessage, setPicMessage] = useState();
  const [pic, setPic] = useState();

  const validate = (fieldValues = values) => {
    let temp = { ...errors };
    // if ("title" in fieldValues)
    //   temp.title = fieldValues.title ? "" : "This field is required.";
    // if ("description" in fieldValues)
    //   temp.description = fieldValues.description ? "" : "This field is required.";

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
  const postDetails = (pics) => {
    setPicMessage(null);
    if (pics.type === "image/jpeg" || pics.type === "image/png") {
      const data = new FormData();
      data.append("file", pics);
      data.append("upload_preset", "3almni");
      data.append("cloud_name", "dknkfvzye");
      fetch("https://api.cloudinary.com/v1_1/dknkfvzye/image/upload", {
        method: "post",
        body: data,
      })
        .then((res) => res.json())

        .then((data) => {
          setPic(data.url.toString());

          console.log(data.url);
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      return setPicMessage("Please Select an Image");
    }
  };

  useEffect(() => {
    if (recordForEdit != null)
      setValues({
        ...recordForEdit,
      });
  }, [recordForEdit]);

  return (
    <Form onSubmit={handleSubmit}>
      <Grid container>
        <Grid item xs={6}>
          <controls.Input
            label="Title"
            name="title"
            value={values.title}
            onChange={handleInputChange}
            error={errors.title}
          ></controls.Input>
          <controls.Input
            label="description"
            name="description"
            value={values.description}
            onChange={handleInputChange}
            error={errors.description}
          ></controls.Input>

          <controls.Input
            type="date"
            value={values.date}
            onChange={handleInputChange}
            error={errors.date}
          ></controls.Input>

        </Grid>
        

        <Grid item xs={6}>
          <TextField name="upload-photo" type="file" />
          {picMessage && (
            <ErrorMessage variant="danger">{picMessage}</ErrorMessage>
          )}
          <Form.Group controlId="pic">
            <label htmlFor="upload-photo">
              <input
                style={{ display: "none" }}
                id="upload-photo"
                name="imageUrl"
                type="file"
                onChange={(e) => postDetails(e.target.files[0])}
              />
              <Fab
                size="small"
                component="span"
                aria-label="add"
                variant="extended"
              >
                <AddIcon />
              </Fab>
            </label>
          </Form.Group>{" "}
          <div>
            <controls.Button type="submit" text="Submit" />
            <controls.Button text="Reset" color="default" onClick={resetForm} />
          </div>
        </Grid>
      </Grid>
    </Form>
  );
}
