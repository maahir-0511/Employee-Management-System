import {useMutation, useQuery, useQueryClient} from "@tanstack/react-query";
import api from "../services/api";
import { useState } from "react";
import { Link } from "react-router-dom";


function Employee(){
  const[search,setSearch]=useState("");
  const queryClient=useQueryClient();
  const {data,isLoading,isError}=useQuery({queryKey:["employees"],
    queryFn:async()=>{
      const response=await api.get("/users");
      return Array.isArray(response.data) ? response.data : [];
    }
  });

  const deleteMutation=useMutation({
    mutationFn:async(employeeId)=>{
   const response=await api.delete(`/users/${employeeId}`)
   return response.data;
  },
  onSuccess:() => {
  alert("Employee deleted successfully");

  queryClient.invalidateQueries({
  queryKey: ["employees"]
    });
   },

   onError:() => {
   alert("Unable to delete employee!")
   }
  }
)
const filteredEmployees = data?.filter((employee) => {

  return (
      employee.name.toLowerCase().includes(search.toLowerCase()) ||
      employee.email.toLowerCase().includes(search.toLowerCase()) ||
      employee.address.city.toLowerCase().includes(search.toLowerCase())
    );
  })


  if(isLoading){
    return <h2>Loading employees.....</h2>;
  }

  if(isError){
    return <h2>Error fetching employees!</h2>;
  }
  return(
    <div>
    <h1>All employees</h1>
    <Link to="/add-employee">Add New Employee</Link>

<br/><br/>
    <input type="text" placeholder="search by name,city or email" value={search} onChange={(e)=>setSearch(e.target.value)}/>
    <table border="1" cellPadding="10">
      <thead>
        <tr>
          <th>ID</th>
          <th>Name</th>
          <th>Email</th>
          <th>City</th>
        </tr>
      </thead>
      <tbody>
        {filteredEmployees.map((Employee)=>(
          <tr key={Employee.id}>
            <td>{Employee.id}</td>
            <td>{Employee.name}</td>
            <td>{Employee.email}</td>
            <td>{Employee.address?.city || "—"}</td>
            <td>
              <Link to={`/employee/${Employee.id}`}>
              View
             </Link>
             {" | "}
            <Link to={`/edit-employee/${Employee.id}`}>
            Edit
           </Link>
           {" | "}
              <button onClick={()=>{
                const confirmDelete = window.confirm(
                "Are you sure you want to delete this employee?");
                if(confirmDelete){
                  deleteMutation.mutate(Employee.id);
                }
              }}
              disabled={deleteMutation.isPending}>
             {deleteMutation.isPending
              ? "Deleting...": "Delete"}
              </button>
            </td>
           
          </tr>
        ))}

        {filteredEmployees.length===0&&(
          <tr>
            <td colSpan="5">
              No employees found
            </td>
          </tr>
        )}
      </tbody>
    </table>
    <p>Total Results: {filteredEmployees.length}</p>
    </div>
  );
}

export default Employee

