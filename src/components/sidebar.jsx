import { NavLink } from "react-router-dom";

function Sidebar() {
    return (
        <aside className="sidebar">
            <h2>Menu</h2>

            <nav className="sidebar-links">
                <NavLink to="/" end>
                    Dashboard
                </NavLink>

                <NavLink to="/employees">
                    Employees
                </NavLink>

                <NavLink to="/add-employee">
                    Add Employee
                </NavLink>
            </nav>
        </aside>
    );
}

export default Sidebar;