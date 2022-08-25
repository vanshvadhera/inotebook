import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navvbar from "./components/Navvbar";
import Home from "./components/Home";
import About from "./components/About";
import NoteState from "./context/notes/NoteState";
import Alertcomp from "./components/Alertcomp";
import Login from "./components/Login";
import Signup from "./components/Signup";
import { useState } from "react";

function App() {
  const [alert, setAlert] = useState({msg : "", type: ""});
  const showalert = (message, type) => {
    setAlert({ msg:message, type:type });
    setTimeout(() => {
      setAlert({ msg:"", type:"" });
    }, 1500);
  };

  return (
    <>
      <NoteState>
        <Router>
          <Navvbar showalert={showalert} />
          <Alertcomp alert={alert} />
          <Routes>
            <Route
              exact
              path="/"
              element={<Home showalert={showalert} />}
            ></Route>
            <Route exact path="/About" element={<About />}></Route>
            <Route
              exact
              path="/login"
              element={<Login showalert={showalert} />}
            ></Route>
            <Route
              exact
              path="/signup"
              element={<Signup showalert={showalert} />}
            ></Route>
          </Routes>
        </Router>
      </NoteState>
    </>
  );
}

export default App;
