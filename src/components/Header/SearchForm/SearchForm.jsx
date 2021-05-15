import React from 'react';
import { Form, Field } from 'react-final-form';
import FormControl from '../../../common/FormsControl/FormsControl'
import style from './Search.module.css';

const Search = () => {
    return <div className={style.search}><SearchForm /></div>
}

const SearchForm = () => {
    return (<div className={style.search}>
        <Form
            onSubmit={(formData) => { console.log(formData) }}
            render={({ handleSubmit }) => (
                <form onSubmit={handleSubmit} name='searchForm'>
                    <Field name='search' typefield='input' type={'search'} render={FormControl} /><button>Search</button>

                </form>
            )}
        />
    </div>
    )
}


export default SearchForm;