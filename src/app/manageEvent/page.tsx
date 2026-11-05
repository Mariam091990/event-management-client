

import ManagedEventCard, { IManageEvent } from "@/components/managedEvent/managedEventCard";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { Suspense } from "react";



const ManageEventsContent = async () => {

    // 1. Get the logged-in user's session
    const session = await auth.api.getSession({
        headers: await headers(),
    });

    const user = session?.user;

    // 2. Check authentication
    if (!user) {
        redirect("/login");
    }

    // 3. Fetch events managed by this user
    const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/events/organizer/${encodeURIComponent(user.email)}`,
        {
            cache: "no-store",
        }
    );

    if (!res.ok) {
        throw new Error("Failed to fetch created events.");
    }

    const managed: IManageEvent[] = await res.json();

    console.log(" managed events:", managed);

    return (
        <main className="min-h-screen bg-linear-to-br from-emerald-50 via-white to-teal-50 px-5 py-12">

            <div className="mx-auto max-w-7xl">

                {/* Page Heading */}
                <div className="mb-10 text-center">

                    <span className="inline-block rounded-full bg-emerald-100 px-4 py-2 text-sm font-semibold text-emerald-700">
                        Your Community Journey
                    </span>

                    <h1 className="mt-4 text-3xl font-bold text-gray-800 md:text-4xl">
                        My created Events
                    </h1>

                    <p className="mx-auto mt-3 max-w-xl text-gray-500">
                        Explore the events you have created and continue
                        making a positive difference in your community.
                    </p>

                </div>

                {/* created Event Count */}
                <div className="mb-7 flex items-center justify-between">

                    <h2 className="text-xl font-bold text-gray-800">
                        Your Events
                    </h2>

                    <span className="rounded-full bg-emerald-100 px-4 py-2 text-sm font-semibold text-emerald-700">
                        {managed.length} Events created
                    </span>

                </div>

                {/* Event Cards */}
                {managed.length > 0 ? (

                    <div className="grid grid-cols-1 gap-7 sm:grid-cols-2 lg:grid-cols-3">

                        {managed.map((event) => (
                            <ManagedEventCard
                                key={event._id}
                                event={event}
                            />
                        ))}

                    </div>

                ) : (

                    <div className="rounded-2xl border border-dashed border-emerald-200 bg-white px-6 py-16 text-center">

                        <h2 className="text-xl font-bold text-gray-700">
                            No Event created Yet!
                        </h2>

                        <p className="mt-3 text-gray-500">
                            You haven&apos;t created any community events yet.
                            Discover an event and become part of something meaningful.
                        </p>

                    </div>

                )}

            </div>

        </main>
    );
};


// Main Server Component
const MyManageEventPage = () => {
    return (
        <Suspense
            fallback={
                <div className="flex min-h-screen items-center justify-center bg-emerald-50">
                    <p className="text-lg font-semibold text-emerald-700">
                        Loading your created events...
                    </p>
                </div>
            }
        >
            <ManageEventsContent />
        </Suspense>
    );
};

export default MyManageEventPage;
