import React, {useContext} from  "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import AuthContext from "../context/auth";

const Home = () => {
  const ctx = useContext(AuthContext);
  const navigate=useNavigate()
  const logout =() =>{
    ctx.setIsLoggedIn(false);
    navigate("/");
  }
  return (
    <div>
      <div className="text-4xl text-blue-800"></div>
      <h1 className="text-xl"></h1>
      <img className="w-full h-screen"
         src="https://www.royceth.com/pub/media/catalog/category/PRODUCT-LIST2-.jpg"
         alt=""/>
     
  
         
    </div>
   
  );
};

export default Home;
