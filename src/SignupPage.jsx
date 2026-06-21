import { useEffect, useState } from "react";
import "./global.css";

const MESSAGES = [
  { text: "Join thousands of teams already crushing it.", icon: "01" },
  { text: "Your journey starts with one small step - this one.", icon: "02" },
  { text: "Build something the world hasn't seen yet.", icon: "03" },
  { text: "Big things have small beginnings. Sign up!", icon: "04" },
  { text: "Your future self will thank you for this.", icon: "05" },
];

const STRENGTH_LABELS = ["", "Weak", "Fair", "Good", "Strong"];
const STRENGTH_COLORS = ["", "weak", "fair", "good", "strong"];

function getStrength(password) {
  if (!password) return 0;

  let score = 0;
  if (password.length >= 8) score++;
  if (/[A-Z]/.test(password)) score++;
  if (/[0-9]/.test(password)) score++;
  if (/[^A-Za-z0-9]/.test(password)) score++;

  return score;
}

export default function SignupPage({ onNavigate }) {
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirm: "",
    terms: false,
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
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

  const strength = getStrength(form.password);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm({ ...form, [name]: type === "checkbox" ? checked : value });
    setError("");
    setSuccess("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.firstName || !form.lastName || !form.email || !form.password || !form.confirm) {
      setError("Please fill in all fields.");
      return;
    }

    if (!/\S+@\S+\.\S+/.test(form.email)) {
      setError("Please enter a valid email address.");
      return;
    }

    if (form.password.length < 8) {
      setError("Password must be at least 8 characters.");
      return;
    }

    if (form.password !== form.confirm) {
      setError("Passwords do not match.");
      return;
    }

    if (!form.terms) {
      setError("You must agree to the Terms & Privacy Policy.");
      return;
    }

    setLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 1800));
    setLoading(false);
    setSuccess(`Account created for ${form.firstName}! You can now sign in.`);
    setForm({ firstName: "", lastName: "", email: "", password: "", confirm: "", terms: false });
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
            Join the future
            <br />
            of teamwork.
          </h1>
          <p>Set up your account in seconds and start collaborating with your team today.</p>
        </div>

        <div className="floating-card">
          <div className="fc-dot fc-dot--blue" />
          <span>5,200+ teams onboard</span>
        </div>
      </div>

      <div className="auth-panel--right">
        <div className="form-card">
          <div className={`unique-msg ${msgVisible ? "unique-msg--visible" : ""}`}>
            <span className="unique-msg__emoji">{MESSAGES[msgIndex].icon}</span>
            <span className="unique-msg__text">{MESSAGES[msgIndex].text}</span>
          </div>

          <p className="form-eyebrow">Get started free</p>
          <h2 className="form-title">Create your account</h2>

          <form onSubmit={handleSubmit} noValidate>
            <div className="field-row">
              <div className="field">
                <label htmlFor="firstName">First name</label>
                <input
                  id="firstName"
                  name="firstName"
                  type="text"
                  placeholder="Ruhul"
                  value={form.firstName}
                  onChange={handleChange}
                  autoComplete="given-name"
                />
              </div>

              <div className="field">
                <label htmlFor="lastName">Last name</label>
                <input
                  id="lastName"
                  name="lastName"
                  type="text"
                  placeholder="Amin"
                  value={form.lastName}
                  onChange={handleChange}
                  autoComplete="family-name"
                />
              </div>
            </div>

            <div className="field">
              <label htmlFor="email">Email</label>
              <input
                id="email"
                name="email"
                type="email"
                placeholder="you@example.com"
                value={form.email}
                onChange={handleChange}
                autoComplete="email"
              />
            </div>

            <div className="field">
              <label htmlFor="password">Password</label>
              <div className="password-wrap">
                <input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Min. 8 characters"
                  value={form.password}
                  onChange={handleChange}
                  autoComplete="new-password"
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

              {form.password && (
                <>
                  <div className="strength-bar">
                    {[1, 2, 3, 4].map((item) => (
                      <div
                        key={item}
                        className={`strength-bar__seg ${
                          item <= strength ? `strength-bar__seg--${STRENGTH_COLORS[strength]}` : ""
                        }`}
                      />
                    ))}
                  </div>
                  <p className="strength-label">{STRENGTH_LABELS[strength]}</p>
                </>
              )}
            </div>

            <div className="field">
              <label htmlFor="confirm">Confirm password</label>
              <div className="password-wrap">
                <input
                  id="confirm"
                  name="confirm"
                  type={showConfirm ? "text" : "password"}
                  placeholder="Re-enter password"
                  value={form.confirm}
                  onChange={handleChange}
                  autoComplete="new-password"
                />
                <button
                  type="button"
                  className="toggle-pw"
                  onClick={() => setShowConfirm(!showConfirm)}
                  aria-label={showConfirm ? "Hide password" : "Show password"}
                >
                  {showConfirm ? "Hide" : "Show"}
                </button>
              </div>
            </div>

            <div className="terms-row">
              <input
                type="checkbox"
                id="terms"
                name="terms"
                checked={form.terms}
                onChange={handleChange}
              />
              <label htmlFor="terms">
                I agree to the <a href="#terms">Terms of Service</a> and{" "}
                <a href="#privacy">Privacy Policy</a>
              </label>
            </div>

            {error && <p className="error-msg">{error}</p>}
            {success && <p className="success-msg">{success}</p>}

            <button type="submit" className="btn-primary" disabled={loading}>
              {loading ? <span className="spinner" /> : "Create account"}
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
            Sign up with Google
          </button>

          <p className="switch-prompt">
            Already have an account?{" "}
            <button type="button" className="text-link" onClick={() => onNavigate("login")}>
              Sign in
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}
