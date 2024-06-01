import React, { useState, useEffect } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import useRedirectLoggedOutUser from "../../customHook/useRedirectLoggedOutUser";
import { selectIsLoggedIn } from "../../redux/features/auth/authSlice";
import {
  Button,
  Select,
  Switch,
  Table,
  TableCaption,
  TableContainer,
  Tbody,
  Td,
  Tfoot,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";
import ReactPaginate from "react-paginate";

function RequestEditor() {
  useRedirectLoggedOutUser("/login");
  const dispatch = useDispatch();

  const isLoggedIn = useSelector(selectIsLoggedIn);
  const [requests, setRequests] = useState([]);

  useEffect(() => {
    fetchRequests();
  }, []);

  const fetchRequests = async () => {
    const res = await axios.get("http://localhost:5000/requests");
    setRequests(res.data.requests);
  };

  const deleteRequest = async (_id) => {
    await axios.delete(`http://localhost:5000/request/${_id}`);
    setRequests((prevRequests) =>
      prevRequests.filter((request) => request._id !== _id)
    );
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

  //   Begin Pagination
  const [currentItems, setCurrentItems] = useState([]);
  const [pageCount, setPageCount] = useState(0);
  const [itemOffset, setItemOffset] = useState(0);
  const itemsPerPage = 5;

  useEffect(() => {
    const endOffset = itemOffset + itemsPerPage;

    // setCurrentItems(filteredProducts.slice(itemOffset, endOffset));
    setPageCount(Math.ceil(3 / itemsPerPage));
  }, [itemOffset, itemsPerPage]);

  const handlePageClick = (event) => {
    const newOffset = (event.selected * itemsPerPage) % 5;
    setItemOffset(newOffset);
  };
  //   End Pagination

  return (
    <div className="d-flex vh-100 bg-primary justify-content-center align-items-center">
      <div className="w-50 bg-white rounded p-3">
        <h2>Requests:</h2>
        <TableContainer>
          <Table variant="striped" colorScheme="teal">
            <TableCaption>ORDERS</TableCaption>
            <Thead>
              <Tr>
                <Th>User Name</Th>
                <Th>Email</Th>
                <Th>Status</Th>
                <Th> Creation Date</Th>
                <Th>Type</Th>
                <Th>Action</Th>
              </Tr>
            </Thead>
            <Tbody>
              {requests.length > 0 &&
                requests.map((el) => {
                  return (
                    <Tr>
                      <Td color={"black"} fontSize={14}>
                        <p> {el.userId.name}</p>
                      </Td>
                      <Td color={"black"} fontSize={14}>
                        <p> {el.userId.email}</p>
                      </Td>
                      <Td>
                        <Select
                          onChange={(e) => updateRequestStatus(e, el._id)}
                          fontSize={14}
                          color={"black"}
                          placeholder="Select option"
                        >
                          <option
                            selected={el.status === "notChecked"}
                            value="notChecked"
                          >
                            Pending
                          </option>
                          <option
                            selected={el.status === "accepted"}
                            value="accepted"
                          >
                            Accepted
                          </option>
                          <option
                            selected={el.status === "workInProgress"}
                            value="workInProgress"
                          >
                            Work in Progress
                          </option>
                          <option
                            selected={el.status === "validated"}
                            value="validated"
                          >
                            Validated
                          </option>
                        </Select>
                      </Td>
                      <Td fontSize={14} color={"black"} isNumeric>
                        <p> {el.creationDate}</p>
                      </Td>
                      <Td fontSize={14} color={"black"}>
                        <p>{el.type}</p>
                      </Td>
                      <Td>
                        <Button
                          onClick={() => deleteRequest(el._id)}
                          color={"white"}
                          colorScheme="red"
                        >
                          Delete
                        </Button>
                      </Td>
                    </Tr>
                  );
                })}
            </Tbody>
            <Tfoot>
              <Tr>
                <Th></Th>
                <Th></Th>
                <Th isNumeric></Th>
              </Tr>
            </Tfoot>
          </Table>
          <ReactPaginate
            breakLabel="..."
            nextLabel="Next"
            onPageChange={handlePageClick}
            pageRangeDisplayed={3}
            pageCount={pageCount}
            previousLabel="Prev"
            renderOnZeroPageCount={null}
            containerClassName="pagination"
            pageLinkClassName="page-num"
            previousLinkClassName="page-num"
            nextLinkClassName="page-num"
            activeLinkClassName="activePage"
          />
        </TableContainer>
      </div>
    </div>
  );
}

export default RequestEditor;
