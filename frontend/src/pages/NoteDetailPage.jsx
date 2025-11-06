import React, { useEffect } from "react";
import { useState } from "react";
import { useNavigate, useParams, Link } from "react-router";
import api from "../lib/axios.js";
import toast from "react-hot-toast";
import {
  LoaderIcon,
  ArrowLeftIcon,
  Trash2Icon,
} from "lucide-react";

const NoteDetailPage = () => {
  const [note, setNote] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const navigate = useNavigate();

  const { id } = useParams();

  const handleDelete = async () => {
    if (!window.confirm("Na pewno chcesz usunąć notatkę?")) return;
    try {
      await api.delete(`/notes/${id}`);
      toast.success("Notatka usunięta pomyślnie");
      navigate("/");
    } catch (error) {
      console.log("Error deleting note:", error);
      toast.error("Nie udało się usunąć notatki");
    }
  };
  const handleSave = async () => {
    if(!note.title.trim() || !note.content.trim()) {
        toast.error("Proszę wypełnić wszystkie pola");
        return;
    }

    setSaving(true);

    try {
        await api.put(`/notes/${id}`, note);
        toast.success("Notatka zapisana pomyślnie");
        navigate("/");
    } catch (error) {
        console.log("Error saving note:", error);
        toast.error("Nie udało się zapisać notatki");
    } finally {
        setSaving(false);
    }
  };

  useEffect(() => {
    const fetchNote = async () => {
      try {
        const res = await api.get(`/notes/${id}`);
        setNote(res.data);
      } catch (error) {
        console.log("Error fetching note details:", error);
        toast.error("Nie udało się załadować notatki");
      } finally {
        setLoading(false);
      }
    };
    fetchNote();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen bg-base-200 flex items-center justify-center">
        <LoaderIcon className="size-10 animate-spin" />
      </div>
    );
  }
  return (
    <div className="min-h-screen bg-base-200">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto">
          <div className="flex items-center justify-between mb-6">
            <Link to="/" className="btn btn-ghost">
              <ArrowLeftIcon className="h-5 w-5" /> Wróć do
              notatek
            </Link>
            <button
              className="btn btn-error btn-outline"
              onClick={handleDelete}
            >
              <Trash2Icon className="h-5 w-5" /> Usuń
              notatkę
            </button>
          </div>

          <div className="card bg-base-100">
            <div className="card-body">
              <div className="form-control mb-4 flex flex-col">
                <label className="label">
                  <span className="label-text">Tytuł notatki</span>
                </label>
                <input
                  type="text"
                  placeholder="Tytuł notatki..."
                  className="input input-bordered w-full"
                  value={note.title}
                  onChange={(e) =>
                    setNote({
                      ...note,
                      title: e.target.value,
                    })
                  }
                />
              </div>
              <div className="form-control mb-4 flex flex-col">
                <label className="label">
                  <span className="label-text">Treść</span>
                </label>
                <textarea
                  type="text"
                  placeholder="Treść notatki..."
                  className="textarea textarea-bordered h-32 w-full"
                  value={note.content}
                  onChange={(e) =>
                    setNote({
                      ...note,
                      content: e.target.value,
                    })
                  }
                />
              </div>
              <div className="card-actions justify-end">
                <button className="btn btn-primary" disabled={saving} onClick={handleSave}>
                  {saving ? "Zapisywanie..." : "Zapisz zmiany"}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NoteDetailPage;
