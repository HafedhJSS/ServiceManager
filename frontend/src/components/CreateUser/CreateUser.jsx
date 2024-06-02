import { Button, Input, Select, Textarea } from "@chakra-ui/react";
import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function CreateUser() {
  const [formData, setformData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    bio: "",
    phone: "",
    role: "",
  });
  const navigate = useNavigate();
  const submit = async (e) => {
    e.preventDefault();
    const name = document.querySelector('input[name="name"]').value;
    const email = document.querySelector('input[name="email"]').value;
    const password = document.querySelector('input[name="password"]').value;
    const confirmPassword = document.querySelector(
      'input[name="confirmPassword"]'
    ).value;
    const phone = document.querySelector('input[name="phone"]').value;
    const bio = document.querySelector('textarea[name="bio"]').value;
    const role = document.querySelector('select[name="role"]').value;
    if (
      !name ||
      !email ||
      !password ||
      !confirmPassword ||
      !phone ||
      !bio ||
      !role
    ) {
      alert("Form Invalid");
      return;
    }
    if (password !== confirmPassword) {
      alert("Password Not Identical");
      return;
    }
    try {
      console.log(role);
      const response = await axios.post(
        "http://localhost:5000/api/users/register",
        { name, email, password, phone, bio, role }
      );
      if (response) {
        console.log(response.data);
        navigate("/users");
      }
    } catch (error) {
      console.log(error);
      alert(error.response.data.message);
    }
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
          <p>Create User </p>
          <div
            style={{
              width: "100%",
              display: "flex",
              flexDirection: "column",
              alignItems: "flex-start",
              justifyContent: "center",
              gap: "10px",
            }}
          >
            <p>User Name</p>
            <Input
              name="name"
              color={"black"}
              height={"40px"}
              fontSize={16}
              placeholder="User Name"
            />
          </div>
          <div
            style={{
              width: "100%",
              display: "flex",
              flexDirection: "column",
              alignItems: "flex-start",
              justifyContent: "center",
              gap: "10px",
            }}
          >
            <p> Email</p>
            <Input
              name="email"
              color={"black"}
              height={"40px"}
              fontSize={16}
              type="email"
              placeholder="User Name"
            />
          </div>
          <div
            style={{
              width: "100%",
              display: "flex",
              flexDirection: "column",
              alignItems: "flex-start",
              justifyContent: "center",
              gap: "10px",
            }}
          >
            <p>Password</p>
            <Input
              name="password"
              color={"black"}
              height={"40px"}
              fontSize={16}
              type="password"
            />
          </div>
          <div
            style={{
              width: "100%",
              display: "flex",
              flexDirection: "column",
              alignItems: "flex-start",
              justifyContent: "center",
              gap: "10px",
            }}
          >
            <p>Confirm Password</p>
            <Input
              name="confirmPassword"
              color={"black"}
              height={"40px"}
              type="password"
              fontSize={16}
            />
          </div>
          <div
            style={{
              width: "100%",
              display: "flex",
              flexDirection: "column",
              alignItems: "flex-start",
              justifyContent: "center",
              gap: "10px",
            }}
          >
            <p>User Bio</p>
            <Textarea
              name="bio"
              rows={5}
              color={"black"}
              fontSize={16}
              type="text"
              placeholder="User Bio"
            />
          </div>
          <div
            style={{
              width: "100%",
              display: "flex",
              flexDirection: "column",
              alignItems: "flex-start",
              justifyContent: "center",
              gap: "10px",
            }}
          >
            <p>User Phone</p>
            <Input
              name="phone"
              height={"40px"}
              color={"black"}
              fontSize={16}
              type="text"
              placeholder="User Bio"
            />
          </div>
          <div
            style={{
              width: "100%",
              display: "flex",
              flexDirection: "column",
              alignItems: "flex-start",
              justifyContent: "center",
              gap: "10px",
            }}
          >
            <p>User Role</p>
            <Select name="role" height={"40px"} fontSize={16} color={"black"}>
              <option value={""}>Choose A Role</option>
              <option value={"User"}>User</option>
              <option value={"Technician"}>Technician</option>
            </Select>
          </div>
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

export default CreateUser;
