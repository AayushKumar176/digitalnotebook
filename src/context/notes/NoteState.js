import NoteContext from "./noteContext";
import { useState } from "react";

const NoteState = (props) => {
  const host = "https://inotebookbackend-lfqh.onrender.com";

  const noteInitial = [];
  //     const s1={
  //         "name": "Aayush",
  //         "class": "9d"
  //     }
  //    const  update=()=>{
  //        setTimeout(() => {
  //            setState({
  //             "name": "Piyush",
  //             "class": "10a"
  //            })
  //        }, 1000);
  //     }
  //     const [state, setState] = useState(s1);

  const [notes, setNotes] = useState(noteInitial);

  // Get All note
  const getNotes = async () => {
    // TODO API Call
    // API Call
    // console.log(localStorage.getItem('token'));
    const response = await fetch(`${host}/api/notes/fetchallnotes`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        // "auth-token":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjJjZWJlNmM1NTViOWRiNmI2ZWFjOTg3In0sImlhdCI6MTY1Nzc5MTI4Nn0.gv1RNL37_u25xEQYvIJ0_IxlWqCbxcQ0HEG0TDI64Uc"
        "auth-token": localStorage.getItem('token'),
        // "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjJkYThmODI5YzkxYTdmM2E4ZDBjNTcyIn0sImlhdCI6MTY1ODUwNDA0MH0.Fzk5Fp8pgxIjYJ_I0jXtw1TKCl4uz9DsVCfEDr6DM88"
      },
    });
    const json = await response.json();
    // console.log(json);
    setNotes(json);
  };

  // Add a note
  const addNote = async (title, description, tag) => {
    // TODO API Call
    // API Call
    const response = await fetch(`${host}/api/notes/addnote`, {
      method: 'POST',
      headers: {
        "Content-Type": "application/json",
        // "auth-token":
        //   "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjJjZWJlNmM1NTViOWRiNmI2ZWFjOTg3In0sImlhdCI6MTY1Nzc5MTI4Nn0.gv1RNL37_u25xEQYvIJ0_IxlWqCbxcQ0HEG0TDI64Uc"
        "auth-token": localStorage.getItem('token'),
      },
      body: JSON.stringify({ title, description, tag }),
    });
    const note = await response.json();
    setNotes(notes.concat(note));
    // console.log(json);

    // Adding a note in client-side
    // console.log("Adding a new note");
    // const note = json
  };

  // Delete a note

  const deleteNote = async (id) => {
    // TODO API CALL

    const response = await fetch(`${host}/api/notes/deletenote/${id}`, {
      method: 'DELETE',
      headers: {
        "Content-Type": "application/json",
        // "auth-token":
        //   "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjJjZWJlNmM1NTViOWRiNmI2ZWFjOTg3In0sImlhdCI6MTY1Nzc5MTI4Nn0.gv1RNL37_u25xEQYvIJ0_IxlWqCbxcQ0HEG0TDI64Uc"
        "auth-token": localStorage.getItem('token'),
      },
    });
    const json = await response.json();
    console.log(json);

    // console.log("Deleting a note with id " + id);
    const newNotes = notes.filter((note) => {
      return note._id !== id;
    });
    setNotes(newNotes);
  };

  // Edit a note
  const editNote = async (id, title, description, tag) => {
    // API Call
    const response = await fetch(`${host}/api/notes/updatenote/${id}`, {
      method: 'PUT',
      headers: {
        "Content-Type": "application/json",
        // "auth-token":
        //   "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjJjZWJlNmM1NTViOWRiNmI2ZWFjOTg3In0sImlhdCI6MTY1Nzc5MTI4Nn0.gv1RNL37_u25xEQYvIJ0_IxlWqCbxcQ0HEG0TDI64Uc",
        "auth-token": localStorage.getItem('token'),
      },
      body: JSON.stringify({ title, description, tag }),
    });
    const json = await response.json();
    console.log(json);

    //Logic to edit in client

    let newNotes = JSON.parse(JSON.stringify(notes));

    for (let index = 0; index < newNotes.length; index++) {
      const element = notes[index];
      if (element._id === id) {
        newNotes[index].title = title;
        newNotes[index].description = description;
        newNotes[index].tag = tag;
        break;
      }
    }
    setNotes(newNotes);
  };
  return (
    <NoteContext.Provider
      value={{ notes, addNote, deleteNote, editNote, getNotes }}
    >
      {props.children};
    </NoteContext.Provider>
  );
};

export default NoteState;


