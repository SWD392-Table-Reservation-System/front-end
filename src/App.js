import "./App.scss";
//import node package
import { BrowserRouter as Router, Route, Routes, BrowserRouter } from "react-router-dom";
import Login from './components/login/login';

//import pages
import MakeOrder from "./components/makeOrder/makeOrder";
import Success from "./components/makeOrder/successOrder";
import ReservationList from "./components/tableMana/reservationList";
import TableMana from "./components/tableMana/tableMana";
import Onboard from "./components/onboard/onboard"
import ProtectedRoute from "./utils/ProtectedRoute";
import Header from "./components/header/header";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Header></Header>
        <Routes>
          <Route exact path="/" element={<Onboard />} />
          <Route path="/order" element={<MakeOrder />} />
          <Route path="/order/success" element={<Success />} />

          <Route path="/admin" element={<Login />} />
          <Route path="/admin/reservations" element={
            <ProtectedRoute>
              <ReservationList />
            </ProtectedRoute>
          } />

          <Route path="/admin/table-mana" element={
            <ProtectedRoute>
              <TableMana />
            </ProtectedRoute>
          } />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
