// "use client"
// import { UserRound } from 'lucide-react';

// import { IEvent } from './updateEvent';
// import { authClient } from '@/lib/auth-client';
// // import { useRouter } from 'next/router';

// const JoinedEventPage = ({ event }: { event: IEvent }) => {
//     // const router = useRouter();
//     console.log("from joinedeventPage", event);

//     const { data: session } = authClient.useSession();

//     const user = session?.user;
//     // console.log(user);

//     const handleJoinEvent = async () => {

//         const data = {
//             username: user?.name,
//             email: user?.email,
//             image: user?.image,
//             ...event
//         }
//         try {


//             const response = await fetch("http://localhost:5000/joinedEvents", {
//                 method: "POST",
//                 headers: {
//                     "Content-Type": "application/json",
//                 },
//                 body: JSON.stringify(data),
//             });

//             if (!response.ok) {
//                 throw new Error("Failed to create event.");
//             }

//             alert(" Joined event successfully!");

//             // router.push("/upcoming-events");

//         } catch (err) {

//             console.log(err);


//         }

//     }

//     return (
//         <div>

//             <button
//                 onClick={handleJoinEvent}
//                 type="button"
//                 className="flex w-full items-center justify-center gap-2 rounded-xl border border-slate-200 bg-green-300 px-5 py-3 font-semibold text-slate-700 transition-all hover:border-slate-300 hover:bg-slate-200"
//             >
//                 <UserRound size={19} />
//                 Join Event
//             </button>
//         </div>
//     );
// };

// export default JoinedEventPage;

"use client";

import { UserRound } from "lucide-react";
import { IEvent } from "./updateEvent";
import { authClient } from "@/lib/auth-client";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

const JoinedEventPage = ({ event }: { event: IEvent }) => {

    const router = useRouter();

    const { data: session } = authClient.useSession();

    const user = session?.user;

    const handleJoinEvent = async () => {

        // Check whether user is logged in
        if (!user) {
            alert("Please login first!");
            return;
        }

        // Prepare user and event data
        const data = {
            user: {
                name: user.name,
                email: user.email,
                image: user.image
            },
            event: {
                _id: event._id,
                title: event.title,
                description: event.description,
                eventType: event.eventType,
                thumbnail: event.thumbnail,
                location: event.location,
                eventDate: event.eventDate
            }
        };

        try {
            const response = await fetch(
                "http://localhost:5000/joinedEvents",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify(data)
                }
            );

            const result = await response.json();

            if (!response.ok) {
                throw new Error(
                    result.message || "Failed to join event."
                );
            }

            toast("Joined event successfully!");

            console.log("Joined event:", result);

            router.push("/joined")

        } catch (err) {
            console.error("Join Event Error:", err);

            toast(
                err instanceof Error
                    ? err.message
                    : "Something went wrong."
            );
        }


    };

    return (
        <div>
            <button
                onClick={handleJoinEvent}
                type="button"
                className="flex w-full items-center justify-center gap-2 rounded-xl border border-slate-200 bg-green-300 px-5 py-3 font-semibold text-slate-700 transition-all hover:border-slate-300 hover:bg-slate-200"
            >
                <UserRound size={19} />
                Join Event
            </button>
        </div>
    );
};

export default JoinedEventPage;