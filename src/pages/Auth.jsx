import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

const Auth = () => {
  const { signup, login } = useAuth();
  const navigate = useNavigate();
  const [isSignup, setIsSignup] = useState(true);
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [emailError, setEmailError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!email) {
      setEmailError("Email is required");
      return;
    }

    if (isSignup) {
      signup({ name, email });
      navigate("/");
    } else {
      const success = login(email);
      if (success) {
        navigate("/");
      } else {
        setEmailError("User not found. Please signup first.");
      }
    }
  };

  return (
    <div className="max-w-md mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">
        {isSignup ? "Sign Up" : "Login"}
      </h1>

      <form onSubmit={handleSubmit} className="space-y-4">
        {isSignup && (
          <input
            type="text"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full border p-2 rounded"
          />
        )}

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full border p-2 rounded"
        />

        {emailError && <p className="text-red-500">{emailError}</p>}

        <button className="bg-green-600 text-white px-4 py-2 rounded w-full">
          {isSignup ? "Sign Up" : "Login"}
        </button>
      </form>

      <p
        className={`text-center mt-4 cursor-pointer ${isSignup ? "text-green-600" : "text-blue-600"}`}
        onClick={() => setIsSignup(!isSignup)}
      >
        {isSignup
          ? "Already have an account? Login"
          : "New user ? Sign up"}
      </p>
    </div>
  );
};

export default Auth;
