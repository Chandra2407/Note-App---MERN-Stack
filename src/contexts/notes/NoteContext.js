import { createContext } from "react";

const NoteContext = createContext();

const NoteProvider =NoteContext.Provider;
const NoteConsumer = NoteContext.Consumer;

export {NoteProvider, NoteConsumer};
export default NoteContext;