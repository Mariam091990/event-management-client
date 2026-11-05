import Banner from "@/components/Homepage/banner";
import DoneNFutureEvents from "./doneNFutureEvents/page";
import Gallery from "@/components/Homepage/gallery";
import Newsletter from "@/components/Homepage/newsletter"
import VolunteerFeatures from "@/components/Homepage/feature";

const HomePage = () => {
  return (
    <div className="my-3">
      <Banner />
      <VolunteerFeatures/>
      <DoneNFutureEvents />
      <Gallery />
      <Newsletter />
    </div>
  );
};

export default HomePage;


//  <Banner />
//       <Features />
//       <RecentUpcomingEvents />
//       <DoneNFutureEvents />
//       <Gallery />
//       <Newsletter />