export default function FormInfo() {
  return (
    <form action="" className="flex flex-col">
      <label
        htmlFor="name"
        className="mb-2"
        style={{ fontFamily: "Montserrat" }}
      >
        Full Name
      </label>
      <input
        type="text"
        className="border-2  border-gray-500  p-3  outline-0 rounded-2xl mb-3"
        style={{ backgroundColor: "#1E1E1E" }}
        placeholder="Name"
        required
      />
      <label className="mb-2" htmlFor="email">
        Email
      </label>
      <input
        type="email"
        className="border-2 border-gray-500  p-3 outline-0 rounded-2xl mb-3"
        style={{ backgroundColor: "#1E1E1E" }}
        placeholder="Email"
        required
      />
      <label className="mb-2" htmlFor="password">
        Password
      </label>
      <input
        type="password"
        className="border-2 border-gray-500  p-3 outline-0 rounded-2xl mb-3"
        style={{ backgroundColor: "#1E1E1E" }}
        placeholder="*****"
        required
      />
      <label className="mb-2" htmlFor="confirm-password">
        Confirm Password
      </label>
      <input
        type="password"
        className="border-1 border-gray-500  p-3 rounded-2xl mb-5"
        style={{ backgroundColor: "#1E1E1E" }}
        placeholder="*******"
        required
      />
      <div className="mb-5">
        <input
          type="checkbox"
          required
          className="mx-2 border-gray-500"
          style={{ backgroundColor: "#1E1E1E" }}
          id="terms"
        />
        <label htmlFor="terms" className="text-center">
          I agree to the{" "}
          <a href="#" style={{ textDecoration: "Underline" }}>
            Terms of Service
          </a>{" "}
          by cogni.study and acknolwedge{" "}
          <a href="#" style={{ textDecoration: "Underline" }}>
            Privacy Policy
          </a>
        </label>
      </div>

      <button
        type="submit"
        className="text-center bg-white text-black mb-5 md:w-100 w-50 rounded-4xl p-2 self-center"
        style={{ cursor: "pointer" }}
      >
        Sign Up
      </button>
    </form>
  );
}
