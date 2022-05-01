import React, { useState } from "react";
import NoteContext from "./NoteContext";

const NoteState = (props) => {
  const host = 'http://localhost'
  const initalNotes = [];
  const [notes, setNotes] = useState(initalNotes)

  //Get all notes 
  const getNotes = async()=>{
    //Api Call
    const url = `${host}/api/notes/getnotes`
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': localStorage.getItem('token')
      },
    });
    const json = await response.json();
    setNotes(json)
  }

  //Add a note
  const addNote = async({ title, description, tag }) => {
    
    //API Call
    const url = `${host}/api/notes/addnote`
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': localStorage.getItem('token')
      },
      body: JSON.stringify({title,description,tag})
    });
    const json = await response.json();
    setNotes(notes.concat(json.createdNote))

  }

  //Delete a note
  const deleteNote = async(id) => {
    //Api Call
    const url = `${host}/api/notes/deletenote/${id}`
    const response = await fetch(url, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': localStorage.getItem('token')
      },
    });
    const json = await response.json();
    console.log(json)
    let newNotes = notes.filter((note) => note._id !== id);
    setNotes(newNotes)
  }
  // Edit a note
  const editNote = async (id, title, description, tag) => {
    //API Call
    const url = `${host}/api/notes/updatenote/${id}`
    const response = await fetch(url, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': localStorage.getItem('token')
      },
      body: JSON.stringify({title,description,tag})
    });
    const json = await response.json();
    console.log(json)
    let newNotes = JSON.parse(JSON.stringify(notes))
    //logic to edit
    for (let i = 0; i < newNotes.length; i++) {
      const element = newNotes[i];
      if (element._id === id) {
        newNotes[i].title = title;
        newNotes[i].description = description;
        newNotes[i].tag = tag;
        break;
      }
    }
    setNotes(newNotes)
  }

  return (
    <NoteContext.Provider value={{ notes, setNotes, addNote, editNote, deleteNote,getNotes }} >
      {props.children}
    </NoteContext.Provider>
  )
}

export default NoteState;