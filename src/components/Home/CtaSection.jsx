import { useNavigate } from "react-router-dom";
import { ArrowRight } from "lucide-react";

const CtaSection = () => {

  const navigate = useNavigate();

  return (

    <section
      className="
      relative
      h-[500px]
      flex
      items-center
      justify-center
      "
    >

      {/* Background Image */}
      <img
        src="https://i.pinimg.com/1200x/d0/3f/c5/d03fc55d02ec00d746bb0880c2b57047.jpg"
        alt="Travel"
        className="
        absolute
        inset-0
        w-full
        h-full
        object-cover
        "
      />

      {/* Dark Overlay */}
      <div
        className="
        absolute
        inset-0
        bg-black/50
        "
      />

      {/* Content */}
      <div
        className="
        relative
        z-10
        text-center
        text-white
        max-w-3xl
        px-6
        "
      >

        <h2
          className="
          text-4xl
          md:text-6xl
          font-bold
          mb-6
          "
        >
          Ready For Your Next Adventure?
        </h2>

        <p
          className="
          text-lg
          md:text-xl
          text-slate-200
          mb-8
          "
        >
          Explore Cambodia's most breathtaking
          destinations and create unforgettable
          memories with WanderEscape.
        </p>

        <button
          onClick={() => navigate("/tours")}
          className="
          inline-flex
          items-center
          gap-2
          bg-orange-500
          hover:bg-orange-600
          px-8
          py-4
          rounded-2xl
          text-lg
          font-semibold
          transition
          "
        >
          Explore Tours
          <ArrowRight size={20} />
        </button>

      </div>

    </section>

  );
};

export default CtaSection;