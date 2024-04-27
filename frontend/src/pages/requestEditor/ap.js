import React, { useState, useEffect } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import useRedirectLoggedOutUser from "../../customHook/useRedirectLoggedOutUser";
import { selectIsLoggedIn } from "../../redux/features/auth/authSlice";

function RequestEditorAp() {
  useRedirectLoggedOutUser("/login");
  const dispatch = useDispatch();

  const isLoggedIn = useSelector(selectIsLoggedIn);
  const [requests, setRequests] = useState(null);

  useEffect(() => {
    fetchRequests();
  }, []);

  const fetchRequests = async () => {
    const res = await axios.get("http://localhost:5000/requests/ap");
    setRequests(res.data.requests);
  };


  const updateRequestStatus = async (e, requestId) => {
    const newStatus = e.target.value;
    const res = await axios.put(`http://localhost:5000/request/${requestId}`, {
      status: newStatus,
    });
    const updatedRequest = res.data.request;
    setRequests((prevRequests) =>
      prevRequests.map((request) =>
        request._id === updatedRequest._id ? updatedRequest : request
      )
    );
  };

  return (
    <div>
      <div>
        <h2>Access point Requests:</h2>
        <table>
          <thead>
            <tr>
              <th>userID</th>
              <th>Status</th>
              <th>Creation Date</th>
              <th>Type</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {requests &&
              requests.map((request) => (
                <tr key={request._id}>
                  <td>{request.userId}</td>
                  <td>
                    <select
                      value={request.status}
                      onChange={(e) => updateRequestStatus(e, request._id)}
                    >
                      <option value="notChecked">Not Checked</option>
                      <option value="accepted">Accepted</option>
                      <option value="workInProgress">Work in Progress</option>
                      <option value="validated">Validated</option>
                    </select>
                  </td>
                  <td>{request.creationDate.substring(0, 10)}</td>
                  <td>{request.type}</td>
                  <td>
                  <button
                      className="btn btn-dark" disabled>
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default RequestEditorAp;
