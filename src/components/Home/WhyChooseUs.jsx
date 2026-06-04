import {
  ShieldCheck,
  MapPinned,
  DollarSign,
  Star,
} from "lucide-react";

const features = [
  {
    title: "Secure Booking",
    icon: ShieldCheck,
  },
  {
    title: "Local Experts",
    icon: MapPinned,
  },
  {
    title: "Best Prices",
    icon: DollarSign,
  },
  {
    title: "Top Rated",
    icon: Star,
  },
];

const WhyChooseUs = () => {
  return (
    <section className="py-20 bg-gray-100">

      <div className="max-w-6xl mx-auto px-6">

        <h2 className="text-4xl font-bold text-center mb-10">
          Why Choose Us
        </h2>

        <div className="grid md:grid-cols-4 gap-6">

          {features.map((item) => {

            const Icon = item.icon;

            return (
              <div
                key={item.title}
                className="
                bg-white
                p-8
                rounded-3xl
                shadow
                text-center
                "
              >
                <Icon
                  size={50}
                  className="
                  mx-auto
                  text-sky-600
                  mb-4
                  "
                />

                <h3 className="font-bold">
                  {item.title}
                </h3>

              </div>
            );
          })}
        </div>

      </div>

    </section>
  );
};

export default WhyChooseUs;