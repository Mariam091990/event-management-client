
"use client";

import { useState, type ChangeEvent } from "react";
import { useRouter } from "next/navigation";
import { authClient } from "@/lib/auth-client";
import toast from "react-hot-toast";
// import { authClient } from "@/lib/auth-client";

const eventTypes = [
    "Health Camp",
    "Cleanup",
    "Plantation",
    "Donation",
    "Food Distribution",
    "Community Support",
    "Health camp",
    "Winter Relief",
    "Education",
    "Other",
];

interface EventFormData {
    title: string;
    description: string;
    eventType: string;
    thumbnail: string;
    location: string;
    eventDate: string;
}

export default function CreateEventPage() {
    const router = useRouter();
    const { data: session } = authClient.useSession();

    const user = session?.user;

    const [formData, setFormData] = useState<EventFormData>({
        title: "",
        description: "",
        eventType: "",
        thumbnail: "",
        location: "",
        eventDate: "",
    });

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");


    // Get tomorrow's date in local time

    const getTomorrowDate = () => {
        const tomorrow = new Date();

        tomorrow.setDate(tomorrow.getDate() + 1);

        return [
            tomorrow.getFullYear(),
            String(tomorrow.getMonth() + 1).padStart(2, "0"),
            String(tomorrow.getDate()).padStart(2, "0"),
        ].join("-");
    };

    const handleChange = (
        e: ChangeEvent<
            HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
        >
    ) => {
        const { name, value } = e.target;

        setFormData((previous) => ({
            ...previous,
            [name]: value,
        }));
    };

    const handleAddEvent = async (e: React.SubmitEvent<HTMLFormElement>) => {
        e.preventDefault();
        setError("");

        const { data } = await authClient.token();

        console.log(data);
        const token = data?.token
        

        if (formData.eventDate <= getTomorrowDate()) {
            setError("Please select a future date.");
            return;
        }


        try {
            setLoading(true);

            const eventData = {
                ...formData,
                organizerName: user?.name || "",
                organizerEmail: user?.email || "",
            };

            const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/events`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",

                    authorization: `Bearer ${token}`
                },
                body: JSON.stringify(eventData),
            });

            if (!response.ok) {
                throw new Error("Failed to create event.");
            }

            toast.success("Event created successfully!");

            router.push("/upcoming-events");
            router.refresh();
        } catch (err) {
            setError(
                err instanceof Error
                    ? err.message
                    : "Something went wrong."
            );
        } finally {
            setLoading(false);
        }
    };



    return (
        <main className="min-h-screen bg-linear-to-br from-emerald-50 via-white to-teal-50 px-4 py-12">

            <div className="mx-auto max-w-3xl">

                {/* Page Heading */}
                <div className="mb-8 text-center">
                    <div className="mb-3 inline-flex rounded-full bg-emerald-100 px-4 py-2 text-sm font-semibold text-emerald-700">
                        ✨ Make a Difference
                    </div>

                    <h1 className="text-3xl font-bold text-gray-800 md:text-4xl">
                        Create an Event
                    </h1>

                    <p className="mt-3 text-gray-500">
                        Bring people together and make your community better.
                    </p>
                </div>

                {/* Form Card */}
                <div className="rounded-2xl border border-emerald-100 bg-white p-6 shadow-xl shadow-emerald-100/50 md:p-10">

                    <form onSubmit={handleAddEvent} className="space-y-6">

                        {/* Event Title */}
                        <div>
                            <label className="mb-2 block font-semibold text-gray-700">
                                Event Title *
                            </label>

                            <input
                                type="text"
                                name="title"
                                value={formData.title}
                                onChange={handleChange}
                                placeholder="e.g. Community Tree Plantation"
                                className="input input-bordered w-full bg-gray-50"
                                required
                            />
                        </div>

                        {/* Event Type and Date */}
                        <div className="grid gap-6 md:grid-cols-2">

                            <div>
                                <label className="mb-2 block font-semibold text-gray-700">
                                    Event Type *
                                </label>

                                <select
                                    name="eventType"
                                    value={formData.eventType}
                                    onChange={handleChange}
                                    className="select select-bordered w-full bg-gray-50"
                                    required
                                >
                                    <option value="" disabled>
                                        Select event type
                                    </option>

                                    {eventTypes.map((type) => (
                                        <option key={type} value={type}>
                                            {type}
                                        </option>
                                    ))}
                                </select>
                            </div>

                            <div>
                                <label className="mb-2 block font-semibold text-gray-700">
                                    Event Date *
                                </label>

                                <input
                                    type="date"
                                    name="eventDate"
                                    value={formData.eventDate}
                                    onChange={handleChange}
                                    onFocus={(e) => {
                                        e.currentTarget.min = getTomorrowDate();
                                    }}
                                    className="input input-bordered w-full bg-gray-50"
                                    required
                                />
                            </div>

                        </div>

                        {/* Location */}
                        <div>
                            <label className="mb-2 block font-semibold text-gray-700">
                                Location *
                            </label>

                            <input
                                type="text"
                                name="location"
                                value={formData.location}
                                onChange={handleChange}
                                placeholder="Enter event location"
                                className="input input-bordered w-full bg-gray-50"
                                required
                            />
                        </div>

                        {/* Thumbnail URL */}
                        <div>
                            <label className="mb-2 block font-semibold text-gray-700">
                                Thumbnail Image URL *
                            </label>

                            <input
                                type="url"
                                name="thumbnail"
                                value={formData.thumbnail}
                                onChange={handleChange}
                                placeholder="https://example.com/image.jpg"
                                className="input input-bordered w-full bg-gray-50"
                                required
                            />

                            <p className="mt-2 text-xs text-gray-400">
                                Provide a valid image URL for your event.
                            </p>
                        </div>

                        {/* Description */}
                        <div>
                            <label className="mb-2 block font-semibold text-gray-700">
                                Event Description *
                            </label>

                            <textarea
                                name="description"
                                value={formData.description}
                                onChange={handleChange}
                                placeholder="Describe your event, its purpose, and how people can participate..."
                                className="textarea textarea-bordered min-h-36 w-full bg-gray-50"
                                required
                            />
                        </div>

                        {/* Error Message */}
                        {error && (
                            <div className="rounded-lg bg-red-50 p-3 text-sm text-red-600">
                                {error}
                            </div>
                        )}

                        {/* Submit Button */}
                        <button
                            type="submit"
                            disabled={loading}
                            className="btn w-full border-0 bg-linear-to-r from-emerald-600 to-teal-600 text-white shadow-lg hover:from-emerald-700 hover:to-teal-700"
                        >
                            {loading ? (
                                <>
                                    <span className="loading loading-spinner loading-sm"></span>
                                    Creating Event...
                                </>
                            ) : (
                                "✨ Publish Event"
                            )}
                        </button>


                        {/* Organizer Information */}
                        <div className="mt-8 border-t border-emerald-100 pt-6">

                            <div className="mb-4">
                                <h2 className="text-lg font-bold text-gray-800">
                                    Organizer Information
                                </h2>

                                <p className="mt-1 text-sm text-gray-500">
                                    Your account information as the event organizer.
                                </p>
                            </div>

                            <div className="grid gap-5 md:grid-cols-2">

                                {/* Organizer Name */}
                                <div>
                                    <label className="mb-2 block font-semibold text-gray-700">
                                        Organizer Name
                                    </label>

                                    <input
                                        type="text"
                                        value={user?.name || ""}
                                        readOnly
                                        placeholder="Your name"
                                        className="input input-bordered w-full bg-gray-100 text-gray-600"
                                    />
                                </div>

                                {/* Organizer Email */}
                                <div>
                                    <label className="mb-2 block font-semibold text-gray-700">
                                        Organizer Email
                                    </label>

                                    <input
                                        type="email"
                                        value={user?.email || ""}
                                        readOnly
                                        placeholder="Your email"
                                        className="input input-bordered w-full bg-gray-100 text-gray-600"
                                    />
                                </div>

                            </div>

                            {!user && (
                                <p className="mt-3 text-sm text-red-500">
                                    Please log in to create an event.
                                </p>
                            )}

                        </div>



                    </form>
                </div>

                <p className="mt-6 text-center text-sm text-gray-400">
                    Together, we can create a positive impact. 💚
                </p>

            </div>
        </main>
    );
}
