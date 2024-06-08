import React, { useState } from "react";
import axios from "axios";
import "../App.css";
import { setData } from "../features/userSlice.js";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useNavigate } from "react-router-dom";
import { base } from "../../constant.js";
import Footer from "../components/Footer.jsx";
import conf from "../conf/conf.js";

function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    emailOrUsername: "",
    password: "",
  });

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);

  const { userData } = useSelector((state) => state.user);

  axios.defaults.withCredentials = true;

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleDemo = (e) => {
    (formData.emailOrUsername = conf.testusername),
      (formData.password = conf.testpassword),
      handleSubmit(e);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);
    setLoading(true);

    const data = {
      username: formData.emailOrUsername,
      password: formData.password,
    };

    try {
      const response = await axios.post(`${base}/api/v2/users/login`, data);
      if (response.data.success) setSuccess(response.data.data);
      const userDetails = {
        _id: response.data.message.user._id,
        fullName: response.data.message.user.fullName,
        username: response.data.message.user.username,
        email: response.data.message.user.email,
        profilePictureUrl: response.data.message.user.profilePicture,
        balance: response.data.message.user.balance,
        token: response.data.message.accessToken,
        expiry: Date.now() + 24 * 60 * 60 * 1000,
      };
      dispatch(setData(userDetails));
      navigate("/");
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
            <h2 className="font-h5 mb-4 font-semibold">Login</h2>
            <form onSubmit={handleSubmit} className="flex flex-col">
              <label htmlFor="emailOrUsername" className="font-sm font-medium">
                Username<span className="text-sent">*</span>
              </label>
              <input
                id="emailOrUsername"
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
                <div className="font-sm text-center mt-4 text-gray">
                  Processing...
                </div>
              )}
              {error && (
                <div className="font-sm text-center mt-4 text-sent">
                  {error}
                </div>
              )}
              {success && (
                <div className="font-sm text-center mt-4 text-received">
                  {success}
                </div>
              )}
              <button
                className="py-2 md:py-1 font-h6 mt-8 font-medium rounded bg-primary_dark text-white hover:bg-primary_light"
                type="submit"
              >
                Login
              </button>
              <button
                className="py-2 font-sm mt-4 font-medium rounded border-2 border-primary_light hover:text-white hover:bg-primary_light"
                onClick={handleDemo}
              >
                Try as a Guest
              </button>
              <p className="mt-2 font-sm text-center">
                Don't have an account?{" "}
                <NavLink to={"/register"}>
                  <span className="font-bold cursor-pointer">Register</span>
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

export default Login;
