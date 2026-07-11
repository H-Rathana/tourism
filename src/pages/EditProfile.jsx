import {
  useState,
  useEffect,
  useContext,
} from "react";

import { AuthContext } from "../context/AuthContext";
import API from "../services/api";
import { Camera } from "lucide-react";
import toast from "react-hot-toast";

const EditProfile = () => {

const { updateUser } =useContext(AuthContext);

const [user, setUser] =
useState(null);

const [image, setImage] =
useState(null);

const [preview, setPreview] =
useState(null);

const [saving, setSaving] =
useState(false);

const [formData, setFormData] =
useState({


  name: "",
  email: "",
  phone: ""

});


const fetchProfile =
async () => {


  try {

    const res =
      await API.get(
        "/users/profile"
      );

    setUser(res.data);

    updateUser(res.data);
    
    setFormData({

      name:
        res.data.name || "",

      email:
        res.data.email || "",

      phone:
        res.data.phone || ""

    });

  } catch(error){

    console.log(error);

  }

};


useEffect(() => {


fetchProfile();


}, []);

const handleChange =
(e) => {

  setFormData({

    ...formData,

    [e.target.name]:
    e.target.value

  });

};


const handleImageChange =
(e) => {


  const file =
    e.target.files[0];

  if (!file) return;

  setImage(file);

  setPreview(
    URL.createObjectURL(file)
  );

};

const handleSubmit = async (e) => {
  e.preventDefault();

  setSaving(true);

  try {

    // update profile info
    const res =
      await API.put(
        "/users/profile",
        formData
      );

    let updatedUser =
      res.data;

    // upload image if user selected one
    if (image) {

      const data =
        new FormData();

      data.append(
        "profile_image",
        image
      );

      const imageRes =
        await API.post(
          "/users/profile/image",
          data
        );

      updatedUser = {
        ...updatedUser,
        profile_image:
          imageRes.data.profile_image,
      };
    }

    const newUser = {

  ...user,

  ...updatedUser,

};

setUser(newUser);

updateUser(newUser);

    setImage(null);
    setPreview(null);

    toast.success(
      "Profile updated successfully!"
    );

  } catch (error) {

    console.log(error);

    toast.error(
      "Update failed"
    );

  } finally {

    setSaving(false);

  }
};


return (


<div
  className="
  min-h-screen
  bg-slate-100
  py-12
  px-4
  "
>

  <div
    className="
    max-w-3xl
    mx-auto
    bg-white
    rounded-3xl
    shadow-xl
    overflow-hidden
    "
  >

    {/* Header */}

    <div
      className="
      bg-gradient-to-b
      from-sky-500
      to-sky-200
      p-8
      text-white
      "
    >

      <h1
        className="
        text-3xl
        font-bold
        "
      >
        Account Settings
      </h1>

      <p className="opacity-90 mt-2">
        Manage your personal information
      </p>

    </div>

    {/* Body */}

    <div className="p-8">

      {/* Avatar */}

      <div
        className="
        flex
        flex-col
        items-center
        "
      >

        <div
          className="
          relative
          w-36
          h-36
          "
        >

          <img
            src={
              preview
                ? preview
                : user?.profile_image
                ? `http://localhost:5000/uploads/profiles/${user.profile_image}`
                : "https://ui-avatars.com/api/?name=User"
            }
            alt=""
            className="
            w-full
            h-full
            rounded-full
            object-cover
            border-4
            border-sky-500
            "
          />

          <label
            className="
            absolute
            bottom-0
            right-0
            bg-sky-500
            p-3
            rounded-full
            cursor-pointer
            text-white
            shadow-lg
            hover:bg-sky-600
            transition
            "
          >

            <Camera size={18} />

            <input
              type="file"
              className="hidden"
              onChange={
                handleImageChange
              }
            />

          </label>

        </div>

        <p
          className="
          text-slate-500
          mt-3
          text-sm
          "
        >
          WanderEscape Traveler
        </p>

        {/* {image && (

          <button
            onClick={
              handleUpload
            }
            className="
            mt-4
            px-6
            py-2
            bg-orange-500
            text-white
            rounded-xl
            hover:bg-orange-600
            transition
            "
          >
            Upload Photo
          </button>

        )} */}

      </div>

      {/* Form */}

      <form
        onSubmit={
          handleSubmit
        }
        className="
        mt-10
        space-y-6
        "
      >

        <div>

          <label
            className="
            font-medium
            block
            mb-2
            "
          >
            Full Name
          </label>

          <input
            type="text"
            name="name"
            value={
              formData.name
            }
            onChange={
              handleChange
            }
            className="
            w-full
            border
            border-slate-300
            rounded-xl
            p-3
            focus:outline-none
            focus:ring-2
            focus:ring-sky-500
            focus:border-sky-500
            transition
            "
          />

        </div>

        <div>

          <label
            className="
            font-medium
            block
            mb-2
            "
          >
            Email Address
          </label>

          <input
            type="email"
            name="email"
            value={
              formData.email
            }
            onChange={
              handleChange
            }
            className="
            w-full
            border
            border-slate-300
            rounded-xl
            p-3
            focus:outline-none
            focus:ring-2
            focus:ring-sky-500
            focus:border-sky-500
            transition
            "
          />

        </div>

        <div>

          <label
            className="
            font-medium
            block
            mb-2
            "
          >
            Phone Number
          </label>

          <input
            type="text"
            name="phone"
            value={
              formData.phone
            }
            onChange={
              handleChange
            }
            className="
            w-full
            border
            border-slate-300
            rounded-xl
            p-3
            focus:outline-none
            focus:ring-2
            focus:ring-sky-500
            focus:border-sky-500
            transition
            "
          />

        </div>

        <button
          type="submit"
          disabled={saving}
          className="
          w-full
          py-4
          rounded-2xl
          bg-sky-500
          text-white
          font-bold
          hover:bg-sky-600
          transition
          disabled:opacity-50
          "
        >
          {saving
            ? "Saving..."
            : "Save Changes"}
        </button>

      </form>

    </div>

  </div>

</div>


);

};

export default EditProfile;
