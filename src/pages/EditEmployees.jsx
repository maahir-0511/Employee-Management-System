import { useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useParams, useNavigate, Link } from "react-router-dom";
import api from "../services/api";

function EmployeeEditForm({ employee, id }) {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const [name, setName] = useState(employee.name || "");
  const [email, setEmail] = useState(employee.email || "");
  const [city, setCity] = useState(employee.address?.city || "");

  const mutation = useMutation({
    mutationFn: async (updatedEmployee) => {
      const response = await api.put(`/users/${id}`, updatedEmployee);
      return response.data;
    },
    onSuccess: (updatedData) => {
      queryClient.setQueryData(["employee", id], updatedData);
      queryClient.invalidateQueries({ queryKey: ["employees"] });
      alert("Employee updated successfully!");
      navigate(`/employee/${id}`);
    },
    onError: () => alert("Unable to update employee. Please try again."),
  });

  function handleSubmit(e) {
    e.preventDefault();
    mutation.mutate({ ...employee, name, email, address: { ...(employee.address || {}), city } });
  }

  return (
    <section className="page-card form-card">
      <p className="eyebrow">EMPLOYEE DIRECTORY</p>
      <h1>Edit Employee</h1>
      <form onSubmit={handleSubmit} className="employee-form">
        <label>Employee Name<input value={name} onChange={(e) => setName(e.target.value)} required /></label>
        <label>Employee Email<input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required /></label>
        <label>Employee City<input value={city} onChange={(e) => setCity(e.target.value)} required /></label>
        <div className="form-actions">
          <button type="submit" disabled={mutation.isPending}>{mutation.isPending ? "Updating..." : "Update Employee"}</button>
          <Link to={`/employee/${id}`}>Cancel</Link>
        </div>
        {mutation.isError && <p className="error-text">Update failed. Please try again.</p>}
      </form>
    </section>
  );
}

function EditEmployees() {
  const { id } = useParams();
  const { data, isLoading, isError, error, refetch, isFetching } = useQuery({
    queryKey: ["employee", id],
    enabled: Boolean(id),
    queryFn: async () => {
      const response = await api.get(`/users/${id}`);
      if (!response.data?.id) throw new Error("Employee was not found.");
      return response.data;
    },
  });

  if (isLoading) return <p className="status-message">Loading employee details...</p>;
  if (isError) {
    return (
      <section className="page-card">
        <h1>Error loading employee</h1>
        <p className="error-text">{error?.message || "Please try again."}</p>
        <button type="button" onClick={() => refetch()} disabled={isFetching}>{isFetching ? "Retrying..." : "Try again"}</button>
        <p><Link to="/employees">Back to Employees</Link></p>
      </section>
    );
  }
  return <EmployeeEditForm key={id} employee={data} id={id} />;
}

export default EditEmployees;
