import fs from 'fs/promises';
import path from 'path';
import matter from 'gray-matter';
import { Note } from '@/types/note';

const notesDirectory = path.join(process.cwd(), 'notes');

export async function getAllNotes(): Promise<Note[]> {
  const fileNames = await fs.readdir(notesDirectory);
  const allNotesData = await Promise.all(fileNames.map(async (fileName) => {
    const id = fileName.replace(/\.md$/, '');
    return getNoteById(id);
  }));

  return allNotesData.sort((a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime());
}

export async function getNoteById(id: string): Promise<Note> {
  const fullPath = path.join(notesDirectory, `${id}.md`);
  const fileContents = await fs.readFile(fullPath, 'utf8');
  
  const { data, content } = matter(fileContents);
  
  return {
    id,
    title: data.title,
    createdAt: data.createdAt,
    updatedAt: data.updatedAt,
    tags: data.tags || [],
    isPinned: data.isPinned || false,
    text: content,
  };
}