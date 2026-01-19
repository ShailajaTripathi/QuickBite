import { useState,useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

const Auth = () => {
  const { signup, login } = useAuth();
  const navigate = useNavigate();
  const [isSignup, setIsSignup] = useState(false);
 const [formData, setFormData] = useState({ name: "", email: "" });
  const [errors, setErrors] = useState({ name: "", email: "" });

  // 2. Centralized Validation Logic
  const validate = (fieldName, value) => {
    switch (fieldName) {
      case "email":
        if (!value) return "Email is required";
        if (!/\S+@\S+\.\S+/.test(value)) return "Invalid email format";
        return "";
      case "name":
        if (isSignup && !value) return "Name is required";
        if (isSignup && value.length < 2) return "Name is too short";
        return "";
      default:
        return "";
    }
  };
  // 3. Handle Input Change (Real-time clearing)
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    // Validate as the user types
    const error = validate(name, value);
    setErrors((prev) => ({ ...prev, [name]: error }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // 4. Final Validation check before submitting
    const emailErr = validate("email", formData.email);
    const nameErr = isSignup ? validate("name", formData.name) : "";

    if (emailErr || nameErr) {
      setErrors({ email: emailErr, name: nameErr });
      return;
    }

    if (isSignup) {
      signup({ name: formData.name, email: formData.email });
      navigate("/");
    } else {
      const success = login(formData.email);
      if (success) {
        navigate("/");
      } else {
        setErrors((prev) => ({ ...prev, email: "User not found. Please signup first." }));
      }
    }
  };

// Clear errors when switching between Login and Signup
  useEffect(() => {
    setErrors({ name: "", email: "" });
  }, [isSignup]);
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
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="w-full border p-2 rounded"
          />
        )}
{errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
        <input
          type="email"
          placeholder="Email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          className="w-full border p-2 rounded"
        />

        {errors.email && <p className="text-red-500">{errors.email}</p>}

        <button className="bg-green-600 text-white px-4 py-2 rounded w-full">
          {isSignup ? "Sign Up" : "Login"}
        </button>
      </form>

      <div
        className={`text-center mt-4 cursor-pointer text-green-600`}
        onClick={() => setIsSignup(!isSignup)}
      >
        {isSignup
          ? <p>Already have an account?<span className="!text-blue-600"> Login</span></p>
          : <p>New user ? <span className="!text-blue-600">Sign up</span></p>}
      </div>
    </div>
  );
};

export default Auth;
