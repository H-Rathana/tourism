const destinations = [
  {
    name: "Siem Reap",
    image:
      "https://angkorwildlife.com/wp-content/uploads/2024/08/12-must-visit-places-to-visit-in-siem-reap-cambodia-1.webp",
  },
  {
    name: "Kampot",
    image:
      "https://d34vm3j4h7f97z.cloudfront.net/original/4X/8/1/e/81e31f6817402c4a711d09891d53515e0ada2571.jpeg",
  },
  {
    name: "Kep",
    image:
      "https://www.bookaway.com/blog/wp-content/uploads/2022/12/kep-beach-1.jpg",
  },
  {
    name: "Sihanouk",
    image:
      "https://images.pexels.com/photos/1379944/pexels-photo-1379944.jpeg?cs=srgb&dl=pexels-vicky-1379944.jpg&fm=jpg",
  },
  {
    name: "Mondulkiri",
    image:
      "https://kampatour.com/pic/blog/images/Mondulkiri-1.jpg",
  },
];

const PopularDestinations = () => {
  return (
    <section className="py-15 bg-gray-100">

      <div className="max-w-7xl mx-auto px-6">

        <h2 className="text-4xl font-bold text-start">
          Popular Destinations
        </h2>

        <p className="text-start text-gray-500 mb-10">
          Explore Cambodia's most beautiful places
        </p>

        <div className="grid md:grid-cols-5 gap-6">

          {destinations.map((item) => (
            <div
              key={item.name}
              className="
              group
              rounded-3xl
              overflow-hidden
              shadow-lg
              cursor-pointer
              "
            >
              <img
                src={item.image}
                alt={item.name}
                className="
                h-64
                w-full
                object-cover
                group-hover:scale-110
                transition
                duration-500
                "
              />

              <div className="p-4 bg-white">
                <h3 className="font-bold text-lg">
                  {item.name}
                </h3>
              </div>

            </div>
          ))}

        </div>

      </div>

    </section>
  );
};

export default PopularDestinations;