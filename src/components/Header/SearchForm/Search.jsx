import React, { useState } from 'react';
import style from './Search.module.css';

const Search = () => {
    let [searchFormData, setSearchFormData] = useState('')
    const search = (e) => {
        let value = e.target.value
        setSearchFormData(value)
    }
    return (<>
        <form action="">
            <input name="search" className={style.form} type="text" placeholder="Search" onChange={search} value={searchFormData} />

        </form>

    </>
    )
}
export default Search;