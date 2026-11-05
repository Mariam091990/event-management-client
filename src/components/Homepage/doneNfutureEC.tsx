
"use client";

import { useState } from "react";
import Image from "next/image";
// import Link from "next/link";

import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";

interface IEvent {
    _id: string;
    title: string;
    description: string;
    eventType: string;
    thumbnail: string;
    location: string;
    eventDate: string;
    featured?: boolean;
    organizerEmail?: string | null;
}

interface EventCardProps {
    event: IEvent;
}

const DonenFutureEventCard = ({ event }: EventCardProps) => {
    // const [interested, setInterested] = useState(false);
    const [rating, setRating] = useState(0);

    const formatDate = (date: string) => {
        const [year, month, day] = date.split("-").map(Number);

        return new Date(year, month - 1, day).toLocaleDateString(
            "en-BD",
            {
                day: "numeric",
                month: "short",
                year: "numeric",
            }
        );
    };

    const categoryColors: Record<string, string> = {
        Cleanup: "bg-sky-100 text-sky-700",
        Plantation: "bg-lime-100 text-lime-800",
        Donation: "bg-rose-100 text-rose-700",
        "Food Distribution": "bg-orange-100 text-orange-700",
        "Community Support": "bg-violet-100 text-violet-700",
        "Health Camp": "bg-blue-100 text-blue-700",
        "Education": "bg-green-100 text-green-700",
        "Winter Relief":"bg-red-100 text-red-700",
        Other: "bg-amber-100 text-amber-800",
    };

    return (
        <Card className="group overflow-hidden rounded-2xl border border-stone-200 bg-white p-0 shadow-sm transition-all duration-300 hover:-translate-y-2 hover:shadow-xl">

            {/* Event Image */}
            <div className="relative h-56 w-full overflow-hidden">

                <Image
                    src={event.thumbnail}
                    alt={event.title}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    loading="eager"
                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                />

                {/* Featured Badge */}
                {event.featured && (
                    <span className="absolute left-4 top-4 flex items-center gap-1 rounded-full bg-amber-400 px-3 py-1.5 text-xs font-bold text-amber-950 shadow-md">
                        ✨ Featured
                    </span>
                )}

                {/* Category Badge */}
                <span
                    className={`absolute bottom-4 left-4 rounded-full px-4 py-1.5 text-xs font-semibold shadow-md ${categoryColors[event.eventType] || categoryColors.Other
                        }`}
                >
                    {event.eventType}
                </span>

            

            </div>

            {/* Event Information */}
            <CardHeader className="gap-2 px-5 pt-5">

                <div className="flex items-center gap-2 text-sm text-stone-500">
                    <span>📅</span>
                    <span>{formatDate(event.eventDate)}</span>
                </div>

                <CardTitle className="line-clamp-1 text-xl font-bold text-stone-800 transition-colors group-hover:text-sky-700">
                    {event.title}
                </CardTitle>

                <CardDescription className="flex items-center gap-2 text-sm text-stone-500">
                    <span>📍</span>
                    <span className="line-clamp-1">{event.location}</span>
                </CardDescription>

            </CardHeader>

            {/* Description */}
            <CardContent className="px-5">

                <p className="line-clamp-3 text-sm leading-6 text-stone-600">
                    {event.description}
                </p>

                {/* Star Rating */}
                <div className="mt-4 border-t border-stone-100 pt-4">

                    <p className="mb-2 text-xs font-medium text-stone-500">
                        Rate this event
                    </p>

                    <div className="flex items-center gap-1">
                        {[1, 2, 3, 4, 5].map((star) => (
                            <button
                                key={star}
                                type="button"
                                onClick={() => setRating(star)}
                                aria-label={`Rate ${star} stars`}
                                className={`text-xl transition-transform hover:scale-125 ${star <= rating
                                        ? "text-amber-400"
                                        : "text-stone-300"
                                    }`}
                            >
                                ★
                            </button>
                        ))}

                        <span className="ml-2 text-xs text-stone-500">
                            {rating > 0 ? `${rating}/5` : "Not rated"}
                        </span>
                    </div>

                </div>

            </CardContent>

            {/* Footer */}
            <CardFooter className="flex items-center justify-between gap-2 border-t border-stone-100 bg-stone-50/70 px-5 py-4">

                {/* Interested Button */}
                {/* <button
                    type="button"
                    onClick={() => setInterested(!interested)}
                    className={`rounded-full px-4 py-2 text-sm font-semibold transition-all ${interested
                            ? "bg-rose-100 text-rose-700"
                            : "bg-white text-stone-600 ring-1 ring-stone-200 hover:bg-rose-50 hover:text-rose-600"
                        }`}
                >
                    {interested ? "❤️ Interested" : "🤍 I'm Interested"}
                </button> */}

                {/* View Details */}
                {/* <Link
                    href={`/allEvents/${event._id}`}
                    className="rounded-full bg-sky-600 px-5 py-2 text-sm font-semibold text-white transition-colors hover:bg-sky-700"
                >
                    View Details →
                </Link> */}

            </CardFooter>

        </Card>
    );
};

export default DonenFutureEventCard;
