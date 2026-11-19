import { useQuery } from "@tanstack/react-query";
import { Link, useParams } from "react-router-dom";
import api from "../services/api";

function EmployeDetail() {
  const { id } = useParams();

  const { data, isLoading, isError, error, refetch, isFetching } = useQuery({
    queryKey: ["employee", id],
    enabled: Boolean(id),
    queryFn: async () => {
      const response = await api.get(`/users/${id}`);
      if (!response.data || !response.data.id) {
        throw new Error("Employee was not found.");
      }
      return response.data;
    },
  });

  if (isLoading) return <p className="status-message">Loading employee details...</p>;

  if (isError) {
    return (
      <section className="page-card">
        <h1>Unable to load employee details</h1>
        <p className="error-text">{error?.message || "Please check your connection and try again."}</p>
        <button type="button" onClick={() => refetch()} disabled={isFetching}>
          {isFetching ? "Retrying..." : "Try again"}
        </button>
        <p><Link to="/employees">Back to Employees</Link></p>
      </section>
    );
  }

  return (
    <section className="page-card">
      <div className="page-heading">
        <div>
          <p className="eyebrow">EMPLOYEE DIRECTORY</p>
          <h1>Employee Profile</h1>
        </div>
        <Link className="button-link" to={`/edit-employee/${data.id}`}>Edit employee</Link>
      </div>

      <h2>Personal Information</h2>
      <div className="details-grid">
        <p><strong>Employee ID</strong><span>{data.id}</span></p>
        <p><strong>Name</strong><span>{data.name}</span></p>
        <p><strong>Username</strong><span>{data.username || "—"}</span></p>
        <p><strong>Email</strong><span>{data.email || "—"}</span></p>
        <p><strong>Phone</strong><span>{data.phone || "—"}</span></p>
        <p><strong>Website</strong><span>{data.website || "—"}</span></p>
      </div>

      <h2>Address Information</h2>
      <div className="details-grid">
        <p><strong>Street</strong><span>{data.address?.street || "—"}</span></p>
        <p><strong>Suite</strong><span>{data.address?.suite || "—"}</span></p>
        <p><strong>City</strong><span>{data.address?.city || "—"}</span></p>
        <p><strong>Zipcode</strong><span>{data.address?.zipcode || "—"}</span></p>
        <p><strong>Latitude</strong><span>{data.address?.geo?.lat || "—"}</span></p>
        <p><strong>Longitude</strong><span>{data.address?.geo?.lng || "—"}</span></p>
      </div>

      <h2>Company Information</h2>
      <div className="details-grid">
        <p><strong>Company Name</strong><span>{data.company?.name || "—"}</span></p>
        <p><strong>Catch Phrase</strong><span>{data.company?.catchPhrase || "—"}</span></p>
        <p><strong>Business</strong><span>{data.company?.bs || "—"}</span></p>
      </div>
      <Link to="/employees">← Back to Employees</Link>
    </section>
  );
}

export default EmployeDetail;
