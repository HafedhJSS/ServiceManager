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
            </select>*/

  return (
    <div className="App">
      <div>
        <h2>Requests:</h2>
        {requests &&
          requests.map((request) => {
            return (
              <div key={request._id}>
                <h3>{request.userId}</h3>
                <button onClick={() => deleteRequest(request._id)}>
                  Delete note
                </button>
                <button onClick={() => toggleUpdate(request)}>Update Request</button>
              </div>
            );
          })}
      </div>

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
        </div>
      )}
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
