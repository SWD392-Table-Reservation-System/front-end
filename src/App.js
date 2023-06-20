import logo from "./assets/swd-transformed_notext.svg";
import "./App.scss";
//import node package
import { BrowserRouter as Router, Route, Routes, BrowserRouter } from "react-router-dom";
import { Link } from "react-router-dom";

//import pages
import Login from "./components/login/login";

function App() {
  return (
    <div className="App">
     <Login/>
    </div>
  );
}

export default App;
