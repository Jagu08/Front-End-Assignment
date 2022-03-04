import React from "react";
import { useState, useEffect } from "react";
import "./forms.css";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";

const Login = () => {
  const initialValues = { email: "", password: "" };
  const [formValues, setFormValues] = useState(initialValues);
  const [formErrors, setFormErrors] = useState({});
  const [isSubmit, setIsSubmit] = useState(false);
  const navigate = useNavigate();
  const onChangeHandler = (e) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  };
  const auth = getAuth();

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    setFormErrors(validate(formValues));
    setIsSubmit(true);
    login();
  };

  const login = async () => {
    try {
      const result = await signInWithEmailAndPassword(
        auth,
        formValues.email,
        formValues.password
      );
      localStorage.setItem("currentUser", JSON.stringify(result));
      toast.success("Successfully Logged In");
      window.location.href = "/";
    } catch (error) {
      localStorage.setItem("currentUser", "");
      toast.error("Login denied");
    }
  };
  useEffect(() => {
    if (Object.keys(formErrors).length === 0 && isSubmit) {
    }
  }, [formErrors]);
  const validate = (values) => {
    const errors = {};
    const regex = /^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+$/i;
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
  return (
    <>
      <div className="row">
        <div
          className="col-md-6 offset-md-3
                            align-center formdesign"
        >
          <form onSubmit={onSubmitHandler}>
            <h1 className="text-center">Login Form</h1>
            <div>
              <label htmlFor="email">E-mail: </label>
              <input
                className="form-control"
                type="text"
                name="email"
                id="email"
                value={formValues.email}
                onChange={onChangeHandler}
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
                onChange={onChangeHandler}
              />
            </div>
            <p>{formErrors.password}</p>

            <button type="submit">Login</button>
            <div class="margin-top20 text-center">
									Don't have an account? <Link to="/signup">Create One</Link>
								</div>
          </form>
        </div>
      </div>
    </>
  );
};

export default Login;
