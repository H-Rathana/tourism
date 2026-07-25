import { useParams, useNavigate,useLocation } from "react-router-dom";
import { useEffect, useState, useContext } from "react";

import API, { BASE_URL } from "../services/api";

import TourDetailsSkeleton from "../components/TourDetailsSkeleton";
import BookingForm from "../components/BookingForm";

import { AuthContext } from "../context/AuthContext";
import toast from "react-hot-toast";
import {
  FaChevronLeft,
  FaMapMarkerAlt,
  FaClock,
  FaStar,
} from "react-icons/fa";

import {
  Mountain,
  UserRound,
  Camera,
  Bus,
  Check,
  Heart,
  Star,
  MessageCircle,
   Pencil,
  Trash2,
  MapPin,
  Clock3,
  Users,
  Languages,
  Hotel,
  Wifi,
  Coffee,
  Bath,
  Car,
  CheckCircle2,
  CalendarDays,
} from "lucide-react";

const TourDetails = () => {

  const { id } = useParams();

  const navigate =
    useNavigate();

  const [tour, setTour] =
    useState(null);

  const [loading, setLoading] =
    useState(true);

  const [showModal, setShowModal] =
    useState(false);

  const [reviews, setReviews] = useState([]);

  const [gallery, setGallery] = useState([]);

  const [ratingInfo, setRatingInfo] =
  useState({
    average_rating: 0,
    total_reviews: 0,
  });

  const [reviewForm, setReviewForm] =
  useState({
    rating: 5,
    comment: "",
  });

  const [editingReview,
setEditingReview] =
  useState(false);

const [myReview,
setMyReview] =
  useState(null);

  const labels = {
  1: "Terrible",
  2: "Poor",
  3: "Good",
  4: "Very Good",
  5: "Excellent",
};


const [hasReviewed, setHasReviewed] =
  useState(false);

  const { user } =
    useContext(AuthContext);

  const location = useLocation();

  useEffect(() => {

  if (
    user &&
    location.state?.openBooking
  ) {

    // avoid calling setState synchronously within an effect to prevent cascading renders
    setTimeout(() => setShowModal(true), 0);

    navigate(
      location.pathname,
      {
        replace: true,
        state: {}
      }
    );

  }

}, [
  user,
  location.state,
  location.pathname,
  navigate
]);
  useEffect(() => {

  const fetchData =
    async () => {

      try {

        const tourRes =
          await API.get(
            `/tours/${id}`
          );

        setTour(
          tourRes.data
        );
        const galleryRes =
        await API.get(`/gallery/${id}`);

        setGallery(galleryRes.data);

        const reviewRes =
          await API.get(
            `/reviews/tour/${id}`
          );

        setReviews(
          reviewRes.data.reviews
        );
        if (user) {

  const my = reviewRes.data.reviews.find(
    (review) => review.user_id === user.id
  );

  if (my) {
    setHasReviewed(true);
    setMyReview(my);

    setReviewForm({
      rating: my.rating,
      comment: my.comment,
    });
  } else {
    setHasReviewed(false);
    setMyReview(null);
  }
}
        setRatingInfo(
          reviewRes.data.rating
        );

        setTimeout(
          () =>
            setLoading(false),
          500
        );

      } catch (error) {

        console.log(error);

      }

    };

  fetchData();

}, [id]);

  useEffect(() => {

    document.body.style.overflow =
      showModal
        ? "hidden"
        : "auto";

  }, [showModal]);
  

  const handleWishlist = async () => {

  if (!user) {

    navigate("/login");

    return;

  }


  try {

    const token =
      localStorage.getItem(
        "token"
      );

    await API.post(
      "/wishlist",
      {
        tour_id: tour.tour_id,
      },
      {
        headers: {
          Authorization:
            `Bearer ${token}`,
        },
      }
    );

  toast.success(
  "Added to wishlist ❤️"
   );
   window.dispatchEvent(
  new Event("wishlistUpdated")
);
  } catch (error) {

    console.log(error);

    alert(
      "Already in wishlist"
    );

  }

};

  const handleUpdateReview =
  async () => {

    try {

      await API.put(
        `/reviews/mine/${myReview.review_id}`,
        {
          rating:
            reviewForm.rating,
          comment:
            reviewForm.comment,
        }
      );

      const res =
        await API.get(
          `/reviews/tour/${id}`
        );

      setReviews(
        res.data.reviews
      );

      const updated =
        res.data.reviews.find(
          (r) =>
            r.review_id ===
            myReview.review_id
        );

      setMyReview(
        updated
      );

      setEditingReview(
        false
      );

      toast.success(
        "Review updated!"
      );

    } catch (error) {

      console.log(error);

      toast.error(
        "Unable to update review"
      );

    }

};

const handleDeleteReview =
  async () => {

    const confirmDelete =
      window.confirm(
        "Delete your review?"
      );

    if (!confirmDelete)
      return;

    try {

      await API.delete(
        `/reviews/mine/${myReview.review_id}`
      );

      const res =
        await API.get(
          `/reviews/tour/${id}`
        );

      setReviews(
        res.data.reviews
      );

      setRatingInfo(
        res.data.rating
      );

      setMyReview(
        null
      );

      setHasReviewed(
        false
      );

      setReviewForm({
        rating: 5,
        comment: "",
      });

      toast.success(
        "Review deleted!"
      );

    } catch (error) {

      console.log(error);

      toast.error(
        "Unable to delete review"
      );

    }

};

const handleReviewSubmit =
  async () => {

    if (
      !reviewForm.comment.trim()
    ) {

      toast.error(
        "Please write a review."
      );

      return;

    }

    try {

      await API.post(
        "/reviews",
        {
          tour_id:
            tour.tour_id,

          rating:
            reviewForm.rating,

          comment:
            reviewForm.comment,
        }
      );

      const res =
        await API.get(
          `/reviews/tour/${id}`
        );

      setReviews(
        res.data.reviews
      );

      setRatingInfo(
        res.data.rating
      );

      setReviewForm({
        rating: 5,
        comment: "",
      });
      setHasReviewed(true);
      const mine =
  res.data.reviews.find(
    (r) =>
      r.user_id === user.id
  );

setMyReview(
  mine
);
      toast.success(
        "Review submitted!"
      );

    } catch (error) {

      console.log(error);

      toast.error(
        error.response?.data
          ?.message ||
        "Unable to submit review"
      );

    }

};
const formatDate = (date) =>
  new Date(date).toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });

