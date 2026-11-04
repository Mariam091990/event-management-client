

import UpcomingEventsContent from '@/components/Homepage/upcomingEventsContent';
import { cacheLife } from "next/cache"




const UpcommingEventsPage = async () => {
    "use cache";

    cacheLife("hours");
    const response = await fetch("http://localhost:5000/events");
    const data = await response.json();

    return (

        <div id='allEvents'>

            <UpcomingEventsContent events={data} />
        </div>


    );
};

export default UpcommingEventsPage;