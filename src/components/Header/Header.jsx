import React from 'react';
import SearchForm from './SearchForm/SearchForm';
import style from './Header.module.css';
import { NavLink } from 'react-router-dom';
const Header = (props) => {

    return (
        <header className={style.header}>
            <h1 className={style.logo}>Note Face</h1>
            <SearchForm />
            <div className={style.loginBlock}>
                {
                    props.isAuth ?
                        <div>
                            <span style={{ color: 'white', marginRight: '15px' }}> {props.login} </span>
                            <NavLink onClick={props.logout} to={'/login'}>Logout</NavLink>
                        </div> :
                        <div><NavLink to={'/login'}>Login</NavLink> </div>
                }
            </div>
        </header>);
}

export default Header;