import {
  useState,
  useEffect,
  useContext,
} from "react";

import { AuthContext } from "../context/AuthContext";
import API from "../services/api";
import {
   Camera,
   Eye,
  EyeOff,
  LockKeyhole,
   } from "lucide-react";
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

const [activeTab, setActiveTab] =
  useState("info");

const [changingPassword, setChangingPassword] =
  useState(false);

const [passwordForm, setPasswordForm] =
  useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

const [showCurrentPassword, setShowCurrentPassword] =
  useState(false);

const [showNewPassword, setShowNewPassword] =
  useState(false);

const [showConfirmPassword, setShowConfirmPassword] =
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
const handlePasswordChange = (e) => {
  const {
    name,
    value,
  } = e.target;

  setPasswordForm((prev) => ({
    ...prev,
    [name]: value,
  }));
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
const handleChangePassword = async (e) => {

  e.preventDefault();

  const {
    currentPassword,
    newPassword,
    confirmPassword,
  } = passwordForm;

  if (!currentPassword) {
    toast.error(
      "Please enter your current password"
    );
    return;
  }

  if (!newPassword) {
    toast.error(
      "Please enter a new password"
    );
    return;
  }

  if (newPassword.length < 8) {
    toast.error(
      "New password must be at least 8 characters"
    );
    return;
  }

  if (!confirmPassword) {
    toast.error(
      "Please confirm your new password"
    );
    return;
  }

  if (newPassword !== confirmPassword) {
    toast.error(
      "New passwords do not match"
    );
    return;
  }

  try {

    setChangingPassword(true);

    await API.patch(
      "/users/change-password",
      passwordForm
    );

    toast.success(
      "Password changed successfully!"
    );

    // Clear form after success
    setPasswordForm({
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    });

  } catch (error) {

  console.error(error);

  toast.error(
    error.response?.data?.message ||
    "Failed to change password"
  );

  } finally {

    setChangingPassword(false);

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
      {/* SETTINGS TABS */}
<div className="
  mt-8
  bg-slate-100
  p-1.5
  rounded-2xl
  flex
  gap-1
">

  <button
    type="button"
    onClick={() => setActiveTab("info")}
    className={`
      flex-1
      py-3
      rounded-xl
      font-semibold
      transition
      ${
        activeTab === "info"
          ? "bg-white text-sky-600 shadow-sm"
          : "text-slate-500 hover:text-slate-700"
      }
    `}
  >
    Edit Information
  </button>

  <button
    type="button"
    onClick={() =>
      setActiveTab("password")
    }
    className={`
      flex-1
      py-3
      rounded-xl
      font-semibold
      transition
      ${
        activeTab === "password"
          ? "bg-white text-sky-600 shadow-sm"
          : "text-slate-500 hover:text-slate-700"
      }
    `}
  >
    Change Password
  </button>

</div>

      {/* Form */}
{activeTab === "info" && (
  <form
    onSubmit={handleSubmit}
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
            readOnly
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
)}
       {/* CHANGE PASSWORD */}
{activeTab === "password" && (
<div className="mt-10">

  {/* HEADER */}
  <div className="flex items-center gap-4 mb-6">

    <div className="
      w-12
      h-12
      rounded-xl
      bg-sky-100
      text-sky-600
      flex
      items-center
      justify-center
    ">
      <LockKeyhole size={22} />
    </div>

    <div>

      <h2 className="
        text-2xl
        font-bold
        text-slate-800
      ">
        Change Password
      </h2>

      <p className="
        text-sm
        text-slate-500
        mt-1
      ">
        Update your password to keep your
        account secure.
      </p>

    </div>

  </div>

  {/* PASSWORD FORM */}
  <form
    onSubmit={handleChangePassword}
    className="space-y-6"
  >

    {/* CURRENT PASSWORD */}
    <div>

      <label className="
        font-medium
        block
        mb-2
      ">
        Current Password
      </label>

      <div className="relative">

        <input
          type={
            showCurrentPassword
              ? "text"
              : "password"
          }
          name="currentPassword"
          value={
            passwordForm.currentPassword
          }
          onChange={
            handlePasswordChange
          }
          placeholder="Enter current password"
          disabled={changingPassword}
          className="
            w-full
            border
            border-slate-300
            rounded-xl
            p-3
            pr-12
            focus:outline-none
            focus:ring-2
            focus:ring-sky-500
            focus:border-sky-500
            transition
          "
        />

        <button
          type="button"
          onClick={() =>
            setShowCurrentPassword(
              !showCurrentPassword
            )
          }
          className="
            absolute
            right-4
            top-1/2
            -translate-y-1/2
            text-slate-400
            hover:text-slate-600
          "
        >
          {showCurrentPassword ? (
            <Eye size={20} />
          ) : (
            <EyeOff size={20} />
          )}
        </button>

      </div>

    </div>

    {/* NEW PASSWORD */}
    <div>

      <label className="
        font-medium
        block
        mb-2
      ">
        New Password
      </label>

      <div className="relative">

        <input
          type={
            showNewPassword
              ? "text"
              : "password"
          }
          name="newPassword"
          value={
            passwordForm.newPassword
          }
          onChange={
            handlePasswordChange
          }
          placeholder="Enter new password"
          disabled={changingPassword}
          className="
            w-full
            border
            border-slate-300
            rounded-xl
            p-3
            pr-12
            focus:outline-none
            focus:ring-2
            focus:ring-sky-500
            focus:border-sky-500
            transition
          "
        />

        <button
          type="button"
          onClick={() =>
            setShowNewPassword(
              !showNewPassword
            )
          }
          className="
            absolute
            right-4
            top-1/2
            -translate-y-1/2
            text-slate-400
            hover:text-slate-600
          "
        >
          {showNewPassword ? (
            <Eye size={20} />
          ) : (
            <EyeOff size={20} />
          )}
        </button>

      </div>

      <p className="
        text-xs
        text-slate-400
        mt-2
      ">
        Password must be at least 8 characters.
      </p>

    </div>

    {/* CONFIRM PASSWORD */}
    <div>

      <label className="
        font-medium
        block
        mb-2
      ">
        Confirm New Password
      </label>

      <div className="relative">

        <input
          type={
            showConfirmPassword
              ? "text"
              : "password"
          }
          name="confirmPassword"
          value={
            passwordForm.confirmPassword
          }
          onChange={
            handlePasswordChange
          }
          placeholder="Confirm new password"
          disabled={changingPassword}
          className="
            w-full
            border
            border-slate-300
            rounded-xl
            p-3
            pr-12
            focus:outline-none
            focus:ring-2
            focus:ring-sky-500
            focus:border-sky-500
            transition
          "
        />

        <button
          type="button"
          onClick={() =>
            setShowConfirmPassword(
              !showConfirmPassword
            )
          }
          className="
            absolute
            right-4
            top-1/2
            -translate-y-1/2
            text-slate-400
            hover:text-slate-600
          "
        >
          {showConfirmPassword ? (
            <Eye size={20} />
          ) : (
            <EyeOff size={20} />
          )}
        </button>

      </div>

    </div>

    {/* BUTTON */}
    <button
      type="submit"
      disabled={changingPassword}
      className="
        w-full
        py-4
        rounded-2xl
        bg-slate-800
        text-white
        font-bold
        hover:bg-slate-900
        transition
        disabled:opacity-50
        disabled:cursor-not-allowed
      "
    >
      {changingPassword
        ? "Changing Password..."
        : "Change Password"}
    </button>

  </form>

</div>
)}    
    </div>

  </div>

</div>


);

};

export default EditProfile;
