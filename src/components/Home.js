import React, { useContext, useState } from 'react'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import NoteContext from '../context/notes/NoteContext';
import Notesitem from './Notesitem';

const Home = (props) => {
    const {showalert} = props
    const context = useContext(NoteContext)
    const { addnote } = context

    const [text, setText] = useState({ title: "", description: "" })
    const onchange = (event) => {
        setText({...text, [event.target.name]: event.target.value })
    }
    const handleclick = async(event) => {
        event.preventDefault();
        await addnote({"title":text.title, "description":text.description}).then((data) => {
            console.log(data); // JSON data parsed by `data.json()` call
          });
        setText({title: "", description: ""})
        props.showalert("Note added successfully", "success")
    }
    return (
        <>
            <div className='container' style={{marginTop:100}}>
                <h1 className='text-center'>Add Your Note Here </h1>
                <div className='text-center' style={{ width: '50%', margin: 'auto' }}>
                    <Form>
                        <Form.Group className="mb-3" controlId="title">
                            <Form.Label >Note Title</Form.Label>
                            <Form.Control name='title' type="text" value={text.title} placeholder="Title" className='text-center' onChange={onchange}  />

                        </Form.Group>

                        <Form.Group className="mb-3" controlId="description">
                            <Form.Label>Note Description</Form.Label>
                            <Form.Control name='description' value={text.description} type="text" placeholder="Description" className='text-center' onChange={onchange} />

                        </Form.Group>
                        <Button variant="outline-success" type="submit" onClick={handleclick} disabled={text.title.length < 5 || text.description.length < 5} >
                            Add Note
                        </Button>
                    </Form>
                </div>
                <hr />
                <div>
                    <Notesitem showalert={showalert} />
                </div>
            </div>
        </>
    )
}

export default Home
