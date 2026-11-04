// import { cacheLife } from "next/cache";
import { Suspense } from "react";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
    CalendarDays,
    MapPin,
    UserRound,
    ArrowLeft,
    Tag,
    Pencil,

} from "lucide-react";

import UpdateDialog from "@/components/updateEvent";
import DeleteEventPage from "@/components/deleteEvent";
import JoinedEventPage from "@/components/joinedEvent";

import OrganizerInfo from "@/components/Shared/organizerInfo";

interface IEvent {
    _id: string;
    title: string;
    description: string;
    eventType: string;
    thumbnail: string;
    location: string;
    eventDate: string;
    organizerEmail?: string | null;
     organizerName?:string|null;
    featured?: boolean;
}
interface PageProps {
    params: Promise<{ eventId: string }>;
}

const EventDetailsContent = async ({
    params,
}: PageProps) => {
    // const { data: session } = authClient.useSession();

    //     const user = session?.user;

    const { eventId } = await params;
    console.log(eventId);

    let event: IEvent;
    try {
        const response = await fetch(`http://localhost:5000/events/${eventId}`,
            {
                cache: "no-store",
            }
        );

        if (response.status === 404) {
            notFound();
        }

        if (!response.ok) {
            throw new Error("Failed to fetch event Detils");
        }

        event = await response.json() as IEvent;
        console.log(event);
    } catch (error) {
        if (error instanceof Error && error.message === "NEXT_HTTP_ERROR_FALLBACK;404") {
            throw error;
        }
        throw new Error("Unable to catch details.")
    }




    return (
        <div>
            <main className="min-h-screen bg-slate-50 px-4 py-10 md:px-8">

                <div className="mx-auto max-w-6xl">


                    {/* Navigation and Action Buttons */}
                    <div className="mb-6 flex flex-wrap items-center justify-between gap-4">

                        {/* Back to Upcoming Events */}
                        <Link
                            href="/upcoming-events"
                            className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-5 py-2.5 text-sm font-semibold text-slate-600 shadow-sm transition-all hover:border-slate-300 hover:bg-slate-100"
                        >
                            <ArrowLeft size={18} />
                            Back to Upcoming Events
                        </Link>

                        {/* Edit and Delete */}
                        <div className="flex flex-wrap items-center gap-3">

                            {/* Edit Event */}
                            <div
                                className="inline-flex items-center gap-2 rounded-xl bg-sky-100 px-5 py-1 text-sm font-semibold text-sky-700 transition-all hover:bg-sky-200"
                            >
                                <Pencil size={16} />
                                <UpdateDialog event={event} />
                            </div>

                            {/* Delete Event */}
                            <DeleteEventPage event={event} />

                        </div>

                    </div>


                    {/* Event Details Card */}
                    <div className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">

                        {/* Event Thumbnail */}
                        <div className="relative h-65 w-full sm:h-95 lg:h-115">

                            <Image
                                src={event.thumbnail}
                                alt={event.title}
                                fill
                                priority
                                sizes="(max-width: 768px) 100vw, 1152px"
                                className="object-cover"
                            />

                            {/* Category Badge */}
                            <div className="absolute bottom-5 left-5">
                                <span className="rounded-full bg-white/95 px-5 py-2 text-sm font-bold text-teal-700 shadow-md backdrop-blur-sm">
                                    {event.eventType}
                                </span>
                            </div>

                            {/* Featured Badge */}
                            {event.featured && (
                                <div className="absolute right-5 top-5">
                                    <span className="rounded-full bg-amber-400 px-4 py-2 text-sm font-bold text-amber-950 shadow-md">
                                        ✨ Featured Event
                                    </span>
                                </div>
                            )}

                        </div>

                        {/* Event Information */}
                        <div className="grid gap-10 p-6 md:p-10 lg:grid-cols-[1fr_320px]">

                            {/* Main Content */}
                            <section>

                                <div className="mb-4 flex items-center gap-2 text-sm font-semibold text-teal-700">
                                    <Tag size={16} />
                                    Community Event
                                </div>

                                <h1 className="text-3xl font-extrabold leading-tight text-slate-900 md:text-4xl">
                                    {event.title}
                                </h1>

                                <p className="mt-6 text-base font-bold text-slate-800">
                                    About This Event
                                </p>

                                <p className="mt-3 whitespace-pre-line text-sm leading-8 text-slate-600 md:text-base">
                                    {event.description}
                                </p>

                                {/* Organizer Information */}
                                <div className="mt-8 rounded-2xl bg-slate-50 p-5">

                                    <h2 className="mb-4 font-bold text-slate-800">
                                        Organizer Information
                                    </h2>

                                    <div className="flex items-center gap-3">
                                        <div className="flex h-11 w-11 items-center justify-center rounded-full bg-sky-100 text-sky-700">
                                            <UserRound size={22} />
                                        </div>

                                        <OrganizerInfo event={event} />
                                        
                                    </div>

                                </div>

                            </section>

                            {/* Event Information Sidebar */}
                            <aside className="h-fit rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">

                                <h2 className="mb-6 text-xl font-bold text-slate-800">
                                    Event Information
                                </h2>

                                {/* Event Date */}
                                <div className="mb-6 flex items-start gap-3">

                                    <div className="rounded-xl bg-sky-100 p-3 text-sky-700">
                                        <CalendarDays size={22} />
                                    </div>

                                    <div>
                                        <p className="text-xs font-medium text-slate-400">
                                            Event Date
                                        </p>

                                        <p className="mt-1 text-sm font-semibold leading-6 text-slate-800">
                                            {new Date(event.eventDate).toLocaleDateString("en-US", {
                                                year: "numeric",
                                                month: "long",
                                                day: "numeric",
                                            })}
                                        </p>
                                    </div>

                                </div>

                                {/* Event Location */}
                                <div className="mb-6 flex items-start gap-3">

                                    <div className="rounded-xl bg-rose-100 p-3 text-rose-600">
                                        <MapPin size={22} />
                                    </div>

                                    <div>
                                        <p className="text-xs font-medium text-slate-400">
                                            Location
                                        </p>

                                        <p className="mt-1 text-sm font-semibold text-slate-800">
                                            {event.location}
                                        </p>
                                    </div>

                                </div>

                                {/* Event Type */}
                                <div className="mb-7 flex items-start gap-3">

                                    <div className="rounded-xl bg-amber-100 p-3 text-amber-700">
                                        <Tag size={22} />
                                    </div>

                                    <div>
                                        <p className="text-xs font-medium text-slate-400">
                                            Event Category
                                        </p>

                                        <p className="mt-1 text-sm font-semibold text-slate-800">
                                            {event.eventType}
                                        </p>
                                    </div>

                                </div>

                                {/* Join event Button */}

                                <JoinedEventPage event={event} />

                                <p className="mt-4 text-center text-xs leading-5 text-slate-400">
                                    Be part of something meaningful. Join this community initiative.
                                </p>

                            </aside>

                        </div>

                    </div>

                </div>

            </main>
        </div>
    );
};

export default function EventDetailPage(props: PageProps) {
    return (
        <Suspense
            fallback={
                <div className="min-h-screen bg-[#f0f5f0] p-10 text-center text-gray-500">
                    Event Detail Loading...
                </div>
            }
        >
            <EventDetailsContent params={props.params} />
        </Suspense>
    );
}
