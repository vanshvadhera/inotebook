import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { useNavigate } from "react-router-dom";

const Login = (props) => {
    let navigate = useNavigate();
  const [text, setText] = useState({ email: "", password: "" });

  const changehandler = (event) => {
    setText({ ...text, [event.target.name]: event.target.value });
  };
  const submitbutton = async (event) => {
    event.preventDefault();
    const response = await fetch(`http://localhost:3003/api/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email: text.email, password: text.password }),
    });
    const json = await response.json();
    console.log(json);
    if (json.success) {
      //Redirect to home page
      localStorage.setItem("auth-token", json.Authtoken);
      setTimeout(() => {
      navigate("/");
      }, 500);
      props.showalert("Login Successfully", "success");
    } else {
      props.showalert("Invalid credentials", "danger");
    }
  };
  return (
    <div
      style={{
        backgroundImage: `url("https://wallpaperaccess.com/full/1900851.png")`,
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
        backgroundPosition: "center",
        height: "100vh",
        width: "100vw",
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          position: "relative",
          top: 250,
        }}
      >
        <div style={{ width: "45%" }}>
            <h1>Login To Your Account:</h1>
          <Form className="container my-5" onSubmit={submitbutton}>
            <Form.Group className="mb-3" controlId="email">
              <Form.Label style={{ color: "black" }}>Email address</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter email"
                name="email"
                onChange={changehandler}
              />
              <Form.Text style={{ color: "black" }}>
                We'll never share your email with anyone else.
              </Form.Text>
            </Form.Group>

            <Form.Group className="mb-3" controlId="password">
              <Form.Label style={{ color: "black" }}>Password</Form.Label>
              <Form.Control
                type="password"
                minLength={5}
                placeholder="Password"
                name="password"
                required
                onChange={changehandler}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicCheckbox">
              <Form.Check
                type="checkbox"
                label="Accept Terms And Conditions "
              />
            </Form.Group>
            <Button variant="primary" type="submit">
              Submit
            </Button>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default Login;
