import React from 'react'

const EditComponent = ({user,onChangehandleEditInput,closeEditing,onSubmitEditthandle}) => {
  return (
    <div>EditComponent
        <input name="username" value={user.username } onChange={(e) => onChangehandleEditInput(e)}/>
        <input name="firsname" value={user.firsname} onChange={(e) => onChangehandleEditInput(e)}/>
        <input name="password" value={user.password} onChange={(e) => onChangehandleEditInput(e)}/>
        <input name="telephone" value={user.telephone} onChange={(e) => onChangehandleEditInput(e)}/>
        <input name="address" value={user.address} onChange={(e) => onChangehandleEditInput(e)}/>
        <button onClick={onSubmitEditthandle} >เเก้ไข</button>
        <button onClick={closeEditing}>ยกเลิก</button>
        
        

    </div>
  )
}

export default EditComponent