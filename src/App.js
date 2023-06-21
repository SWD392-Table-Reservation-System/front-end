import logo from "./assets/swd-transformed_notext.svg";
import "./App.scss";
//import node package
import { BrowserRouter as Router, Route, Routes, BrowserRouter } from "react-router-dom";
import { Link } from "react-router-dom";

import { Button } from 'primereact/button';
import Login from './components/login/login';

//import pages
import Onboard from "./components/onboard/onboard";
import MakeOrder from "./components/makeOrder/makeOrder";
import Success from "./components/makeOrder/successOrder";

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
            <Route path="/order/success" element={<Success />}/>
            
          </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
