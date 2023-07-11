import React, { useState } from 'react';
import { PanelMenu } from 'primereact/panelmenu';

const Navbar = () => {
    const [activeItem, setActiveItem] = useState(null);

    const onMenuItemClick = (event) => {
        setActiveItem(event.item);
    };

    const menuItems = [
        {
            label: 'Home',
            icon: 'pi pi-home',
            command: () => setActiveItem('Home'),
        },
        {
            label: 'About',
            icon: 'pi pi-info',
            command: () => setActiveItem('About'),
        },
        {
            label: 'Services',
            icon: 'pi pi-cog',
            command: () => setActiveItem('Services'),
        },
        {
            label: 'Contact',
            icon: 'pi pi-envelope',
            command: () => setActiveItem('Contact'),
        },
    ];

    return (
        <div className="navbar">
            <div className="navbar-logo">Your Logo</div>
            <PanelMenu
                model={menuItems}
                activeItem={activeItem}
                onMenuItemClick={onMenuItemClick}
                style={{ width: '100%' }}
            />
        </div>
    );
};

export default Navbar;
