import axios from "axios";
import React, { useEffect, useState } from "react";
import { confirmAlert } from "react-confirm-alert";
import { AiOutlineEye } from "react-icons/ai";
import { FaEdit, FaTrashAlt } from "react-icons/fa";
import ReactPaginate from "react-paginate";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { SpinnerImg } from "../../components/loader/Loader";
import {
  Button,
  Select,
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

const Users = () => {
  const [users, setUsers] = useState([]);
  const isLoading = false;
  const [itemOffset, setItemOffset] = useState(0);
  const [pageCount, setPageCount] = useState(0);
  const itemsPerPage = 10;

  useEffect(() => {
    (async () => {
      const response = await axios.get(
        "http://localhost:5000/api/users/getUsers"
      );
      if (response.data) {
        setUsers(response.data.data);
      }
    })();
  }, []);
  const handlePageClick = (event) => {
    const newOffset = (event.selected * itemsPerPage) % users.length;
    setItemOffset(newOffset);
  };
  const shortenText = (text, n) => {
    if (text.length > n) {
      const shortenedText = text.substring(0, n).concat("...");
      return shortenedText;
    }
    return text;
  };
  const deleteUser = async (_id) => {
    console.log(_id);
    await axios.put(`http://localhost:5000/api/users/deleteUser/${_id}`);
    setUsers((prevRequests) =>
      prevRequests.filter((request) => request._id !== _id)
    );
  };
  console.log(users);
  return (
    <div className="d-flex vh-100 bg-primary justify-content-center align-items-center">
      <div className="w-50 bg-white rounded p-3 " style={{ marginTop: "10px" }}>
        <div
          style={{
            width: "100%",
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <h2>USERS</h2>
          <div>
            <Link to={"/users/createUser"}>
              <Button
                backgroundColor="#007bff"
                padding={"20px 20px"}
                fontSize={16}
                color={"white"}
              >
                Add User
              </Button>{" "}
            </Link>
          </div>
        </div>
        {users.length > 0 ? (
          <TableContainer>
            <Table variant="striped" colorScheme="teal">
              <TableCaption>ORDERS</TableCaption>
              <Thead>
                <Tr>
                  <Th>User Name</Th>
                  <Th>Email</Th>
                  <Th>Type</Th>
                  <Th> Creation Date</Th>
                  <Th>Action</Th>
                </Tr>
              </Thead>
              <Tbody>
                {users.length > 0 &&
                  users.map((el) => {
                    return (
                      <Tr key={el._id}>
                        <Td color={"black"} fontSize={14}>
                          <p> {el.name}</p>
                        </Td>
                        <Td color={"black"} fontSize={14}>
                          <p> {el.email}</p>
                        </Td>

                        <Td color={"black"} fontSize={14}>
                          <p> {el.role}</p>
                        </Td>
                        <Td color={"black"} fontSize={14}>
                          <p> {formatDate(el.createdAt)}</p>
                        </Td>
                        <Td>
                          <Button
                            onClick={() => deleteUser(el._id)}
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
        ) : (
          <div>
            <p>NO Users Yet</p>
            <Link to={"/users/createUser"}>
              <Button>Add User</Button>{" "}
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default Users;
function formatDate(inputDate) {
  const date = new Date(inputDate);
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  const hours = String(date.getHours()).padStart(2, "0");
  const minutes = String(date.getMinutes()).padStart(2, "0");

  return `${year}-${month}-${day}/${hours}-${minutes}`;
}
