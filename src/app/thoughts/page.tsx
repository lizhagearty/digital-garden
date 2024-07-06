import { getAllNotes } from '@/lib/getNotes';
import NotesClient from './NotesClient';

export default async function NotesPage() {
  const notes = await getAllNotes();

  return <NotesClient initialNotes={notes} />;
}