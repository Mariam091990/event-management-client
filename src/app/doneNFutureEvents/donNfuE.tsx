import DoneNUpcomingEventsContent from '@/components/Homepage/doneNupcomingEvents';
import { cacheLife } from 'next/cache';


const DonNfuE = async() => {

 "use cache";

    cacheLife("hours");
    const response = await fetch("http://localhost:5000/allEvents");
    const events = await response.json();

    return (
        <div>
            <DoneNUpcomingEventsContent events={events}/>
        </div>
    );
};

export default DonNfuE;