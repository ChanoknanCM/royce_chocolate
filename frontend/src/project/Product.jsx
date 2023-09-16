import React, { useContext, useEffect, useState } from "react";
import AuthContext from "../context/auth";

const Product = () => {
  const [products, setProducts] = useState([]);
  const [selecteditem, setSelectedItem] = useState();
  const ctx = useContext(AuthContext)
  useEffect(() => {
    async function fetchUser() {
      const res = await fetch("http://localhost:5000/product/list", {
        method: "get",
      });
      const data = await res.json();
      console.log(data);
      setProducts(data);
    }
    fetchUser();
  }, []);

  const addToCart = (e) => {
    e.preventDefault()
    let editSomeItem = {...selecteditem}
    const existingBookIndex = ctx.cart.findIndex((product) => product.id === selecteditem.id);

    if (existingBookIndex !== -1) {
      // Book with the same ID exists in the cart
      const existingBook = ctx.cart[existingBookIndex];

      // Update rent amount and rent days
      existingBook.amount = existingBook.amount += existingBook.amount ? parseInt(e.target[0].value) : 1;
      existingBook.total = parseInt(existingBook.amount) * parseInt(existingBook.product_price);

      return ctx.setCart([...ctx.cart]);
    } else {
      // Book with the same ID doesn't exist in the cart
      editSomeItem.amount = parseInt(e.target[0].value) || 1;
      editSomeItem.total = parseInt(editSomeItem.amount) * parseInt(editSomeItem.product_price) 
      return ctx.setCart([...ctx.cart, editSomeItem]);
    }
    


    // e.preventDefault();
    // console.log(e.target[0].value);
    // console.log(e);
    // console.log(selecteditem);
    // const newItem = {
    //   ...selecteditem,
    //   amount: parseInt(e.target[0].value),
    // };
    // console.log(newItem);
    // ctx.setCart(prev=> [...prev,newItem]);
  };

  const addItemSelected = (item) => {
    console.log(item);
    setSelectedItem(item);
  };

  return (
    <div className="bg-slate-100">
      
      <div className="grid grid-cols-3 place-items-center ">
        {products.map((product, idx) => (
          <form onSubmit={(e) => addToCart(e)}>
            <div className="flex flex-col flex-wrap max-w-sm rounded overflow-hidden shadow-lg my-10">
              <img
                className="w-96 h-96"
                src={product.product_img}
                alt="Sunset in the mountains"
              />
              <div className="px-6 py-4">
                <div className="font-bold text-xl mb-2">
                  {product.product_name}
                </div>
                <p className="text-gray-700 text-base text-justify mt-auto">
                  {product.product_description}
                </p>
              </div>
              <div className="text-center font-bold">
                {product.product_price}บาท
              </div>
              <div>
                <input
                  className="bg-blue-50 "
                  type="number"
                  defaultValue={1}
                />
                จำนวน
              </div>
              <div className="text-center my-4 ">
                <button
                  onClick={() => addItemSelected(product)}
                  className="p-2 bg-blue-900 text-center font-medium text-white rounded-full hover:bg-blue-800"
                >
                  หยิบใส่ตะกร้า
                </button>
              </div>
            </div>
          </form>
        ))}
      </div>
    </div>
  );
};
export default Product;
