import React, { useState } from "react";

import { useAppDispatch } from "../redux/app/hooks";
import { addNote } from "../redux/features/notes/noteSlice";

import "./CreateNote.css";

type isValid = null | boolean;

const CreateNote = () => {
  const [validate, setValidate] = useState<isValid>(null);
  const [focus, setFocus] = useState(false);
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");

  const dispatch = useAppDispatch();

  const titleChangeHandler = (e: React.FormEvent<HTMLInputElement>) => {
    setTitle(e.currentTarget.value)
  }
  const bodyChangeHandler = (e: React.FormEvent<HTMLInputElement>) => {
    setBody(e.currentTarget.value)
  }

  const submitHandler = (e: React.FormEvent) => {
    e.preventDefault();

    if (title === "" || body === "") {
      setValidate(false);
      setFocus(true);
      return;
    }
    setFocus(false);
    setValidate(true);
    setTitle("");
    setBody("");

    dispatch(
      addNote({
        title: title,
        body: body,
      })
    );
    
  };

  return (
    <form onSubmit={submitHandler}>
      <div>
        <label htmlFor="title">Title</label>
        <input onChange={titleChangeHandler} value={title} id="title" type="text" />
      </div>
      <div>
        <label htmlFor="body">Text</label>
        <input onChange={bodyChangeHandler} value={body} id="body" type="text" />
      </div>
      {focus && validate === false && (
        <p style={{ color: "tomato" }}>Write and take your time</p>
      )}
      <button>Create</button>
    </form>
  );
};

export default CreateNote;
