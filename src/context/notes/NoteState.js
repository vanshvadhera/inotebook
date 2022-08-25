import React, { useState } from "react";
import NoteContext from "./NoteContext";

const NoteState = (props) => {
    const host = "http://localhost:3003/api/"
    const notesinit = []
    const [notes, setNotes] = useState(notesinit)
    const [userid, setUserId] = useState("")

    //Fetch all notes from server
    const getnote = async () => {
        //Api call
        const response = await fetch(`${host}notes/fetchnotes`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'auth-token': localStorage.getItem('auth-token')
            }
        });
        const json = await response.json();
        setNotes(json)

    }

    //Add a note
    const addnote = async (description) => {
        //Api call
        const response = await fetch(`${host}notes/addnote`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'auth-token': localStorage.getItem('auth-token')
            },
            body: JSON.stringify(description)
        });
        const json = response.json();
        console.log(json);
        json.then((res) => {
            console.log(res)
            const note =
            {
                "_id": res._id,
                "user": "62ebda7a526ebcfb1866f2d6",
                "title": res.title,
                "description": res.description,
                "date": "2022-08-05T20:41:16.960Z",
                "__v": 0
            }
            // console.log(notes.append(note));
            setNotes(notes.concat(note))
        })
        //Logic
        console.log("adding a new note");

    }
    //Delet a note
    const deletnote = async (id) => {

        const response = await fetch(`${host}notes/deletenote/${id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'auth-token': localStorage.getItem('auth-token')
            }
        });
        const json = response.json();
        console.log(json);

        console.log("deleteing your note with id:" + id);
        const newNotes = notes.filter((note) => { return note._id !== id })
        setNotes(newNotes)

    }
    //Edit a note
    const editnote = async (description) => {
        //Api call;
        console.log(userid)
        const response = await fetch(`${host}notes/updatenote/${userid}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'auth-token': localStorage.getItem('auth-token')
            },
            body: JSON.stringify(description)
        });
        const json = response.json();
        console.log(json);
        json.then((res) => {
            console.log(res)
        //logic
        let newNotes = JSON.parse(JSON.stringify(notes))
        for (let index = 0; index < newNotes.length; index++) {
            const element = newNotes[index];
            if (element._id === userid) {
                element.title = res.title;
                element.description = res.description
                break;
            }
        }
        setNotes(newNotes)
        });
    }
    return (
        <NoteContext.Provider value={{ notes, addnote, deletnote, editnote, getnote,setUserId }} >
            {props.children}
        </NoteContext.Provider>
    )
}

export default NoteState;