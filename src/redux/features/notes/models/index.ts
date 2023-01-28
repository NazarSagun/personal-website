export interface NoteModel {
  id: number;
  title: string;
  body: string;
  completed: boolean;
}

export interface NoteState {
  notes: NoteModel[]
}