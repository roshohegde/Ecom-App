import { Link, NavLink, Outlet, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
export function Layout() {
  const { user, logout } = useAuth(),
    navigate = useNavigate();
  return (
    <>
      <header className="topbar">
        <Link to="/" className="logo">
          NOVA<span>store</span>
        </Link>
        <nav>
          <NavLink to="/products">Shop</NavLink>
          {user && <NavLink to="/cart">Cart</NavLink>}
          {user && <NavLink to="/orders">My orders</NavLink>}
          {user?.role === "SELLER" && (
            <NavLink to="/seller/catalog">Seller workspace</NavLink>
          )}
          {user?.role === "ADMIN" && (
            <NavLink to="/admin/catalog">Admin catalogue</NavLink>
          )}
        </nav>
        <div>
          {user ? (
            <>
              <span className="role">{user.role}</span>
              <button
                className="text-button"
                onClick={() => {
                  logout();
                  navigate("/");
                }}
              >
                Sign out
              </button>
            </>
          ) : (
            <>
              <Link className="text-button" to="/login">
                Sign in
              </Link>
              <Link className="button small" to="/register">
                Create account
              </Link>
            </>
          )}
        </div>
      </header>
      <main className="shell">
        <Outlet />
      </main>
    </>
  );
}
