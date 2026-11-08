import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../features/auth/authSlice";
import { useNavigate, Link } from "react-router-dom";
import api from "../services/axiosInstance";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error } = useSelector((state) => state.auth);

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [step, setStep] = useState("login");
  const [message, setMessage] = useState("");
  const [otp, setOtp] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [loadingAction, setLoadingAction] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // 🔐 LOGIN
  const handleSubmit = async (e) => {
    e.preventDefault();
    const result = await dispatch(loginUser(formData));
    if (result.meta.requestStatus === "fulfilled") {
      navigate("/");
    }
  };

  // 📩 SEND OTP
  const handleForgotPassword = async () => {
    try {
      setLoadingAction(true);
      const res = await api.post("/auth/forgot-password", {
        email: formData.email,
      });

      setMessage(res.data.message);
      setStep("otp");
    } catch (err) {
      setMessage(err.response?.data?.message || "Something went wrong");
    } finally {
      setLoadingAction(false);
    }
  };

  // 🔢 VERIFY OTP
  const handleVerifyOtp = async () => {
    try {
      setLoadingAction(true);
      const res = await api.post("/auth/verify-otp", {
        email: formData.email,
        otp,
      });

      setMessage(res.data.message);
      setStep("reset");
    } catch (err) {
      setMessage(err.response?.data?.message || "Invalid OTP");
    } finally {
      setLoadingAction(false);
    }
  };

  // 🔁 RESET PASSWORD
  const handleResetPassword = async () => {
    try {
      setLoadingAction(true);
      const res = await api.post("/auth/reset-password", {
        email: formData.email,
        newPassword,
      });

      setMessage("Password reset successful. Please login.");
      setStep("login");
      setOtp("");
      setNewPassword("");
    } catch (err) {
      setMessage(err.response?.data?.message || "Reset failed");
    } finally {
      setLoadingAction(false);
    }
  };

  return (
    <div className="min-h-screen flex">
      {/* LEFT SIDE */}
      <div className="hidden md:flex w-1/2 bg-gradient-to-br from-black to-gray-800 text-white flex-col justify-center px-16">
        <h1 className="text-4xl font-bold mb-6">Welcome Back.</h1>
        <p className="text-lg text-gray-300">
          Sign in to continue your premium shopping experience.
        </p>
        <div className="mt-10 text-sm text-gray-400">
          © {new Date().getFullYear()} MERN Shop
        </div>
      </div>

      {/* RIGHT SIDE */}
      <div className="w-full md:w-1/2 flex items-center justify-center px-6">
        <div className="w-full max-w-md">
          <h2 className="text-3xl font-bold mb-8 capitalize">
            {step === "login" && "Login"}
            {step === "forgot" && "Forgot Password"}
            {step === "otp" && "Verify OTP"}
            {step === "reset" && "Reset Password"}
          </h2>

          {error && step === "login" && (
            <div className="bg-red-100 text-red-600 p-3 rounded mb-6">
              {error}
            </div>
          )}

          {message && (
            <div className="bg-blue-100 text-blue-600 p-3 rounded mb-6">
              {message}
            </div>
          )}

          {/* LOGIN FORM */}
          {step === "login" && (
            <form onSubmit={handleSubmit} className="space-y-6">
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Email"
                required
                className="w-full border rounded-lg px-4 py-3"
              />

              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Password"
                required
                className="w-full border rounded-lg px-4 py-3"
              />

              <div className="text-right text-sm">
                <button
                  type="button"
                  onClick={() => setStep("forgot")}
                  className="text-black hover:underline"
                >
                  Forgot Password?
                </button>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-black text-white py-3 rounded-lg"
              >
                {loading ? "Signing in..." : "Sign In"}
              </button>
            </form>
          )}

          {/* FORGOT EMAIL */}
          {step === "forgot" && (
            <div className="space-y-6">
              <input
                type="email"
                placeholder="Enter your email"
                value={formData.email}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
                className="w-full border rounded-lg px-4 py-3"
              />

              <button
                onClick={handleForgotPassword}
                className="w-full bg-black text-white py-3 rounded-lg"
              >
                {loadingAction ? "Sending..." : "Send OTP"}
              </button>
            </div>
          )}

          {/* OTP */}
          {step === "otp" && (
            <div className="space-y-6">
              <input
                type="text"
                placeholder="Enter OTP"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                className="w-full border rounded-lg px-4 py-3"
              />

              <button
                onClick={handleVerifyOtp}
                className="w-full bg-black text-white py-3 rounded-lg"
              >
                {loadingAction ? "Verifying..." : "Verify OTP"}
              </button>
            </div>
          )}

          {/* RESET */}
          {step === "reset" && (
            <div className="space-y-6">
              <input
                type="password"
                placeholder="New password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                className="w-full border rounded-lg px-4 py-3"
              />

              <button
                onClick={handleResetPassword}
                className="w-full bg-black text-white py-3 rounded-lg"
              >
                {loadingAction ? "Resetting..." : "Reset Password"}
              </button>
            </div>
          )}

          {step === "login" && (
            <p className="mt-6 text-sm text-gray-600">
              Don’t have an account?{" "}
              <Link
                to="/register"
                className="text-black font-medium hover:underline"
              >
                Register
              </Link>
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Login;
