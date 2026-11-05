
"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { IEvent } from "./updateEvent";
import { Trash2 } from "lucide-react";
import { Button } from "@base-ui/react";
import { authClient } from "@/lib/auth-client";
import toast from "react-hot-toast";

const DeleteEventPage = ({ event }: { event: IEvent }) => {
    const router = useRouter();

    const { data: session } = authClient.useSession();

    const [loading, setLoading] = useState(false);

    // Check whether the logged-in user owns this event
    const isOwner =
        !!session?.user?.email &&
        session.user.email === event?.organizerEmail;

    const handleDelevent = async (id: string) => {

        // Prevent non-owners from deleting
        if (!isOwner) {
            toast.dismiss("You are not authorized to delete this event.");
            return;
        }

        // Prevent multiple delete requests
        if (loading) return;

        const confirmed = window.confirm(
            "Are you sure you want to delete this event?"
        );

        if (!confirmed) return;

        try {
            setLoading(true);

            const res = await fetch(
                `${process.env.NEXT_PUBLIC_API_URL}/events/${id}`,
                {
                    method: "DELETE",
                    headers: {
                        "content-type": "application/json",
                    },
                }
            );

            const afterDel = await res.json();

            console.log("After Delete:", afterDel);

            if (!res.ok) {
                throw new Error(
                    afterDel.message || "Failed to delete event."
                );
            }

            if (afterDel.deletedCount === 1) {
            toast.remove("Event deleted successfully!");

                router.push("/upcoming-events");
                router.refresh();
            } else {
                toast.dismiss("Event was not deleted.");
            }

        } catch (error) {
            console.error("Delete error:", error);

            toast.dismiss(
                error instanceof Error
                    ? error.message
                    : "Something went wrong."
            );

        } finally {
            setLoading(false);
        }
    };

    return (
        <div>
            <Button
                disabled={!isOwner || loading}
                onClick={() => handleDelevent(event._id)}
                className={`inline-flex items-center gap-2 rounded-xl px-5 py-2.5 text-sm font-semibold ${
                    isOwner
                        ? "bg-rose-100 text-rose-600 hover:bg-rose-200"
                        : "cursor-not-allowed bg-gray-100 text-gray-400 opacity-60"
                }`}
            >
                <Trash2 size={16} />
                {loading ? "Deleting..." : "Delete Event"}
            </Button>
        </div>
    );
};

export default DeleteEventPage;