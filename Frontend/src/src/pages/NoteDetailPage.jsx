import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import toast from "react-hot-toast";
import api from "../lib/axios";
import { ArrowLeftIcon, Trash2Icon, LoaderIcon } from "lucide-react";

const NoteDetailPage = () => {
  const [note, setNote] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    const fetchNote = async () => {
      try {
        const res = await api.get(`/notes/${id}`);
        setNote(res.data);
      } catch (error) {
        console.error("Error in fetching note", error);
        toast.error("Failed to fetch the note");
      } finally {
        setLoading(false);
      }
    };
    fetchNote();
  }, [id]);

  const handleDelete = async () => {
    if (!window.confirm("Are you sure you want to delete this note?")) return;

    try {
      await api.delete(`/notes/${id}`);
      toast.success("Note deleted");
      navigate("/");
    } catch (error) {
      console.error("Error deleting the note:", error);
      toast.error("Failed to delete note");
    }
  };

  const handleSave = async () => {
    if (!note.title.trim() || !note.content.trim()) {
      toast.error("Please fill out all fields");
      return;
    }

    setSaving(true);
    try {
      await api.put(`/notes/${id}`, note);
      toast.success("Note updated successfully");
      navigate("/");
    } catch (error) {
      console.error("Error updating note", error);
      toast.error("Failed to update note");
    } finally {
      setSaving(false);
    }
  };

  if (loading || !note) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-base-200">
        <LoaderIcon className="animate-spin size-8 text-primary" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-base-200">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto">
          {/* Back + Delete */}
          <div className="flex items-center justify-between mb-6">
            <Link to="/" className="btn btn-ghost">
              <ArrowLeftIcon className="size-5" />
              Back to Notes
            </Link>
            <button
              onClick={handleDelete}
              className="btn btn-outline btn-error gap-2"
            >
              <Trash2Icon className="size-5" />
              Delete Note
            </button>
          </div>

          {/* Card */}
          <div className="card bg-base-100 shadow-xl rounded-2xl border border-base-300">
            <div className="card-body p-6 md:p-8">
              <h2 className="text-3xl font-semibold text-base-content mb-6">
                ✏️ Edit Note
              </h2>

              {/* Form */}
              <form className="space-y-6">
                <div>
                  <label className="label font-medium text-base-content">
                    Title
                  </label>
                  <input
                    type="text"
                    className="input input-bordered w-full"
                    value={note.title}
                    onChange={(e) =>
                      setNote({ ...note, title: e.target.value })
                    }
                  />
                </div>

                <div>
                  <label className="label font-medium text-base-content">
                    Content
                  </label>
                  <textarea
                    className="textarea textarea-bordered w-full min-h-[150px]"
                    value={note.content}
                    onChange={(e) =>
                      setNote({ ...note, content: e.target.value })
                    }
                  />
                </div>

                {/* Save Button */}
                <div className="text-end">
                  <button
                    type="button"
                    onClick={handleSave}
                    className="btn btn-primary btn-md min-w-[140px]"
                    disabled={saving}
                  >
                    {saving ? (
                      <span className="loading loading-spinner"></span>
                    ) : (
                      "Save Changes"
                    )}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NoteDetailPage;
