import React from 'react';
import style from './Navbar.module.css'
import NavbarItems from './NavbarItems/NavbarItems';

const Navbar = (props) => {
    // debugger
    let items = props.items.navbarItems();

    let navbarItem = items.map((item) => {
        let urlKey = item[0].toLowerCase() + item.slice(1);
        let url = props.items.navbarLinks[urlKey];
        return <NavbarItems item={item} url={url} id={item} key={item} />
    });

    return (
        < nav className={style.nav} >
            {navbarItem}
            <div className={style.fr}></div>
            <div className={style.fr}></div>
            <div className={style.fr}></div>

        </nav >
    );
}
export default Navbar;

