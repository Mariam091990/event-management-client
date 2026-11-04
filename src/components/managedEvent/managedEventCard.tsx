"use client"
import Image from "next/image";

import {
    CalendarDays,
    MapPin,
   
   
    CheckCircle2,
    ArrowRight,
} from "lucide-react";
import Link from "next/link";

//  "_id": 
//     "title":
//     "description": 
//     "eventType": 
//     "thumbnail":
//     "location": "
//     "eventDate": "
//     "organizerName": "
//     "organizerEmail": "

export interface IManageEvent {
    _id: string;
    userName: string;
    userEmail: string;
    userImage: string;
    eventId: string;
    title: string;
    eventType: string;
    eventDescription: string;
    thumbnail: string;
    location: string;
    eventDate: string;
    joinedAt: string;
    organizerName: string,
    organizerEmail:string
}

const formatDate = (dateString: string) => {
    const [year, month, day] = dateString.split("-");

    return new Date(
        Number(year),
        Number(month) - 1,
        Number(day)
    ).toLocaleDateString("en-US", {
        day: "numeric",
        month: "short",
        year: "numeric",
    });
};

const ManagedEventCard = ({ event }: { event: IManageEvent }) => {
    return (
        <article className="group overflow-hidden rounded-2xl border border-emerald-100 bg-white shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-xl">

            {/* Event Image */}
            <div className="relative h-52 w-full overflow-hidden">
                <Image
                    src={event.thumbnail}
                    alt={event.title}
                    fill
                    unoptimized
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    className="object-cover transition duration-500 group-hover:scale-105"
                />

                <span className="absolute left-4 top-4 rounded-full bg-emerald-600 px-3 py-1.5 text-xs font-semibold text-white shadow">
                    {event.eventType}
                </span>

                <span className="absolute right-4 top-4 flex items-center gap-1 rounded-full bg-white px-3 py-1.5 text-xs font-semibold text-emerald-700 shadow">
                    <CheckCircle2 size={14} />
                    Joined
                </span>
            </div>

            {/* Event Information */}
            <div className="p-5">

                <h2 className="line-clamp-1 text-xl font-bold text-gray-800 transition group-hover:text-emerald-700">
                    {event.title}
                </h2>

                <p className="mt-3 line-clamp-2 min-h-12 text-sm leading-6 text-gray-500">
                    {event.eventDescription}
                </p>

                {/* Date and Location */}
                <div className="mt-5 space-y-3 border-t border-gray-100 pt-4">

                    <div className="flex items-center gap-3 text-sm text-gray-600">
                        <CalendarDays
                            size={18}
                            className="shrink-0 text-emerald-600"
                        />
                        <span>
                            Event Date: {formatDate(event.eventDate)}
                        </span>
                    </div>

                    <div className="flex items-center gap-3 text-sm text-gray-600">
                        <MapPin
                            size={18}
                            className="shrink-0 text-emerald-600"
                        />
                        <span className="line-clamp-1">
                            {event.location}
                        </span>
                    </div>

                    {/* <div className="flex items-center gap-3 text-sm text-gray-600">
                        <Clock
                            size={18}
                            className="shrink-0 text-emerald-600"
                        />
                        <span>
                            Joined: {formatDate(event.joinedAt.split("T")[0])}
                        </span>
                    </div> */}

                </div>

                {/* View Details */}
                <Link
                    href={`events/${event._id}`}
                    className="mt-6 flex w-full items-center justify-center gap-2 rounded-xl bg-emerald-600 px-4 py-3 text-sm font-semibold text-white transition hover:bg-emerald-700"
                >
                    View Event Details
                    <ArrowRight size={17} />
                </Link>

            </div>
        </article>
    );
};

export default ManagedEventCard;
