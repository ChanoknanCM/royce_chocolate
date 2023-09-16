import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AiOutlineShoppingCart } from "react-icons/ai";
import AuthContext from "../context/auth";
import Cart from "./Cart";
const Nav = () => {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const ctx = React.useContext(AuthContext);
  const navigate=useNavigate()
  const logout =() =>{
    ctx.setIsLoggedIn(false);
    navigate("/");
  }

  return (
    <nav className="bg-blue-950">
      <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
        <div className="relative flex h-16 items-center justify-between">
          <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
            <div className="flex flex-shrink-0 items-center">
              <p className="text-white text-xl">ROYCE' </p>
            </div>
            <div className="hidden sm:ml-6 sm:block">
              <div className="flex space-x-4">
                <Link
                  to = "/product"
                  className="bg-gray-900 text-white rounded-md px-3 py-2 text-sm font-medium"
                  aria-current="page"
                  onClick={()=> ctx.setIsLoggedIn(true)}

                >
                  รายการสินค้า
                </Link>
                <Link
                  href="#"
                  className="text-gray-300 hover:bg-gray-700 hover:text-white rounded-md px-3 py-2 text-sm font-medium"
                >
                  
                </Link>
                <Link
                  href="#"
                  className="text-gray-300 hover:bg-gray-700 hover:text-white rounded-md px-3 py-2 text-sm font-medium"
                >
                  
                </Link>
                <Link
                  href="#"
                  className="text-gray-300 hover:bg-gray-700 hover:text-white rounded-md px-3 py-2 text-sm font-medium"
                >
                  
                </Link>
              </div>
            </div>
          </div>
          <div className=" flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
            <div className="">
              <button
                className="p-1.5 rounded-full border border-white relative"
                onClick={() => setIsCartOpen(!isCartOpen)}
              >
                <AiOutlineShoppingCart color="white" />
              </button>
              {isCartOpen && (
                <div className="absolute pt-2 right-0 rounded-">
                  <Cart />
                </div>
              )}
            </div>
            <div className=" ml-3">
              <div>
                <button
                  type="button"
                  className="relative flex rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
                  id="user-menu-button"
                  aria-expanded="false"
                  aria-haspopup="true"
                >
                  <span className="absolute -inset-1.5"></span>
                  <span className="sr-only">Open user menu</span>
                  <img
                    className="h-8 w-8 rounded-full"
                    src="https://i.pinimg.com/originals/ff/8e/0d/ff8e0d4d679e0a68ac3418e43fbae2a6.jpg"
                    alt=""
                  />
                  
                </button>
              </div>
            </div>
          </div>
          {ctx.isLoggedIn === false ?
          <div className="flex space-x-4">
          <Link to="/login" className="text-white">
            Log In
          </Link>
          <Link to="/signup" className="text-white">
            Sign Up
          </Link>
        </div>
        :
        <button onClick={logout} className="text-white">
            Logout
          </button>
        }
        </div>
      </div>
    </nav>
  );
};

export default Nav;