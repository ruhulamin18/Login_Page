import { useEffect, useState } from "react";
import "./global.css";

const MESSAGES = [
  { text: "Great minds log in daily. Are you one of them?", icon: "01" },
  { text: "Your next big idea is just one login away.", icon: "02" },
  { text: "The team is waiting. Don't keep them hanging!", icon: "03" },
  { text: "You've been missed. Welcome back, legend.", icon: "04" },
  { text: "Coffee in hand? Good. Now let's get to work.", icon: "05" },
];

export default function LoginPage({ onNavigate }) {
  const [form, setForm] = useState({ email: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [msgIndex, setMsgIndex] = useState(() => Math.floor(Math.random() * MESSAGES.length));
  const [msgVisible, setMsgVisible] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setMsgVisible(false);
      setTimeout(() => {
        setMsgIndex((i) => (i + 1) % MESSAGES.length);
        setMsgVisible(true);
      }, 400);
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.email || !form.password) {
      setError("Please fill in all fields.");
      return;
    }

    setLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 1500));
    setLoading(false);
    alert(`Logged in as ${form.email}`);
  };

  return (
    <div className="auth-root">
      <div className="auth-panel--left">
        <div className="brand">
          <span className="brand-icon">⬡</span>
          <span className="brand-name">Nexus</span>
        </div>

        <div className="tagline">
          <h1>
            Your workspace,
            <br />
            reimagined.
          </h1>
          <p>Everything your team needs - in one place, always in sync.</p>
        </div>

        <div className="floating-card">
          <div className="fc-dot fc-dot--green" />
          <span>12 teammates online</span>
        </div>
      </div>

      <div className="auth-panel--right">
        <div className="form-card">
          <div className={`unique-msg ${msgVisible ? "unique-msg--visible" : ""}`}>
            <span className="unique-msg__emoji">{MESSAGES[msgIndex].icon}</span>
            <span className="unique-msg__text">{MESSAGES[msgIndex].text}</span>
          </div>

          <p className="form-eyebrow">Welcome back</p>
          <h2 className="form-title">Sign in to Nexus</h2>

          <form onSubmit={handleSubmit} noValidate>
            <div className="field">
              <label htmlFor="email">Email</label>
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                placeholder="you@example.com"
                value={form.email}
                onChange={handleChange}
              />
            </div>

            <div className="field">
              <div className="label-row">
                <label htmlFor="password">Password</label>
                <a href="#forgot-password" className="forgot-link">
                  Forgot password?
                </a>
              </div>

              <div className="password-wrap">
                <input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  autoComplete="current-password"
                  placeholder="********"
                  value={form.password}
                  onChange={handleChange}
                />
                <button
                  type="button"
                  className="toggle-pw"
                  onClick={() => setShowPassword(!showPassword)}
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? "Hide" : "Show"}
                </button>
              </div>
            </div>

            {error && <p className="error-msg">{error}</p>}

            <button type="submit" className="btn-primary" disabled={loading}>
              {loading ? <span className="spinner" /> : "Sign in"}
            </button>
          </form>

          <div className="divider">
            <span>or</span>
          </div>

          <button className="btn-google" type="button">
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true">
              <path d="M17.64 9.2c0-.637-.057-1.251-.164-1.84H9v3.481h4.844a4.14 4.14 0 0 1-1.796 2.716v2.259h2.908c1.702-1.567 2.684-3.875 2.684-6.615Z" fill="#4285F4" />
              <path d="M9 18c2.43 0 4.467-.806 5.956-2.18l-2.908-2.259c-.806.54-1.837.86-3.048.86-2.344 0-4.328-1.584-5.036-3.711H.957v2.332A8.997 8.997 0 0 0 9 18Z" fill="#34A853" />
              <path d="M3.964 10.71A5.41 5.41 0 0 1 3.682 9c0-.593.102-1.17.282-1.71V4.958H.957A8.996 8.996 0 0 0 0 9c0 1.452.348 2.827.957 4.042l3.007-2.332Z" fill="#FBBC05" />
              <path d="M9 3.58c1.321 0 2.508.454 3.44 1.345l2.582-2.58C13.463.891 11.426 0 9 0A8.997 8.997 0 0 0 .957 4.958L3.964 7.29C4.672 5.163 6.656 3.58 9 3.58Z" fill="#EA4335" />
            </svg>
            Continue with Google
          </button>

          <p className="switch-prompt">
            Don't have an account?{" "}
            <button type="button" className="text-link" onClick={() => onNavigate("signup")}>
              Create one
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}