const seatPercentage = tour
  ? (tour.remaining_seats / tour.max_people) * 100
  : 0;

const itineraryItems =
  tour?.itinerary
    ?.split("\n")
    .filter(item => item.trim() !== "") || [];

  if (loading)
    return (
      <TourDetailsSkeleton />
    );

  return (

    <div className="bg-slate-100 min-h-screen">

      <div className="max-w-7xl mx-auto px-4 md:px-6 py-8">

        {/* BACK BUTTON */}

        <button
          onClick={() =>
            navigate(-1)
          }
          className="
          mb-6
          w-12
          h-12
          rounded-full
          bg-white
          shadow
          flex
          items-center
          justify-center
          hover:bg-slate-100
          "
        >
          <FaChevronLeft />
        </button>

        {/* HERO */}

        {/* ================= HERO ================= */}

<div
  className="
  relative
  h-[420px]
  md:h-[600px]
  rounded-[32px]
  overflow-hidden
  shadow-2xl
  "
>

  {/* Background Image */}

  <img
    src={`${BASE_URL}/uploads/${tour.image}`}
    alt={tour.title}
    className="
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
    bg-gradient-to-t
    from-black/90
    via-black/30
    to-transparent
    "
  />

  {/* Status Badge */}

  <div
    className="
    absolute
    top-6
    left-6
    "
  >

    {/* <span
      className={`
      px-5
      py-2
      rounded-full
      text-sm
      font-semibold
      text-white
      shadow-lg

      ${
        tour.status === "ACTIVE"
          ? "bg-green-500"
          : tour.status === "FULL"
          ? "bg-red-500"
          : "bg-gray-600"
      }
      `}
    >

      {tour.status}

    </span> */}

  </div>

  {/* Hero Content */}

  <div
    className="
    absolute
    bottom-8
    left-8
    right-8
    text-white
    "
  >

    {/* Rating */}

    <div
      className="
      flex
      items-center
      gap-3
      mb-5
      "
    >

      <div
        className="
        flex
        items-center
        gap-1
        "
      >

        <Star
          size={20}
          className="
          text-yellow-400
          fill-yellow-400
          "
        />

        <span className="font-semibold">

          {ratingInfo.average_rating || 0}

        </span>

      </div>

      <span className="text-white/80">

        ({ratingInfo.total_reviews || 0} Reviews)

      </span>

    </div>

    {/* Title */}

    <h1
      className="
      text-4xl
      md:text-6xl
      font-extrabold
      leading-tight
      drop-shadow-lg
      "
    >

      {tour.title}

    </h1>

    {/* Information Cards */}

    <div
      className="
      flex
      flex-wrap
      gap-4
      mt-8
      "
    >

      {/* Location */}

      <div
        className="
        bg-white/15
        backdrop-blur-md
        rounded-2xl
        px-5
        py-3
        flex
        items-center
        gap-3
        "
      >

        <MapPin size={22} />

        <div>

          <p className="text-xs text-white/70">

            Destination

          </p>

          <p className="font-semibold">

            {tour.location}

          </p>

        </div>

      </div>

      {/* Schedule */}

      <div
        className="
        bg-white/15
        backdrop-blur-md
        rounded-2xl
        px-5
        py-3
        flex
        items-center
        gap-3
        "
      >

        <CalendarDays size={22} />

        <div>

          <p className="text-xs text-white/70">

            Tour Schedule

          </p>

          <p className="font-semibold">

            {formatDate(tour.available_from)}

            {"  →  "}

            {formatDate(tour.available_until)}

          </p>

        </div>

      </div>

      {/* Duration */}

      <div
        className="
        bg-white/15
        backdrop-blur-md
        rounded-2xl
        px-5
        py-3
        flex
        items-center
        gap-3
        "
      >

        <Clock3 size={22} />

        <div>

          <p className="text-xs text-white/70">

            Duration

          </p>

          <p className="font-semibold">

            {tour.duration}

          </p>

        </div>

      </div>

      {/* Remaining Seats */}

      <div
        className="
        bg-white/15
        backdrop-blur-md
        rounded-2xl
        px-5
        py-3
        min-w-[250px]
        "
      >

        <div
          className="
          flex
          justify-between
          items-center
          "
        >

          <div className="flex items-center gap-2">

            <Users size={20} />

            <span className="font-semibold">

              Seats Remaining

            </span>

          </div>

          <span>

            {tour.remaining_seats}

            /

            {tour.max_people}

          </span>

        </div>

        <div
          className="
          w-full
          h-2
          bg-white/20
          rounded-full
          mt-3
          "
        >

          <div
            className="
            h-2
            rounded-full
            bg-green-400
            transition-all
            duration-500
            "
            style={{
              width: `${seatPercentage}%`,
            }}
          />

        </div>

      </div>

    </div>

  </div>

</div>
            {/* ================= PHOTO GALLERY ================= */}

{gallery.length > 0 && (

<div className="mt-8">

    <div className="flex justify-between items-center mb-5">

        <div>

            <h2 className="text-2xl font-bold">

                Tour Gallery

            </h2>

            <p className="text-slate-500">

                Explore more beautiful views from this destination.

            </p>

        </div>

    </div>

    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">

        {gallery.slice(0,4).map((photo,index)=>(

            <div
                key={photo.gallery_id}
                className="
                group
                overflow-hidden
                rounded-3xl
                shadow-lg
                cursor-pointer
                "
            >

                <img
                    src={`${BASE_URL}/uploads/gallery/${photo.image}`}
                    alt=""
                    className="
                    w-full
                    h-56
                    object-cover
                    transition-transform
                    duration-500
                    group-hover:scale-110
                    "
                />

            </div>

        ))}

    </div>

</div>

)}

        {/* QUICK STATS */}

        <div
          className="
          my-10
          "
        >
        </div>

        {/* CONTENT */}

        <div className="grid md:grid-cols-3 gap-8">

          {/* LEFT */}

          <div className="md:col-span-2 space-y-8">

            {/* OVERVIEW */}

            <div
              className="
              bg-white
              rounded-3xl
              shadow
              p-8
              "
            >

              <h2
                className="
                text-2xl
                font-bold
                mb-4
                "
              >
                Tour Overview
              </h2>

              <p
                className="
                text-slate-600
                leading-8
                "
              >
                {tour.description}
              </p>

            </div>
            <section className="bg-white rounded-3xl shadow p-8 mt-8">

              <h2 className="text-2xl font-bold mb-8">

                  Tour Itinerary

              </h2>

              <div className="space-y-8">

                  {itineraryItems.map((item,index)=>{

                      const [time,activity]=item.split(" - ");

                      return(

                          <div
                              key={index}
                              className="flex gap-5"
                          >

                              {/* Circle */}

                              <div
                                  className="
                                  flex
                                  flex-col
                                  items-center
                                  "
                              >

                                  <div
                                      className="
                                      w-5
                                      h-5
                                      rounded-full
                                      bg-gray-400
                                      "
                                  />

                                  {index !== itineraryItems.length-1 && (

                                      <div
                                          className="
                                          w-[2px]
                                          flex-1
                                          bg-orange-200
                                          mt-1
                                          "
                                      />

                                  )}

                              </div>

                              {/* Content */}

                              <div>

                                  <p className="text-sky-900 font-bold">

                                      {time}

                                  </p>

                                  <h3 className="font-semibold text-lg">

                                      {activity}

                                  </h3>

                              </div>

                          </div>

                      );

                  })}

              </div>

          </section>

              <div className="mt-10">

                <h2 className="text-2xl font-bold mb-6">
                  Accommodation
                </h2>

                <div className="grid md:grid-cols-2 gap-6">

                  {/* Hotel A */}

                  <div className="bg-white rounded-3xl shadow-lg p-6">

                    <div className="flex items-center gap-3 mb-4">

                      <Hotel className="text-sky-500"/>

                      <h3 className="text-xl font-bold">
                        Hotel A
                      </h3>

                    </div>

                    <p className="text-gray-500 mb-5">
                      Comfortable accommodation prepared
                      for travelers during the tour.
                    </p>

                    <div className="space-y-3">

                      <Feature icon={<Wifi size={18}/>}>
                        Free Wi-Fi
                      </Feature>

                      <Feature icon={<Coffee size={18}/>}>
                        Breakfast Included
                      </Feature>

                      <Feature icon={<Bath size={18}/>}>
                        Private Bathroom
                      </Feature>

                      <Feature icon={<Car size={18}/>}>
                        Free Parking
                      </Feature>

                    </div>

                  </div>

                </div>

              </div>
            {/* HIGHLIGHTS */}

            {/* <div
              className="
              bg-white
              rounded-3xl
              shadow
              p-8
              "
            >

              <h2
                className="
                text-2xl
                font-bold
                mb-6
                "
              >
                Tour Highlights
              </h2>

              <div
                className="
                grid
                md:grid-cols-2
                gap-4
                "
              >

                <div className="bg-orange-50 p-4 rounded-2xl flex items-center gap-3">
                  <Mountain size={20} />
                  Beautiful Scenery
                </div>

                <div className="bg-orange-50 p-4 rounded-2xl flex items-center gap-3">
                  <UserRound size={20} />
                  Professional Guide
                </div>

                <div className="bg-orange-50 p-4 rounded-2xl flex items-center gap-3">
                  <Camera size={20} />
                  Great Photo Spots
                </div>

                <div className="bg-orange-50 p-4 rounded-2xl flex items-center gap-3">
                  <Bus size={20} />
                  Comfortable Transport
                </div>

              </div>

            </div> */}

            {/* INCLUDED */}

            <div
              className="
              bg-white
              rounded-3xl
              shadow
              p-8
              "
            >

              <h2
                className="
                text-2xl
                font-bold
                mb-6
                "
              >
                What's Included
              </h2>

              <div className="space-y-3">

                <p className="flex items-center gap-2">
                  <Check size={18} className="text-green-600" />
                  Professional Tour Guide
                </p>

                <p className="flex items-center gap-2">
                  <Check size={18} className="text-green-600" />
                  Transportation
                </p>

                <p className="flex items-center gap-2">
                  <Check size={18} className="text-green-600" />
                  Drinking Water
                </p>

                <p className="flex items-center gap-2">
                  <Check size={18} className="text-green-600" />
                  Entrance Fees
                </p>

              </div>

            </div>
            <div
  className="
  bg-white
  rounded-3xl
  shadow
  p-8
  "
>

  <div
    className="
    flex
    items-center
    gap-3
    mb-6
    "
  >
    <MessageCircle
      className="text-orange-500"
    />

    <h2
      className="
      text-2xl
      font-bold
      "
    >
      Reviews
    </h2>
  </div>

  <div className="mb-8">

    <div
      className="
      flex
      items-center
      gap-4
      "
    >

      <h2
        className="
        text-5xl
        font-bold
        "
      >
        {
          ratingInfo
            ?.average_rating ||
          0
        }
      </h2>

      <div>

        <div
          className="
          flex
          text-yellow-500
          "
        >
          {Array.from({
            length: 5,
          }).map(
            (_, i) => (
              <Star
                key={i}
                size={18}
                fill={
                  i <
                  Math.round(
                    ratingInfo
                      ?.average_rating ||
                      0
                  )
                    ? "currentColor"
                    : "none"
                }
              />
            )
          )}
        </div>

        <p className="text-gray-500">

          {
            ratingInfo
              ?.total_reviews ||
            0
          }

          {" "}
          Reviews

        </p>

      </div>

    </div>

  </div>

  <div className="space-y-6">

    {reviews.length === 0 ? (

      <div
        className="
        text-center
        text-gray-500
        py-10
        "
      >
        No reviews yet.
      </div>

    ) : (

      reviews.map(
        (review) => (

          <div
            key={
              review.review_id
            }
            className="
            border-b
            pb-5
            "
          >

            <div
              className="
              flex
              items-center
              gap-4
              "
            >

              <img
                src={
                  review.profile_image
                    ? `http://localhost:5000/uploads/profiles/${review.profile_image}`
                    : `https://ui-avatars.com/api/?name=${review.name}`
                }
                alt=""
                className="
                w-12
                h-12
                rounded-full
                object-cover
                "
              />

              <div>

                <h3 className="font-bold">
                  {review.name}
                </h3>

                <div
                  className="
                  flex
                  text-yellow-500
                  "
                >
                  {Array.from({
                    length:
                      review.rating,
                  }).map(
                    (_, i) => (
                      <Star
                        key={i}
                        size={16}
                        fill="currentColor"
                      />
                    )
                  )}
                </div>

              </div>

            </div>

            <p
              className="
              mt-3
              text-gray-600
              "
            >
              {review.comment}
            </p>

            <p
              className="
              text-sm
              text-gray-400
              mt-2
              "
            >
              {new Date(
                review.created_at
              ).toLocaleDateString()}
            </p>
              
              {/* {user && hasReviewed && myReview && (

  <div
  className="
  mt-10
  bg-slate-50
  rounded-3xl
  p-6
  "
>

  <h3
    className="
    text-xl
    font-bold
    mb-5
    "
  >
    Your Review
  </h3>

  {!editingReview ? (

    <>
      <div
        className="
        flex
        text-yellow-500
        mb-4
        "
      >
        {Array.from({
          length:
            myReview.rating,
        }).map(
          (_, i) => (
            <Star
              key={i}
              size={20}
              fill="currentColor"
            />
          )
        )}
      </div>

      <p className="text-gray-700">
        {myReview.comment}
      </p>

      <p
        className="
        text-sm
        text-gray-400
        mt-3
        "
      >
        {new Date(
          myReview.created_at
        ).toLocaleDateString()}
      </p>

<div
  className="
  flex
  justify-end
  gap-3
  mt-6
  "
>

  <button
    onClick={() =>
      setEditingReview(true)
    }
    className="
    w-11
    h-11
    rounded-full
    bg-sky-100
    text-sky-600
    flex
    items-center
    justify-center
    hover:bg-sky-500
    hover:text-white
    transition
    duration-300
    "
    title="Edit Review"
  >
    <Pencil size={18} />
  </button>

  <button
    onClick={
      handleDeleteReview
    }
    className="
    w-11
    h-11
    rounded-full
    bg-red-100
    text-red-500
    flex
    items-center
    justify-center
    hover:bg-red-500
    hover:text-white
    transition
    duration-300
    "
    title="Delete Review"
  >
    <Trash2 size={18} />
  </button>

</div>

    </>

  ) : (

    <>
      <div
        className="
        flex
        gap-2
        "
      >

        {[1,2,3,4,5].map(
          (star) => (

            <button
              key={star}
              onClick={() =>
                setReviewForm({
                  ...reviewForm,
                  rating:
                    star,
                })
              }
            >

              <Star
                size={32}
                className={`

                  ${
                    star <=
                    reviewForm.rating
                      ? "text-yellow-500 fill-yellow-500"
                      : "text-gray-300"
                  }

                `}
              />

            </button>

          )
        )}

      </div>

      <textarea
        rows={4}
        value={
          reviewForm.comment
        }
        onChange={(e) =>
          setReviewForm({
            ...reviewForm,
            comment:
              e.target.value,
          })
        }
        className="
        w-full
        mt-4
        border
        rounded-2xl
        p-4
        "
      />

      <div
        className="
        flex
        gap-4
        mt-5
        "
      >

        <button
          onClick={
            handleUpdateReview
          }
          className="
          px-5
          py-3
          rounded-xl
          bg-orange-500
          text-white
          "
        >
          Save Changes
        </button>

        <button
          onClick={() =>
            setEditingReview(
              false
            )
          }
          className="
          px-5
          py-3
          rounded-xl
          border
          "
        >
          Cancel
        </button>

      </div>

    </>

  )}

</div>

                )} */}
          </div>

        )
      )
      
    )}
      {user && hasReviewed && myReview && (

  <div
  className="
  mt-10
  bg-slate-50
  rounded-3xl
  p-6
  "
>

  <h3
    className="
    text-xl
    font-bold
    mb-5
    "
  >
    Your Review
  </h3>

  {!editingReview ? (

    <>
      <div
        className="
        flex
        text-yellow-500
        mb-4
        "
      >
        {Array.from({
          length:
            myReview.rating,
        }).map(
          (_, i) => (
            <Star
              key={i}
              size={20}
              fill="currentColor"
            />
          )
        )}
      </div>

      <p className="text-gray-700">
        {myReview.comment}
      </p>

      <p
        className="
        text-sm
        text-gray-400
        mt-3
        "
      >
        {new Date(
          myReview.created_at
        ).toLocaleDateString()}
      </p>

<div
  className="
  flex
  justify-end
  gap-3
  mt-6
  "
>

  <button
    onClick={() =>
      setEditingReview(true)
    }
    className="
    w-11
    h-11
    rounded-full
    bg-sky-100
    text-sky-600
    flex
    items-center
    justify-center
    hover:bg-sky-500
    hover:text-white
    transition
    duration-300
    "
    title="Edit Review"
  >
    <Pencil size={18} />
  </button>

  <button
    onClick={
      handleDeleteReview
    }
    className="
    w-11
    h-11
    rounded-full
    bg-red-100
    text-red-500
    flex
    items-center
    justify-center
    hover:bg-red-500
    hover:text-white
    transition
    duration-300
    "
    title="Delete Review"
  >
    <Trash2 size={18} />
  </button>

</div>

    </>

  ) : (

    <>
      <div
        className="
        flex
        gap-2
        "
      >

        {[1,2,3,4,5].map(
          (star) => (

            <button
              key={star}
              onClick={() =>
                setReviewForm({
                  ...reviewForm,
                  rating:
                    star,
                })
              }
            >

              <Star
                size={32}
                className={`

                  ${
                    star <=
                    reviewForm.rating
                      ? "text-yellow-500 fill-yellow-500"
                      : "text-gray-300"
                  }

                `}
              />

            </button>

          )
        )}

      </div>

      <textarea
        rows={4}
        value={
          reviewForm.comment
        }
        onChange={(e) =>
          setReviewForm({
            ...reviewForm,
            comment:
              e.target.value,
          })
        }
        className="
        w-full
        mt-4
        border
        rounded-2xl
        p-4
        "
      />

      <div
        className="
        flex
        gap-4
        mt-5
        "
      >

        <button
          onClick={
            handleUpdateReview
          }
          className="
          px-5
          py-3
          rounded-xl
          bg-orange-500
          text-white
          "
        >
          Save Changes
        </button>

        <button
          onClick={() =>
            setEditingReview(
              false
            )
          }
          className="
          px-5
          py-3
          rounded-xl
          border
          "
        >
          Cancel
        </button>

      </div>

    </>

  )}

</div>

)}
  </div>

  {user && !hasReviewed && (

    <div className="mt-10">

      <h3
        className="
        text-xl
        font-bold
        mb-4
        "
      >
        Write a Review
      </h3>

      <div
  className="
  flex
  gap-2
  mt-2
  "
>

  {[1,2,3,4,5].map(
    (star) => (

      <button
        key={star}
        type="button"
        onClick={() =>
          setReviewForm({
            ...reviewForm,
            rating: star,
          })
        }
      >

        <Star
          size={32}
          className={`
            transition

            ${
              star <=
              reviewForm.rating
                ? "text-yellow-500 fill-yellow-500"
                : "text-gray-300"
            }
          `}
        />
        <p className="mt-2 text-gray-500">
       {labels[reviewForm.rating]}
        </p>

      </button>

    )
  )}
</div>

      <textarea
        rows={4}
        value={
          reviewForm.comment
        }
        onChange={(e) =>
          setReviewForm({
            ...reviewForm,
            comment:
              e.target.value,
          })
        }
        className="
        w-full
        mt-4
        border
        rounded-2xl
        p-4
        "
        placeholder="Share your experience..."
      />

      <button
        onClick={
          handleReviewSubmit
        }
        className="
        mt-4
        bg-orange-500
        text-white
        px-6
        py-3
        rounded-xl
        hover:bg-orange-600
        transition
        "
      >
        Submit Review
      </button>

    </div>

  )}

</div>

 </div>
          
          {/* RIGHT BOOKING CARD */}

          <div>

            <div
              className="
              bg-white
              rounded-3xl
              shadow-xl
              p-8
              sticky
              top-24
              "
            >

              <p className="text-slate-500">
                Starting From
              </p>

              <h2
                className="
                text-5xl
                font-bold
                text-orange-500
                "
              >
                ${tour.price}
              </h2>

              <p className="text-slate-400 mt-2">
                per person
              </p>
              <div
                className="
                absolute
                top-6
                right-6
                z-20
                "
              >
        <button
          onClick={handleWishlist}
          className="
          w-14
          h-14
          rounded-full
          bg-white/90
          backdrop-blur
          shadow-lg
          flex
          items-center
          justify-center
          hover:scale-110
          transition
          "
        >
          <Heart
            size={24}
            className="
            text-red-500
            "
          />
        </button>
      </div>
              <button
                onClick={() => {

                  if (!user) {
                    toast(
                      "⚠️ Please login first to continue booking"
                    );

                    navigate("/login", {
                      state: {
                        from: location.pathname,
                        openBooking: true
                      }
                    });

                  } else {

                    setShowModal(
                      true
                    );

                  }

                }}
                className="
                w-full
                mt-6
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
                Book This Tour
              </button>

              <div
                className="
                mt-6
                text-sm
                text-slate-500
                space-y-2
                "
              >
                <p>
                  ✔ Instant Confirmation
                </p>

                <p>
                  ✔ Secure Booking
                </p>

              </div>

            </div>

          </div>

        </div>

      </div>

      {showModal && (

        <BookingForm
          tour={tour}
          onClose={() =>
            setShowModal(false)
          }
        />

      )}

    </div>

  );

};
const Feature = ({ icon, children }) => {
  return (
    <div className="flex items-center gap-3">
      <div className="text-green-500">
        {icon}
      </div>

      <span className="text-gray-700">
        {children}
      </span>
    </div>
  );
};
export default TourDetails;

