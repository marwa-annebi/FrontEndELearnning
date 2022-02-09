import React, { useEffect, useState } from "react";

import Fab from "@mui/material/Fab";
import AddIcon from "@mui/icons-material/Add";
import axios from "axios";
import { Button, Card, Form,Col, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { updateNoteAction } from "./../../../../actions/CourseAction";

import ReactMarkdown from "react-markdown";
import Loading from "../../../Loading";
import ErrorMessage from "../../../ErrorMessage";
import { useHistory, useParams } from "react-router";

function UpdateNote() {
  const [title, setTitle] = useState();
  const [content, setContent] = useState();
  const [category, setCategory] = useState();
  const [date, setDate] = useState("");
  const [imageUrl, setimageUrl] = useState();
  const dispatch = useDispatch();
  const [file, setfile] = useState();
  const noteUpdate = useSelector((state) => state.noteUpdate);
  const { loading, error } = noteUpdate;
  const history = useHistory();
  const match = useParams();
  //   const noteDelete = useSelector((state) => state.noteDelete);
  //   const { loading: loadingDelete, error: errorDelete } = noteDelete;

  //   const deleteHandler = (id) => {
  //    if (window.confirm("Are you sure?")) {
  //       dispatch(deleteNoteAction(id));
  //     }
  //     history.push("/mynotes");
  //   };

  useEffect(() => {
    const fetching = async () => {
      const { data } = await axios.get(`/api/courses/${match.id}`);

      setTitle(data.title);
      setContent(data.content);
      setCategory(data.category);
      setimageUrl(data.imageUrl);

      setfile(data.file);
    };

    fetching();
  }, [match.id]);

  const resetHandler = () => {
    setTitle("");
    setCategory("");
    setContent("");
  };

  const updateHandler = (e) => {
    e.preventDefault();
    dispatch(
      updateNoteAction(match.id, title, content, category, imageUrl, file)
    );
    if (!title || !content || !category) return;

    resetHandler();
    // history.push("/client");
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
          setimageUrl(data.url.toString());

          console.log(data.url);
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      return setPicMessage("Please Select an Image");
    }
  };
  const [picMessage, setPicMessage] = useState();
 
  return (
    <div className="container">

 <Row>
 <Col>   
    <Card>
      <Card.Header>Edit your Note</Card.Header>
      <Card.Body>
        <Form onSubmit={updateHandler}>
          {error && <ErrorMessage variant="danger">{error}</ErrorMessage>}
          <Form.Group controlId="title">
            <Form.Label>Title</Form.Label>
            <Form.Control
              type="title"
              placeholder="Enter the title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </Form.Group>
          <Form.Group controlId="content">
            <Form.Label>Content</Form.Label>
            <Form.Control
              as="textarea"
              placeholder="Enter the content"
              rows={4}
              value={content}
              onChange={(e) => setContent(e.target.value)}
            />
          </Form.Group>
          {content && (
            <Card>
              <Card.Header>Note Preview</Card.Header>
              <Card.Body>
                <ReactMarkdown>{content}</ReactMarkdown>
              </Card.Body>
            </Card>
          )}
          <Form.Group controlId="content">
            <Form.Label>Category</Form.Label>
            <Form.Control
              type="content"
              placeholder="Enter the Category"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            />
          </Form.Group>
          {picMessage && (
            <ErrorMessage variant="danger">{picMessage}</ErrorMessage>
          )}
          <Form.Group controlId="pic">
            <Form.Label>Change Profile Picture</Form.Label>
            {/*<Form.File
                    onChange={(e) => postDetails(e.target.files[0])}
                    id="custom-file"
                    type="image/png"
                    label="Upload Profile Picture"
                    custom
                  /> */}

            <label htmlFor="upload-photo">
              <input
                style={{ display: "none" }}
                id="upload-photo"
                name="upload-photo"
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
          {loading && <Loading size={50} />}
          <Button variant="primary" type="submit">
            Update Course
          </Button>
        </Form>
      </Card.Body>
      </Card>
    </Col>
      <Col
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <img src={imageUrl} alt={title} className="profilePic" />
      </Col>
      </Row>
  
    </div>
  );
}

export default UpdateNote;
