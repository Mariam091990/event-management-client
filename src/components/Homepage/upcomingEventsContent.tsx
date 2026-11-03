
"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { Search, Plus, CalendarDays } from "lucide-react";

import EventCard from "@/components/Homepage/eventCard";

interface IEvent {
    _id: string;
    title: string;
    description: string;
    eventType: string;
    thumbnail: string;
    location: string;
    eventDate: string;
    organizerEmail?: string | null;
    featured?: boolean;
}

interface UpcomingEventsContentProps {
    events: IEvent[];
}

const categories = [
    "All",
    "Donation",
    "Cleanup",
    "Plantation",
    "Winter Relief",
    "Food Distribution",
    "Community Support",
    "Health Camp",
    "Education",
];

const UpcomingEventsContent = ({
    events,
}: UpcomingEventsContentProps) => {
    const [activeCategory, setActiveCategory] = useState("All");
    const [searchTerm, setSearchTerm] = useState("");

    // Filter events by category and search text
    const filteredEvents = useMemo(() => {
        return events.filter((event) => {
            const matchesCategory =
                activeCategory === "All" ||
                event.eventType.toLowerCase() === activeCategory.toLowerCase();

            const matchesSearch =
                event.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                event.location.toLowerCase().includes(searchTerm.toLowerCase());

            return matchesCategory && matchesSearch;
        });
    }, [events, activeCategory, searchTerm]);

    return (
        <main className="min-h-screen bg-slate-50 px-4 py-12 md:px-8">

            <div className="mx-auto max-w-7xl">

                {/* Page Heading */}
                <section className="flex flex-col justify-between gap-6 border-b border-slate-200 pb-7 md:flex-row md:items-center">

                    <div>
                        <span className="inline-flex items-center gap-2 rounded-full bg-blue-50 px-3 py-1.5 text-xs font-semibold text-blue-700">
                            <CalendarDays size={14} />
                            Future Community Drives
                        </span>

                        <h1 className="mt-3 text-3xl font-extrabold tracking-tight text-slate-900 md:text-4xl">
                            Upcoming Events
                        </h1>

                        <p className="mt-3 max-w-xl text-sm leading-6 text-slate-500">
                            Discover verified volunteer initiatives scheduled for
                            upcoming dates. Join a community drive and make a
                            positive difference.
                        </p>
                    </div>

                    {/* Create Event Button */}
                    <Link
                        href="/create-events"
                        className="inline-flex shrink-0 items-center justify-center gap-2 rounded-xl bg-blue-600 px-6 py-3 text-sm font-semibold text-white shadow-md shadow-blue-600/20 transition-all hover:-translate-y-0.5 hover:bg-blue-700"
                    >
                        <Plus size={18} />
                        Create Event
                    </Link>

                </section>

                {/* Category Filters and Search */}
                <section className="my-10 flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">

                    {/* Categories */}
                    <div className="flex flex-wrap items-center gap-2">

                        {categories.map((category) => (
                            <button
                                key={category}
                                type="button"
                                onClick={() => setActiveCategory(category)}
                                className={`rounded-full border px-4 py-2 text-xs font-semibold transition-all duration-200 ${activeCategory === category
                                        ? "border-blue-600 bg-blue-600 text-white shadow-md shadow-blue-600/20"
                                        : "border-slate-200 bg-white text-slate-600 hover:border-blue-300 hover:bg-blue-50 hover:text-blue-700"
                                    }`}
                            >
                                {category}
                            </button>
                        ))}

                    </div>

                    {/* Search */}
                    <div className="relative w-full lg:max-w-xs">

                        <Search
                            size={18}
                            className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                        />

                        <input
                            type="search"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            placeholder="Search events or areas..."
                            className="h-11 w-full rounded-xl border border-slate-200 bg-white pl-11 pr-4 text-sm text-slate-700 outline-none transition-all placeholder:text-slate-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                        />

                    </div>

                </section>

                {/* Event Count */}
                <div className="mb-5 flex items-center justify-between">
                    <p className="text-sm font-medium text-slate-500">
                        Showing{" "}
                        <span className="font-bold text-slate-800">
                            {filteredEvents.length}
                        </span>{" "}
                        {filteredEvents.length === 1 ? "event" : "events"}
                    </p>
                </div>

                {/* Event Cards */}
                {filteredEvents.length > 0 ? (

                    <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">

                        {filteredEvents.map((event) => (
                            <EventCard
                                key={event._id}
                                event={event}
                            />
                        ))}

                    </div>

                ) : (

                    /* Empty State */
                    <div className="rounded-2xl border border-dashed border-slate-300 bg-white px-6 py-16 text-center">

                        <div className="mb-4 text-5xl">🔎</div>

                        <h2 className="text-xl font-bold text-slate-800">
                            No Events Found
                        </h2>

                        <p className="mt-2 text-sm text-slate-500">
                            We could not find any events matching your search.
                            Try another category or search term.
                        </p>

                        <button
                            type="button"
                            onClick={() => {
                                setActiveCategory("All");
                                setSearchTerm("");
                            }}
                            className="mt-5 rounded-full bg-blue-600 px-5 py-2.5 text-sm font-semibold text-white hover:bg-blue-700"
                        >
                            Clear Filters
                        </button>

                    </div>

                )}

            </div>

        </main>
    );
};

export default UpcomingEventsContent;
