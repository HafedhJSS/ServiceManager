import { useState, useEffect } from "react";
import axios from "axios";
//import { createRequest, updateRequest } from "../../../../backend/controllers/requestController";
//import 'bootstrap/dist/css/bootstrap.min.css'
function RequestEditor() {
  // State
  const [requests, setRequests] = useState(null);
  const [createForm, setCreateForm] = useState({
    userId: "888",
    creationDate: "",
    status:"",
    type:""
  });
  const [updateForm, setUpdateForm] = useState({
    _id:null,
    userId: "",
    creationDate: "",
    status: "",
    type:""
  });

  // Use effect
  useEffect(() => {
    fetchRequests();
  }, []);

  const fetchRequests = async () => {
    // Fetch the request
    const res = await axios.get("http://localhost:5000/requests");
console.log(res);
    // Set to state
    setRequests(res.data.requests);
    console.log(res);
  };

  const updateCreateFormField = (e) => {
    const { userId, value,creationDate, status,type } = e.target;

    setCreateForm({
      ...createForm,
      [userId]: value, // a verifier 
    });
  };

  const createRequest = async (e) => {
    e.preventDefault();

    const res = await axios.post("http://localhost:5000/request", createForm);

    setRequests([...requests, res.data.request]);

    setCreateForm({
      userId: "",
      creationDate: "",
      status:"",
      type:""
    });
  };

  const deleteRequest = async (_id) => {
    // Delete the request
    const res = await axios.delete(`http://localhost:5000/request/${_id}`);

    // Update state
    const newRequest = [...requests].filter((request) => {
      return request._id !== _id;
    });

    setRequests(newRequest);
  };

  const handleUpdateFieldChange = (e) => {
    const { value, userId } = e.target;

    setUpdateForm({
      ...updateForm,
      [userId]: value,
    });
  };

  const toggleUpdate = (request) => {
    // Set state on update form
    setUpdateForm({ userId: request.userId, creationDate: request.creationDate, _id: request._id,
         status: request.status, type:request.type });
  };

  const updateRequest = async (e) => {
    e.preventDefault();

    const { userId, creationDate,status,type } = updateForm;

    // Send the update request
    const res = await axios.put(
      `http://localhost:5000/request/${updateForm._id}`,
      { userId,creationDate,status,type }
    );

    // Update state
    const newRequest = [...requests];
    const requestIndex = requests.findIndex((request) => {
      return request._id === updateForm._id;
    });
    newRequest[requestIndex] = res.data.request;

    setRequests(newRequest);

    // Clear update form state
    setUpdateForm({
      _id: null,
      userId: "",
      creationDate: "",
      status:"",
      type:"",
    });
  };
/*          <select >
              <option value="VPN">VPN</option>
              <option value="VM">VM</option>
              <option value="AccessPoint">AccessPoint</option>
            </select>
            
            <button onClick={() => toggleUpdate(request)}>Update Request</button>

            {updateForm._id && (
        <div>
          <h2>Update request</h2>
          <form onSubmit={updateRequest}>
            <input
              onChange={handleUpdateFieldChange}
              value={updateForm.userId}
              name="userId"
            />
            <textarea
              onChange={handleUpdateFieldChange}
              value={updateForm.creationDate}
              name="creationDate"
            />
            <button type="submit">Update request</button>
          </form>
        </div>
      )}

      {!updateForm._id && (
        <div>
          <h2>Create request</h2>
          <form onSubmit={createRequest}>
            <input
              onChange={updateCreateFormField}
              value={createForm.userId}
              name="userId"
            />
            <textarea
              onChange={updateCreateFormField}
              value={createForm.body}
              name="creationDate"
            />
            
            <button type="submit">Create request</button>
          </form>
        </div>)}
            <td>key={request._id}</td>
            */

  return (
    <div className="d-flex vh-100 bg-primary justify-content-center align-items-center">
      <div className="w-50 bg-white rounded p-3">
        <h2>Requests:</h2>
        <table className="table">
        <tr><th><h3>userID: </h3>
                    </th>
                    <th>
                    <h3>status: </h3>
                    </th>
                    <th><h3>date de creation: </h3>
                    </th>
                    <th><h3>type: </h3></th>
                    </tr>
                    </table>
        {requests &&
          requests.map((request) => {
            return (
              <div >
                
                   

                
                <td>{request.userId}</td>
                <td>{request.status} 
                <select >
              <option value="notChecked">notChecked</option>
              <option value="Accepted">Accepted</option>
              <option value="Work in progress">Work in progress</option>
              <option value="completed">completed</option>
            </select></td>
                <td>{request.creationDate}</td>
                <td>{request.type}</td>

             
            <td>  <button className="btn btn-danger" onClick={() => deleteRequest(request._id)}>
                  Delete
                </button></td>
         
              
              </div>
              
            );
          })}
          
      </div>

      
      
    </div>
  );
/*  function CreateRequest(){
    const[userId,setUserId]=useState()
    const[type,setType] =useState();
    const submit = (e) =>{
      e.preventDefault();
      axios.post("http://localhost:5000/request",{userId//,type
    })
      .then(result =>console.log(result))
      .catch(err=>console.log(err))
    }
  
  return (
    <div className="App"> <form onSubmit={submit}>
    <div ><h2>userId<input type="text"onChange={setUserId}/></h2></div>
    
        <div> <button onclick>submit</button></div>
        </form>
    </div>
  )
//}*/
  }
//export default CreateRequest
export default RequestEditor;
