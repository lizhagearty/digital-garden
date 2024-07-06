import { getNoteById, getAllNotes } from '@/lib/getNotes';
import NotesClient from '../NotesClient';
import { Metadata } from 'next';

interface NotePageProps {
  params: { id: string };
}

export async function generateMetadata({ params }: NotePageProps): Promise<Metadata> {
  const note = await getNoteById(params.id);
  return {
    title: note.title,
    description: `Note: ${note.title}`,
  };
}

export async function generateStaticParams() {
  const notes = await getAllNotes();
  return notes.map((note) => ({
    id: note.id,
  }));
}

export default async function NotePage({ params }: NotePageProps) {
  const note = await getNoteById(params.id);
  const allNotes = await getAllNotes();

  return <NotesClient initialNotes={allNotes} initialSelectedNoteId={note.id} />;
}
