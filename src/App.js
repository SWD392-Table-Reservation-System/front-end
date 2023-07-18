import "./App.scss";
//import node package
import { BrowserRouter as Router, Route, Routes, BrowserRouter } from "react-router-dom";
import Login from './components/login/login';

//import pages
import MakeOrder from "./components/makeOrder/makeOrder";
import Success from "./components/makeOrder/successOrder";
import ReservationList from "./components/admin/reservationMana/reservationList";
import TableMana from "./components/admin/tableMana/tableMana";
import Onboard from "./components/onboard/onboard"
import ProtectedRoute from "./utils/ProtectedRoute";
import Header from "./components/common/header/header";
import Navbar from "./components/common/navbar/navbar";
import FindSuitableTables from "./components/makeOrder/findSuitableTables";
import StaffList from "./components/admin/staff/staffList";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Header></Header>
        <div style={{height: '100px'}}></div>
        <Routes>
          <Route exact path="/" element={<Onboard />} />
          <Route path="/order" element={<FindSuitableTables />} />
          <Route path="/order/make" element={<MakeOrder />} />
          <Route path="/order/success" element={<Success />} />

          <Route path="/admin" element={<Login />} />
          <Route path="/admin/table-mana" element={
            <ProtectedRoute>
              <Navbar className='navbar'></Navbar>
              <TableMana />
            </ProtectedRoute>
          } />
          <Route path="/admin/reservations" element={
            <ProtectedRoute>
              <Navbar></Navbar>
              <ReservationList />
            </ProtectedRoute>
          } />
          <Route path="/admin/staff-list" element={
            <ProtectedRoute>
              <Navbar className='navbar'></Navbar>
              <StaffList/>
            </ProtectedRoute>
          } />


        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
