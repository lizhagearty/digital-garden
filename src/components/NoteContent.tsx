import ReactMarkdown from 'react-markdown';

type NoteContentProps = {
  title: string;
  content: string;
  createdAt: string;
  updatedAt: string;
  category: string;
  tags: string[];
  author: string;
};

export default function NoteContent({ 
  title, 
  content, 
  createdAt, 
  updatedAt, 
  category, 
  tags, 
  author 
}: NoteContentProps) {
  // ... (component logic)

  return (
    <div className="flex-1 p-8 overflow-y-auto">
      <h1 className="text-3xl font-bold mb-4">{title}</h1>
      {/* ... (metadata display) */}
      <ReactMarkdown className="prose">{content}</ReactMarkdown>
    </div>
  );
}
