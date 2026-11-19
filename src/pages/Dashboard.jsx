import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import api from "../services/api";
function Dashboard(){
const { data, isLoading, isError } = useQuery({
        queryKey: ["employees"],

        queryFn: async () => {
            const response = await api.get("/users");
            return response.data;

        }
    });
if (isLoading) return <h2>Loading dashboard...</h2>;

    if (isError) return <h2>Error loading dashboard!</h2>;

    const totalEmployees = data.length;

    const totalCompanies = new Set(
        data.map((employee) => employee.company.name)
    ).size;

    const totalCities = new Set(
        data.map((employee) => employee.address.city)
    ).size;


return(
<div>
<h1>Employee Management Dashboard</h1>

            <p>Welcome to Employee Management System.</p>

            <hr />

            <h2>Dashboard Statistics</h2>

            <div>
                <h3>Total Employees</h3>
                <p>{totalEmployees}</p>
            </div>

            <div>
                <h3>Total Companies</h3>
                <p>{totalCompanies}</p>
            </div>

            <div>
                <h3>Total Cities</h3>
                <p>{totalCities}</p>
            </div>
                        <hr />

            <h2>Quick Actions</h2>

            <Link to="/employees">
                View All Employees
            </Link>

            <br /><br />

            <Link to="/add-employee">
                Add New Employee
            </Link>

</div>
)
}

export default Dashboard;