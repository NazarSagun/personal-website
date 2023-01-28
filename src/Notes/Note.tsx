import "./Note.css";

import { useAppDispatch } from "../redux/app/hooks";
import {
  changeNote,
  removeNote,
  toggleCompleted,
} from "../redux/features/notes/noteSlice";
import React, { useRef, useState } from "react";
import { NoteModel } from "../redux/features/notes/models";

const Note: React.FC<NoteModel> = ({
  id,
  title,
  body,
  completed,
}): JSX.Element => {
  const [showChangeForm, setShowChangeForm] = useState(false);

  const inputTitle = useRef<HTMLInputElement>(null);
  const inputBody = useRef<HTMLInputElement>(null);

  const dispatch = useAppDispatch();

  const deleteHandler = (id: number) => {
    dispatch(removeNote(id));
  };

  const completedHandler = (id: number) => {
    dispatch(toggleCompleted(id));
  };

  const changeNoteHandler = (e: React.FormEvent) => {
    e.preventDefault();
    setShowChangeForm(false)
    dispatch(changeNote({id, title: inputTitle.current?.value, body: inputBody.current?.value}));
  };

  return (
    <div className="noteContainer">
      <div className="note">
        <div>
          <h2 className={`${completed && "completed"}`}>{title}</h2>
          <p className={`${completed && "completed"}`}>{body}</p>
        </div>
        <div className="buttons">
          <button onClick={() => setShowChangeForm(true)}>Change</button>
          <button onClick={() => deleteHandler(id)}>Delete</button>
          <button onClick={() => completedHandler(id)}>Completed</button>
        </div>
      </div>
      <div className={`${showChangeForm && "show"} changeForm`}>
        <form onSubmit={changeNoteHandler}>
          <div>
            <label htmlFor="title">Title</label>
            <input
              id="title"
              type="text"
              defaultValue={title}
              ref={inputTitle}
            />
          </div>
          <div>
            <label htmlFor="title">Text</label>
            <input id="title" type="text" defaultValue={body} ref={inputBody} />
          </div>
          <button>Change</button>
          <button onClick={() => setShowChangeForm(false)}>Close</button>
        </form>
      </div>
    </div>
  );
};

export default Note;
