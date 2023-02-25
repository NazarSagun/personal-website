import Note from "./Note";

import { useAppSelector } from "../redux/app/hooks";

const Notes = () => {

  // const selector = useAppSelector(state => state.note);

  return (
    <div>Your Notes</div>
    // <div>{selector.notes.map(note => (
    //   <Note key={note.id} id={note.id} title={note.title} body={note.body} completed={note.completed} />
    // ))}</div>
  )
};

export default Notes;
