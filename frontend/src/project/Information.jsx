import { useEffect, useState } from "react";
import "../App.css";
import EditComponent from "../EditComponent";

function Information() {
  const [user, setUser] = useState([]);
  const [isEditing, seIsEditing] = useState(false);
  const [editUser, setEditUser ] = useState({
    
  });
  const [insertUser, setInsert] = useState({
    username: "",
    firsname: "",
    password: "",
    telephone: "",
    address: "",
  });
  useEffect(() => {
    async function fetchUser() {
      const res = await fetch("http://localhost:5000/user", {
        method: "get",
      });
      const data = await res.json();
      console.log(data);
      setUser(data);
    }
    fetchUser();
  }, []);
  const editinghandle = (user) => {
    seIsEditing(true);
    setEditUser(user)
  };

  const onchangeinput = (e) => {
    const { name, value } = e.target;
    console.log(name, value);
    setInsert((prev) => ({ ...prev, [name]: value }));
  };
  const onSubmithandle = async () => {
    const res = await fetch("http://localhost:5000/user/insert", {
      method: "post",
      body: JSON.stringify(insertUser),
      headers: { "Content-Type": "application/json" },
    });
    if (res.status === 200) {
      alert("เพิ่ม");
    }
  };

  const onChangehandleEditInput = (e) => {
    const { name, value } = e.target;
    setEditUser((prev) => ({ ...prev, [name]: value }));
  };

  const closeEditing = () => {
    seIsEditing (false)
  };



  const onSubmitEditthandle  = async () => {
    const res = await fetch("http://localhost:5000/user/update", {
      method: "put",
      body: JSON.stringify(editUser),
      headers: { "Content-Type": "application/json" },
    });
    if (res.status === 200) {
      const users = [...user] 
      const index = user.findIndex((item,index)=> item.id === editUser.id) 
      users[index]=editUser
      setUser(users)
      seIsEditing(false)
      
    }else {
      alert("ผิดพลาด");
    }

  };


  
  const onSubmitDeletehandle = async (id) => {
    const res = await fetch("http://localhost:5000/user/delete", {
      method: "POST",
      body: JSON.stringify({id:id}),
      headers: { "Content-Type": "application/json" },
    });
    if (res.status === 200) {
      const users = user.filter((item, index) => item.id !== id);
      setUser(users);
    } else {
      alert("เกิดข้อผิดพลาด");
    }
  };

  return (
    <div>
      <table>
        <thead>
          <tr>
            <th>ชื่อผู้ใช้</th>
            <th>ชื่อจริง</th>
            <th>รหัสผ่าน</th>
            <th>เบอร์</th>
            <th>ที่อยู่</th>
            <th>เเก้ไข</th>
            <th>ลบ</th>
          </tr>
        </thead>
        <tbody>
          {user.map((user, idx) => (
            <tr>
              <td>{user.username}</td>
              <td>{user.firsname}</td>
              <td>{user.password}</td>
              <td>{user.telephone}</td>
              <td>{user.address}</td>
              <td>
                <button onClick={() => editinghandle (user)}>เเก้ไข</button>
              </td>
              <td>
                <button onClick={() => onSubmitDeletehandle (user.id)}>ลบ</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {isEditing && <EditComponent user={editUser}  onChangehandleEditInput= {onChangehandleEditInput} closeEditing ={closeEditing} onSubmitEditthandle= {onSubmitEditthandle} />}
      <div>
        <input name="username" type="text" onChange={(e) => onchangeinput(e)} />
        <input name="firsname" type="text" onChange={(e) => onchangeinput(e)} />
        <input name="password" type="text" onChange={(e) => onchangeinput(e)} />
        <input
          name="telephone"
          type="text"
          onChange={(e) => onchangeinput(e)}
        />
        <input name="address" type="text" onChange={(e) => onchangeinput(e)} />
      </div>
      <div>
        <button onClick={onSubmithandle}>ยืนยัน</button>
      </div>
    </div>
  );
}

export default Information;
