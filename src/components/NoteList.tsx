'use client';

import Link from 'next/link';
import { useState } from 'react';
import { Note } from '@/types/note';

type NoteListProps = {
  notes: Note[];
};

export default function NoteList({ notes }: NoteListProps) {
  const [activeSlug, setActiveSlug] = useState<string | null>(null);

  // ... (rest of the component logic)

  return (
    <div className="w-64 h-screen overflow-y-auto border-r border-gray-200 bg-gray-100">
      <h2 className="text-xl font-semibold p-4 border-b border-gray-200">Notes</h2>
      <ul>
        {notes.map((note) => (
          <li key={note.slug}>
            <Link
              href={`/notes/${note.slug}`}
              onClick={() => setActiveSlug(note.slug)}
              className={`block p-4 hover:bg-gray-200 ${
                note.slug === activeSlug ? 'bg-blue-100' : ''
              }`}
            >
              {/* ... (note preview content) */}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
