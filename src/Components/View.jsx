import axios from "axios";
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { FaArrowLeft, FaEdit,FaRegStar,FaStar, FaTrash } from "react-icons/fa";
import { ToastContainer, toast, Zoom } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ViewFeedback = () => {
  const { id } = useParams(); 
  const [feedback, setFeedback] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchFeedback() {
      try {
        const response = await axios.get(`http://127.0.0.1:8000/api/v1/app/feedback/${id}/`);
        setFeedback(response.data);
      } catch (error) {
        toast.error("Failed to load feedback");
        console.error(error);
      }
    }
    fetchFeedback();
  }, [id]);

  // if (!feedback) return <p>Loading feedback...</p>;

  return (

    <div className="body">
      <ToastContainer theme="colored" transition={Zoom} />
      <div className="form">
        <h2>Feedback Details</h2>

        <div className="input">
          <div className="inputBox">
            <label>Name</label>
            <input type="text" value={feedback.name} readOnly disabled={true} />
          </div>

          <div className="inputBox">
            <label>Email</label>
            <input type="email" value={feedback.email} readOnly disabled={true} />
          </div>

          <div className="inputBox">
            <label>Phone Number</label>
            <input type="text" value={feedback.phone} readOnly disabled={true} />
          </div>

          <div className="star-rating">
            <label>Rating</label>
            <div>
              {[1, 2, 3, 4, 5].map((star) => (
                <span
                  key={star}
                  style={{
                    fontSize: "24px",
                    cursor: "pointer",
                    color: star <= feedback.rating ? "gold" : "gray",
                  }}
                >
                  {star <= feedback.rating ? <FaStar /> : <FaRegStar />}
                </span>
              ))}
            </div>
          </div>

          <div className="inputBox">
            <label>Feedback</label>
            <textarea value={feedback.feedback} readOnly disabled={true} />
          </div>

          <div className="inputBox">
            <button onClick={() => navigate(`/edit/${id}`)} className="btn btn-primary">
              <FaEdit /> Edit Feedback
            </button>
          </div>
          <div className="inputBox">
                      <button onClick={() => navigate(`/delete/${id}`)} className="btn btn-primary">
                        <FaTrash size={15} /> Delete Feedback
                      </button>
                    </div>
          <button onClick={() => navigate(-1)} className="btn">
        <FaArrowLeft /> Back
      </button>
        </div>
      </div>
    </div>
  );
};

export default ViewFeedback;
