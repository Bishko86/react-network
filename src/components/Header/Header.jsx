import React from 'react';
import Search from './SearchForm/Search';
import style from './Header.module.css';
import { NavLink } from 'react-router-dom';
const Header = (props) => {
    return <header className={style.header}>
        <h1 className={style.logo}>Note Face</h1>
        <Search />
        <div className={style.loginBlock}>
            {props.isAuth ? <div>{props.login}-<button onClick={props.logout}>Logout</button></div> : <NavLink to={'/login'}>Login</NavLink>}

        </div>
    </header>;
}
export default Header;