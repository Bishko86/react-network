import React from 'react';
import { NavLink } from 'react-router-dom';
import style from './NavbarItems.module.css'

const NavbarItems = (props) => {
    return (
        <div className={style.item}><NavLink to={props.url} activeClassName={style.active_link} id={props.id}>{props.item}</NavLink></div>
    );
}
export default NavbarItems;

