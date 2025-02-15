import axios from "axios";
import React, { useState } from "react";
import { ToastContainer, toast, Zoom } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./FeedbackForm.css";
import { useNavigate } from "react-router-dom";
import { FaRegStar, FaStar } from "react-icons/fa";
// import { useNavigate } from 'react-router-dom';
// import Loading from './Loading';

function FeedbackForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [rating, setRating] = useState(0);
  const [feedback, setFeedback] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const [errors, setErrors] = useState({});

//   const validate = () => {
//     let errors = {};
//     let isValid = true;

//     if (!name.trim()) {
//       errors.name = "Name is required";
//     //   isValid = false;
//     } else if (!/^[A-Za-z\s]+$/.test(name)) {
//       errors.name = "Name should only contain alphabets";
//       isValid = false;
//     }

//     if (!email.trim()) {
//       errors.email = "Email is required";
//       isValid = false;
//     } else if (!/^\S+@\S+\.\S+$/.test(email)) {
//       errors.email = "Invalid email format";
//       isValid = false;
//     }
//     // if (!email.trim()) {
//     //     errors.email = "Email is required";
//     //     isValid = false;
//     //   }
      
//     //   if (email.trim() && !/^\S+@\S+\.\S+$/.test(email)) {
//     //     errors.email = "Invalid email format";
//     //     isValid = false;
//     //   }
      

//     if (!phone.trim()) {
//       errors.phone = "Phone number is required";
//       isValid = false;
//     } else if (!/^\d{10}$/.test(phone)) {
//       errors.phone = "Phone number must be 10 digits";
//       isValid = false;
//     }

//     if (rating === 0) {
//       errors.rating = "Rating is required";
//       isValid = false;
//     }

//     if (!feedback.trim()) {
//       errors.feedback = "Feedback cannot be empty";
//       isValid = false;
//     }

//     setErrors(errors);
//     return isValid;
//   };

const validate = () => {
    let errors = {};
    let isValid = true;
  
    if (!name.trim()) {
      errors.name = "Name is required";
      isValid = false;
    } else if (!/^[A-Za-z\s]+$/.test(name)) {
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
  
    // Show the first error message BEFORE updating state
    const firstError = Object.values(errors)[0];
    if (firstError) {
      toast.error(firstError);
    }
  
    // Set errors in state (async)
    setErrors(errors);
  
    return isValid;
  };
  async function handleFeedbackSubmit() {
    if (!validate()) {
    //   Object.values(errors).forEach((error) => {
    //     toast.error(error);
    //   });
    //   return;

//     const firstError =  await Object.values(errors)[0]; 

// if (firstError) {
//   toast.error(firstError);
// }

return;
    } else {
      setLoading(true);

      const data = {
        name,
        email,
        phone,
        rating,
        feedback,
      };

      try {
        const response = await axios.post(
          "http://127.0.0.1:8000/api/v1/app/feedback/",
          data,
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        if (response.status === 201) {
          toast.success("Feedback submitted successfully.");
          setName("");
          setEmail("");
          setPhone("");
          setRating(0);
          setFeedback("");
          sessionStorage.setItem("token", "123");
          sessionStorage.setItem("id", response.data.id);
          console.log(response.data);
          setTimeout(() => navigate("/crud"), 1500);
          // navigate('/crud')
        } else {
          toast.error("Failed to submit feedback. Try again.");
        }
      } catch (error) {
        toast.error("Error occurred. Please try again.");
        console.log(error);
      } finally {
        setLoading(false);
      }
    }
  }

  return (
    <>
      <ToastContainer theme="colored" transition={Zoom} />
      <div className="body">
        <div className="form">
          <h2>Feedback Form</h2>
          <div className="input">
            <div className="inputBox">
              <label>Name</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div className="inputBox">
              <label>Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="inputBox">
              <label>Phone Number</label>
              <input
                type="text"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
              />
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
              <textarea
                value={feedback}
                onChange={(e) => setFeedback(e.target.value)}
              ></textarea>
            </div>
            <div className="inputBox">
              <input
                type="submit"
                value="Submit Feedback"
                onClick={(e) => {
                  e.preventDefault();
                  handleFeedbackSubmit();
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default FeedbackForm;
