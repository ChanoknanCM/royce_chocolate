import React, { Fragment } from "react";
import AuthContext from "../context/auth";
import { Link, Navigate, useNavigate } from "react-router-dom";


const Cart = () => {
  const ctx = React.useContext(AuthContext);

  const deleteBook = (itemInfo) => {
    const newCart = ctx.cart.filter(
      (product) => product.id !== itemInfo.id
    );
    ctx.setCart(newCart);
  };

  return (
    <div className="w-full h-auto bg-white border rounded-xl ">
      {ctx.cart.length === 0 ? (
        <div className="text-center py-2 px-4">ไม่มีสินค้าในตะกร้า</div>
      ) : (
        <Fragment>
            <div className="text-center font-bold py-3">ตะกร้า</div>
          {ctx.cart.map((product) => (
            <div
              className="grid grid-cols-3 w-full px-5 h-auto my-1"
              key={product.id}
            >
              <div className="text-center">
                <img src={product.product_img} className="w-20 h-24" alt="" />
              </div>
              <div className="flex-col flex-nowrap">
                <div className="font-bold text-base">{product.product_name}</div>
                <div className="text-base">
                จำนวน : {product.amount}
                </div>
                <div>ราคา : {product.product_price}</div>
                <div className="text-base">ทั้งหมด : {product.total}</div>
              </div>
              <div className="flex justify-center items-center">
                <div>
                  <button
                    className="px-4 py-2 rounded-xl bg-red-600 text-white  hover:bg-red-500"
                    onClick={() => deleteBook(product)}
                  >
                    ลบ
                  </button>
                </div>
              </div>
            </div>
          ))}

          <div className="text-center py-2 ">
            ราคาทั้งหมด : {ctx.cart.reduce((acc, product) => acc + product.total, 0)}{" "}
            บาท
          </div>
          <div>
            <Link to={"/payment"}>    
            <button className="w-full bg-blue-900 py-2 text-white rounded-l-xl rounded-r-xl">ยินยันการสั่งซื้อ</button>
            </Link>
          </div>
          
        </Fragment>
      )}
    </div>
  );
};

export default Cart;