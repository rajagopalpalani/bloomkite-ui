import React from 'react';
import { Link } from 'react-router-dom';
import { routeConstants } from '../../constants/routes';

class Teams extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            // isOpen: false,
            // photoIndex: 0
        };
    }
    render() {
        const { list } = this.props;
        return list && list.length > 0 ? (
            <div className="bloomkite-profile-keypeople">
                <h5 className="profile-title">
                    <strong className="experts-head">Team Member</strong>
                </h5>
                <div className="row nomargin nopadding">
                    {list.map((item, i) => {
                        const { name, designation, city } = item;
                        return (
                            <div key={'team-member-' + i} className="keypeople col-lg-4 col-md-4 col-sm-12">
                                <div className="bg-white padding15 profile-border text-center">
                                    <section className="profile-keypeople text-center">
                                        {name}
                                        <br />
                                        {designation}
                                        <br />
                                        {city}
                                    </section>
                                    <Link to={routeConstants.CORPORTATE_PROFILE.replace(':corporateId', item.userName)} className="btn btn-primary team-view">
                                        View Profile
                                    </Link>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        ) : null;
    }
}

export default Teams;
