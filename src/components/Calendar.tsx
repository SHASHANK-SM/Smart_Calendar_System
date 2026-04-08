"use client";

import { useState } from "react";
import CalendarGrid from "./CalendarGrid";
import NotesPanel from "./NotesPanel";

export interface Note {
    id: number;
    text: string;
    date: Date;
}

export default function Calendar() {
    const today = new Date();
    const [month, setMonth] = useState(() => {
        return new Date(today.getFullYear(), today.getMonth(), 1);
    });
    const [selectedDate, setSelectedDate] = useState<Date | null>(null);
    const [notes, setNotes] = useState<Note[]>([]);

    const changeMonth = (direction: "prev" | "next") => {
        setMonth((current) => {
            return new Date(
                current.getFullYear(),
                current.getMonth() + (direction === "next" ? 1 : -1),
                1
            );
        });
    };

    return (
        <div className="page-shell">
            <section className="hero-card">
                <div className="hero-card-inner">
                    <div className="hero-visual">
                        <div className="hero-card-header">
                            <p className="hero-subtitle">Monthly planner</p>
                            <h1 className="hero-title">Elevate Your Everyday Planning</h1>
                            <p className="hero-copy">
                                Keep your schedule visible and add notes for any selected date with a modern, polished layout.
                            </p>
                        </div>
                    </div>

                    <div className="hero-panel">
                        <div>
                            <p className="hero-panel-label">Month</p>
                            <p className="hero-panel-value">{month.toLocaleString("default", { month: "long" })}</p>
                        </div>
                        <div>
                            <p className="hero-panel-label">Year</p>
                            <p className="hero-panel-value">{month.getFullYear()}</p>
                        </div>
                        <div>
                            <p className="hero-panel-label">Today</p>
                            <p className="hero-panel-value">{today.toLocaleDateString("default", { month: "long", day: "numeric", year: "numeric" })}</p>
                            <p className="hero-panel-subvalue">{today.toLocaleDateString("default", { weekday: "long" })}</p>
                        </div>
                    </div>
                </div>
            </section>

            <div className="content-grid">
                <div className="notes-card-wrapper">
                    <NotesPanel selectedDate={selectedDate} notes={notes} setNotes={setNotes} />
                </div>

                <div className="calendar-card">
                    <div className="calendar-card-header">
                        <div>
                            <p className="calendar-label">Calendar</p>
                            <h2 className="calendar-title">
                                {month.toLocaleString("default", { month: "long" })} {month.getFullYear()}
                            </h2>
                        </div>
                        <div className="calendar-nav-buttons">
                            <button type="button" className="calendar-nav-button" onClick={() => changeMonth("prev")}>Previous</button>
                            <button type="button" className="calendar-nav-button primary" onClick={() => changeMonth("next")}>Next</button>
                        </div>
                    </div>

                    <CalendarGrid month={month} selectedDate={selectedDate} setSelectedDate={setSelectedDate} />
                </div>
            </div>
        </div>
    );
}
