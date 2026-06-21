import {
  Compass,
  ShieldCheck,
  CreditCard,
  QrCode,
  MapPinned,
  Users,
  Star,
  Plane,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import p2 from "../assets/images/p2.jpg"
import story from "../assets/images/story.png";
const About = () => {

  const navigate = useNavigate();
  const features = [
    {
      icon: <Compass size={40} className="text-orange-500" />,
      title: "Easy Online Booking",
      description:
        "Book your favorite tours anytime, anywhere with just a few clicks.",
    },

    {
      icon: <CreditCard size={40} className="text-green-500" />,
      title: "Secure Payments",
      description:
        "Enjoy safe and convenient payments through KHQR.",
    },

    {
      icon: <QrCode size={40} className="text-blue-500" />,
      title: "QR Check-In",
      description:
        "Fast and hassle-free tour check-in using QR technology.",
    },

    {
      icon: <ShieldCheck size={40} className="text-purple-500" />,
      title: "Trusted Experiences",
      description:
        "Explore Cambodia with confidence through trusted local experiences.",
    },
  ];


  const team = [
    {
      name: "Mr. Dara",
      role: "Tour Operations Manager",
    },

    {
      name: "Kim Hong",
      role: "Customer Support",
    },

    {
      name: "Rathana",
      role: "System Administrator",
    },
  ];

  return (

    <div className="bg-slate-50">

      {/* HERO */}

      <section
        className="
        relative
        h-[500px]
        overflow-hidden
        "
      >

        <img
          src={p2}
          alt=""
          className="
          w-full
          h-full
          object-cover
          "
        />

        <div
          className="
          absolute
          inset-0
          bg-black/50
          flex
          items-center
          justify-center
          "
        >

          <div
            className="
            text-center
            text-white
            px-6
            "
          >

           <h1
              className="
              text-5xl
              md:text-7xl
              font-bold
              mb-6
              "
            >
              More Than A Tour,
              <br />
              It's An Experience
            </h1>

            <p
              className="
              max-w-3xl
              mx-auto
              text-lg
              text-slate-200
              "
            >
              At WanderEscape, we believe travel
              is about creating memories,
              meeting new people and discovering
              places that stay in your heart forever.
            </p>
          </div>

        </div>

      </section>

      {/* OUR STORY */}

      <section className="max-w-7xl mx-auto px-6 py-20">

        <div className="grid md:grid-cols-2 gap-12 items-center">

          <img
            src={story}
            alt=""
            className="
            rounded-3xl
            shadow-xl
            w-full
            h-[500px]
          object-cover
            
            "
          />

          <div>

            <h2
              className="
              text-4xl
              font-bold
              mb-6
              "
            >
              Our Story
            </h2>

            <p className="text-slate-600 leading-8">

              WanderEscape started with a simple idea:
              helping travelers discover the beauty
              of Cambodia in an easy, safe and enjoyable way.

              <br /><br />

              From the ancient temples of Angkor Wat
              to the peaceful beaches of Kep and the
              green mountains of Mondulkiri, Cambodia
              has so much to offer.

              <br /><br />

              Whether you're travelling for adventure,
              culture or relaxation, we're here to help
              you create unforgettable memories.

            </p>

          </div>

        </div>

      </section>

      {/* MISSION & VISION */}

      <section className="bg-orange-50 py-20">

        <div className="max-w-7xl mx-auto px-6">

          <div className="grid md:grid-cols-2 gap-8">

            <div
              className="
              bg-white
              p-8
              rounded-3xl
              shadow
              "
            >

              <h3 className="text-3xl font-bold mb-4">
                Our Mission
              </h3>

              <p className="text-slate-600">
                To make travelling across Cambodia
                simple, affordable and memorable
                for everyone.
              </p>

            </div>

            <div
              className="
              bg-white
              p-8
              rounded-3xl
              shadow
              "
            >

              <h3 className="text-3xl font-bold mb-4">
                Our Vision
              </h3>

              <p className="text-slate-600">
                To become a trusted platform where
                travelers can explore Cambodia
                with confidence and excitement.
              </p>

            </div>

          </div>

        </div>

      </section>

      {/* FEATURES */}

      <section className="max-w-7xl mx-auto px-6 py-20">

        <h2
          className="
          text-4xl
          font-bold
          text-center
          mb-14
          "
        >
          Why Travelers Choose Us
        </h2>

        <div
          className="
          grid
          md:grid-cols-2
          lg:grid-cols-4
          gap-8
          "
        >

          {features.map((feature, index) => (

            <div
              key={index}
              className="
              bg-white
              rounded-3xl
              p-8
              shadow

              hover:-translate-y-2
              hover:shadow-2xl

              transition-all
              duration-500
              "
            >

              {feature.icon}

              <h3
                className="
                text-xl
                font-bold
                mt-5
                "
              >
                {feature.title}
              </h3>

              <p className="text-slate-500 mt-3">
                {feature.description}
              </p>

            </div>

          ))}

        </div>

      </section>

      {/* TEAM */}

      <section className="bg-orange-50 py-20">

        <div className="max-w-6xl mx-auto px-6">

          <h2
            className="
            text-4xl
            font-bold
            text-center
            mb-12
            "
          >
            Meet Our Team
          </h2>

          <div
            className="
            grid
            md:grid-cols-3
            gap-8
            "
          >

            {team.map((member) => (

              <div
                key={member.name}
                className="
                bg-white
                p-8
                rounded-3xl
                text-center
                shadow
                "
              >

                <div
                  className="
                  w-24
                  h-24
                  rounded-full
                  bg-orange-500
                  text-white
                  flex
                  items-center
                  justify-center
                  mx-auto
                  text-3xl
                  font-bold
                  "
                >
                  {member.name.charAt(0)}
                </div>

                <h3
                  className="
                  text-xl
                  font-bold
                  mt-5
                  "
                >
                  {member.name}
                </h3>

                <p className="text-slate-500">
                  {member.role}
                </p>

              </div>

            ))}

          </div>

        </div>

      </section>

      {/* CTA */}

      <section
        className="
        bg-gradient-to-b
        from-sky-500
        to-yellow-200
        py-20
        text-center
        text-white
        "
      >

        <h2
          className="
          text-5xl
          font-bold
          "
        >
          Ready For Your Next Adventure?
        </h2>

        <p
          className="
          mt-5
          text-xl
          "
        >
          Discover Cambodia's most beautiful destinations
          and create memories that last a lifetime.
        </p>

        <button
          onClick={() => navigate("/tours")}
          className="
          mt-8
          bg-white
          text-black
          px-8
          py-4
          rounded-2xl
          font-bold
          hover:scale-105
          transition
          "
        >
          Browse Tours
        </button>

      </section>

    </div>

  );

};

export default About;