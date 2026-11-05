
import Image from "next/image";
import { MapPin, CalendarDays, Tag, UserRound } from "lucide-react";

interface IEvent {
    _id: string;
    userName: string;
    userEmail: string;
    userImage: string;
    eventTitle: string;
    eventDescription: string;
    eventType: string;
    thumbnail: string;
    location: string;
    eventDate: string;
}

interface JoinedByMannyCardProps {
    event: IEvent;
}

export default function JoinedByMannyCard({
    event,
}: JoinedByMannyCardProps) {
    const formattedDate = new Date(
        `${event.eventDate}T00:00:00`
    ).toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
    });

    return (
        <div className="group overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">

            {/* Event Thumbnail */}
            <div className="relative h-52 w-full overflow-hidden">
                <Image
                    src={event.thumbnail}
                    alt={event.eventTitle || "Volunteer event thumbnail"}
                    fill
                    sizes="(max-width: 768px) 100vw, 400px"
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                />

                <span className="absolute left-4 top-4 rounded-full bg-white/90 px-4 py-1.5 text-xs font-semibold text-green-700 shadow-sm">
                    {event.eventType}
                </span>
            </div>

            {/* Card Content */}
            <div className="space-y-4 p-5">

                {/* Title and Description */}
                <div>
                    <h2 className="text-xl font-bold text-gray-800 transition-colors group-hover:text-green-700">
                        {event.eventTitle}
                    </h2>

                    <p className="mt-2 line-clamp-2 text-sm leading-6 text-gray-500">
                        {event.eventDescription}
                    </p>
                </div>

                {/* Event Details */}
                <div className="space-y-2 border-t border-gray-100 pt-4">

                    <div className="flex items-center gap-2 text-sm text-gray-600">
                        <CalendarDays size={17} className="text-green-600" />
                        <span>{formattedDate}</span>
                    </div>

                    <div className="flex items-center gap-2 text-sm text-gray-600">
                        <MapPin size={17} className="text-green-600" />
                        <span>{event.location}</span>
                    </div>

                    <div className="flex items-center gap-2 text-sm text-gray-600">
                        <Tag size={17} className="text-green-600" />
                        <span>{event.eventType}</span>
                    </div>
                </div>

                {/* Organizer */}
                <div className="flex items-center gap-3 border-t border-gray-100 pt-4">
                    <div className="relative h-10 w-10 overflow-hidden rounded-full bg-gray-100">
                        {event.userName ? (
                            <Image
                                src={event.userImage}
                                alt={event.userName}
                                fill
                                sizes="40px"
                                className="object-cover"
                            />
                        ) : (
                            <UserRound className="m-2 text-gray-500" />
                        )}
                    </div>

                    <div>
                        <p className="text-xs text-gray-400">
                            Joined by
                        </p>
                        <p className="text-sm font-semibold text-gray-700">
                            {event.userName}
                        </p>
                    </div>
                </div>

            </div>
        </div>
    );
}
