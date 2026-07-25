import { useEffect, useState } from "react";
import { Star } from "lucide-react";

import {
  getHomeReviews,
} from "../../services/api";

const Testimonials = () => {

  const [reviews, setReviews] =
    useState([]);

  const [loading, setLoading] =
    useState(true);

  useEffect(() => {

    const fetchReviews = async () => {

      try {

        const data =
          await getHomeReviews();

        setReviews(data);

      } catch (err) {

        console.log(err);

      } finally {

        setLoading(false);

      }

    };

    fetchReviews();

  }, []);

  return (

    <section className="py-24 bg-slate-50">

      <div className="max-w-7xl mx-auto px-6">

        <div className="text-center mb-14">

          <p
            className="
            uppercase
            tracking-[4px]
            text-orange-500
            font-semibold
            "
          >
            Testimonials
          </p>

          <h2
            className="
            text-5xl
            font-black
            text-slate-900
            mt-3
            "
          >
            What Our Travelers Say
          </h2>

          <p
            className="
            text-slate-500
            mt-4
            max-w-2xl
            mx-auto
            "
          >
            Real experiences shared by travelers
            who explored Cambodia with
            WanderEscape.
          </p>

        </div>

        {loading ? (

          <div className="text-center">

            Loading Reviews...

          </div>

        ) : (

          <div
            className="
            grid
            md:grid-cols-2
            xl:grid-cols-3
            gap-8
            "
          >

            {reviews.map((review) => (

              <div
                key={review.review_id}
                className="
                bg-white
                rounded-3xl
                p-8
                shadow-md
                hover:shadow-xl
                transition
                duration-300
                "
              >

                {/* Stars */}

                <div className="flex mb-5">

                  {[...Array(review.rating)].map((_, i) => (

                    <Star
                      key={i}
                      size={18}
                      className="
                      text-yellow-400
                      fill-yellow-400
                      "
                    />

                  ))}

                </div>

                {/* Comment */}

                <p
                  className="
                  text-slate-600
                  italic
                  leading-8
                  "
                >
                  "{review.comment}"
                </p>

                {/* User */}

                <div
                  className="
                  flex
                  items-center
                  gap-4
                  mt-8
                  "
                >

                  <div
                    className="
                    w-14
                    h-14
                    rounded-full
                    bg-orange-500
                    text-white
                    flex
                    items-center
                    justify-center
                    text-xl
                    font-bold
                    "
                  >

                    {review.name.charAt(0).toUpperCase()}

                  </div>

                  <div>

                    <h3
                      className="
                      font-bold
                      text-slate-900
                      "
                    >
                      {review.name}
                    </h3>

                    <p className="text-sm text-slate-500">

                      {review.title}

                    </p>

                  </div>

                </div>

              </div>

            ))}

          </div>

        )}

      </div>

    </section>

  );

};

export default Testimonials;