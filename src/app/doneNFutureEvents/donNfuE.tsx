import DoneNUpcomingEventsContent from '@/components/Homepage/doneNupcomingEvents';
// import { cacheLife } from 'next/cache';


const DonNfuE = async() => {

//  "use cache";

//     cacheLife("hours");

    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/limit-events`,{
        cache:"no-store",
    });
    const events = await response.json();

    return (
        <div>
            <DoneNUpcomingEventsContent events={events}/>
        </div>
    );
};

export default DonNfuE;