import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import api from "../services/api";

function AddEmployee() {

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [city, setCity] = useState("");

    // POST: Add new employee
    const mutation = useMutation({

        mutationFn: async (newEmployee) => {
            const response = await api.post("/users", newEmployee);
            return response.data;
        },

        onSuccess: (data) => {
            alert("Employee added successfully!");

            console.log(data);

            setName("");
            setEmail("");
            setCity("");
        }
    });

    // Handle form submission
    function handleSubmit(e) {

        e.preventDefault();

        const newEmployee = {
            name: name,
            email: email,

            address: {
                city: city
            }
        };

        mutation.mutate(newEmployee);
    }

    return (
        <div>

            <h1>Add New Employee</h1>

            <Link to="/employees">Back to Employees</Link>

            <br /><br />

            <form onSubmit={handleSubmit}>

                <input
                    type="text"
                    placeholder="Employee Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                />

                <br /><br />

                <input
                    type="email"
                    placeholder="Employee Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />

                <br /><br />

                <input
                    type="text"
                    placeholder="Employee City"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    required
                />

                <br /><br />

                <button type="submit" disabled={mutation.isPending}>
                    {mutation.isPending ? "Adding..." : "Add Employee"}
                </button>

            </form>

        </div>
    );
}

export default AddEmployee;