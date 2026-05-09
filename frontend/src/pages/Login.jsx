import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../App.css";

function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [status, setStatus] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    setStatus("");
    setLoading(true);

    try {
      const response = await fetch("http://localhost:5000/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          password,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        setStatus(data.message || "Login failed");
        setLoading(false);
        return;
      }

      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));

      window.dispatchEvent(new Event("userLogin"));

      setStatus("Login successful");
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
        <span className="badge">Welcome back</span>

        <h1>Login to MailFlow</h1>

        <p>Manage campaigns, contacts, and email history.</p>

        <form onSubmit={handleLogin}>
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
            {loading ? "Logging in..." : "Log in"}
          </button>
        </form>

        {status && <h4 className="authStatus">{status}</h4>}

        <h4>
          Don&apos;t have an account? <Link to="/signup">Create account</Link>
        </h4>
      </div>
    </div>
  );
}

export default Login;