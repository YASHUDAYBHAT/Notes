import React, { useEffect, useState } from 'react';
import Navbar from '../componets/Navbar';
import NoteCard from '../componets/notecard';
import api from '../lib/axios';
import { Loader } from 'lucide-react';

function Homepage() {
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchNotes = async () => {
      try {
        const res = await api.get('/notes');
        setNotes(res.data);
      } catch (error) {
        console.error('Error fetching notes:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchNotes();
  }, []);

  return (
    <div>
      <Navbar />
      {loading ? (
        <div className="h-[80vh] flex items-center justify-center">
          <Loader className="animate-spin size-8 text-primary" />
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-4">
          {notes.map((note) => (
            <NoteCard key={note._id} note={note} setNotes={setNotes} />
          ))}
        </div>
      )}
    </div>
  );
}

export default Homepage;
