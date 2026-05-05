const TourDetailsSkeleton = () => {
  return (
    <div className="px-4 md:px-16 py-8 animate-pulse">

      {/* Back button */}
      <div className="w-24 h-8 bg-gray-300 rounded mb-6"></div>

      {/* Image */}
      <div className="w-full h-[250px] md:h-[450px] bg-gray-300 rounded-2xl"></div>

      {/* Content */}
      <div className="mt-8 grid md:grid-cols-3 gap-8">

        {/* Left */}
        <div className="md:col-span-2 space-y-4">
          <div className="h-8 bg-gray-300 rounded w-2/3"></div>
          <div className="h-4 bg-gray-300 rounded w-1/3"></div>

          <div className="space-y-2 mt-6">
            <div className="h-4 bg-gray-300 rounded"></div>
            <div className="h-4 bg-gray-300 rounded"></div>
            <div className="h-4 bg-gray-300 rounded w-5/6"></div>
          </div>

          <div className="mt-6 space-y-2">
            <div className="h-5 bg-gray-300 rounded w-1/4"></div>
            <div className="h-4 bg-gray-300 rounded w-1/2"></div>
            <div className="h-4 bg-gray-300 rounded w-1/2"></div>
          </div>
        </div>

        {/* Right (Booking box) */}
        <div className="flex justify-center md:block">
          <div className="w-full max-w-sm bg-gray-200 rounded-2xl p-6 space-y-4">
            <div className="h-4 bg-gray-300 rounded w-1/3"></div>
            <div className="h-8 bg-gray-300 rounded w-1/2"></div>
            <div className="h-10 bg-gray-300 rounded"></div>
            <div className="h-4 bg-gray-300 rounded w-2/3"></div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default TourDetailsSkeleton;