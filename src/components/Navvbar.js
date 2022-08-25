import React from "react";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { Link, useNavigate } from "react-router-dom";
import "./Navvbar.css";

const Navvbar = (props) => {
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem("auth-token");
    navigate("/login");
    props.showalert("Logout successfully", "success");
  };
  return (
    <>
      <Navbar bg="dark" expand="lg" variant="dark" fixed="top">
        <Container fluid>
          <img
            src="https://image.shutterstock.com/image-vector/text-book-pen-filled-outline-260nw-1022781121.jpg"
            width="30"
            height="30"
            margin="10px"
            className="d-inline-block align-top mx-2"
            alt="React Bootstrap logo"
          />
          <Navbar.Brand href="/">iNotebook</Navbar.Brand>
          <Navbar.Toggle aria-controls="navbarScroll" />
          <Navbar.Collapse id="navbarScroll">
            <Nav
              className="me-auto my-2 my-lg-0 "
              style={{ maxHeight: "100px" }}
              navbarScroll
            >
              <Nav.Link>
                {" "}
                <Link className="link" to="/">
                  Home
                </Link>
              </Nav.Link>
              <Nav.Link>
                <Link className="link" to="/About">
                  About
                </Link>
              </Nav.Link>
            </Nav>
            {!localStorage.getItem("auth-token") ? (
              <Form className="d-flex">
                <Link
                  className="link2 mx-2"
                  to="/login"
                  variant="outline-secondary"
                >
                  Log In
                </Link>
                <Link
                  className="link2 mx-2"
                  variant="outline-info"
                  to="/signup"
                >
                  Sign Up
                </Link>
              </Form>
            ) : (
              <Link
                className="link2 mx-2"
                onClick={logout}
                variant="outline-info"
                to="/login"
              >
                Log Out
              </Link>
            )}
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
};

export default Navvbar;
