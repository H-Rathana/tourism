import {
  Phone,
  Mail,
  MapPin,
  Clock,
  HelpCircle,
} from "lucide-react";
import contact from "../assets/images/contact.jpg"
const Contact = () => {

  const handleSubmit = (e) => {

    e.preventDefault();

    alert(
      "Thank you for contacting WanderEscape! We'll get back to you soon."
    );

  };

  return (

    <div className="bg-slate-100 min-h-screen">

      {/* HERO */}

      <section
        className="
        relative
        h-[400px]
        overflow-hidden
        "
      >

        <img
          src={contact}
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
          bg-black/60
          flex
          items-center
          justify-center
          "
        >

          <div className="text-center text-white px-6">

            <h1
              className="
              text-5xl
              md:text-7xl
              font-bold
              "
            >
              Contact Us
            </h1>

            <p
              className="
              mt-4
              text-lg
              max-w-2xl
              "
            >
              Have questions about our tours?
              We're here to help you plan your next adventure.
            </p>

          </div>

        </div>

      </section>

      <div className="max-w-7xl mx-auto px-6 py-16">

        {/* CONTACT INFO */}

        <div
          className="
          grid
          md:grid-cols-2
          lg:grid-cols-4
          gap-6
          mb-16
          "
        >

          <div
            className="
            bg-white
            rounded-3xl
            p-6
            shadow

            hover:-translate-y-2
            hover:shadow-xl

            transition-all
            duration-500
            "
          >

            <Phone
              size={40}
              className="text-orange-500"
            />

            <h3 className="font-bold text-xl mt-4">
              Phone
            </h3>

            <p className="text-slate-500 mt-2">
              +855 889 351 504
            </p>

          </div>

          <div
            className="
            bg-white
            rounded-3xl
            p-6
            shadow

            hover:-translate-y-2
            hover:shadow-xl

            transition-all
            duration-500
            "
          >

            <Mail
              size={40}
              className="text-sky-500"
            />

            <h3 className="font-bold text-xl mt-4">
              Email
            </h3>

            <p className="text-slate-500 mt-2">
              info@wanderescape.com
            </p>

          </div>

          <div
            className="
            bg-white
            rounded-3xl
            p-6
            shadow

            hover:-translate-y-2
            hover:shadow-xl

            transition-all
            duration-500
            "
          >

            <MapPin
              size={40}
              className="text-red-500"
            />

            <h3 className="font-bold text-xl mt-4">
              Address
            </h3>

            <p className="text-slate-500 mt-2">
              Phnom Penh, Cambodia
            </p>

          </div>

          <div
            className="
            bg-white
            rounded-3xl
            p-6
            shadow

            hover:-translate-y-2
            hover:shadow-xl

            transition-all
            duration-500
            "
          >

            <Clock
              size={40}
              className="text-green-500"
            />

            <h3 className="font-bold text-xl mt-4">
              Working Hours
            </h3>

            <p className="text-slate-500 mt-2">
              Mon - Sun
              <br />
              8:00 AM - 8:00 PM
            </p>

          </div>

        </div>

        {/* FORM + HOURS */}

        <div className="grid lg:grid-cols-2 gap-10">

          {/* FORM */}

          <div
            className="
            bg-white
            rounded-3xl
            p-8
            shadow
            "
          >

            <h2
              className="
              text-3xl
              font-bold
              mb-6
              "
            >
              Send Us A Message
            </h2>

            <form
              onSubmit={handleSubmit}
              className="space-y-5"
            >

              <input
                type="text"
                placeholder="Full Name"
                className="
                w-full
                p-4
                border
                rounded-2xl
                "
                required
              />

              <input
                type="email"
                placeholder="Email Address"
                className="
                w-full
                p-4
                border
                rounded-2xl
                "
                required
              />

              <textarea
                rows="5"
                placeholder="Your Message"
                className="
                w-full
                p-4
                border
                rounded-2xl
                "
                required
              />

              <button
                type="submit"
                className="
                w-full
                bg-gradient-to-r
                from-orange-500
                to-yellow-400
                text-white
                py-4
                rounded-2xl
                font-bold

                hover:scale-105

                transition
                "
              >
                Send Message
              </button>

            </form>

          </div>

          {/* BUSINESS INFO */}

          <div
            className="
            bg-white
            rounded-3xl
            p-8
            shadow
            "
          >

            <h2
              className="
              text-3xl
              font-bold
              mb-6
              "
            >
              Visit Our Office
            </h2>

            <div
                className="
                rounded-3xl
                overflow-hidden
                h-[300px]
                shadow
                "
                >

                <iframe
                    title="WanderEscape Location"
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3909.2266700910577!2d104.92211241087351!3d11.535591144684531!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x310950da4db34301%3A0x61232833a62cac36!2sRoyal%20University%20Of%20Law%20And%20Economics!5e0!3m2!1sen!2skh!4v1781187096595!5m2!1sen!2skh"
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    allowFullScreen=""
                    loading="lazy"
                />

                </div>

            <div className="mt-6 space-y-3">

              <p>
                📍 Phnom Penh, Cambodia
              </p>

              <p>
                📞 +855 12 345 678
              </p>

              <p>
                📧 info@wanderescape.com
              </p>

            </div>

          </div>

        </div>

        {/* FAQ */}

        

      </div>

    </div>

  );

};

export default Contact;

