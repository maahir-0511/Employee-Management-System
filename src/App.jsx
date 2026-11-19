import { Routes, Route, Navigate } from "react-router-dom";
import Navbar from "./components/navbar";
import Sidebar from "./components/sidebar";
import Dashboard from "./pages/Dashboard";
import Employees from "./pages/Employees";
import AddEmployees from "./pages/AddEmployee";
import EditEmployees from "./pages/EditEmployees";
import EmployeDetail from "./pages/EmployeesDetails";
import "./App.css";

function App() {
  return (
    <div className="app-shell">
      <Navbar />
      <div className="app-body">
        <Sidebar />
        <main className="main-content">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/employees" element={<Employees />} />
            <Route path="/add-employee" element={<AddEmployees />} />
            <Route path="/employee/:id" element={<EmployeDetail />} />
            <Route path="/edit-employee/:id" element={<EditEmployees />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </main>
      </div>
    </div>
  );
}

export default App;
