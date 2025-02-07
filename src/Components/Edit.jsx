import axios from "axios";
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { FaSave, FaArrowLeft,FaStar,FaRegStar } from "react-icons/fa";
import { ToastContainer, toast, Zoom } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const EditFeedback = () => {
  const { id } = useParams(); 
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [rating, setRating] = useState(0);
  const [feedback, setFeedback] = useState("");
  const [errors, setErrors] = useState({});

  const validate = () => {
    let errors = {};
    let isValid = true;

    if (!name.trim()) {
        errors.name = "Name is required";
        isValid = false;
    } else if (!/^[A-Za-z\s]+$/.test(name.trim())) {
      errors.name = "Name should only contain alphabets";
      isValid = false;
  }


    if (!email.trim()) {
        errors.email = "Email is required";
        isValid = false;
    } else if (!/^\S+@\S+\.\S+$/.test(email)) {
        errors.email = "Invalid email format";
        isValid = false;
    }

    if (!phone.trim()) {
        errors.phone = "Phone number is required";
        isValid = false;
    } else if (!/^\d{10}$/.test(phone)) {
        errors.phone = "Phone number must be 10 digits";
        isValid = false;
    }

    if (rating === 0) {
        errors.rating = "Rating is required";
        isValid = false;
    }

    if (!feedback.trim()) {
        errors.feedback = "Feedback cannot be empty";
        isValid = false;
    }

    setErrors(errors);
    return isValid;
};

  useEffect(() => {
    async function fetchFeedback() {
      try {
        const response = await axios.get(`http://127.0.0.1:8000/api/v1/app/feedback/${id}/`);
        setName(response.data.name);
        setEmail(response.data.email);
        setPhone(response.data.phone);
        setRating(response.data.rating);
        setFeedback(response.data.feedback);
      } catch (error) {
        toast.error("Failed to load feedback");
        console.error(error);
      }
    }
    fetchFeedback();
  }, [id]);

  async function handleUpdate() {
    if (!validate()) {
      Object.values(errors).forEach((error) => {
          toast.error(error);
      });
      return;
  }
    const updatedData = {
      name,
      email,
      phone,
      rating,
      feedback
    };

    try {
      const response = await axios.put(`http://127.0.0.1:8000/api/v1/app/feedback/update/${id}/`, updatedData, {
        headers: { "Content-Type": "application/json" },
      });

      if (response.status === 200) {
        toast.success("Feedback updated successfully.");
        setTimeout(() => navigate(`/view/${id}`), 1500);
      } else {
        toast.error("Failed to update feedback.");
      }
    } catch (error) {
      toast.error("Error updating feedback.");
      console.error(error);
    }
  }

  return (
    <div className="body">
      <ToastContainer theme="colored" transition={Zoom} />      
      <div className="form">
        <h2>Feedback Form</h2>

        <div className="input">
          <div className="inputBox">
            <label>Name</label>
            <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
          </div>

          <div className="inputBox">
            <label>Email</label>
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
          </div>

          <div className="inputBox">
            <label>Phone Number</label>
            <input type="text" value={phone} onChange={(e) => setPhone(e.target.value)} />
          </div>

          <div className="star-rating">
            <label>Rating (1-5): </label>
            {[1, 2, 3, 4, 5].map((star) => (
              <span
                key={star}
                onClick={() => setRating(star)}
                style={{
                  cursor: "pointer",
                  fontSize: "24px",
                  color: star <= rating ? "gold" : "gray",
                  transition: "color 0.3s",
                }}
              >
                {star <= rating ? <FaStar /> : <FaRegStar />}
              </span>
            ))}
          </div>

          <div className="inputBox">
            <label>Feedback</label>
            <textarea value={feedback} onChange={(e) => setFeedback(e.target.value)} />
          </div>

          <div className="inputBox">
            <input
              type="submit"
              value="Update Feedback"
              onClick={(e) => {
                e.preventDefault();
                handleUpdate();
              }}
            />
          </div>
          <button onClick={() => navigate(-1)} className="btn">
        <FaArrowLeft /> Back
      </button>
        </div>
      </div>
    </div>
  );
};

export default EditFeedback;
