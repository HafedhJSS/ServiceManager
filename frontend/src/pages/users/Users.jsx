import axios from "axios";
import React, { useEffect, useState } from "react";
import { confirmAlert } from "react-confirm-alert";
import { AiOutlineEye } from "react-icons/ai";
import { FaEdit, FaTrashAlt } from "react-icons/fa";
import ReactPaginate from "react-paginate";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { SpinnerImg } from "../../components/loader/Loader";

const Users = () => {
  const [users, setUsers] = useState([]);
  const isLoading = false;
  const [itemOffset, setItemOffset] = useState(0);
  const [pageCount, setPageCount] = useState(0);

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

  const shortenText = (text, n) => {
    if (text.length > n) {
      const shortenedText = text.substring(0, n).concat("...");
      return shortenedText;
    }
    return text;
  };

  return (
    <div className="product-list">
      {" "}
      <div className="table">
        <div className="--flex-between --flex-dir-column">
          <span>
            <h3>Users List</h3>
          </span>
          <span></span>
        </div>

        {isLoading && <SpinnerImg />}

        <div className="table">
          {!isLoading && users.length === 0 ? (
            <p>-- No service found, please add a service...</p>
          ) : (
            <table>
              <thead>
                <tr>
                  <th>s/n</th>
                  <th>Name</th>
                  <th>email</th>
                  <th>Role</th>
                  <th>Phone</th>
                  <th>bio</th>
                </tr>
              </thead>
            </table>
          )}
        </div>
        <ReactPaginate
          breakLabel="..."
          nextLabel="Next"
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
      </div>
    </div>
  );
};

export default Users;
