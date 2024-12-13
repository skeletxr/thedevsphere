"use client";

import React, { useState } from "react";
import "boxicons/css/boxicons.min.css";
import auths from "./authLogic";

const SignUp = ({ showAuth, setShowAuth }) => {
  const [showSignup, setShowSignup] = useState(false);
  const [showPassword, setShowPassword] = useState({
    login: false,
    signup: false,
  });
  const [form, setForm] = useState({
    email: "",
    password: "",
  });
  const toggleForm = () => {
    setShowSignup(!showSignup);
  };

  const togglePasswordVisibility = (form) => {
    setShowPassword((prevState) => ({
      ...prevState,
      [form]: !prevState[form],
    }));
  };

  return (
    <section
      className={`flex items-center justify-center h-screen bg-transparent ${
        showSignup ? "show-signup" : ""
      }`}
    >
      {showAuth === "Login" ? (
        <>
          <div className="relative max-w-md w-full pt-8 pl-8 pr-8  bg-white rounded-lg shadow-md form login">
            <div className="form-content">
              <header className="text-2xl font-semibold text-center text-gray-800">
                Login
              </header>
              <form action="#">
                <div className="relative mt-6">
                  <input
                    type="email"
                    value={form.email}
                    onChange={(e) =>
                      setForm({ ...form, email: e.target.value })
                    }
                    placeholder="Email"
                    className="w-full h-12 px-4 text-black border rounded-md focus:outline-none focus:border-blue-500"
                  />
                </div>
                <div className="relative mt-6">
                  <input
                    value={form.password}
                    onChange={(e) =>
                      setForm({ ...form, password: e.target.value })
                    }
                    type={showPassword.login ? "text" : "password"}
                    placeholder="Password"
                    className="w-full h-12 px-4 text-black border rounded-md focus:outline-none focus:border-blue-500"
                  />
                  <i
                    className={`bx ${
                      showPassword.login ? "bx-show" : "bx-hide"
                    } absolute top-1/2 right-3 transform -translate-y-1/2 text-gray-500 cursor-pointer`}
                    onClick={() => togglePasswordVisibility("login")}
                  ></i>
                </div>
                <div className="text-center mt-4">
                  <a href="#" className="text-blue-500 hover:underline">
                    Forgot password?
                  </a>
                </div>
                <div className="mt-6">
                  <button
                    onClick={(e) => auths("login", e, form)}
                    className="w-full h-12 bg-blue-500 text-white rounded-md hover:bg-blue-600"
                  >
                    Login
                  </button>
                </div>
              </form>
              <div
                className="text-center mt-4"
                onClick={() => setShowAuth("signup")}
              >
                <span className="text-black">
                  Don't have an account?{" "}
                  <a
                    className="text-blue-500 hover:underline"
                    onClick={toggleForm}
                  >
                    Signup
                  </a>
                </span>
              </div>
            </div>
            <div className="relative mt-8 h-px bg-gray-300">
              <span className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white px-4 text-gray-500">
                Or
              </span>
            </div>
            {/* <div className="mt-6">
          <a href="#" className="flex items-center justify-center h-12 bg-blue-700 text-white rounded-md">
            <i className='bx bxl-facebook text-xl'></i>
            <span className="ml-2">Login with Facebook</span>
          </a>
        </div> */}
            <div
              className="mt-4"
              onClick={(e) => {
                auths("provider", e);
                setShowAuth(false);
              }}
            >
              <a
                href="#"
                className="flex items-center justify-center h-12 border bg-blue-700 rounded-md"
              >
                <i className="bx bxl-google"></i>
                <span className="ml-2 text-white">Login with Google</span>
              </a>
            </div>
            <div className="flex text-gray-400 text-[12px] max-w-56 ml-auto mr-auto text-center pt-4 pb-2">
              By signing up, you agree to our Terms & Conditions & Privacy
              Policy
            </div>
          </div>
        </>
      ) : (
        <>
          <div className="relative max-w-md w-full pt-8 pl-8 pr-8  bg-white rounded-lg shadow-md form signup">
            <div className="form-content">
              <header className="text-2xl font-semibold text-center text-gray-800">
                Signup
              </header>
              <form action="#">
                <div className="relative mt-6">
                  <input
                    type="email"
                    value={form.email}
                    onChange={(e) =>
                      setForm({ ...form, email: e.target.value })
                    }
                    placeholder="Email"
                    className="w-full h-12 px-4 text-black border rounded-md focus:outline-none focus:border-blue-500"
                  />
                </div>
                <div className="relative mt-6">
                  <input
                    value={form.password}
                    type={showPassword.signup ? "text" : "password"}
                    onChange={(e) =>
                      setForm({ ...form, password: e.target.value })
                    }
                    placeholder="Create password"
                    className="w-full h-12 px-4 border text-black rounded-md focus:outline-none focus:border-blue-500"
                  />
                </div>
                <div className="relative mt-6">
                  <input
                    // onChange={(e) => e.target.value === form.password ? setForm({ ...form,  password: e.target.value }) : null}
                    type={showPassword.signup ? "text" : "password"}
                    placeholder="Confirm password"
                    className="w-full h-12 px-4 border text-black rounded-md focus:outline-none focus:border-blue-500"
                  />
                  <i
                    className={`bx ${
                      showPassword.signup ? "bx-show" : "bx-hide"
                    } absolute top-1/2 right-3 transform -translate-y-1/2 text-gray-500 cursor-pointer`}
                    onClick={() => togglePasswordVisibility("signup")}
                  ></i>
                </div>
                <div className="mt-6">
                  <button
                    onClick={(e) => auths("signup", e, form)}
                    className="w-full h-12 bg-blue-500 text-white rounded-md hover:bg-blue-600"
                  >
                    Signup
                  </button>
                </div>
              </form>
              <div
                className="text-center mt-4"
                onClick={() => setShowAuth("Login")}
              >
                <span className="text-black">
                  Already have an account?{" "}
                  <a
                    href="#"
                    className="text-blue-500 hover:underline"
                    onClick={toggleForm}
                  >
                    Login
                  </a>
                </span>
              </div>
            </div>
            <div className="relative mt-8 h-px bg-gray-300">
              <span className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white px-4 text-gray-500">
                Or
              </span>
            </div>
            <div
              className="mt-6"
              onClick={(e) => {
                auths("provider", e);
                setShowAuth(false);
              }}
            >
              <a className="flex items-center justify-center h-12 bg-blue-700 text-white rounded-md">
                <i className="bx bxl-google"></i>
                <span className="ml-2">Login with Google</span>
              </a>
            </div>

            <div className="flex text-gray-400 text-[12px] max-w-56 ml-auto mr-auto text-center pt-4 pb-2">
              By signing up, you agree to our Terms & Conditions & Privacy
              Policy
            </div>
          </div>
        </>
      )}
    </section>
  );
};

export default SignUp;
