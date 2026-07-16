import {
  ShieldCheck,
  MapPinned,
  DollarSign,
  Star,
  ArrowRight,
} from "lucide-react";

import { useNavigate } from "react-router-dom";
const features = [
  {
    title: "Secure Booking",
    description:
      "Book confidently with protected payments, instant confirmation, and secure QR e-Tickets.",
    icon: ShieldCheck,
    color: "from-sky-500 to-cyan-500",
  },
  {
    title: "Local Travel Experts",
    description:
      "Discover Cambodia with experienced local guides and carefully selected destinations.",
    icon: MapPinned,
    color: "from-green-500 to-emerald-500",
  },
  {
    title: "Best Price Guarantee",
    description:
      "Enjoy affordable travel packages with transparent pricing and no hidden fees.",
    icon: DollarSign,
    color: "from-orange-500 to-amber-500",
  },
  {
    title: "Trusted by Travelers",
    description:
      "Highly rated experiences with genuine reviews from satisfied travelers.",
    icon: Star,
    color: "from-yellow-500 to-orange-500",
  },
];


const WhyChooseUs = () => {
  const navigate = useNavigate();
  return (
    <section className="py-24 bg-gradient-to-b from-slate-50 to-white">

      <div className="max-w-7xl mx-auto px-6">

        {/* Heading */}

        <div className="text-center mb-16" >

          <span className="text-sky-600 font-semibold uppercase tracking-widest">
            Why WanderEscape
          </span>

          <h2 className="text-4xl md:text-5xl font-bold mt-3">
            Why Choose Us?
          </h2>

          <p className="max-w-2xl mx-auto mt-5 text-slate-500 text-lg">
            We make discovering Cambodia easier, safer, and more enjoyable with
            modern booking technology and trusted travel experiences.
          </p>

        </div>

        {/* Cards */}

        <div className="grid md:grid-cols-2 xl:grid-cols-4 gap-8" data-aos="zoom-in-up"
          data-aos-delay="{index*100}">

          {features.map((item) => {

            const Icon = item.icon;

            return (

              <div
                key={item.title}
                className="
                group
                bg-white
                rounded-3xl
                p-8
                shadow-lg
                hover:shadow-2xl
                hover:-translate-y-3
                transition-all
                duration-500
                border
                border-slate-100
                "
                
              >

                {/* Icon */}

                <div

                  className={`
                  w-16
                  h-16
                  rounded-2xl
                  bg-gradient-to-r
                  ${item.color}
                  flex
                  items-center
                  justify-center
                  shadow-lg
                  group-hover:scale-110
                  transition
                  duration-500
                  `}
                  
                >

                  <Icon
                    size={30}
                    className="text-white"
                  />

                </div>

                {/* Title */}

                <h3 className="text-xl font-bold mt-7"data-aos="fade-up">
                  {item.title}
                </h3>

                {/* Description */}

                <p className="text-slate-500 mt-4 leading-7">
                  {item.description}
                </p>

                {/* Footer */}

                <div
                onClick={() =>
                navigate("/about-us")
              }
                  className="
                  mt-8
                  flex
                  items-center
                  text-sky-600
                  font-semibold
                  gap-2
                  group-hover:gap-4
                  transition-all
                  "
                >

                  Learn More

                  <ArrowRight size={18} />

                </div>

              </div>

            );

          })}

        </div>

      </div>

    </section>
  );
};

export default WhyChooseUs;