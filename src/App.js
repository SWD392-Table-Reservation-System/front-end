import "./App.scss";
//import node package
import { BrowserRouter as Router, Route, Routes, BrowserRouter } from "react-router-dom";
import { Link } from "react-router-dom";
import Login from './components/login/login';

//import pages
import MakeOrder from "./components/makeOrder/makeOrder";
import Success from "./components/makeOrder/successOrder";
import ReservationList from "./components/tableMana/reservationList";
import TableMana from "./components/tableMana/tableMana";
import Onboard from "./components/onboard/onboard"

function App() {
  return (
    <div className="App">
      <BrowserRouter>
          <nav>
            <ul>
              <li>
                <Link to={"/"}>Home</Link> 
                <Link to={"/admin"}>Sign in as Admin</Link> 
                <Link to={"/order"}>Make Order</Link> 
                <Link to={"/admin/reservations"}>Reservation List</Link> 
              </li>
            </ul>
          </nav>
          <Routes>
            <Route exact path="/" element={ <Onboard /> }/>
            <Route path="/admin" element={ <Login /> }/>
            <Route path="/admin/reservations" element={ <ReservationList /> }/>
            <Route path="/admin/table-mana" element={ <TableMana /> }/>
            <Route path="/order" element={<MakeOrder />}/>
            <Route path="/order/success" element={<Success />}/>
            
          </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
