import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useAuth } from "@/app/context/AuthContext";

export default function Formpage() {
  const router = useRouter();
  const [form, setForm] = useState({
    name: "",
    email: "",
    pass: "",
    pass2: "",
    terms: false,
  });
  const [submitted, setSubmitted] = useState(false);
  const [notification, setNotification] = useState({
    show: false,
    message: "",
    type: "",
  });

  const { user, loading, signupUser } = useAuth();

  useEffect(() => {
    if (user) {
      setSubmitted(true);
    }
  }, [user]);
  const handleGoogleLogin = () => {
    router.push(`${process.env.NEXT_PUBLIC_API_URL}/auth/google`);
  };

  const showNotification = (message, type) => {
    setNotification({ show: true, message, type });
    setTimeout(() => {
      setNotification({ show: false, message: "" });
    }, 3000);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await signupUser(form);
      setSubmitted(true);
    } catch (err) {
      showNotification(
        err.message || "An error occurred during signup. Please try again.",
        "error"
      );
    }
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  if (submitted) {
    return (
      <div
        className="flex flex-col z-20 border-amber-600 border-2 rounded-lg py-10 px-10 h-fit justify-center md:w-140 w-100 text-center"
        style={{ backgroundColor: "rgba(0,0,0)" }}
      >
        <h2 className="text-3xl font-bold mb-4">Thank You for Registering!</h2>
        <p className="text-lg text-gray-300 mb-2">
          We've received your CA application.
        </p>
        <p className="text-md text-gray-400">
          Our team will review your information and get back to you shortly.
        </p>
      </div>
    );
  }

  return (
    <>
      {/* Slide-in Notification */}
      <div
        className={`fixed top-5 right-0 z-50 transition-all duration-300 transform ${
          notification.show ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div
          className="rounded-lg px-6 py-4 shadow-lg flex items-center gap-3 
            bg-red-600 border-red-700 border-2"
        >
          <p className="font-medium">{notification.message}</p>
        </div>
      </div>

      <div
        className="flex flex-col z-20 border-amber-600 border-2 rounded-lg py-5 px-10 h-fit justify-center md:w-140 w-100"
        style={{ backgroundColor: "rgba(0,0,0)" }}
      >
        <h1 className="text-center font-bold md:text-4xl text-2xl mb-5">
          Register for CA
        </h1>

        <button
          className="text-center bg-white text-black mb-5 md:w-100 w-50 rounded-4xl p-2 self-center"
          style={{ cursor: "pointer" }}
          onClick={handleGoogleLogin}
        >
          Sign Up with Google
        </button>
        <p className="text-center mb-7" style={{ fontSize: "15px" }}>
          By clicking "Sign Up with Google", You agree to the <br />
          <a
            href=""
            className="text-white"
            style={{ textDecoration: "Underline" }}
          >
            Terms of Service{" "}
          </a>
          and acknowledge{" "}
          <a
            href=""
            className="text-white"
            style={{ textDecoration: "Underline" }}
          >
            Privacy Policy
          </a>
        </p>

        <hr className="mb-5" />

        <form className="flex flex-col" onSubmit={handleSubmit}>
          <label
            htmlFor="name"
            className="mb-2"
            style={{ fontFamily: "Montserrat" }}
          >
            Full Name
          </label>
          <input
            type="text"
            name="name"
            value={form.name}
            onChange={handleChange}
            className="border-2 border-gray-500 p-3 outline-0 rounded-2xl mb-3"
            style={{ backgroundColor: "#1E1E1E" }}
            placeholder="Name"
            required
          />
          <label className="mb-2" htmlFor="email">
            Email
          </label>
          <input
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            className="border-2 border-gray-500 p-3 outline-0 rounded-2xl mb-3"
            style={{ backgroundColor: "#1E1E1E" }}
            placeholder="Email"
            required
          />
          <label className="mb-2" htmlFor="password">
            Password
          </label>
          <input
            type="password"
            name="pass"
            value={form.pass}
            onChange={handleChange}
            className="border-2 border-gray-500 p-3 outline-0 rounded-2xl mb-3"
            style={{ backgroundColor: "#1E1E1E" }}
            placeholder="********"
            required
          />
          <label className="mb-2" htmlFor="confirm-password">
            Confirm Password
          </label>
          <input
            type="password"
            name="pass2"
            value={form.pass2}
            onChange={handleChange}
            className="border-2 border-gray-500 p-3 outline-0 rounded-2xl mb-3"
            style={{ backgroundColor: "#1E1E1E" }}
            placeholder="********"
            required
          />
          <div className="mb-5">
            <input
              type="checkbox"
              name="terms"
              checked={form.terms}
              onChange={handleChange}
              required
              className="mx-2 border-gray-500"
              style={{ backgroundColor: "#1E1E1E" }}
              id="terms"
            />
            <label htmlFor="terms" className="text-center">
              I agree to the{" "}
              <a href="" style={{ textDecoration: "Underline" }}>
                Terms of Service
              </a>{" "}
              by cogni.study and acknowledge{" "}
              <a href="" style={{ textDecoration: "Underline" }}>
                Privacy Policy
              </a>{" "}
            </label>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="text-center bg-white text-black mb-5 md:w-100 w-50 rounded-4xl p-2 self-center disabled:opacity-50 disabled:cursor-not-allowed"
            style={{ cursor: "pointer" }}
          >
            {loading ? "Signing Up..." : "Sign Up"}
          </button>
        </form>
      </div>
    </>
  );
}
