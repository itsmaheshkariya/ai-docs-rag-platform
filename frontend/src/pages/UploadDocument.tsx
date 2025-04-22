import { useState } from 'react';
import { uploadDocument } from '../services/api';

export default function UploadDocument() {
  const [title, setTitle] = useState('');
  const [file, setFile] = useState<File | null>(null);
  const [token, setToken] = useState('');

  const handleUpload = async () => {
    if (!file || !token) return;
    try {
      await uploadDocument(token, title, file);
      alert('Uploaded successfully!');
    } catch (err) {
      console.error('Upload error:', err);
      alert('Upload failed!');
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-8">
      <div className="max-w-md w-full space-y-4">
        <h1 className="text-2xl font-bold">Upload Document</h1>
        <input 
          type="text" 
          placeholder="Document Title" 
          value={title} 
          onChange={(e) => setTitle(e.target.value)} 
          className="border p-2 w-full"
        />
        <input 
          type="file" 
          onChange={(e) => setFile(e.target.files?.[0] || null)} 
          className="border p-2 w-full"
        />
        <input 
          type="text" 
          placeholder="JWT Token" 
          value={token} 
          onChange={(e) => setToken(e.target.value)} 
          className="border p-2 w-full"
        />
        <button 
          onClick={handleUpload} 
          className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 w-full"
        >
          Upload
        </button>
      </div>
    </div>
  );
}
