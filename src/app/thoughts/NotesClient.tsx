'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Note } from '@/types/note';
import { List, Trash2, Edit2, Type, Table, FileImage, Lock, Share, Search } from 'lucide-react';

const NotePreview = ({ note, onClick, isSelected }: { note: Note; onClick: (note: Note) => void; isSelected: boolean }) => (
  <div 
    className={`bg-white p-2 rounded mb-2 shadow cursor-pointer ${isSelected ? 'border-l-4 border-blue-500' : ''}`} 
    onClick={() => onClick(note)}
  >
    <p className="font-semibold">{note.title}</p>
    <p className="text-sm text-gray-600">
      {new Date(note.updatedAt).toLocaleDateString()} {note.text.slice(0, 20)}...
    </p>
  </div>
);

const Sidebar = ({ notes, onNoteSelect, selectedNoteId }: { notes: Note[]; onNoteSelect: (note: Note) => void; selectedNoteId: string }) => {
  const pinnedNotes = notes.filter(note => note.isPinned);
  const unpinnedNotes = notes.filter(note => !note.isPinned);

  const groupedNotes = unpinnedNotes.reduce((acc, note) => {
    const month = new Date(note.updatedAt).toLocaleString('default', { month: 'long', year: 'numeric' });
    if (!acc[month]) acc[month] = [];
    acc[month].push(note);
    return acc;
  }, {} as Record<string, Note[]>);

  return (
    <div className="w-64 bg-gray-100 p-4 overflow-y-auto border-r border-gray-200">
      <div className="flex justify-between items-center mb-4">
        <button className="p-2 hover:bg-gray-200 rounded"><List size={20} /></button>
        <button className="p-2 hover:bg-gray-200 rounded"><Trash2 size={20} /></button>
      </div>
      <h2 className="font-bold mb-2">Pinned</h2>
      {pinnedNotes.map(note => (
        <NotePreview key={note.id} note={note} onClick={onNoteSelect} isSelected={note.id === selectedNoteId} />
      ))}
      {Object.entries(groupedNotes).map(([month, monthNotes]) => (
        <div key={month}>
          <h2 className="font-bold mt-4 mb-2">{month}</h2>
          {monthNotes.map(note => (
            <NotePreview key={note.id} note={note} onClick={onNoteSelect} isSelected={note.id === selectedNoteId} />
          ))}
        </div>
      ))}
    </div>
  );
};

const Toolbar = () => (
  <div className="bg-gray-50 p-4 flex justify-between items-center border-b border-gray-200">
    <div className="flex space-x-2">
      <button className="p-2 hover:bg-gray-200 rounded"><Edit2 size={20} /></button>
      <button className="p-2 hover:bg-gray-200 rounded"><Type size={20} /></button>
      <button className="p-2 hover:bg-gray-200 rounded"><Table size={20} /></button>
      <button className="p-2 hover:bg-gray-200 rounded"><FileImage size={20} /></button>
    </div>
    <div className="flex space-x-2">
      <button className="p-2 hover:bg-gray-200 rounded"><Lock size={20} /></button>
      <button className="p-2 hover:bg-gray-200 rounded"><Share size={20} /></button>
      <button className="p-2 hover:bg-gray-200 rounded"><Search size={20} /></button>
    </div>
  </div>
);

const NoteContent = ({ note }: { note: Note | null }) => {
    if (!note) {
      return (
        <div className="flex-1 p-6 flex items-center justify-center">
          <div className="text-gray-500">Select a note or create a new one</div>
        </div>
      );
    }
  
    return (
      <div className="flex-1 p-6 overflow-y-auto">
        <h1 className="text-2xl font-bold mb-4">{note.title}</h1>
        <p className="mb-2 text-gray-600">
          {new Date(note.createdAt).toLocaleString()} — {note.tags.join(", ")}
        </p>
        <div className="whitespace-pre-wrap">{note.text}</div>
      </div>
    );
  };
  
  const NotesClient = ({ initialNotes, initialSelectedNoteId }: { initialNotes: Note[]; initialSelectedNoteId?: string }) => {
    const [notes] = useState(initialNotes);
    const [selectedNote, setSelectedNote] = useState<Note | null>(
      initialSelectedNoteId
        ? notes.find(n => n.id === initialSelectedNoteId) || null
        : notes[0] || null
    );
    const router = useRouter();
  
    useEffect(() => {
      if (initialSelectedNoteId) {
        const note = notes.find(n => n.id === initialSelectedNoteId);
        if (note) {
          setSelectedNote(note);
        }
      }
    }, [initialSelectedNoteId, notes]);
  
    const handleNoteSelect = (note: Note) => {
      setSelectedNote(note);
      router.push(`/notes/${note.id}`);
    };
  
    return (
      <div className="container mx-auto p-8 h-[calc(100vh-4rem)]">
        <div className="flex h-full m-auto max-w-screen-lg bg-white bg-opacity-95 rounded-lg shadow-2xl overflow-hidden">
          <Sidebar notes={notes} onNoteSelect={handleNoteSelect} selectedNoteId={selectedNote?.id || ''} />
          <div className="flex-1 flex flex-col">
            <Toolbar />
            <NoteContent note={selectedNote} />
          </div>
        </div>
      </div>
    );
  };
  
  export default NotesClient;
