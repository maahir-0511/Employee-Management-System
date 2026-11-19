import { Link } from "react-router-dom";

function EmployeeTable({ employees = [], onDelete }) {
    return (
        <div className="table-container">
            <table className="employee-table">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Email</th>
                        <th>City</th>
                        <th>Actions</th>
                    </tr>
                </thead>

                <tbody>
                    {employees.map((employee) => (
                        <tr key={employee.id}>
                            <td>{employee.id}</td>
                            <td>{employee.name}</td>
                            <td>{employee.email}</td>
                            <td>{employee.address?.city}</td>

                            <td>
                                <Link to={`/employee/${employee.id}`}>
                                    View
                                </Link>

                                {" | "}

                                <Link to={`/edit-employee/${employee.id}`}>
                                    Edit
                                </Link>

                                {" | "}

                                <button
                                    onClick={() => onDelete(employee.id)}
                                >
                                    Delete
                                </button>
                            </td>
                        </tr>
                    ))}

                    {employees.length === 0 && (
                        <tr>
                            <td colSpan="5">No employees found!</td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
}

export default EmployeeTable;
