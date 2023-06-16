import logo from './assets/swd-transformed_notext.svg';
import './App.scss';

import { Button } from 'primereact/button';


function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
      </header>
      <Button label="Submit" icon="pi pi-check" />
    </div>
  );
}

export default App;
