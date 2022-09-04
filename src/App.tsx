import "./App.css";
import Header from "./components/header/index";
import Sidebar from "./components/sidebar";
import React, { useEffect } from "react";
import Editor from "./components/editor";
import data from "./dummyData";
import { useState, useRef, createContext } from "react";
import { NoteType, NoteFunctionType} from "./common/types";
import Login from "./components/auth/login";
import SignUp from "./components/auth/signup";
import axios from "axios";
import Connectivity from "./components/connectivity";
import { useParams } from "react-router-dom";
import Mobile from "./mobile";

export const NoteContext = createContext<NoteFunctionType>(() => {});

function App() {

  const [notes, setNotes] = useState<NoteType[]>(
    JSON.parse(localStorage.getItem("notes") ?? JSON.stringify(data))
  );
  const [authType, setAuthType] = useState("login");
  const [activeNote, setActiveNote] = useState<NoteType>(
    JSON.parse(localStorage.getItem("notes") ?? JSON.stringify(data))[0]
  );
  const [userID, setUserID] = useState<string | null>(
    localStorage.getItem("jwt")
  );
  const activeIndex = useRef(0);
  const { id } = useParams();

  //fetch user notes
  const getNotes = async (isShared: boolean) => {
    const res = await axios.get(
      `${process.env.REACT_APP_ENDPOINT}/v1/api/note/getnotesbyuserid`,
      {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("jwt"),
        },
      }
    );
    if (res.status === 200) {
      localStorage.setItem("notes", JSON.stringify(res.data.data));
      setNotes((prev) => [...res.data.data]);
      if (!isShared) setActiveNote(res.data.data[0]);
    }
  };

  //get note by id
  const getRequestedNote = async () => {
    const res = await axios.get(
      `${process.env.REACT_APP_ENDPOINT}/v1/api/note/getnotebyid/` +
        id?.substring(0, id.length - 10),
      {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("jwt"),
        },
      }
    );

    if (res.status === 200) {
      const sharedNote = res.data.data;
      if (id?.substring(id.length - 10, id.length) === "244uc7h70x") {
        sharedNote.readOnly = true;
      }
      activeIndex.current = notes.findIndex(e=> e.id === sharedNote.id);
      setActiveNote(sharedNote);
    }
  };

  //add new note to the list
  const addNote = (note: NoteType) => {
    console.log(note);
    activeIndex.current = notes.length;
    setNotes((prev) => [...prev, note]);
    console.log(notes);
    setActiveNote(note);
  };
  const logout =()=>{
    setActiveNote(data[0]);
    setNotes(data);
    localStorage.removeItem("jwt");
    localStorage.removeItem("user");
    localStorage.removeItem("notes");
    setAuthType("login");
    setUserID(null);
  }

  const updateNote = (noteId: number) => {
    console.log("update fn", noteId);
    const newNotes = [...notes];
    newNotes[newNotes.length - 1].id = noteId;
    setNotes((prev) => [...newNotes]);
    const active = activeNote;
    active.id = noteId;
    setActiveNote((prev) => active);
  };

  //remove note
  const removeNote = () => {
    setNotes((prev) => prev.slice(0, prev.length - 1));
    setActiveNote(notes[0]);
  };

  //establish socket connection
  // useEffect(() => {
  //   console.log("establishing socket connection");
  //   const socket = io(`${process.env.REACT_APP_ENDPOINT}`);
  //   socket.emit("get-data", "Hello node from react");
  //   return () => {
  //     socket.disconnect();
  //   };
  // }, []);

  //get notes on authentication
  useEffect(() => {
    getNoteData();
  }, [userID]);

  const getNoteData = async () => {
    if (userID) {
      if (id) {
        console.log("logged in with params found...getting requested note");
        Promise.all([getNotes(true), getRequestedNote()]);
      } else {
        console.log("logged in...getting all notes");
        getNotes(false);
      }
    }
  };

  const setSelectedNote: NoteFunctionType = (note, index) => {
    activeIndex.current = index || 0;
    setActiveNote((prev) => note);
  };

  const updateActiveNote: NoteFunctionType = (note: NoteType) => {
    setActiveNote((prev) => note);
    notes[activeIndex.current] = note;
    setNotes((prev) => [...notes]);
  };
  const width = window.innerWidth;
  return width < 768 ? <div className="home-page">
    <Header logout={logout} />
    <NoteContext.Provider value={updateActiveNote}>
    <Mobile notes={notes}
  setActiveNote={setSelectedNote}
  activeIndex={activeIndex.current}
  addNote={addNote}
  removeNote={removeNote}
  updateNote={updateNote}
  note={activeNote} 
  logout={logout}
  />
  </NoteContext.Provider>
  </div> : (
      <div className="home-page">
        <Header logout={logout}/>

        <div className="page-divided">
          <Sidebar
            notes={notes}
            setActiveNote={setSelectedNote}
            activeIndex={activeIndex.current}
            addNote={addNote}
            removeNote={removeNote}
            updateNote={updateNote}
          />
          <NoteContext.Provider value={updateActiveNote}>
          <Editor note={activeNote} logout={logout}setValue={()=>{}}/>
          </NoteContext.Provider>
        </div>
        {!userID &&
          (authType === "login" ? (
            <Login
              setAuthType={setAuthType}
              setUserID={setUserID}
            />
          ) : (
            <SignUp
              setAuthType={setAuthType}
              setUserID={setUserID}
            />
          ))}
        <Connectivity />
      </div>
  );
}

export default App;
