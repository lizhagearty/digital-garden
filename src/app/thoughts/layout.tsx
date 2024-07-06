import { getAllNotes } from '@/lib/getNotes';
import NoteList from '@/components/NoteList';

import { Note } from '@/types/note'; // Import the Note type

export default async function NotesLayout({
    children,
}: {
    children: React.ReactNode;
}) {

    return (
        <div>
            <main>{children}</main>
        </div>
    );
}