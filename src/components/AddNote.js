import React,{useContext,useState} from 'react'
import NoteContext from '../contexts/notes/NoteContext';
const AddNote = () => {
    const context = useContext(NoteContext);
    const { addNote } = context;
    const [note, setNote] = useState({
        title:"",
        description:"",
        tag:""
    });
    const handleClick = (e)=>{
      e.preventDefault();
      addNote(note);
      setNote({
        title:"",
        description:"",
        tag:""
    })
    }
    const handleChange = (e)=>{
        setNote({...note,[e.target.name]:e.target.value})
    }
  return (
    <div className="container my-3 home">
    <h2 className='mb-5'>Add a Note</h2>
    <form>
    <div className="form-group">
      <label htmlFor="title">Enter title</label>
      <input type="text" className="form-control" value={note.title} name='title' id="title" placeholder="My note" onChange={handleChange} minLength={5} required/>
    </div>
    <div className="form-group">
      <label htmlFor="description">Enter description</label>
      <textarea className="form-control" value={note.description} name='description' id="description" rows="3" onChange={handleChange} minLength={5} required />
    </div>
    <div className="form-group">
    <label htmlFor="tags">Enter Tag</label>
    <input type="text" className="form-control" value={note.tag} name='tag' id="tag" placeholder="tag" onChange={handleChange}/>
  </div>
    <button disabled={note.title.length<5 || note.description.length<5} type="submit" className='btn btn-primary my-4' onClick={handleClick}>Add note</button>
  </form>
</div>
  )
}

export default AddNote