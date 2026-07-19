import { NavLink } from "react-router-dom";

/**
 * Left sidebar navigation. On mobile it slides in/out based on `isOpen`.
 */
const Sidebar = ({ isOpen, onClose }) => {
  const navItems = [
    { to: "/dashboard", icon: "bi-speedometer2", label: "Dashboard" },
    { to: "/students", icon: "bi-people-fill", label: "Students" },
    { to: "/students/add", icon: "bi-person-plus-fill", label: "Add Student" },
  ];

  return (
    <>
      {/* Mobile overlay */}
      {isOpen && (
        <div className="sidebar-overlay d-lg-none" onClick={onClose}></div>
      )}

      <aside className={`app-sidebar ${isOpen ? "open" : ""}`}>
        <nav className="nav flex-column p-3">
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) =>
                `nav-link sidebar-link ${isActive ? "active" : ""}`
              }
              onClick={onClose}
              end={item.to === "/students"}
            >
              <i className={`bi ${item.icon} me-2`}></i>
              {item.label}
            </NavLink>
          ))}
        </nav>
      </aside>
    </>
  );
};

export default Sidebar;
