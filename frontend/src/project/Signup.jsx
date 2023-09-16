import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Signup = () => {
  const [userInfo, setUserInfo] = useState({
    username: "",
    firsname: "",
    password: "",
    telephone: "",
    address: "",
  });

  const onchangeinput = (e) => {
    const { name, value } = e.target;
    console.log(name, value);
    setUserInfo((prev) => ({ ...prev, [name]: value }));
  };

  useEffect(() => {
    console.log(userInfo);
  }, [userInfo]);

  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault(); // Prevent form submission

    try {
      const response = await fetch("http://localhost:5000/user/insert", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userInfo),
      });

      const data = await response.json();

      if (response.status === 200) {
        alert("เพิ่มข้อมูล");
        navigate("/login");
      } else {
        alert("ผิดพลาด");
      }
    } catch (error) {
      console.error("Error during signup:", error);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded shadow-md w-96">
        <h2 className="text-2xl font-semibold mb-4">Sign Up for an Account</h2>
        <form  onSubmit={handleSignup}>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">
              Username
            </label>
            <input
              name="username"
              className="mt-1 px-4 py-2 w-full border rounded-lg focus:ring focus:ring-blue-200"
              type="text"
              onChange={(e) => onchangeinput(e)}
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">
              First Name
            </label>
            <input
              name="firsname"
              className="mt-1 px-4 py-2 w-full border rounded-lg focus:ring focus:ring-blue-200"
              type="text"
              onChange={(e) => onchangeinput(e)}
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">
              Password
            </label>
            <input
              name="password"
              className="mt-1 px-4 py-2 w-full border rounded-lg focus:ring focus:ring-blue-200"
              type="password"
              onChange={(e) => onchangeinput(e)}
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">
              Telephone
            </label>
            <input
              name="telephone"
              className="mt-1 px-4 py-2 w-full border rounded-lg focus:ring focus:ring-blue-200"
              type="tel"
              onChange={(e) => onchangeinput(e)}
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">
              Address
            </label>
            <textarea
              name="address"
              className="mt-1 px-4 py-2 w-full border rounded-lg focus:ring focus:ring-blue-200"
              rows="3"
              onChange={(e) => onchangeinput(e)}
            />
          </div>
          <button
            className="w-full py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
            type="submit"
            // disabled={isLoading}
          >submit
            {/* {isLoading ? "Signing up..." : "Sign Up"} */}
          </button>
          {/* {message && <p className="mt-4 text-gray-500">{message}</p>} */}
        </form>
        <p className="mt-4 text-gray-500">
          Already have an account?{" "}
          <Link to="/login" className="text-blue-500 hover:underline">
            Log in
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Signup;
