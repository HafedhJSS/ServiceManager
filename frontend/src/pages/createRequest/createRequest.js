import { useState, useEffect } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import useRedirectLoggedOutUser from "../../customHook/useRedirectLoggedOutUser";
import {
  selectIsLoggedIn,
  selectName,
  selectUserData,
} from "../../redux/features/auth/authSlice";
import { Button, Input, Select } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { px } from "framer-motion";

function CreateRequest() {
  useRedirectLoggedOutUser("/login");
  const dispatch = useDispatch();

  const isLoggedIn = useSelector(selectIsLoggedIn);
  const name = useSelector(selectName);
  const userData = useSelector(selectUserData);
  const [userId, setUserId] = useState(() => localStorage.getItem("_id"));
  const navigate = useNavigate();
  const [creationDate, setCreationDate] = useState();
  const [status, setStatus] = useState();
  const [type, setType] = useState("");
  const submit = async (e) => {
    e.preventDefault();
    if (type.length === 0) {
      alert("CHoose A service");
      return;
    }
    await axios
      .post("http://localhost:5000/request", {
        userId,
        creationDate,
        status,
        type,
      })
      .then((result) => {
        navigate("/requestEditor");
      })
      .catch((err) => console.log(err));
  };
  return (
    <div>
      <form
        style={{ display: "flex", flexDirection: "column", gap: 10 }}
        onSubmit={submit}
      >
        <div
          style={{
            marginTop: 45,
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-start",
            justifyContent: "center",
            gap: 25,
          }}
        >
          <p className="--color-primary" fontSize={24}>
            {" "}
            {name} please choose the desired service{" "}
          </p>
          <p>Services </p>
          <Select
            fontSize={16}
            color={"black"}
            height={"40px"}
            onChange={(e) => setType(e.target.value)}
          >
            <option value="">Choose A service</option>
            <option value="VPN">VPN</option>
            <option value="VM">VM</option>
            <option value="AccessPoint">Access Point</option>
          </Select>
        </div>
        <Button
          type="submit"
          backgroundColor="#007bff"
          color={"white"}
          fontSize={16}
          minH={16}
          marginTop={10}
        >
          Submit
        </Button>
      </form>
    </div>
  );
}

export default CreateRequest;
