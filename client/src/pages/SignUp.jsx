import React from "react";
import blog from "../photos/blogs.png";
import { Button, Spinner } from "flowbite-react";
import { useState } from "react";
import light1 from "../../public/1.json";

import { Toaster, toast } from "react-hot-toast";
import Lottie from "lottie-react";
import { useNavigate } from "react-router-dom";
import OAuth from "../components/OAuth";
const SignUp = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({});
  const [errorMessage, setErrorMessage] = useState(null);
  const [loading, setLoading] = useState(false);
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value.trim() });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.username || !formData.email || !formData.password) {
      setErrorMessage("All fields are required");
      toast.error("All fields are required");
      return;
    }
    try {
      setLoading(true);
      setErrorMessage(null); //to clear the previous error message
      const res = await fetch("/api/auth/signup", {
        method: "POST",
        body: JSON.stringify(formData),
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await res.json();
      console.log(data);
      if (data.message === "User created successfully") {
        toast.success("Account created successfully");
        toast.success("Redirecting to Login Page.", {
          style: {
            border: "1px solid #713200",
            padding: "16px",
            color: "#713200",
          },
          iconTheme: {
            primary: "#713200",
            secondary: "#FFFAEE",
          },
        });
        setTimeout(() => {
          navigate("/sign-in");
        }, 1000);
      }
      if (data.success === false) {
        toast.error("User already exists");
      }
      setLoading(false);
    } catch (error) {
      //here in the client side errors ,mostly due to network issue
      toast.error("Server error");
      setErrorMessage(error.message);
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen">
      <div className="">
        <Toaster position="top-center" reverseOrder={false} />
      </div>
      <section className="">
        <div className="grid grid-cols-1 lg:grid-cols-2">
          <div className="flex items-center justify-center px-4 py-10  sm:px-6 lg:px-8 sm:py-16 lg:py-24">
            <div className="xl:w-full xl:max-w-sm 2xl:max-w-md xl:mx-auto">
              <h2 className="text-3xl font-bold leading-tight  sm:text-4xl">
                Sign up
              </h2>
              <p className="mt-2 text-base text-gray-600">
                Already have an account?{" "}
                <a
                  href="/sign-in"
                  title=""
                  className="font-medium text-blue-600 transition-all duration-200 hover:text-blue-700 hover:underline focus:text-blue-700"
                >
                  Login
                </a>
              </p>

              <form className="mt-8" onSubmit={handleSubmit}>
                <div className="space-y-5">
                  <div>
                    <label
                      htmlFor="username"
                      className="text-base font-medium "
                    >
                      Username
                    </label>
                    <div className="mt-2.5">
                      <input
                        type="text"
                        name="username"
                        id="username"
                        placeholder="Enter your Username"
                        onChange={handleChange}
                        className="block w-full p-4  placeholder-gray-500 transition-all duration-200 border border-gray-200 rounded-md bg-gray-50 focus:outline-none focus:border-blue-600 focus:bg-white caret-blue-600"
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="email" className="text-base font-medium ">
                      Email address
                    </label>
                    <div className="mt-2.5">
                      <input
                        type="email"
                        name="email"
                        id="email"
                        placeholder="Enter email to get started"
                        onChange={handleChange}
                        className="block w-full p-4  placeholder-gray-500 transition-all duration-200 border border-gray-200 rounded-md bg-gray-50 focus:outline-none focus:border-blue-600 focus:bg-white caret-blue-600"
                      />
                    </div>
                  </div>

                  <div>
                    <label
                      htmlFor="password"
                      className="text-base font-medium "
                    >
                      Password
                    </label>
                    <div className="mt-2.5">
                      <input
                        type="password"
                        name="password"
                        id="password"
                        placeholder="Enter your password"
                        onChange={handleChange}
                        className="block w-full p-4  placeholder-gray-500 transition-all duration-200 border border-gray-200 rounded-md bg-gray-50 focus:outline-none focus:border-blue-600 focus:bg-white caret-blue-600"
                      />
                    </div>
                  </div>

                  <div>
                    <Button
                      gradientDuoTone="purpleToPink"
                      className="w-full py-2"
                      type="submit"
                      disabled={loading}
                    >
                      {loading ? (
                        <Spinner size="sm" color="white" />
                      ) : (
                        "Create free account"
                      )}
                    </Button>
                  </div>
                </div>
                {/* <OAuth/> */}
                {/* <div>{errorMessage && <p className="text-red-500">{errorMessage}</p>}</div> */}
              </form>

              {/* <div className="mt-3 space-y-3">
                <button
                  type="button"
                  className="relative inline-flex items-center justify-center w-full px-4 py-4 text-base font-semibold text-gray-700 transition-all duration-200 bg-white border-2 border-gray-200 rounded-md hover:bg-gray-100 focus:bg-gray-100 hover:text-black focus:text-black focus:outline-none"
                >
                  <div className="absolute inset-y-0 left-0 p-4">
                    <svg
                      className="w-6 h-6 text-rose-500"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                    >
                      <path d="M20.283 10.356h-8.327v3.451h4.792c-.446 2.193-2.313 3.453-4.792 3.453a5.27 5.27 0 0 1-5.279-5.28 5.27 5.27 0 0 1 5.279-5.279c1.259 0 2.397.447 3.29 1.178l2.6-2.599c-1.584-1.381-3.615-2.233-5.89-2.233a8.908 8.908 0 0 0-8.934 8.934 8.907 8.907 0 0 0 8.934 8.934c4.467 0 8.529-3.249 8.529-8.934 0-.528-.081-1.097-.202-1.625z"></path>
                    </svg>
                  </div>
                  Sign up with Google
                </button>
              </div> */}
            </div>
          </div>

          {/* <div className="flex items-center justify-center px-4 py-10 sm:py-16 lg:py-24 bg-gray-50 sm:px-6 lg:px-8">
            <div>
              <img
                className="w-full mx-auto"
                src={blog}
                alt=""
                style={{ maxWidth: "400px" }} // Set maximum width to 300px
              />

              <div className="w-full max-w-md mx-auto xl:max-w-xl">
                <h3 className="text-2xl font-bold text-center text-black">
                  Write your own blog
                </h3>
                <p className="leading-relaxed text-center text-gray-500 mt-2.5">
                  hasta la vista
                </p>
              </div>
            </div>
          </div> */}
          {/* <div className="flex flex-col gap-3 items-center justify-center">
            <div className="lg:w-3/4 relative animate-float -mt-4">
              {" "}
              {light1 && ( 
            <Lottie
              animationData={light1}
              loop={true}
              className="w-full h-auto max-w-2xl mx-auto"
              style={{ maxWidth: "800px", width: "100%" }}
            />
          )}
            </div>

            <div className="w-full max-w-md mx-auto text-center xl:max-w-xl">
    <SparklesText text="Blog outside the box" className="text-xl md:text-2xl" />
  </div>
          </div> */}
        </div>
      </section>
    </div>
  );
};

export default SignUp;
