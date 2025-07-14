import React from 'react';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import FontIcon from '../common/fontAwesomeIcon';


const NoResults = (props) => {
    const { message } = props;
    return (
        <div className="explore-no-results">
            <FontIcon icon={faSearch} />
            <h3 className="explore-no-results-message">
                {message || 'No Matched Results Found'}
            </h3>
        </div>
    );
};

export default NoResults;
