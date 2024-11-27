import React from "react";

const Agenda = ({ agendaData, selectedDate }) => {
    return (
        <div className="bg-white p-4 rounded shadow">
            <h2 className="text-center font-bold mb-4">
                Agenda for{" "}
                {new Date(selectedDate).toLocaleDateString("en-US", {
                    timeZone: "America/Los_Angeles",
                    month: "2-digit",
                    day: "2-digit",
                    year: "numeric",
                })}
            </h2>
            {agendaData.length === 0 ? (
                <p className="text-center text-gray-500">No events scheduled for this day.</p>
            ) : (
                <ul className="space-y-2">
                    {agendaData.map((item, index) => (
                        <li
                            key={index}
                            className={`p-4 rounded ${
                                item.task === "Being Helped" ? "bg-yellow-200" : "bg-white"
                            }`}
                        >
                            <p>Owner: {item.owner}</p>
                            <p>Helper: {item.helper}</p>
                            <p>Time: {item.time}</p>
                            <p>Category: {item.category}</p>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default Agenda;
