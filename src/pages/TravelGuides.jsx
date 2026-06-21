import {
  Sun,
  Bus,
  Wallet,
  Shield,
  ChevronRight,
  Utensils,
  HelpCircle,
} from "lucide-react";
import amok from "../assets/images/amok.jpg";
import beefloklak from "../assets/images/beefloklak.jpg";
import curry from "../assets/images/curry.jpg";
import numbanhchok from "../assets/images/numbanhchok.jpg";
import p1 from "../assets/images/p1.jpg"

const TravelGuides = () => {

  const guides = [
    {
      icon: <Sun size={40} className="text-orange-500" />,
      title: "Best Time To Visit",
      description:
        "The best months to visit Cambodia are November to February when the weather is cooler and drier.",
    },

    {
      icon: <Bus size={40} className="text-sky-500" />,
      title: "Transportation",
      description:
        "Travel by bus, tuk-tuk, taxi, train and domestic flights throughout Cambodia.",
    },

    {
      icon: <Wallet size={40} className="text-green-500" />,
      title: "Currency",
      description:
        "US Dollars and Cambodian Riel are accepted in most places across the country.",
    },

    {
      icon: <Shield size={40} className="text-indigo-500" />,
      title: "Safety Tips",
      description:
        "Keep belongings secure and use trusted transportation services.",
    },
  ];

  const foods = [
    {
      name: "Fish Amok",
      image: amok,
    },

    {
      name: "Beef Lok Lak",
      image:beefloklak,
    },

    {
      name: "Khmer Curry",
      image:curry,
    },

    {
      name: "Nom Banh Chok",
      image:numbanhchok,
    },
  ];

  const faqs = [
    {
      question: "How do I book a tour?",
      answer:
        "Choose your preferred tour and complete the booking form.",
    },

    {
      question: "Can I cancel a booking?",
      answer:
        "Please contact support before your travel date.",
    },

    {
      question: "How do I pay?",
      answer:
        "Payments are securely processed using KHQR.",
    },

    {
      question: "How does QR Check-In work?",
      answer:
        "Present your ticket QR code when arriving at your tour destination.",
    },
  ];

  return (

    <div className="bg-gray-100 min-h-screen">

      <div className="max-w-7xl mx-auto px-6 py-12">

        {/* HERO */}

        <section
          className="
          relative
          h-[450px]
          rounded-3xl
          overflow-hidden
          mb-16
          "
        >

          <img
            src={p1}
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

            <div className="text-center text-white">

              <h1
                className="
                text-5xl
                md:text-6xl
                font-bold
                "
              >
                Travel Cambodia
              </h1>

              <p
                className="
                mt-4
                text-lg
                max-w-2xl
                "
              >
                Discover useful travel information,
                local culture and essential tips
                before your next adventure.
              </p>

            </div>

          </div>

        </section>

        {/* TITLE */}

        <div className="mb-10">

          <h2 className="text-4xl font-bold">
            Essential Travel Information
          </h2>

          <p className="text-slate-500 mt-2">
            Everything you should know before travelling.
          </p>

        </div>

        {/* GUIDE CARDS */}

        <div
          className="
          grid
          md:grid-cols-2
          lg:grid-cols-4
          gap-6
          mb-20
          "
        >

          {guides.map((guide, index) => (

            <div
              key={index}
              className="
              bg-white
              rounded-3xl
              p-6
              shadow

              transition-all
              duration-500

              hover:-translate-y-2
              hover:shadow-2xl
              "
            >

              {guide.icon}

              <h3
                className="
                text-xl
                font-bold
                mt-4
                "
              >
                {guide.title}
              </h3>

              <p
                className="
                text-slate-500
                mt-3
                "
              >
                {guide.description}
              </p>

            </div>

          ))}

        </div>

        {/* FOOD GUIDE */}

        <div className="mb-10">

          <h2 className="text-4xl font-bold">
            Cambodian Food Guide
          </h2>

          <p className="text-slate-500 mt-2">
            Must-try dishes during your journey.
          </p>

        </div>

        <div
          className="
          grid
          md:grid-cols-2
          lg:grid-cols-4
          gap-6
          mb-20
          "
        >

          {foods.map((food) => (

            <div
              key={food.name}
              className="
              bg-white
              rounded-3xl
              overflow-hidden
              shadow

              transition-all
              duration-500

              hover:-translate-y-2
              hover:shadow-2xl
              "
            >

              <img
                src={food.image}
                alt={food.name}
                className="
                h-52
                w-full
                object-cover
                "
              />

              <div className="p-5">

                <h3
                  className="
                  text-xl
                  font-bold
                  flex
                  items-center
                  gap-2
                  "
                >
                  <Utensils size={18} />
                  {food.name}
                </h3>

              </div>

            </div>

          ))}

        </div>

        {/* TRAVEL TIPS */}

        <div
          className="
          bg-gradient-to-r
          from-orange-500
          to-yellow-400
          rounded-3xl
          p-10
          text-white
          mb-20
          "
        >

          <h2 className="text-4xl font-bold mb-6">
            Travel Tips
          </h2>

          <div className="space-y-4">

            <div className="flex gap-3">
              <ChevronRight />
              Carry cash for small local shops.
            </div>

            <div className="flex gap-3">
              <ChevronRight />
              Stay hydrated during hot seasons.
            </div>

            <div className="flex gap-3">
              <ChevronRight />
              Dress respectfully when visiting temples.
            </div>

            <div className="flex gap-3">
              <ChevronRight />
              Keep a copy of important documents.
            </div>

          </div>

        </div>

        {/* FAQ */}

        <div className="mb-10">

          <h2 className="text-4xl font-bold">
            Frequently Asked Questions
          </h2>

        </div>

        <div className="space-y-5">

          {faqs.map((faq, index) => (

            <div
              key={index}
              className="
              bg-white
              rounded-2xl
              p-6
              shadow
              "
            >

              <h3
                className="
                font-bold
                text-lg
                flex
                items-center
                gap-2
                "
              >
                <HelpCircle size={20} />
                {faq.question}
              </h3>

              <p
                className="
                text-slate-500
                mt-3
                "
              >
                {faq.answer}
              </p>

            </div>

          ))}

        </div>

      </div>

    </div>

  );

};

export default TravelGuides;