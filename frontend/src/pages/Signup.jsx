import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../App.css";
import API_BASE_URL from "../config/api";

function Signup() {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [status, setStatus] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSignup = async (e) => {
    e.preventDefault();
    setStatus("");
    setLoading(true);

    try {
      const response = await fetch(`${API_BASE_URL}/api/auth/signup`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          email,
          password,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        setStatus(data.message || "Signup failed");
        setLoading(false);
        return;
      }

      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));

      window.dispatchEvent(new Event("userLogin"));

      setStatus("Account created successfully");
      setLoading(false);

      setTimeout(() => {
        navigate("/dashboard");
      }, 800);
    } catch (error) {
      setStatus("Server offline or backend not connected");
      setLoading(false);
    }
  };

  return (
    <div className="authPage">
      <div className="authCard">
        <span className="badge">Start free</span>

        <h1>Create your account</h1>

        <p>Start sending professional email campaigns.</p>

        <form onSubmit={handleSignup}>
          <input
            type="text"
            placeholder="Full name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />

          <input
            type="email"
            placeholder="Email address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <button type="submit" disabled={loading}>
            {loading ? "Creating account..." : "Create account"}
          </button>
        </form>

        {status && <h4 className="authStatus">{status}</h4>}

        <h4>
          Already have an account? <Link to="/login">Log in</Link>
        </h4>
      </div>
    </div>
  );
}

export default Signup;
