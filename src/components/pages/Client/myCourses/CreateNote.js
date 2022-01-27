import React, { useState } from "react";
import { Button, Card, Form } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import ReactMarkdown from "react-markdown";
import { createNoteAction } from "../../../../actions/CourseAction";
import ErrorMessage from "../../../ErrorMessage";
import Loading from "../../../Loading";
import { useHistory } from "react-router";
import Fab from "@mui/material/Fab";
import AddIcon from "@mui/icons-material/Add";
import { Viewer } from "@react-pdf-viewer/core"; // install this library
// Plugins
import { defaultLayoutPlugin } from "@react-pdf-viewer/default-layout"; // install this library
// Import the styles
import "@react-pdf-viewer/core/lib/styles/index.css";
import "@react-pdf-viewer/default-layout/lib/styles/index.css";
// Worker
import { Worker } from "@react-pdf-viewer/core"; // install this library
function CreateNote() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [category, setCategory] = useState("");

  const history = useHistory();
  const dispatch = useDispatch();

  const noteCreate = useSelector((state) => state.noteCreate);
  const { loading, error, note } = noteCreate;

  const resetHandler = () => {
    setTitle("");
    setCategory("");
    setContent("");
  };

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(createNoteAction(title, content, category, imageUrl, file));
    console.log(file);

    if (!title || !content || !category || !imageUrl || !file) {
      return;
    } else {
      setViewPdf(null);
    }
  };
  const [selectedFile, setSelectedFile] = useState();
  const [isFilePicked, setIsFilePicked] = useState(false);

  const changeHandler = (event) => {
    setSelectedFile(event.target.files[0]);
    setIsFilePicked(true);
  };
  const [picMessage, setPicMessage] = useState();
  const [imageUrl, setimageUrl] = useState();

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
  // Create new plugin instance
  const defaultLayoutPluginInstance = defaultLayoutPlugin();

  // for onchange event
  const [file, setPdfFile] = useState(null);
  const [pdfFileError, setPdfFileError] = useState("");
  const allowedFiles = ["application/pdf"];
  const handleFile = (e) => {
    let selectedFile = e.target.files[0];
    // console.log(selectedFile.type);
    if (selectedFile) {
      if (selectedFile && allowedFiles.includes(selectedFile.type)) {
        let reader = new FileReader();
        reader.readAsDataURL(selectedFile);
        reader.onloadend = (e) => {
          setPdfError("");
          setPdfFile(e.target.result);
        };
      } else {
        setPdfError("Not a valid pdf: Please select only PDF");
        setPdfFile("");
      }
    } else {
      console.log("please select a PDF");
    }
  };

  return (
    //<MainScreen title="Create a Note">
    <Card>
      <Card.Header>Create a new Note</Card.Header>
      <Card.Body>
        <Form onSubmit={submitHandler}>
          {error && <ErrorMessage variant="danger">{error}</ErrorMessage>}
          <Form.Group controlId="title">
            <Form.Label>Title</Form.Label>
            <Form.Control
              type="title"
              value={title}
              placeholder="Enter the title"
              onChange={(e) => setTitle(e.target.value)}
            />
          </Form.Group>

          <Form.Group controlId="content">
            <Form.Label>Content</Form.Label>
            <Form.Control
              as="textarea"
              value={content}
              placeholder="Enter the content"
              rows={4}
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
              value={category}
              placeholder="Enter the Category"
              onChange={(e) => setCategory(e.target.value)}
            />
          </Form.Group>
          <br />
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
          </Form.Group>
          <br />
          <Form.Group controlId="pic">
            <input
              type="file"
              className="form-control"
              onChange={handleFile}
            ></input>

            {/* we will display error message in case user select some file
        other than pdf */}
            {pdfError && <span className="text-danger">{pdfError}</span>}
          </Form.Group>
          <br></br>
          <h4>View PDF</h4>
          <div className="pdf-container">
            {/* show pdf conditionally (if we have one)  */}
            {file && (
              <Worker workerUrl="https://unpkg.com/pdfjs-dist@2.12.313/build/pdf.worker.min.js">
                <Viewer
                  fileUrl={file}
                  plugins={[defaultLayoutPluginInstance]}
                ></Viewer>
              </Worker>
            )}
            {/* render this if we have pdfFile state null   */}
            {!file && <>No file is selected yet</>}{" "}
          </div>

          {loading && <Loading size={50} />}
          <Button type="submit" variant="primary">
            Create Note
          </Button>
          <Button className="mx-2" onClick={resetHandler} variant="danger">
            Reset Feilds
          </Button>
        </Form>
      </Card.Body>

      <Card.Footer className="text-muted">
        Creating on - {new Date().toLocaleDateString()}
      </Card.Footer>
    </Card>
    // </MainScreen>
  );
}

export default CreateNote;
