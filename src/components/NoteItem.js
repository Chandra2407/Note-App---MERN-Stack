import React,{useContext} from 'react'
import NoteContext from '../contexts/notes/NoteContext';
const NoteItem = (props) => {
    const {note} = props;
    const context = useContext(NoteContext)
    const {deleteNote} = context;
  return (
   
    <div className="card">
      <div className="card-body">
        <h4 className="card-title">{note.title}</h4>
        <p className="card-text">{note.description}</p>
        <i className="fa-solid fa-trash mx-2" onClick={()=>{deleteNote(note._id);props.showAlert('Note deleted','danger')}}></i>
        <i className="fa-solid fa-pen-to-square mx-4" onClick={()=>{props.updateNote(note)}}></i>
        <h5 className='my-2'>tags - {note.tag}</h5>
      </div>
    </div>
  )
}

export default NoteItem