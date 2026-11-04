"use client"

import { authClient } from '@/lib/auth-client';
import { IEvent } from '../updateEvent';

const OrganizerInfo = ({event}:{event:IEvent}) => {

const { data: session } = authClient.useSession();

    const user = session?.user;

    return (
        <div>
            <div>
                                            <p className="text-sm font-semibold text-slate-800">
                                                Event Organizer
                                            </p>

                                            <p className="text-sm text-slate-500">
                                                {event.organizerEmail|| user?.email || "Organizer information unavailable"}
                                            </p>
                                        </div>
        </div>
    );
};

export default OrganizerInfo;