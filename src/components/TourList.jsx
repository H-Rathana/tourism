import TourCard from "./TourCard";

const TourList = ({ tours }) => {
  return (
    <div className="px-6 md:px-16 py-10">
      
      <h2 className="text-2xl md:text-3xl font-bold mb-6">
        Popular Tours
      </h2>

      <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
        {tours.map((tour) => (
          <TourCard key={tour.id} tour={tour} />
        ))}
      </div>
    </div>
  );
};

export default TourList;