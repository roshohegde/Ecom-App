import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { ErrorMessage } from "../components/State";

function AuthShell({ eyebrow, title, children, footer }) {
  return (
    <section className="auth-layout">
      <aside className="auth-visual">
        <Link to="/products" className="auth-logo">
          NOVA<span>store</span>
        </Link>
        <div>
          <p className="eyebrow">DESIGNED FOR EVERYDAY</p>
          <h2>
            Good things,
            <br />
            <em>simply chosen.</em>
          </h2>
          <p>
            A thoughtful collection, a seamless checkout, and a little more room
            for what matters.
          </p>
        </div>
        <small>EST. 2026 · EVERYDAY GOODS</small>
      </aside>
      <div className="auth-stage">
        <div className="auth-card">
          <p className="eyebrow">{eyebrow}</p>
          <h1>{title}</h1>
          <p className="form-intro">
            Use your Nova Store account to save your cart and follow your
            orders.
          </p>
          {children}
          {footer && <footer>{footer}</footer>}
        </div>
      </div>
    </section>
  );
}
export function LoginPage() {
  const { login } = useAuth(),
    navigate = useNavigate(),
    location = useLocation(),
    [form, setForm] = useState({ email: "", password: "" }),
    [error, setError] = useState(""),
    [busy, setBusy] = useState(false);
  const submit = async (e) => {
    e.preventDefault();
    setBusy(true);
    setError("");
    try {
      const session = await login(form);
      navigate(location.state?.from || (session.role === "ADMIN" ? "/admin/catalog" : session.role === "SELLER" ? "/seller/catalog" : "/products"));
    } catch (e) {
      setError(e.message);
    } finally {
      setBusy(false);
    }
  };
  return (
    <AuthShell
      eyebrow="WELCOME BACK"
      title="Sign in"
      footer={
        <>
          New to Nova? <Link to="/register">Create an account</Link>
        </>
      }
    >
      <form onSubmit={submit}>
        <label>
          Email address
          <input
            type="email"
            autoComplete="email"
            placeholder="you@example.com"
            required
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
          />
        </label>
        <label>
          Password
          <input
            type="password"
            autoComplete="current-password"
            placeholder="At least 8 characters"
            minLength="8"
            required
            value={form.password}
            onChange={(e) => setForm({ ...form, password: e.target.value })}
          />
        </label>
        <ErrorMessage error={error} />
        <button className="button auth-submit" disabled={busy}>
          {busy ? "Signing you in…" : "Sign in to your account"} <span>→</span>
        </button>
      </form>
    </AuthShell>
  );
}
export function RegisterPage() {
  const { register } = useAuth(),
    navigate = useNavigate(),
    [form, setForm] = useState({
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      confirm: "",
      mobileNumber: "",
      role: "CUSTOMER",
    }),
    [error, setError] = useState(""),
    [busy, setBusy] = useState(false);
  const update = (k, v) => setForm({ ...form, [k]: v });
  const submit = async (e) => {
    e.preventDefault();
    if (form.password !== form.confirm)
      return setError("Passwords do not match.");
    setBusy(true);
    setError("");
    try {
      await register({
        firstName: form.firstName,
        lastName: form.lastName,
        email: form.email,
        password: form.password,
        mobileNumber: form.mobileNumber,
        role: form.role,
      });
      navigate("/products");
    } catch (e) {
      setError(e.message);
    } finally {
      setBusy(false);
    }
  };
  return (
    <AuthShell
      eyebrow="WELCOME TO NOVA"
      title="Create your account"
      footer={
        <>
          Already have an account? <Link to="/login">Sign in</Link>
        </>
      }
    >
      <form onSubmit={submit}>
        <div className="form-grid">
          <label>
            First name
            <input
              autoComplete="given-name"
              placeholder="Avery"
              required
              value={form.firstName}
              onChange={(e) => update("firstName", e.target.value)}
            />
          </label>
          <label>
            Last name
            <input
              autoComplete="family-name"
              placeholder="Smith"
              required
              value={form.lastName}
              onChange={(e) => update("lastName", e.target.value)}
            />
          </label>
        </div>
        <label>
          Email address
          <input
            type="email"
            autoComplete="email"
            placeholder="you@example.com"
            required
            value={form.email}
            onChange={(e) => update("email", e.target.value)}
          />
        </label>
        <label>
          Mobile number <small>(optional)</small>
          <input
            autoComplete="tel"
            placeholder="+91 98765 43210"
            value={form.mobileNumber}
            onChange={(e) => update("mobileNumber", e.target.value)}
          />
        </label>
        <label>
          Password
          <input
            type="password"
            autoComplete="new-password"
            placeholder="At least 8 characters"
            minLength="8"
            required
            value={form.password}
            onChange={(e) => update("password", e.target.value)}
          />
        </label>
        <label>
          Confirm password
          <input
            type="password"
            autoComplete="new-password"
            placeholder="Repeat your password"
            required
            value={form.confirm}
            onChange={(e) => update("confirm", e.target.value)}
          />
        </label>
        <label>
          Account type
          <select value={form.role} onChange={(e) => update("role", e.target.value)}>
            <option value="CUSTOMER">Customer - shop and place orders</option>
            <option value="SELLER">Seller - list and manage your products</option>
          </select>
        </label>
        <ErrorMessage error={error} />
        <button className="button auth-submit" disabled={busy}>
          {busy ? "Creating your account…" : "Create your account"}{" "}
          <span>→</span>
        </button>
      </form>
    </AuthShell>
  );
}
