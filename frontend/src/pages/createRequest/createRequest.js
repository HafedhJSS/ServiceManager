import { useState, useEffect } from "react";
import axios from "axios";

  function CreateRequest(){
const [userId, setUserId]=useState();
const [creationDate,setCreationDate]=useState();
const [status,setStatus]=useState();
const [type,setType]=useState();
const submit = async (e) =>{
  e.preventDefault();
  await axios.post("http://localhost:5000/request",{userId,creationDate,status,type})
  .then(result => console.log(result))
  .catch(err => console.log(err)) 
}
return(
<div> 
  <form onSubmit={submit}>
    <h3>User id</h3>
    <input type="text" name="userId" onChange={(e)=>setUserId(e.target.value)}></input>
    <button>submit</button>
  </form>
</div>)
}

export default CreateRequest;