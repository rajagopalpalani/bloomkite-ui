import React from 'react';
import CustomFragment from '../common/customFragment';
import { faGraduationCap } from '@fortawesome/free-solid-svg-icons';
import FontIcon from '../common/fontAwesomeIcon';

const Education = (props) => {
    const { list } = props;
    return list && list.length > 0 ?
        (<div className="bloomkite-profile-education">
            <h5 className="profile-title"><strong className="experts-head">Education</strong></h5>
            <div className="row nomargin nopadding">
                {list && list.map((item, index) => {
                    const { institution, degree, field, fromYear, toYear } = item;
                    const specialization = field && <CustomFragment>{field}<br /></CustomFragment>
                    return (
                        <div key={'education-' + index} className="education">
                            <h5><FontIcon className="profile-icon" icon={faGraduationCap} /> {institution}</h5>
                            <section className="profile-education">
                                <p>{degree}</p>
                                <p>{specialization}</p>
                                <p>{fromYear} - {toYear}</p>
                            </section>
                        </div>
                    );
                })}
            </div>
        </div>
        ) : null;
};

export default Education;
