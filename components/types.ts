// This Note is store in database
export type NoteObj = {
  id: string;
  title: string;
  payload: string;
};

export type NotesReturn = {
  notesData: NoteObj[];
  addNote: (id: string, title: string, payload: SlateNote) => void;
  deleteNote: (id: string) => void;
  setPayload: (id: string, payload: SlateNote) => null;
  getPayload: (id: string) => SlateNote;
};

export type SlateNote = [
  {
    type?: string;
    children: [
      { text: string; bold?: boolean; italic?: boolean; underlined: boolean }
    ];
  }
];
