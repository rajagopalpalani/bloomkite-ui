import React from 'react';
import SelectSearch from 'react-select-search/dist/cjs';
import classes from 'react-select-search/style.css';

/* Simple example */
const SearchDropdown = (props) => (
    <SelectSearch
        options={props.data}
        search={props.search}
        emptyMessage={() => <div className="explore-search">{props.emptyMessage}</div>}
        placeholder={props.placeholder}
        onChange={props.onChange}
    />
);

export default SearchDropdown;