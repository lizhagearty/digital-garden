export interface Note {
    id: string;
    title: string;
    createdAt: string;
    updatedAt: string;
    tags: string[];
    isPinned: boolean;
    text: string;
  }