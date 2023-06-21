import logo from "./assets/swd-transformed_notext.svg";
import "./App.scss";
//import node package
import { BrowserRouter as Router, Route, Routes, BrowserRouter } from "react-router-dom";
import { Link } from "react-router-dom";

import { Button } from 'primereact/button';

//import pages
import Login from "./components/login/login";
import LoginCopy from './components/login/loginCopy';
import Home from "./components/onboard/home";
import MakeOrder from "./components/makeOrder/makeOrder";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
          <nav>
            <ul>
              <li>
                <Link to={"/"}>Home</Link> 
                <Link to={"/signin"}>Sign in</Link> 
                <Link to={"/order"}>Make Order</Link> 
              </li>
            </ul>
          </nav>
          <Routes>
            <Route exact path="/" element={ <Onboard /> }/>
            <Route path="/signin" element={ <Login /> }/>
            <Route path="/order" element={<MakeOrder />}/>
          </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
