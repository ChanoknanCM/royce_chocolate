import React, { useContext, useState, useEffect } from "react";
import dayjs from "dayjs";

const Receipt = () => {
  const [receipt, setReceipt] = useState([]);
  const [user, setUser] = useState();
  const [order, setOrder] = useState();
  useEffect(() => {
    async function fetchReceipt() {
      const res = await fetch("http://localhost:5000/product/receipt", {
        method: "post",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id: localStorage.getItem("id") }),
      });
      const data = await res.json();
      console.log(data);
      setReceipt(data);
    }

    async function fetchUser() {
      const res = await fetch(
        `http://localhost:5000/user/${localStorage.getItem("id")}`,
        {
          method: "get",
        }
      );
      const data = await res.json();
      console.log(data);
      setUser(data);
    }

    async function fetchOrder() {
      const res = await fetch(
        `http://localhost:5000/order/${localStorage.getItem("id")}`,
        {
          method: "get",
        }
      );
      const data = await res.json();
      console.log(data);
      setOrder(data);
    }
    fetchReceipt();
    fetchUser();
    fetchOrder();
  }, []);

  return (
    <div>
      <div class="bg-white rounded-lg shadow-lg px-8 py-10 max-w-xl mx-auto">
        <div class="flex items-center justify-between mb-8">
          <div class="flex items-center">
            <img
              class="h-8 w-8 mr-2"
              src="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBwgHBhUIBwgWFhUWFyIYGBgYGB0gHRYiISIgHR0fICIYKCgiJB4lIh8jIjchJjUrMy46ISEzODYwOCotMC0BCgoKDg0OGhAQGy8lICUrLTcrLS0rLSsyLTctLS4tLSsrLS0tLS4tLS0uLS0tLS0tNSstLS0tLTUtLS0tLS0rLf/AABEIAOEA4QMBIgACEQEDEQH/xAAcAAEAAgIDAQAAAAAAAAAAAAAABgcFCAIDBAH/xABIEAACAQMBBQMGCAsGBwAAAAAAAQIDBBEFBgcSITFBUWETFzJxgaEUIkJVkZOx0hU1UlZyc5SistHTCCMkM2KCFkNTY5Kz4f/EABkBAQEBAQEBAAAAAAAAAAAAAAABAgMEBf/EACMRAQACAgEDBAMAAAAAAAAAAAABAgMRMRIhUQQTIkEjYaH/2gAMAwEAAhEDEQA/AKlAB9h5wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA6GYp7K7RVKaqU9AuWmspqjPDT6NcuhJmI5GHB3Xlpc2Ny7a9t5U5x9KE4uMllJrKfPo0/adJQAAA+SfDHJ9ONX/LfqAtG33Ka1XoRrR1ahiSTXKfas9x2eY/W/ne3+if8i7tL/FlL9XH7EQrePvGnsVqFK1jpkavlIOeXV4MYeMejLJ8+M+W06h16aoN5j9b+d7f6J/yPFqe5raWzt3WtK9Gs18iMpRk/VxrhftaJXs1vlqa5rtLTPwBjys1HihW43HPynHgXxV1fPksls9UW2bLWfkdNZacVqVWhWdGvTcZRbUoyTTi11TT5pkp2N3f61tZHy9rFU6OcOrUzh96glzk17F1Wck63g7KW+u72LazpLhVekp1+Hk+GDknL1ySUM+C7i37W2o2dtG2tqSjCCUYxisKKXJJLuOmT1GqxrmUindV9luO0eEF8O1avN9vBwQX0NSfvOdzuP0KafwbVLiL7MunJfwp+87t429H/AIbv3pOj20alaKTnKeeCnlZUcRacpYw+qxldezG7D74K2parDTdorWEfKS4YVaeVFN8oqUZN8m+XEn2rK7TnHvTHVtfjtD9sN1mtbO0JXlrNXFGPOUoRanBd8oc+S74t+KR27K7rbnafRIarYa5SUZ9YuEswkuUovn1T7e3k+02JayuZV6q0d3u8VWscQstR+Mo/Jo1k1Ftd0XlJ/pLoolrnvMa+zphC9od0Gr6No1TUo6hTq+TjxOEYSUml6TWX2LLx4FctpLLZuS0pxxJFMaZuvlR3mtTof4Kni4j3PLfBS/2zT5fkxWfSNYvUdp6ktTwx2lbldUvtOp3VxqsKUpxUnTdNtwzzw3xLn3mO2w3ZS2T0WWp32vU5c1GEFSac5PsTcu7Lb7EmbFdEVdpdahvD3hzu6i47PT8Kkvk1akm/j+K+K8eqD7XnFc95ncz2hZrCD7I7p9b16gru/qK2pSWY8cW6kl3qHLCffJp+BOrbcjs/TX+J1G5m/wBKEV7o595Z/RFN7ab4rm01Odhs1b05RpycZVaibUmuT4Yprkn8pt57sYbRky5J+JqI5ZO83IaFUi/gep3EH2cThJe1cKfvK62x3a65svSd28VqC61KaacF3zi+aXim13tE/wBg97sdUvPgG08aVGTTcayfDTeFnEuNvhfc84fTk8Znk9q9l6kHCe0Fo01hp16WH+8Pcy47at3NVlrdsTs3LazXlpMLtUm4SnxuPF6OOWMrrnvLD8xNf85I/s7/AKg2O0zTNL3yuGhXdOpQnQnUh5OcZKGcZhmLfRp4Xc4l0msue0T8Z+kisfalvMTX/OSP7O/6g8xNf85I/s7/AKhkLzbPeVSvJ07fZSMoKclF+Rq80m0n6fauZ0f8b7z/AM0I/U1fvjqy+Y/hqvhhdodzdbR9Br6lLX4z8lSlU4fINcXCm8Z43jOOpdmg/iKh+ph/Cijdq95O10rKromuaRRoutScZJwqKSjNOOVmb8foMzs/vC2X2T2PhR0vy1a5lFSnCfF6eFlSnJKPAuiUM8uzLZm9MlojfdYmI4Qve687x7v10/8A1UyIHp1O/udU1Gpf3tTiqVJOUn4vu8F0S7EkeY9tI1WIc55AAaQONX/LfqORxq/5b9QG4el/iyl+rj9iPtzeWVtJRu7mEW+nFJLP0nzS/wAWUv1cfsRSv9oeKetWmV/yp/xRPl46ddtO8zqF4UZ0qsFUoSTT6NYw/U0eTW9YsdD02WoanX4KcessN9eSWI88t8iqdxG1WYS2ZvKnTNShnu6zh7H8ZeuXcWxq+m22saXU0+9hmFSLjJeD7V4rqn6iXp0W1JE7hU2we062p3v1NSlDhi7WVOjF9VGMoNZ8X8aXhnHYXN2GqmNS2C2y/wC7bVPUqkfuzg/ZnvRspsxtFp202lR1DTK2U+Uov0qcu2Ml2Ne/quTOuemtTHGmay1q2/t7i223vIXafE685LPbGT4oezhaMPY29e7vqdtZp+UnOMYY68TaS95sztlsFo21zjVvlKFWKwqtNpSx14XlNNetcsvGMs8uyG7PQ9l734fRlOrWXKM6jXxM8nwqKSTa5Z5vr3nWPU1in7TonaaL0ebKY/tE1KcpWVBr4396/Uv7te9/YW7qeo2elWMr3ULiNOnBZlKTwl/98F1NYdvdp57WbRS1HhcaaXBSi+sYLOG/9Um2360uw5enpM334W89l3bo9rXtLs8re7qZuKGIVM9Zr5E/alh+Kfeidmsu6K6r228K2jQqNKpxwmvyo8EpYf8AujF+xGzRnPTot2Ws7hXW+ba38B6F+DLKpivcJxyusIdJS8G/RXrb7DE/2eKtL8EXdCOOJVoya8HHEfZmMitt5t3Xu9vbuVxUb4ank4/6YxWEl4dvtbOW7nauWyO0Ku6qbo1FwVkuuM5Uku+L5+KbXaej2vxajlnq+TZ26hOdvKFJ4bi0n3PHI06lRqW83QrwcZQfDJPqmuTT8U+RuDYX1rqVnG7sa8Z05rMZReUyI7W7sdC2mvHfVJTo1X6U6bWJ+MoyTWfFYfecMGWMcztq0ba56fY3Wp3kbKwt3UqT5RhHq8Jt+5Nmd832135vVf3f5l97G7A6LsjJ1rGMp1ZLDq1GnLHcsJKK9S58s5Mzr2tafoGmyv8AU7hQhH6ZPsjFdsn3I629VO9VhmKeVJ7pdG1LRN48LfVrOVKbt5yUZYy1lLPJvllP6C/ii93m0Ffafe9LVbiOOKjNQj+RBcPDH19r8Wy9Dl6jfV38NV4RetvC2SoVpUa2uU1KLcWnxcmuTXTvOHnH2O+f6X738jzXG6vY+5uJXFbTJOU5OUn5aqstvL5KWOrOvzS7F/Ncvr633jP4/wB/xe6ot7+safrm1yvNJuo1KfkIR4o5xlSm2ufrX0kJNkam6bYtQbWly6f9et941sptuCb7j2YL1tGo+nK0OQAO7IAAAaTWGABLae8vbKlTVOnrbSSwl5KlyS6fIMPr+0Wr7R1oVtavHVlBOMXwxjhPm/QS95igZilY7xBuXfYXlzp17C9sqzhUpy4oyXVNevl7H1JR5z9tfnx/VUfuEQAmlZ5g2yWu67qW0F2rvWLnylRR4eLhjF4TbSfAlnGX1OrSNX1HRbv4XpN7OlPvi+vg0+Ul4NM8QL0xrQsay3z7U28eG4pW9XxlCUW//CSXuO6632bR1YcNvZW8H38M5fbJIrMHP2cfhrqlldf2j1jaKv5bWdQnUx6MXyhH1RjiKfjjPiYoA6RER2hl6tM1C70q/hf6dXcKkHmMkk8ZTT5STXRtcyR+czbT5/l9XR+4RIEmlZ5hdvRf3tzqN7O9vavFUnLilLCXE324jhfQecA0jK6BtJrOztV1NG1CdPLy4rDhL1xlmLfjjPiTe132bR0qfDc2VvN9+Jx+yTX2FZgxbHS3MLEzCyb3fTtNXhw2ttb0/FRlJ+zilj3Mg2ta3qmu3XwnWL6dWXZxPlH9GKxGPsSMeBXHWvEEzMvfousahoV/8O0m58nUSceLEXyfVYmmuwkHnP21+fH9VR+4RAFmlZ5hEv8AOftr8+P6qj9wec/bX58f1VH7hEAT26eINz5S97zttGsPXH9VS+4RBJJYQBYrEcQAANAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAP/Z"
              alt="Logo"
            />
            <div class="text-gray-700 font-semibold text-lg">ROYCE'</div>
          </div>
          <div class="text-gray-700">
            <div class="font-bold text-xl mb-2 text-blue-800">ใบเสร็จ</div>
            <div class="text-sm ">
              วันที่ {dayjs().format("DD/MM/YYYY HH:mm")}
            </div>
            <div class="text-sm">เลขออเดอร์ : {order?.order_id}</div>
          </div>
        </div>
        <div class="border-b-2 border-blue-800 pb-8 mb-8">
          <h2 class="text-2xl text-blue-800 font-bold mb-4">ถึง:</h2>
          <div class="text-gray-700 mb-2">{user?.username}</div>
          <div class="text-gray-700 mb-2">{user?.firsname}</div>
          <div class="text-gray-700 mb-2">{user?.address}</div>
          <div class="text-gray-700">{user?.telephone}</div>
        </div>
        <table class="w-full text-left mb-8">
          <thead>
            <tr>
              <th class="text-blue-800 font-bold uppercase py-2">
                รายการสินค้า
              </th>
              <th class="text-blue-800 font-bold uppercase py-2">จำนวน</th>
              <th class="text-blue-800 font-bold uppercase py-2">ราคา</th>
              <th class="text-blue-800 font-bold uppercase py-2">ราคารวม</th>
            </tr>
          </thead>
          <tbody>
            {receipt.map((order) => (
              <tr>
                <td class="py-4 text-gray-700">{order?.product_name}</td>
                <td class="py-4 text-gray-700">{order?.order_quantity}</td>
                <td class="py-4 text-gray-700">{order?.price}</td>
                <td class="py-4 text-gray-700">
                  {order?.price * order?.order_quantity}
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <div class="flex justify-end mb-8">
          <div class="text-gray-700 mr-2">ยอดรวมทั้งหมด:</div>
          <div class="text-blue-800 font-bold text-xl">
            ฿{order?.total_amount}
          </div>
        </div>
        <div class="border-t-2 border-blue-800 pt-8 mb-8">
          <div class="text-black mb-2 text-center">
          ROYCE.COM | +22 081 000 | 222/22 M.20 TH
          </div>
        </div>
      </div>
    </div>
  );
};

export default Receipt;
