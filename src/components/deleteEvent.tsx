"use client"
import { redirect, useRouter } from "next/navigation";
import { IEvent } from './updateEvent';

import { Trash2 } from "lucide-react";
import { Button } from '@base-ui/react';



const DeleteEventPage = ({ event }: { event: IEvent }) => {
    console.log(event);

    const router = useRouter();

    const handleDelevent = async (id: string) => {

        const res = await fetch(`http://localhost:5000/events/${id}`, {
            method: 'DELETE',
            headers: {
                'content-type': 'application/json'
            },



        })

        const afterDel = await res.json();
        console.log("After Delete", afterDel);

        if (res.ok && afterDel.deletedCount === 1) {
            //    this does not work for client this is for server components.
            // revalidatePath('/users');
            alert("User deleted successfully!");
            router.refresh();
            redirect("/upcoming-events");


        }


    }

    return (
        <div>
            <Button onClick={() => handleDelevent(event._id)}


                className="inline-flex items-center gap-2 rounded-xl bg-rose-100 px-5 py-2.5 text-sm font-semibold text-rose-600 opacity-70"
            >
                <Trash2 size={16} />
                Delete Event
            </Button>
        </div>
    );
};

export default DeleteEventPage;