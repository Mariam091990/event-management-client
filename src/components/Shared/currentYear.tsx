"use client";

import { useEffect, useState } from "react";

const getCurrentDate = () =>
    new Intl.DateTimeFormat("en-US", {
        dateStyle: "full",
        timeZone: "Asia/Dhaka",
    }).format(new Date());

const CurrentDate = () => {
    const [date, setDate] = useState("");

    useEffect(() => {
        const updateDate = () => {
            setDate(getCurrentDate());
        };

        // Set the date after the component mounts
        updateDate();

        // Update periodically to detect a new day
        const intervalId = setInterval(updateDate, 60_000);

        // Clean up the interval when the component unmounts
        return () => clearInterval(intervalId);
    }, []);

    return (
        <div>
            <p className="mt-1 text-gray-500">
                {date || "\u00A0"}
            </p>
        </div>
    );
};

export default CurrentDate;