
import './App.scss';

import { Button } from 'primereact/button';
import Login from './components/login/login';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import LoginCopy from './components/login/loginCopy';


function App() {
  return (
    <div className="App">

      <BrowserRouter>
        {/* <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
      </header> */}
        <Routes>
          <Route path='/' element={<LoginCopy />} />
        </Routes>
        <Button label="Submit" icon="pi pi-check" />
      </BrowserRouter>
    </div>
  );
}

export default App;
