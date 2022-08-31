import React  from 'react';
import Notes from './Notes';
// import Note from '../../backend/models/Note'
// import NoteState from '../context/notes/NoteState'

export const Home = (props) => {
  const {showAlert}=props
  
  return (
    <div>
     <Notes showAlert={showAlert} />
    </div>
  )
}
