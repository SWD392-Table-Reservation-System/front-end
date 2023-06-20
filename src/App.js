import logo from "./assets/swd-transformed_notext.svg";
import "./App.scss";
//import node package
import { BrowserRouter as Router, Route, Routes, BrowserRouter } from "react-router-dom";
import { Link } from "react-router-dom";

//import pages
import Login from "./components/login/login";
import Home from "./components/onboard/home";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
          <nav>
            <ul>
              <li>
                <Link to={"/"}>Home</Link> 
                <Link to={"/signin"}>Sign in</Link> 
              </li>
            </ul>
          </nav>
          <Routes>
            <Route exact path="/" element={ <Home /> }/>
            <Route exact path="/signin" element={ <Login /> }/>
          </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
