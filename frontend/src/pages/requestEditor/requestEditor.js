import { useState, useEffect } from "react";
import axios from "axios";
//import { createRequest, updateRequest } from "../../../../backend/controllers/requestController";

function RequestEditor() {
  // State
  const [requests, setRequests] = useState(null);
  const [createForm, setCreateForm] = useState({
    userId: "",
    creationDate: "",
    status:"",
    type:""
  });
  const [updateForm, setUpdateForm] = useState({
    userId: null,
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
    const res = await axios.get("http://localhost:3000/requests");

    // Set to state
    setRequests(res.data.requests);
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

    const res = await axios.post("http://localhost:3000/requests", createForm);

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
    const res = await axios.delete(`http://localhost:3000/request/${_id}`);

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
  };

  return (
    <div className="App">
      <div>
        <h2>requests:</h2>
        {requests &&
          requests.map((request) => {
            return (
              <div key={request._id}>
                <h3>{request.userId}</h3>
                <button onClick={() => deleteRequest(request._id)}>
                  Delete request
                </button>
                <button onClick={() => toggleUpdate(request)}>Update request</button>
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
}

export default RequestEditor;