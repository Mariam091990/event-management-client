import Banner from "@/components/Homepage/banner";
import DoneNFutureEvents from "./doneNFutureEvents/page";
import Gallery from "@/components/Homepage/gallery";
import Newsletter from "@/components/Homepage/newsletter"

const HomePage = () => {
  return (
    <div className="my-3">
      <Banner />
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