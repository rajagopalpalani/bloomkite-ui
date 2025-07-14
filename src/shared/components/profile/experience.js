import React from 'react';
import { faBuilding } from '@fortawesome/free-solid-svg-icons';
import FontIcon from '../common/fontAwesomeIcon';

const Experience = (props) => {
    const { list } = props;
    return list && list.length > 0 ? (
        <div className="bloomkite-profile-experience">
            <h5 className="profile-title">
                <strong className="experts-head">Experience</strong>
            </h5>
            <div className="row nomargin nopadding">
                {list.map((experience, index) => {
                    const { company, designation, location, fromYear, toYear } = experience;
                    return (
                        <div key={'experience-' + index} className="experience">
                            <h5>
                                <FontIcon className="profile-icon" icon={faBuilding} /> {company}
                            </h5>
                            <address className="profile-address">
                                <p>{designation}</p>
                                <p>{location}</p>
                                <p>{fromYear} - {toYear}</p>
                            </address>
                        </div>
                    );
                })}
            </div>
        </div>
    ) : null;
};

export default Experience;
