"use client"

import { authClient } from '@/lib/auth-client';
import { IEvent } from '../updateEvent';

const OrganizerInfo = ({event}:{event:IEvent}) => {

const { data: session } = authClient.useSession();

    const user = session?.user;

    return (
        <div>
            <div className='border p-3 bg-amber-50 shadow' >
                <h1>Organized by-</h1>
                                            <p className="text-sm font-semibold text-slate-800">
                                               {event.organizerName||user?.name}
                                            </p>

                                            <p className="text-sm text-slate-500">
                                                {event.organizerEmail|| user?.email || "Organizer information unavailable"}
                                            </p>
                                        </div>
        </div>
    );
};

export default OrganizerInfo;