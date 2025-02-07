import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FaEye, FaEdit, FaTrash } from "react-icons/fa";

const Crudoperations = () => {
  const navigate = useNavigate();
  const token=sessionStorage.getItem("token");
  const id=sessionStorage.getItem("id");

  const confirmDelete = () => {
    if (window.confirm("Are you sure you want to delete this submission?")) {
    //   handleDelete(item.id);
    //   toast({ title: "Submission deleted successfully", variant: "destructive" });
    }
  };
  useEffect(() => {
    if (!token) {
      alert("You need to be Sumbit the Feedback to access this page.");
      navigate("/"); 
    }
  }, [token, navigate]);

  return (
    token && (
    <div 
    // key={item.id}
     className="product-card">
      <div className="product-details">
        <h3>Form Submitted</h3>
        <div className="button-group" style={{ display: "flex", gap: "10px", marginTop: "10px" }}>
          <button className="btn tooltip" 
          onClick={() => navigate(`/view/${id}`)}
          > <FaEye size={20} />
           <span className="tooltip-text">View</span>
            </button>
          <button className="btn tooltip" 
          onClick={() => navigate(`/edit/${id}`)}
          ><FaEdit size={20} />
           <span className="tooltip-text">Edit</span>
            </button>
          <button className="btn tooltip" onClick={() => navigate(`/delete/${id}`)}> <FaTrash size={15} />  <span className="tooltip-text">Delete</span> </button>
        </div>
      </div>
    </div>
    
    )
  );
};

export default Crudoperations;
