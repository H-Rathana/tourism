import TourCard from "./TourCard";

const TourList = ({ tours }) => {
  return (
    <div className="px-6 md:px-16 py-10">
      
      <h2 className="text-2xl md:text-3xl font-bold mb-6 font-serif">
        Welcome to WonderEscape Official
      </h2>
      <p className="font-sans mb-5">JOURNEY CAMBODIA was founded in Siem Reap in early 2016 by Mr. Boret Ream, an experienced tour operator. As a Cambodian-founded company, we understand and respect our local environment along with our cultural heritage in which we are privileged to live in and work. 
      By serving our customers from our hearts, we are now increasing our operation size to 7 dynamic office staffs, 20+ professional English, German, and French-speaking tour guides and 10+ professional full-time drivers. Until today, JOURNEY CAMBODIA has collected almost 10,000 excellent tour reviews from customers on TripAdvisor, Viator, GetYourGuide, Expedia, Google Business, and others and we have also received several awards from those travel platforms. 
      </p>
      <div className="grid gap-6 grid-cols-1 sm:grid-cols-2  lg:grid-cols-4">
        {tours.map((tour) => (
          <TourCard tour={tour} key={tour.tour_id}/>
        ))}
      </div>
    </div>
  );
};

export default TourList;