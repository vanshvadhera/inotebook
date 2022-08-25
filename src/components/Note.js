import React, { useContext } from 'react'
import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import NoteContext from '../context/notes/NoteContext';

const Note = (props) => {
    const context = useContext(NoteContext)
    const { deletnote } = context
    // const { note } = props
    const deleteenote = () => {
        deletnote(props.note._id)
        props.showalert("Note deleted successfully", "success")
    }
    return (
        <Col sm={6} className="my-3">
            <Card >
                <Card.Body>
                    <Card.Title>{props.note.title}</Card.Title>
                    <Card.Text>
                        {props.note.description}
                    </Card.Text>
                    <div style={{ display: 'flex', width: "100%", justifyContent: "flex-end" }}>
                        <i style={{ cursor: 'pointer' }} className="fa-solid fa-trash-can mx-2" onClick={deleteenote}></i>
                        <i style={{ cursor: 'pointer' }} className="fa-solid fa-pen-to-square mx-2" onClick={()=>{props.updatenote(props.note)}}></i>
                    </div>
                </Card.Body>
            </Card>
        </Col>
    )
}

export default Note
