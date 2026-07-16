import { useEffect, useState } from "react";
import { Bell, CheckCircle, Ticket } from "lucide-react";
import { Link } from "react-router-dom";
import API from "../services/api";

const Notifications = () => {

  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {

    const fetchNotifications = async () => {

      try {

        const res = await API.get("/notifications");

        setNotifications(res.data);

      } catch (err) {

        console.log(err);

      } finally {

        setLoading(false);

      }

    };

    fetchNotifications();

  }, []);

  if (loading) {

    return (

      <div className="min-h-screen flex items-center justify-center">

        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-sky-500"></div>

      </div>

    );

  }

  return (

    <div className="min-h-screen bg-slate-100 py-10">

      <div className="max-w-4xl mx-auto px-6">

        {/* Header */}

        <div className="flex items-center gap-4 mb-8">

          <div className="bg-sky-100 p-4 rounded-2xl">

            <Bell
              size={30}
              className="text-sky-600"
            />

          </div>

          <div>

            <h1 className="text-4xl font-bold">
              Notifications
            </h1>

            <p className="text-slate-500">
              Stay updated with your bookings.
            </p>

          </div>

        </div>

        {notifications.length === 0 ? (

          <div className="bg-white rounded-3xl shadow p-12 text-center">

            <Bell
              size={60}
              className="mx-auto text-slate-300 mb-5"
            />

            <h2 className="text-2xl font-bold">
              No Notifications
            </h2>

            <p className="text-slate-500 mt-3">
              You're all caught up.
            </p>

          </div>

        ) : (

          <div className="space-y-5">

            {notifications.map((item) => (

              <div
                key={item.notification_id}
                className="
                bg-white
                rounded-3xl
                shadow
                p-6
                hover:shadow-xl
                transition
                "
              >

                <div className="flex justify-between">

                  <div className="flex items-center gap-3">

                    <CheckCircle
                      className="text-green-500"
                      size={28}
                    />

                    <div>

                      <h3 className="font-bold text-lg">
                        Booking Approved
                      </h3>

                      <p className="text-sm text-slate-500">
                        {item.is_read
                          ? "Read"
                          : "Unread"}
                      </p>

                    </div>

                  </div>

                  <p className="text-sm text-slate-400">

                    {new Date(
                      item.created_at
                    ).toLocaleString()}

                  </p>

                </div>

                <p className="mt-5 text-slate-700 whitespace-pre-line leading-7">

                  {item.message}

                </p>

                <div className="mt-6">

                  <Link
                    to={`/ticket/${item.booking_id}`}
                    className="
                    inline-flex
                    items-center
                    gap-2

                    bg-sky-500
                    hover:bg-sky-600

                    text-white

                    px-5
                    py-3

                    rounded-xl
                    "
                  >

                    <Ticket size={18} />

                    View Ticket

                  </Link>

                </div>

              </div>

            ))}

          </div>

        )}

      </div>

    </div>

  );

};

export default Notifications;