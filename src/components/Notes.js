import React, { useContext, useEffect, useRef, useState } from 'react'
import NoteContext from '../contexts/notes/NoteContext';
import AddNote from './AddNote';
import NoteItem from './NoteItem';

function Notes() {
  const context = useContext(NoteContext);
  const { notes, getNotes, editNote } = context;
  const [note, setNote] = useState({
    id: '',
    etitle: "",
    edescription: "",
    etag: ""
  });
  useEffect(() => {
    getNotes()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  const updateNote = (currentNote) => {
    ref.current.click();
    setNote({ id: currentNote._id, etitle: currentNote.title, edescription: currentNote.description, etag: currentNote.tag })
  }
  const ref = useRef(null);
  const refClose = useRef(null);
  const handleChange = (e) => {
    setNote({ ...note, [e.target.name]: e.target.value })
  }
  const handleClick = async(e) => {
    e.preventDefault();
    // console.log('Updated', note);
    await editNote(note.id,note.etitle,note.edescription,note.etag)
    refClose.current.click()
  }
  return (
    <>
      <AddNote />

      <button type="button" ref={ref} className="btn btn-primary" data-toggle="modal" data-target="#exampleModalCenter" style={{ display: 'none' }}>
        Launch demo modal
      </button>
      <div className="modal fade" id="exampleModalCenter" tabIndex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
        <div className="modal-dialog modal-dialog-centered" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLongTitle">Modal title</h5>
              <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div className="modal-body">
              <form>
                <div className="form-group">
                  <label htmlFor="etitle">Enter title</label>
                  <input type="text" className="form-control" value={note.etitle} name='etitle' id="etitle" placeholder="My note" onChange={handleChange} minLength={5} required />
                </div>
                <div className="form-group">
                  <label htmlFor="edescription">Enter description</label>
                  <textarea className="form-control" value={note.edescription} name='edescription' id="edescription" rows="3" onChange={handleChange} minLength={5} required />
                </div>
                <div className="form-group">
                  <label htmlFor="etags">Enter Tag</label>
                  <input type="text" className="form-control" value={note.etag} name='etag' id="etag" placeholder="tag" onChange={handleChange} />
                </div>
              </form>
            </div>
            <div className="modal-footer">
              <button ref={refClose} type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
              <button disabled={note.etitle.length<5 || note.edescription.length<5} onClick={handleClick} type="button" className="btn btn-primary">Save changes</button>
            </div>
          </div>
        </div>
      </div>
      <div className='container'>
        <h2 className='my-5'>Your Notes</h2>
        <div className="card-container">
          {notes.map((note) => {
            return <NoteItem key={note._id} note={note} updateNote={updateNote} />
          })}
        </div>
      </div>
    </>
  )
}

export default Notes