import React, { useContext, useEffect, useState, useRef } from "react";
import NoteContext from "../context/notes/NoteContext";
import Note from "./Note";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { useNavigate } from "react-router-dom";

const Notesitem = (props) => {
  const navigate = useNavigate();
  const context = useContext(NoteContext);

  const { notes, getnote, editnote, setUserId } = context;

  useEffect(() => {
    if (localStorage.getItem("auth-token")) {
      getnote();
    } else {
      navigate("/login");
    }
    // eslint-disable-next-line
  }, []);

  /* code 19-25 using by Modal */
  const [text, setText] = useState({ id: "", etitle: "", edescription: "" });

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);

  const handleShow = () => setShow(true);

  const updatenote = (currentnote) => {
    ref.current.click();
    setText({
      id: currentnote._id,
      etitle: currentnote.title,
      edescription: currentnote.description,
    });
  };

  const ref = useRef(null);

  const refclose = useRef(null);

  const onchange = (event) => {
    setText({ ...text, [event.target.name]: event.target.value });
  };

  const handleclick = (event) => {
    refclose.current.click();
    setUserId(text.id);
    editnote({
      title: text.etitle,
      description: text.edescription,
    }).then((data) => {
      console.log(data);
    });
    event.preventDefault();
    props.showalert("Note updated successfully", "success");
  };
  return (
    <>
      {/*Modal for editting a note*/}

      <Button
        variant="primary"
        style={{ display: "none" }}
        ref={ref}
        onClick={handleShow}
      >
        Launch demo modal
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Note</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {/*Form for taking input from user which is used to edit note*/}
          <Form>
            <Form.Group className="mb-3" controlId="etitle">
              <Form.Label>Note Title</Form.Label>
              <Form.Control
                name="etitle"
                type="text"
                value={text.etitle}
                placeholder="Title"
                onChange={onchange}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="edescription">
              <Form.Label>Note Description</Form.Label>
              <Form.Control
                name="edescription"
                value={text.edescription}
                type="text"
                placeholder="Description"
                onChange={onchange}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="outline-secondary"
            ref={refclose}
            onClick={handleClose}
          >
            Close
          </Button>
          <Button
            disabled={text.edescription.length < 5 || text.etitle.length < 5}
            onClick={handleclick}
            variant="outline-danger"
          >
            Update Note
          </Button>
        </Modal.Footer>
      </Modal>

      <h1 className="text-center">Your Notes</h1>
      <Row className="my-3">
        {/* Taking out each element from notes */}
        {notes.map((note) => {
          return (
            <Note
              key={note._id}
              updatenote={updatenote}
              note={note}
              showalert={props.showalert}
            />
          );
        })}
      </Row>
    </>
  );
};

export default Notesitem;
