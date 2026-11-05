import JoinedByMannyCard from "@/components/joinedByMannyCard";

import { Suspense } from "react";



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



const JoinedByManny = async () => {



    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/joinedEvents`, {
        cache: "no-store",
    });
    const events: IEvent[] = await response.json();

// Ascending order: earliest event date first
    const sortedEvents = [...events].sort(
        (a, b) =>
            new Date(a.eventDate).getTime() -
            new Date(b.eventDate).getTime()
    );

    return (

        <div className=" mt-10 mb-10 text-center">
            <h1 className="text-3xl font-bold tracking-tight text-gray-800 md:text-4xl">
                Together We Make a Difference <span className="text-green-600">🌱</span>
            </h1>
            <p className="mx-auto mt-3 max-w-2xl text-sm leading-7 text-gray-500 md:text-base">
                Celebrating every volunteer, every small act of kindness, and every step toward a better world.
            </p>
            <div className="mx-auto mt-5 h-1 w-20 rounded-full bg-green-500"></div>




            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3  min-w-3/5 container mx-auto">
                {sortedEvents.map((event) => (
                    <JoinedByMannyCard key={event._id} event={event} />
                ))}
            </div>
        </div>

    );
};




export default function JoinedByall() {
    return (
        <Suspense
            fallback={
                <main className="min-h-screen bg-[#f2f7f2] px-4 py-10">
                    <div className="mx-auto max-w-7xl">
                        <p className="text-center text-gray-500">
                            Joined Events are Loading ...
                        </p>
                    </div>
                </main>
            }
        >
            <JoinedByManny />

        </Suspense>
    );
}