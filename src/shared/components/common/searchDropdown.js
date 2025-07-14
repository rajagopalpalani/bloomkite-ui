import React from 'react';
import SelectSearch from 'react-select-search/dist/cjs';
import classes from 'react-select-search/style.css';

/* Simple example */
const SearchDropdown = (props) => (
    <SelectSearch
        options={props.data}
        search={props.search}
        emptyMessage={() => <div style={{ textAlign: 'center', fontSize: '0.8em' }}>{props.emptyMessage}</div>}
        placeholder={props.placeholder}
        onChange={props.onChange}
        value={props.value}
        getOptions={props.getOptions}
        printOptions={props.printOptions}
        autoComplete={props.autoComplete}
    />
);

export default SearchDropdown;