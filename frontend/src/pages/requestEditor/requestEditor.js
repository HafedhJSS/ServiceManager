import { useState, useEffect } from "react";
import axios from "axios";
//import { createRequest, updateRequest } from "../../../../backend/controllers/requestController";
//import 'bootstrap/dist/css/bootstrap.min.css'
function RequestEditor() {
  // State
  const [requests, setRequests] = useState(null);
  /*const [createForm, setCreateForm] = useState({
    userId: "888",
    creationDate: "",
    status:"",
    type:""
  });*/
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

 

  const deleteRequest = async (_id) => {
    // Delete the request
    const res = await axios.delete(`http://localhost:5000/request/${_id}`);

    // Update state
    const newRequest = [...requests].filter((request) => {
      return request._id !== _id;
    });

    setRequests(newRequest);
  };




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

  }
//export default CreateRequest
export default RequestEditor;
