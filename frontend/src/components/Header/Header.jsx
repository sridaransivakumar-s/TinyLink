import { Link, useLocation } from "react-router-dom";
import "./Header.css";

export default function Header() {
  const { pathname } = useLocation();

  return (
    <nav className="header">
      <h2 className="logo">TinyLink</h2>

      <div className="nav-links">
        <Link className={pathname === "/" ? "active" : ""} to="/">
          Dashboard
        </Link>

        <Link className={pathname === "/health" ? "active" : ""} to="/health">
          Health
        </Link>
      </div>
    </nav>
  );
}
