import React, { useState } from "react";
import axios from "axios";
import "../App.css";
import { NavLink, useNavigate } from "react-router-dom";
import { base } from "../../constant.js";
import Footer from "../components/Footer.jsx";

function Register() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    fullName: "",
    profilePicture: null,
    username: "",
    email: "",
    password: "",
  });

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleFileChange = (e) => {
    setFormData({ ...formData, profilePicture: e.target.files[0] });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);
    setLoading(true);

    if (!formData.profilePicture) {
      setError("Image is required");
      setLoading(false);
      return;
    }

    const data = new FormData();
    data.append("fullName", formData.fullName);
    data.append("profilePicture", formData.profilePicture);
    data.append("username", formData.username);
    data.append("email", formData.email);
    data.append("password", formData.password);

    try {
      const response = await axios.post(`${base}/api/v2/users/register`, data);
      if (response.data.success) setSuccess(response.data.data);
      navigate("/login");
    } catch (error) {
      setError(error.response.data.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mb-12">
      <div className="flex flex-col md:flex-row gap-8 md:gap-0 mt-12 md:mt-0 justify-center items-center">
        <div className="w-full md:w-1/2 text-center font-h2 font-bold">
          Money Transfer
        </div>
        <div className="w-full md:w-1/2">
          <div className="max-w-[380px] mx-auto flex flex-col justify-center gap-4 p-4 rounded-md shadow-md drop-shadow-md dark:shadow-gray">
            <h2 className="font-h5 mb-4 font-semibold">Register</h2>
            <form onSubmit={handleSubmit} className="flex flex-col">
              <label htmlFor="profilePicture" className="font-sm font-medium">
                Profile Picture<span className="text-sent">*</span>
              </label>
              <input
                id="profilePicture"
                type="file"
                onChange={handleFileChange}
                className="mt-2 dark:bg-bg_dark"
              />
              <label htmlFor="fullName" className="mt-4 font-sm font-medium">
                Full Name<span className="text-sent">*</span>
              </label>
              <input
                id="fullName"
                type="text"
                onChange={handleChange}
                className="mt-2 px-4 py-2 leading-4 font-sm rounded border border-gray dark:bg-bg_dark"
              />
              <label htmlFor="username" className="mt-4 font-sm font-medium">
                Username<span className="text-sent">*</span>
              </label>
              <input
                id="username"
                type="text"
                onChange={handleChange}
                className="mt-2 px-4 py-2 leading-4 font-sm rounded border border-gray dark:bg-bg_dark"
              />
              <label htmlFor="email" className="mt-4 font-sm font-medium">
                Email<span className="text-sent">*</span>
              </label>
              <input
                id="email"
                type="text"
                onChange={handleChange}
                className="mt-2 px-4 py-2 leading-4 font-sm rounded border border-gray dark:bg-bg_dark"
              />
              <label htmlFor="password" className="mt-4 font-sm font-medium">
                Password<span className="text-sent">*</span>
              </label>
              <input
                id="password"
                type="password"
                onChange={handleChange}
                className="mt-2 px-4 py-2 leading-4 font-sm rounded border border-gray dark:bg-bg_dark"
              />
              {loading && (
                <div className="font-sm text-center mt-2 text-gray">
                  Processing...
                </div>
              )}
              {error && (
                <div className="font-sm text-center mt-2 text-sent">
                  {error}
                </div>
              )}
              {success && (
                <div className="font-sm text-center mt-2 text-received">
                  {success}
                </div>
              )}
              <button
                className="py-2 md:py-1 font-h6 mt-4 font-medium rounded bg-primary_dark text-white hover:bg-primary_light"
                type="submit"
              >
                Register
              </button>
              <p className="mt-2 font-sm text-center">
                Have an account?{" "}
                <NavLink to={"/login"}>
                  <span className="font-bold cursor-pointer">Login</span>
                </NavLink>
              </p>
            </form>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default Register;
