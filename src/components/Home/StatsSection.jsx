const StatsSection = () => {
  return (
    <section className="py-20 bg-sky-500 text-white">

      <div className="max-w-6xl mx-auto">

        <div className="grid md:grid-cols-4 text-center">

          <div>
            <h2 className="text-5xl font-bold">
              500+
            </h2>
            <p>Bookings</p>
          </div>

          <div>
            <h2 className="text-5xl font-bold">
              100+
            </h2>
            <p>Tours</p>
          </div>

          <div>
            <h2 className="text-5xl font-bold">
              25+
            </h2>
            <p>Destinations</p>
          </div>

          <div>
            <h2 className="text-5xl font-bold">
              98%
            </h2>
            <p>Happy Customers</p>
          </div>

        </div>

      </div>

    </section>
  );
};

export default StatsSection;