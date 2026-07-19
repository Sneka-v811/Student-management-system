import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { toast } from "react-toastify";

/**
 * Top navigation bar shown on all authenticated pages.
 * Includes a mobile sidebar toggle, brand, and admin/logout menu.
 */
const Navbar = ({ onToggleSidebar }) => {
  const { admin, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    toast.info("You have been logged out");
    navigate("/login");
  };

  return (
    <nav className="navbar navbar-expand-lg app-navbar shadow-sm px-3">
      <button
        className="btn btn-outline-light d-lg-none me-2"
        onClick={onToggleSidebar}
        aria-label="Toggle sidebar"
      >
        <i className="bi bi-list fs-4"></i>
      </button>

      <span className="navbar-brand fw-bold d-flex align-items-center gap-2">
        <i className="bi bi-mortarboard-fill"></i>
        Student Management System
      </span>

      <div className="ms-auto d-flex align-items-center gap-3">
        <div className="dropdown">
          <button
            className="btn btn-outline-light dropdown-toggle d-flex align-items-center gap-2"
            type="button"
            data-bs-toggle="dropdown"
            aria-expanded="false"
          >
            <i className="bi bi-person-circle fs-5"></i>
            <span className="d-none d-sm-inline">{admin?.name || "Admin"}</span>
          </button>
          <ul className="dropdown-menu dropdown-menu-end">
            <li>
              <span className="dropdown-item-text text-muted small">
                {admin?.email}
              </span>
            </li>
            <li>
              <hr className="dropdown-divider" />
            </li>
            <li>
              <button className="dropdown-item text-danger" onClick={handleLogout}>
                <i className="bi bi-box-arrow-right me-2"></i>
                Logout
              </button>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
