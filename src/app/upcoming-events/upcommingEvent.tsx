

import UpcomingEventsContent from '@/components/Homepage/upcomingEventsContent';





const UpcommingEventsPage = async () => {
    // "use cache";

    // cacheLife("hours");
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/events`,{
        cache: "no-store",
    });
    const data = await response.json();

    return (

        <div id='allEvents'>

            <UpcomingEventsContent events={data} />
        </div>


    );
};

export default UpcommingEventsPage;