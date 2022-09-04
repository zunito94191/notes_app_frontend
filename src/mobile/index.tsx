import React, { useState } from 'react'
import Sidebar from '../components/sidebar'
import { NotePropType, PropType } from '../common/types'
import Editor from '../components/editor'

export default function Mobile({
    notes,
    setActiveNote,
    activeIndex,
    addNote,
    removeNote,
    updateNote,
    note
  }: PropType & NotePropType) {
    const [showSidebar, setShowSidebar] = useState(true);

    const selectNote = ()=>{
        setShowSidebar(false);
    }
  return (
    <>
    {showSidebar && 
    <div onClick={selectNote}>
        <Sidebar  notes={notes}
        setActiveNote={setActiveNote}
        activeIndex={activeIndex}
        addNote={addNote}
        removeNote={removeNote}
        updateNote={updateNote}/>
    </div>
  }
    {!showSidebar && <Editor note={note} setValue={setShowSidebar}/>}
    
    </>
    
  )
}
