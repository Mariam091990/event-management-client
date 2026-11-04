

import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { Suspense } from "react";

import JoinedEventCard, {
    type IJoinedEvent,
} from "@/components/joinedEvents/joinedEventsCard";

const JoinedEventsContent = async () => {

    // 1. Get the logged-in user's session
    const session = await auth.api.getSession({
        headers: await headers(),
    });

    const user = session?.user;

    // 2. Check authentication
    if (!user) {
        redirect("/login");
    }

    // 3. Fetch events joined by this user
    const res = await fetch(
        `http://localhost:5000/joinedEvents/${encodeURIComponent(user.email)}`,
        {
            cache: "no-store",
        }
    );

    if (!res.ok) {
        throw new Error("Failed to fetch joined events.");
    }

    const joined: IJoinedEvent[] = await res.json();

    console.log("Joined events:", joined);

    return (
        <main className="min-h-screen bg-linear-to-br from-emerald-50 via-white to-teal-50 px-5 py-12">

            <div className="mx-auto max-w-7xl">

                {/* Page Heading */}
                <div className="mb-10 text-center">

                    <span className="inline-block rounded-full bg-emerald-100 px-4 py-2 text-sm font-semibold text-emerald-700">
                        Your Community Journey
                    </span>

                    <h1 className="mt-4 text-3xl font-bold text-gray-800 md:text-4xl">
                        My Joined Events
                    </h1>

                    <p className="mx-auto mt-3 max-w-xl text-gray-500">
                        Explore the events you have joined and continue
                        making a positive difference in your community.
                    </p>

                </div>

                {/* Joined Event Count */}
                <div className="mb-7 flex items-center justify-between">

                    <h2 className="text-xl font-bold text-gray-800">
                        Your Events
                    </h2>

                    <span className="rounded-full bg-emerald-100 px-4 py-2 text-sm font-semibold text-emerald-700">
                        {joined.length} Events Joined
                    </span>

                </div>

                {/* Event Cards */}
                {joined.length > 0 ? (

                    <div className="grid grid-cols-1 gap-7 sm:grid-cols-2 lg:grid-cols-3">

                        {joined.map((event) => (
                            <JoinedEventCard
                                key={event._id}
                                event={event}
                            />
                        ))}

                    </div>

                ) : (

                    <div className="rounded-2xl border border-dashed border-emerald-200 bg-white px-6 py-16 text-center">

                        <h2 className="text-xl font-bold text-gray-700">
                            No Joined Events Yet!
                        </h2>

                        <p className="mt-3 text-gray-500">
                            You haven&apos;t joined any community events yet.
                            Discover an event and become part of something meaningful.
                        </p>

                    </div>

                )}

            </div>

        </main>
    );
};


// Main Server Component
const MyJoiningEventPage = () => {
    return (
        <Suspense
            fallback={
                <div className="flex min-h-screen items-center justify-center bg-emerald-50">
                    <p className="text-lg font-semibold text-emerald-700">
                        Loading your joined events...
                    </p>
                </div>
            }
        >
            <JoinedEventsContent />
        </Suspense>
    );
};

export default MyJoiningEventPage;
