import TourCard from "./TourCard";

const TourList = ({ tours }) => {
  return (
    <div className="px-6 md:px-16 py-10">
      
      <div className="grid
                      grid-cols-1
                      sm:grid-cols-2
                      xl:grid-cols-3
                      gap-8">
        {tours.map((tour) => (
          <TourCard tour={tour} key={tour.tour_id}/>
        ))}
      </div>
    </div>
  );
};

export default TourList;