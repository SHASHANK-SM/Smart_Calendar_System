"use client";

import { useState, useEffect } from "react";
import { isSameDay } from "date-fns";
import { Note } from "./Calendar";

export default function NotesPanel({
    selectedDate,
    notes,
    setNotes,
}: {
    selectedDate: Date | null;
    notes: Note[];
    setNotes: (notes: Note[]) => void;
}) {
    const [text, setText] = useState("");

    useEffect(() => {
        const saved = localStorage.getItem("notes");
        if (saved) {
            const parsed = JSON.parse(saved) as Note[];
            const revived = parsed.map((note) => ({
                ...note,
                date: new Date(note.date),
            }));
            setNotes(revived);
        }
    }, [setNotes]);

    useEffect(() => {
        localStorage.setItem("notes", JSON.stringify(notes));
    }, [notes]);

    const addNote = () => {
        if (!text.trim() || !selectedDate) return;

        const newNote: Note = {
            id: Date.now(),
            text,
            date: selectedDate,
        };

        setNotes([...notes, newNote]);
        setText("");
    };

    const clearNotes = () => {
        setNotes([]);
        setText("");
    };

    return (
        <div className="notes-card">
            <div className="notes-card-header">
                <p className="notes-label">Notes</p>
                <h2 className="notes-title">Add a reminder</h2>
                <p className="notes-copy">
                    Save note text for the selected date range and review it here later.
                </p>
            </div>

            <textarea
                value={text}
                onChange={(e) => setText(e.target.value)}
                placeholder="Write notes for selected dates..."
                className="notes-textarea"
                rows={5}
            />

            <div className="notes-actions">
                <button onClick={addNote} className="notes-button">
                    Add Note
                </button>
                <button
                    type="button"
                    onClick={clearNotes}
                    className="notes-clear-button"
                    disabled={notes.length === 0}
                >
                    Clear All
                </button>
            </div>

            <div className="notes-list">
                {notes.length === 0 ? (
                    <div className="notes-empty">
                        No notes yet. Select a date and add one to see it appear here.
                    </div>
                ) : (
                    notes
                        .filter((note) => selectedDate && isSameDay(note.date, selectedDate))
                        .map((note) => (
                            <div key={note.id} className="note-item">
                                <p className="note-text">{note.text}</p>
                                <p className="note-date">
                                    📅 {note.date.toDateString()}
                                </p>
                            </div>
                        ))
                )}
            </div>
        </div>
    );
}
