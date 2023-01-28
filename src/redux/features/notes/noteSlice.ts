import { createSlice } from "@reduxjs/toolkit";

import { NoteState } from "./models";

const initialState: NoteState = {
  notes: [],
};

export const noteSlice = createSlice({
  name: "note",
  initialState,
  reducers: {
    addNote: (state, action) => {
      state.notes.push({
        id: Math.random(),
        title: action.payload.title,
        body: action.payload.body,
        completed: false,
      });
    },
    removeNote: (state, action) => {
      let index = action.payload;
      let newNotes = state.notes.filter((note) => note.id !== index);
      state.notes = newNotes;
    },
    toggleCompleted: (state, action) => {
      let note = state.notes.find(element => element.id === action.payload);
      if(note) {
        note.completed = !note.completed;
      }
    },
    changeNote: (state, action) => {
      let note = state.notes.find(note => note.id === action.payload.id);
      if(note) {
        note.title = action.payload.title;
        note.body = action.payload.body;
      }
    }
  },
});

export const {addNote, removeNote, toggleCompleted, changeNote} = noteSlice.actions;
export default noteSlice.reducer;