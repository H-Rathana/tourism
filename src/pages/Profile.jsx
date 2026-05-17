import { useState } from "react";

const Profile = () => {
  const [user, setUser] = useState({
    name: "Rathana",
    email: "test@email.com",
    image: "https://i.pravatar.cc/100",
  });

  return (
    <div className="max-w-xl mx-auto p-6 mt-20 bg-white shadow rounded-xl">

      <div className="flex flex-col items-center">
        <img
          src={user.image}
          className="w-24 h-24 rounded-full mb-4"
        />

        <h2 className="text-xl font-bold">{user.name}</h2>
        <p className="text-gray-500">{user.email}</p>
      </div>

      <button className="mt-6 w-full bg-orange-500 text-white py-2 rounded">
        Edit Profile
      </button>

    </div>
  );
};

export default Profile;