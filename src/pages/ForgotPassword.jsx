import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  ArrowRight,
  CheckCircle,
  Eye,
  EyeOff,
  LockKeyhole,
  Mail,
} from "lucide-react";
import toast from "react-hot-toast";

import API from "../services/api";

const ForgotPassword = () => {
  const navigate = useNavigate();
  const codeRefs = useRef([]);

  // ==============================
  // STATE
  // ==============================

  const [step, setStep] = useState("email");
  const [loading, setLoading] = useState(false);

  const [email, setEmail] = useState("");

  const [verificationCode, setVerificationCode] = useState([
    "",
    "",
    "",
    "",
    "",
    "",
  ]);

  const [resetId, setResetId] = useState(null);

  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] =
    useState(false);

  // ==============================
  // STEP 1
  // SEND PASSWORD RESET CODE
  // ==============================

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email.trim()) {
      toast.error("Please enter your email");
      return;
    }

    try {
      setLoading(true);

      const res = await API.post(
        "/users/forgot-password",
        {
          email: email.trim(),
        }
      );

      toast.success(res.data.message);

      setStep("verify");
    } catch (error) {
      console.error(error);

      toast.error(
        error.response?.data?.message ||
          "Something went wrong"
      );
    } finally {
      setLoading(false);
    }
  };

  // ==============================
  // STEP 2
  // OTP INPUT
  // ==============================

  const handleCodeChange = (index, value) => {
    // Only allow numbers
    if (!/^\d*$/.test(value)) {
      return;
    }

    const newCode = [...verificationCode];

    newCode[index] = value.slice(-1);

    setVerificationCode(newCode);

    // Automatically move to next input
    if (value && index < 5) {
      codeRefs.current[index + 1]?.focus();
    }
  };

  const handleCodeKeyDown = (index, e) => {
    // Move backwards when pressing backspace
    if (
      e.key === "Backspace" &&
      !verificationCode[index] &&
      index > 0
    ) {
      codeRefs.current[index - 1]?.focus();
    }
  };

  // ==============================
  // STEP 2
  // VERIFY CODE
  // ==============================

  const handleVerifyCode = async (e) => {
    e.preventDefault();

    // Make sure all 6 digits exist
    if (
      verificationCode.some(
        (digit) => !digit
      )
    ) {
      toast.error(
        "Please enter the 6-digit verification code"
      );

      return;
    }

    const code = verificationCode.join("");

    try {
      setLoading(true);

      const res = await API.post(
        "/users/verify-reset-code",
        {
          email: email.trim(),
          code,
        }
      );

      toast.success(res.data.message);

      // Save verified reset session
      setResetId(res.data.resetId);

      // Move to password step
      setStep("password");
    } catch (error) {
      console.error(error);

      toast.error(
        error.response?.data?.message ||
          "Verification failed"
      );
    } finally {
      setLoading(false);
    }
  };

  // ==============================
  // STEP 3
  // RESET PASSWORD
  // ==============================

  const handleResetPassword = async (e) => {
    e.preventDefault();

    // Validate new password
    if (!newPassword) {
      toast.error("Please enter a new password");
      return;
    }

    // Validate confirmation
    if (!confirmPassword) {
      toast.error(
        "Please confirm your new password"
      );

      return;
    }

    // Minimum password length
    if (newPassword.length < 8) {
      toast.error(
        "Password must be at least 8 characters"
      );

      return;
    }

    // Password match
    if (newPassword !== confirmPassword) {
      toast.error(
        "Passwords do not match"
      );

      return;
    }

    // Make sure verification was completed
    if (!resetId) {
      toast.error(
        "Password reset session is invalid"
      );

      return;
    }

    try {
      setLoading(true);

      const res = await API.post(
        "/users/reset-password",
        {
          resetId,
          newPassword,
          confirmPassword,
        }
      );

      toast.success(
        res.data.message ||
          "Password reset successfully!"
      );

      // Move to success screen
      setStep("success");
    } catch (error) {
      console.error(error);

      toast.error(
        error.response?.data?.message ||
          "Password reset failed"
      );
    } finally {
      setLoading(false);
    }
  };

  // ==============================
  // RESET OTP
  // ==============================

  const handleChangeEmail = () => {
    setStep("email");

    setVerificationCode([
      "",
      "",
      "",
      "",
      "",
      "",
    ]);
  };

  // ==============================
  // UI
  // ==============================

  return (
    <div
      className="
        min-h-screen
        flex
        items-center
        justify-center
        bg-cover
        bg-center
        px-6
      "
      style={{
        backgroundImage:
          "url('https://images.unsplash.com/photo-1500530855697-b586d89ba3ee')",
      }}
    >
      {/* Background Overlay */}
      <div
        className="
          absolute
          inset-0
          bg-black/40
        "
      />

      {/* Main Container */}
      <div
        className="
          relative
          z-10
          w-full
          max-w-md
          text-white
        "
      >
        {/* Card */}
        <div
          className="
            bg-white/10
            backdrop-blur-lg
            border
            border-white/20
            rounded-3xl
            p-8
            shadow-2xl
          "
        >
          {/* Back Button */}
          <button
            type="button"
            onClick={() => navigate("/login")}
            className="
              flex
              items-center
              gap-2
              text-white/70
              hover:text-white
              mb-8
              transition
            "
          >
            <ArrowLeft size={18} />

            Back to Login
          </button>

          {/* ==========================
              EMAIL STEP HEADER
          ========================== */}

          {step === "email" && (
            <>
              <div
                className="
                  w-16
                  h-16
                  mx-auto
                  mb-5
                  rounded-2xl
                  bg-sky-500/20
                  flex
                  items-center
                  justify-center
                "
              >
                <Mail
                  size={30}
                  className="text-sky-300"
                />
              </div>

              <h1
                className="
                  text-3xl
                  font-bold
                  text-center
                  mb-2
                "
              >
                Forgot Password?
              </h1>

              <p
                className="
                  text-center
                  text-white/70
                  mb-8
                "
              >
                Enter your email and we'll send
                you a verification code.
              </p>
            </>
          )}

          {/* ==========================
              EMAIL FORM
          ========================== */}

          {step === "email" && (
            <form
              onSubmit={handleSubmit}
              className="space-y-6"
            >
              <div>
                <label
                  className="
                    block
                    mb-2
                    text-sm
                  "
                >
                  Email Address
                </label>

                <input
                  type="email"
                  value={email}
                  onChange={(e) =>
                    setEmail(e.target.value)
                  }
                  placeholder="Enter your email"
                  className="
                    w-full
                    bg-white/10
                    border
                    border-white/20
                    rounded-xl
                    px-4
                    py-3
                    focus:outline-none
                    focus:ring-2
                    focus:ring-sky-400
                    placeholder-white/50
                  "
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="
                  w-full
                  bg-sky-500
                  hover:bg-sky-600
                  disabled:opacity-50
                  transition
                  py-3
                  rounded-xl
                  font-semibold
                "
              >
                {loading
                  ? "Sending..."
                  : "Send Verification Code"}
              </button>
            </form>
          )}

          {/* ==========================
              VERIFICATION STEP
          ========================== */}

          {step === "verify" && (
            <form
              onSubmit={handleVerifyCode}
              className="space-y-6"
            >
              {/* Title */}
              <div className="text-center">
                <h2
                  className="
                    text-2xl
                    font-bold
                    text-white
                    mb-3
                  "
                >
                  Enter 6-digit
                  verification code
                </h2>

                <p
                  className="
                    text-sm
                    text-white/70
                  "
                >
                  We sent a verification code to
                </p>

                <p
                  className="
                    text-sm
                    font-semibold
                    text-white
                    mt-1
                  "
                >
                  {email}
                </p>
              </div>

              {/* OTP Boxes */}
              <div
                className="
                  flex
                  justify-center
                  gap-3
                  py-4
                "
              >
                {verificationCode.map(
                  (digit, index) => (
                    <input
                      key={index}
                      ref={(el) => {
                        codeRefs.current[index] =
                          el;
                      }}
                      type="text"
                      inputMode="numeric"
                      maxLength={1}
                      value={digit}
                      onChange={(e) =>
                        handleCodeChange(
                          index,
                          e.target.value
                        )
                      }
                      onKeyDown={(e) =>
                        handleCodeKeyDown(
                          index,
                          e
                        )
                      }
                      className="
                        w-12
                        h-14
                        text-center
                        text-2xl
                        font-semibold
                        text-slate-800
                        bg-white
                        border-2
                        border-slate-200
                        rounded-xl
                        focus:outline-none
                        focus:border-sky-500
                        focus:ring-2
                        focus:ring-sky-200
                        transition
                      "
                    />
                  )
                )}
              </div>

              {/* Verify Button */}
              <button
                type="submit"
                disabled={loading}
                className="
                  w-full
                  bg-blue-600
                  hover:bg-blue-700
                  disabled:opacity-50
                  transition
                  py-3
                  rounded-xl
                  font-semibold
                  text-white
                  shadow-lg
                "
              >
                {loading
                  ? "Verifying..."
                  : "Verify"}
              </button>

              {/* Change Email */}
              <button
                type="button"
                onClick={handleChangeEmail}
                className="
                  w-full
                  text-sm
                  text-white/70
                  hover:text-white
                  transition
                "
              >
                ← Change Email
              </button>
            </form>
          )}

          {/* ==========================
              NEW PASSWORD STEP
          ========================== */}

          {step === "password" && (
            <form
              onSubmit={handleResetPassword}
              className="space-y-6"
            >
              {/* Header */}
              <div className="text-center">
                <div
                  className="
                    w-16
                    h-16
                    mx-auto
                    mb-5
                    rounded-2xl
                    bg-sky-500/20
                    flex
                    items-center
                    justify-center
                  "
                >
                  <LockKeyhole
                    size={32}
                    className="text-sky-300"
                  />
                </div>

                <h2
                  className="
                    text-2xl
                    font-bold
                    text-white
                    mb-2
                  "
                >
                  Create New Password
                </h2>

                <p
                  className="
                    text-sm
                    text-white/70
                  "
                >
                  Create a strong password for
                  your WanderEscape account.
                </p>
              </div>

              {/* New Password */}
              <div>
                <label
                  className="
                    block
                    mb-2
                    text-sm
                  "
                >
                  New Password
                </label>

                <div className="relative">
                  <input
                    type={
                      showNewPassword
                        ? "text"
                        : "password"
                    }
                    value={newPassword}
                    onChange={(e) =>
                      setNewPassword(
                        e.target.value
                      )
                    }
                    placeholder="Enter new password"
                    className="
                      w-full
                      bg-white/10
                      border
                      border-white/20
                      rounded-xl
                      px-4
                      py-3
                      pr-12
                      focus:outline-none
                      focus:ring-2
                      focus:ring-sky-400
                      placeholder-white/50
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
                      text-white/60
                      hover:text-white
                      transition
                    "
                  >
                    {showNewPassword ? (
                      <Eye size={20} />
                    ) : (
                      <EyeOff size={20} />
                    )}
                  </button>
                </div>
              </div>

              {/* Confirm Password */}
              <div>
                <label
                  className="
                    block
                    mb-2
                    text-sm
                  "
                >
                  Confirm Password
                </label>

                <div className="relative">
                  <input
                    type={
                      showConfirmPassword
                        ? "text"
                        : "password"
                    }
                    value={confirmPassword}
                    onChange={(e) =>
                      setConfirmPassword(
                        e.target.value
                      )
                    }
                    placeholder="Confirm new password"
                    className="
                      w-full
                      bg-white/10
                      border
                      border-white/20
                      rounded-xl
                      px-4
                      py-3
                      pr-12
                      focus:outline-none
                      focus:ring-2
                      focus:ring-sky-400
                      placeholder-white/50
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
                      text-white/60
                      hover:text-white
                      transition
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

              {/* Password Requirements */}
              <div
                className="
                  rounded-xl
                  bg-white/10
                  border
                  border-white/10
                  p-4
                  text-sm
                  text-white/70
                "
              >
                <p
                  className="
                    font-medium
                    text-white
                    mb-2
                  "
                >
                  Password requirements:
                </p>

                <p>
                  • At least 8 characters
                </p>

                <p>
                  • Use a strong password
                </p>
              </div>

              {/* Reset Button */}
              <button
                type="submit"
                disabled={loading}
                className="
                  w-full
                  bg-blue-600
                  hover:bg-blue-700
                  disabled:opacity-50
                  transition
                  py-3
                  rounded-xl
                  font-semibold
                  text-white
                  shadow-lg
                "
              >
                {loading
                  ? "Updating Password..."
                  : "Reset Password"}
              </button>
            </form>
          )}

          {/* ==========================
              SUCCESS STEP
          ========================== */}

          {step === "success" && (
            <div className="text-center">
              {/* Success Icon */}
              <div
                className="
                  w-20
                  h-20
                  mx-auto
                  mb-6
                  rounded-full
                  bg-green-500/20
                  flex
                  items-center
                  justify-center
                "
              >
                <CheckCircle
                  size={44}
                  className="text-green-400"
                />
              </div>

              {/* Title */}
              <h2
                className="
                  text-3xl
                  font-bold
                  text-white
                  mb-3
                "
              >
                Password Changed!
              </h2>

              {/* Description */}
              <p
                className="
                  text-white/70
                  leading-relaxed
                  mb-8
                "
              >
                Your password has been
                successfully updated.
                <br />

                You can now sign in using
                your new password.
              </p>

              {/* Login Button */}
              <button
                type="button"
                onClick={() =>
                  navigate("/login")
                }
                className="
                  w-full
                  flex
                  items-center
                  justify-center
                  gap-2
                  bg-blue-600
                  hover:bg-blue-700
                  transition
                  py-3
                  rounded-xl
                  font-semibold
                  text-white
                  shadow-lg
                "
              >
                Go to Login

                <ArrowRight size={20} />
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;