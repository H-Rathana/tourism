import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import API, { BASE_URL } from "../services/api";
import { Heart, Trash2, MapPin } from "lucide-react";

const Wishlist = () => {

  const [wishlist, setWishlist] =
    useState([]);

  const [loading, setLoading] =
    useState(true);

  useEffect(() => {

    fetchWishlist();

  }, []);

  const fetchWishlist = async () => {

    try {

      const res =
        await API.get("/wishlist");

      setWishlist(res.data);

    } catch (error) {

      console.log(error);

    } finally {

      setLoading(false);

    }

  };

  const removeWishlist =
    async (tourId) => {

      try {

        await API.delete(
          `/wishlist/${tourId}`
        );

        setWishlist(prev =>
          prev.filter(
            item =>
              item.tour_id !== tourId
          )
        );
         window.dispatchEvent(
      new Event(
        "wishlistUpdated"
      )
    );
      } catch (error) {

        console.log(error);

      }

    };

  if (loading) {

    return (
      <div className="p-10">
        Loading...
      </div>
    );

  }

  return (

    <div className="bg-slate-100 min-h-screen">

      <div className="max-w-7xl mx-auto px-6 py-12">

        <div className="flex items-center gap-3 mb-10">

          <Heart
            size={32}
            className="text-red-500"
          />

          <h1
            className="
            text-4xl
            font-bold
            "
          >
            My Wishlist
          </h1>

        </div>

        {wishlist.length === 0 ? (

          <div
            className="
            bg-white
            rounded-3xl
            p-16
            text-center
            shadow
            "
          >

            <Heart
              size={60}
              className="
              mx-auto
              text-gray-300
              mb-4
              "
            />

            <h2
              className="
              text-2xl
              font-bold
              "
            >
              No Wishlist Yet
            </h2>

            <p
              className="
              text-gray-500
              mt-2
              "
            >
              Save your favorite tours here.
            </p>

          </div>

        ) : (

          <div
            className="
            grid
            md:grid-cols-3
            gap-8
            "
          >

            {wishlist.map(item => (

              <div
                key={item.wishlist_id}
                className="
                bg-white
                rounded-3xl
                overflow-hidden
                shadow
                hover:shadow-xl
                hover:-translate-y-2
                transition-all
                duration-300
                "
              >

                <img
                  src={`${BASE_URL}/uploads/${item.image}`}
                  alt={item.title}
                  className="
                  w-full
                  h-56
                  object-cover
                  "
                />

                <div className="p-6">

                  <h2
                    className="
                    text-2xl
                    font-bold
                    "
                  >
                    {item.title}
                  </h2>

                  <p
                    className="
                    flex
                    items-center
                    gap-2
                    text-gray-500
                    mt-2
                    "
                  >
                    <MapPin size={16} />
                    {item.location}
                  </p>

                  <h3
                    className="
                    text-3xl
                    font-bold
                    text-orange-500
                    mt-4
                    "
                  >
                    ${item.price}
                  </h3>

                  <div
                    className="
                    flex
                    gap-3
                    mt-6
                    "
                  >

                    <Link
                      to={`/tours/${item.tour_id}`}
                      className="
                      flex-1
                      text-center
                      bg-orange-500
                      text-white
                      py-3
                      rounded-xl
                      hover:bg-orange-600
                      "
                    >
                      View Tour
                  </Link>

                    <button
                      onClick={() =>
                        removeWishlist(
                          item.tour_id
                        )
                      }
                      className="
                      p-3
                      rounded-xl
                      bg-red-50
                      text-red-500
                      hover:bg-red-100
                      "
                    >
                      <Trash2 size={18} />
                    </button>

                  </div>

                </div>

              </div>

            ))}

          </div>

        )}

      </div>

    </div>

  );

};

export default Wishlist;