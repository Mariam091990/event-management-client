
"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";

import { Field, FieldGroup } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

 export interface IEvent {
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

const eventTypes = [
    "Health Camp",
    "Cleanup",
    "Plantation",
    "Donation",
    "Food Distribution",
    "Community Support",
    "Other",
];

const UpdateDialog = ({ event }: { event: IEvent }) => {

    const router = useRouter();

    const [open, setOpen] = useState(false);
    const [loading, setLoading] = useState(false);

    const getTomorrowDate = () => {
        const tomorrow = new Date();
        tomorrow.setDate(tomorrow.getDate() + 1);

        return [
            tomorrow.getFullYear(),
            String(tomorrow.getMonth() + 1).padStart(2, "0"),
            String(tomorrow.getDate()).padStart(2, "0"),
        ].join("-");
    };

    // const handleUpdateEvent = async (
    //     e: React.SubmitEvent<HTMLFormElement>
    // ) =>
    //     {
    //     e.preventDefault();

    //     const formData = new FormData(e.currentTarget);

    //     const updateEvent = Object.fromEntries(
    //         formData.entries()
    //     );

    //     // Validate future date
    //     if (String(updateEvent.eventDate) < getTomorrowDate()) {
    //         alert("Please select a future event date.");
    //         return;
    //     }

    //     try {
    //         setLoading(true);

    //         const res = await fetch(
    //             `http://localhost:5000/events/${event._id}`,
    //             {
    //                 method: 'PATCH',
    //                 headers: {
    //                     "Content-Type": "application/json",
    //                 },
    //                 body: JSON.stringify(updateEvent),
    //             }
    //         );

    //         const result = await res.json();
    //         console.log('result from server', result);


    //         if (!res.ok) {
    //             throw new Error(result.message || "Failed to update event.");
    //         }

    //         // Support either Express MongoDB result or a success response
    //         if (
    //             result.success ||
    //             result.modifiedCount === 1 ||
    //             result.matchedCount === 1
    //         ) {
    //             alert("Event updated successfully!");

    //             setOpen(false);
    //             router.refresh();
    //         } else {
    //             alert("No event was updated.");
    //         }

    //     } catch (error) {
    //         console.error("Update error:", error);

    //         alert(
    //             error instanceof Error
    //                 ? error.message
    //                 : "Something went wrong."
    //         );

    //     } finally {
    //         setLoading(false);
    //     }

    // };


    const handleUpdateEvent = async (
        e: React.SubmitEvent<HTMLFormElement>
    ) => {
        e.preventDefault();

        const formData = new FormData(e.currentTarget);

        const updateEvent = Object.fromEntries(
            formData.entries()
        );

        // Check submitted form data
        console.log("Form data being submitted:", updateEvent);

        // Validate future date
        if (String(updateEvent.eventDate) < getTomorrowDate()) {
            alert("Please select a future event date.");
            return;
        }

        try {
            setLoading(true);

            const res = await fetch(
                `http://localhost:5000/events/${event._id}`,
                {
                    method: "PATCH",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(updateEvent),
                }
            );

            const result = await res.json();

            console.log("Result from server:", result);

            if (!res.ok) {
                throw new Error(
                    result.message || "Failed to update event."
                );
            }

            if (result.matchedCount === 1) {
                if (result.modifiedCount === 1) {
                    alert("Event updated successfully!");
                } else {
                    alert("No changes detected. Your event is already up to date.");
                }

                setOpen(false);
                router.refresh();

            } else {
                alert("Event not found. No event was updated.");
            }

        } catch (error) {
            console.error("Update error:", error);

            alert(
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
            <Dialog open={open} onOpenChange={setOpen}>

                {/* Edit Button */}
                <DialogTrigger
                    render={<Button variant="outline">Edit Event</Button>}
                />

                <DialogContent className="max-h-[90vh] overflow-y-auto sm:max-w-lg">

                    <DialogHeader>
                        <DialogTitle className="text-xl font-bold">
                            Update Event Information
                        </DialogTitle>

                        <DialogDescription>
                            Update your event details below and save your changes.
                        </DialogDescription>
                    </DialogHeader>

                    <form onSubmit={handleUpdateEvent}>

                        <FieldGroup className="gap-4">

                            {/* Event Title */}
                            <Field>
                                <Label htmlFor="title">Event Title</Label>

                                <Input
                                    id="title"
                                    name="title"
                                    defaultValue={event.title}
                                    placeholder="Enter event title"
                                    required
                                />
                            </Field>

                            {/* Event Type */}
                            <Field>
                                <Label htmlFor="eventType">Event Type</Label>

                                <select
                                    id="eventType"
                                    name="eventType"
                                    defaultValue={event.eventType}
                                    required
                                    className="h-10 w-full rounded-md border border-input bg-background px-3 text-sm outline-none focus:ring-2 focus:ring-ring"
                                >
                                    <option value="" disabled>
                                        Select event type
                                    </option>

                                    {eventTypes.map((type) => (
                                        <option key={type} value={type}>
                                            {type}
                                        </option>
                                    ))}
                                </select>
                            </Field>

                            {/* Event Date */}
                            <Field>
                                <Label htmlFor="eventDate">Event Date</Label>

                                <Input
                                    id="eventDate"
                                    name="eventDate"
                                    type="date"
                                    defaultValue={event.eventDate}
                                    onFocus={(e) => {
                                        e.currentTarget.min = getTomorrowDate();
                                    }}
                                    required
                                />
                            </Field>

                            {/* Location */}
                            <Field>
                                <Label htmlFor="location">Location</Label>

                                <Input
                                    id="location"
                                    name="location"
                                    defaultValue={event.location}
                                    placeholder="Enter event location"
                                    required
                                />
                            </Field>

                            {/* Thumbnail URL */}
                            <Field>
                                <Label htmlFor="thumbnail">
                                    Thumbnail Image URL
                                </Label>

                                <Input
                                    id="thumbnail"
                                    name="thumbnail"
                                    type="url"
                                    defaultValue={event.thumbnail}
                                    placeholder="Enter image URL"
                                    required
                                />
                            </Field>

                            {/* Description */}
                            <Field>
                                <Label htmlFor="description">
                                    Event Description
                                </Label>

                                <Textarea
                                    id="description"
                                    name="description"
                                    defaultValue={event.description}
                                    placeholder="Describe your event..."
                                    className="min-h-28"
                                    required
                                />
                            </Field>

                        </FieldGroup>

                        {/* Modal Footer */}
                        <DialogFooter className="mt-6">

                            <DialogClose
                                render={
                                    <Button type="button" variant="outline">
                                        Cancel
                                    </Button>
                                }
                            />

                            <Button type="submit" disabled={loading}>
                                {loading ? "Updating..." : "Save Changes"}
                            </Button>

                        </DialogFooter>

                    </form>

                </DialogContent>

            </Dialog>
        </div>
    );
};

export default UpdateDialog;
