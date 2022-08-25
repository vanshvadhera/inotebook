import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { useNavigate } from "react-router-dom";

const Signup = (props) => {
  const navigate = useNavigate();
  const [cred, setCred] = useState({
    username: "",
    password: "",
    email: "",
    cpassword: "",
  });

  const onchange = (event) => {
    setCred({ ...cred, [event.target.name]: event.target.value });
  };

  const submitbutton = async (event) => {
    event.preventDefault();
    const response = await fetch(`http://localhost:3003/api/auth/createuser`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: cred.username,
        email: cred.email,
        password: cred.password,
      }),
    });
    const json = await response.json();
    if (json.success) {
      //Redirect to home page
      localStorage.setItem("auth-token", json.Authtoken);
      navigate("/");
      props.showalert("User created successfully", "success");
    } else {
      props.showalert("Invalid credentials", "danger");
    }
  };

  return (
    <div className="container" style={{marginTop:110}}>
        <h1 className="my-5">Create Your Account:</h1>
      <Form onSubmit={submitbutton}>
        <Form.Group className="mb-3" controlId="username">
          <Form.Label>User Name</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter Your User Name"
            name="username"
            onChange={onchange}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="email">
          <Form.Label>Email Address</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter email"
            name="email"
            onChange={onchange}
          />
          <Form.Text className="text-muted">
            We'll never share your email with anyone else.
          </Form.Text>
        </Form.Group>

        <Form.Group className="mb-3" controlId="password">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Password"
            name="password"
            onChange={onchange}
            minLength={5}
            required
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="cpassword">
          <Form.Label>Confirm Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="RE-Enter Password"
            name="cpassword"
            onChange={onchange}
            minLength={5}
            required
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicCheckbox">
          <Form.Check type="checkbox" label="Check me out" />
        </Form.Group>
        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>
    </div>
  );
};

export default Signup;
