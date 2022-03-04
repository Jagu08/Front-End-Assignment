import React from "react";
import { useState, useEffect } from "react";
import "./forms.css";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const Signup = () => {
  const initialValues = { username: "", email: "", password: "" };
  const [formValues, setFormValues] = useState(initialValues);
  const [formErrors, setFormErrors] = useState({});
  const [isSubmit, setIsSubmit] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setFormErrors(validate(formValues));
    register();
    setIsSubmit(true);
  };

  useEffect(() => {
    if (Object.keys(formErrors).length === 0 && isSubmit) {
    }
  }, [formErrors]);
  const validate = (values) => {
    const errors = {};
    const regex = /^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+$/i;
    if (!values.username) {
      errors.username = "Username is required";
    }
    if (!values.email) {
      errors.email = "Email is required";
    } else if (!regex.test(values.email)) {
      errors.email = "Not a valid Email";
    }
    if (!values.password) {
      errors.password = "Password is required";
    } else if (values.password.length < 8) {
      errors.password = "Password must be more than 8 characters";
    } else if (values.password.length > 12) {
      errors.password = "Password cannot be more than 12 characters";
    }
    return errors;
  };
  const auth = getAuth();
  const register = async () => {
    try {
      setLoading(true);
      await createUserWithEmailAndPassword(
        auth,
        formValues.email,
        formValues.password
      );
      toast.success("Successfully registered");
      navigate("/login");
      setLoading(false);
    } catch (error) {
      setLoading(true);
      toast.error("Error in registeration");
      console.log(error);
    }
  };
  return (
    <div className="row">
      <div
        className="col-md-6 offset-md-3
                            align-center formdesign"
      >
        <form onSubmit={handleSubmit}>
          <h1 className="text-center">Registeration Form</h1>
          <div>
            <label htmlFor="username">Fullname: </label>
            <input
              type="text"
              className="form-control"
              name="username"
              id="username"
              value={formValues.username}
              onChange={handleChange}
            />
          </div>
          <p>{formErrors.username}</p>
          <div>
            <label htmlFor="email"> E-mail: </label>
            <input
              type="text"
              className="form-control"
              name="email"
              id="email"
              value={formValues.email}
              onChange={handleChange}
            />
          </div>
          <p>{formErrors.email}</p>
          <div>
            <label htmlFor="password">Password: </label>
            <input
              type="password"
              className="form-control"
              name="password"
              id="password"
              value={formValues.password}
              onChange={handleChange}
            />
          </div>
          <p>{formErrors.password}</p>

          
          <button type="submit" className="text-center">
            Register
          </button>
        </form>
      </div>
    </div>
  );
};

export default Signup;
