"use client";

import {
    startOfMonth,
    endOfMonth,
    eachDayOfInterval,
    getDay,
    isSameDay,
    format,
} from "date-fns";

export default function CalendarGrid({
    month,
    selectedDate,
    setSelectedDate,
}: {
    month: Date;
    selectedDate: Date | null;
    setSelectedDate: (date: Date | null) => void;
}) {
    const monthStart = startOfMonth(month);
    const days = eachDayOfInterval({
        start: monthStart,
        end: endOfMonth(month),
    });
    const blankDays = Array.from({ length: getDay(monthStart) }, (_, index) => index);

    const handleClick = (day: Date) => {
        setSelectedDate(day);
    };

    return (
        <div>
            <div className="calendar-weekdays">
                {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
                    <div key={day} className="calendar-weekday">{day}</div>
                ))}
            </div>

            <div className="calendar-grid">
                {blankDays.map((blank) => (
                    <div key={`blank-${blank}`} className="calendar-blank" />
                ))}

                {days.map((day) => {
                    const isSelected = selectedDate && isSameDay(day, selectedDate);
                    const isToday = isSameDay(day, new Date());

                    return (
                        <button
                            key={day.toString()}
                            type="button"
                            onClick={() => handleClick(day)}
                            className={`calendar-day ${isSelected ? 'active' : ''} ${isToday ? 'today' : ''}`}
                        >
                            {format(day, "d")}
                        </button>
                    );
                })}
            </div>
        </div>
    );
}
