
import { NavLink } from "react-router-dom";

function Sidebar() {
  return (
    <aside className="sidebar">

      <div className="sidebar-logo">
        <div className="logo-icon">S</div>

        <div>
          <h2>SMS</h2>
          <p>Student Management</p>
        </div>
      </div>

      <p className="sidebar-label">MAIN MENU</p>

      <nav className="sidebar-menu">

        <NavLink to="/dashboard" end>
          <span>🏠</span>
          Dashboard
        </NavLink>

        <a href="#students">
          <span>👨‍🎓</span>
          Students
        </a>

        <a href="#add-student">
          <span>➕</span>
          Add Student
        </a>

      </nav>

      <div className="sidebar-footer">
        <p>Student Management System</p>
        <small>Version 1.0</small>
      </div>

    </aside>
  );
}

export default Sidebar;
