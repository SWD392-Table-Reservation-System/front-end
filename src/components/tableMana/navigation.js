import React from 'react';
import { Menubar } from 'primereact/menubar';

const App = () => {
  const items = [
    {
      label: 'Home',
      icon: 'pi pi-fw pi-home',
      url: '/'
    },
    {
      label: 'About',
      icon: 'pi pi-fw pi-info',
      url: '/about'
    },
    {
      label: 'Contact',
      icon: 'pi pi-fw pi-envelope',
      url: '/contact'
    }
  ];

  return (
    <div>
      <Menubar model={items} />
      {/* Rest of your application */}
    </div>
  );
};

export default App;
