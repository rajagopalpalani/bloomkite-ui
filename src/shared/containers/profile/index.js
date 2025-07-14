/* eslint-disable react/prop-types */
import React from 'react';
import { connect } from 'react-redux';
import Particulars from './particulars';

import { profileSelector } from '../../selectors/profile';
import { changeLoading } from '../../actions/app';
import { fetchBrandList, fetchProductList, fetchAllServiceAndBrand, fetchRemunerationList, fetchServiceList } from '../../actions/advisor';
import { fetchTeam } from '../../actions/teamSignup';
import { getProfile, getProfileWithoutToken, getProfileByUserName } from '../../actions/profile';
import { fetchByInvestorId } from '../../actions/investor';
import { fetchByAdvisorID } from '../../actions/advisor';

class Profile extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: false
        };
    }

    logout = () => {
        localStorage.clear();
        window.location.href = window.location.origin;
    };

    componentDidMount() {
        const { advisorDetails, investorDetails } = this.props;
        const userName = this.getUserName();
        const bloomkiteUsername = window.localStorage.getItem('bloomkiteUsername');
        this.props.changeLoading(true);
        this.props.fetchBrandList();
        this.props.fetchProductList();
        this.props.fetchAllServiceAndBrand();
        this.props.fetchRemunerationList();
        this.props.fetchServiceList();
        if (bloomkiteUsername) {
            let { partyId, roleBasedId, roleId } = JSON.parse(bloomkiteUsername);
            this.props.fetchTeam(partyId);
            if (userName) {
                this.props.getProfileByUserName(userName);
            } else {
                this.props.getProfile(roleBasedId);
            }
            if (!(advisorDetails && Object.keys(advisorDetails).length) && roleId === 1) {
                this.props.fetchByAdvisorID(roleBasedId);
            }
            if (!(investorDetails && Object.keys(investorDetails).length) && roleId === 2) {
                this.props.fetchByInvestorId(roleBasedId);
            }
        } else {
            this.props.getProfileWithoutToken(userName);
        }
    }

    getUserName = () => {
        const {
            match: { params }
        } = this.props;
        return params.corporateId;
    };

    render() {
        const { advisorDetails, investorDetails, isLoading, profile } = this.props;
        return (
            <div className="main-container pt-1">
                {profile && Object.keys(profile).length && profile.userName ? (
                    <Particulars advisorDetails={advisorDetails} investorDetails={investorDetails} loading={isLoading} />
                ) : (
                    !isLoading && profile && profile.isUserNotAvailable && <div className="user-not-available">This user is not available.</div>
                )}
            </div>
        );
    }
}

const mapStateToProps = (state) => profileSelector(state);

export default connect(mapStateToProps, {
    getProfile,
    fetchBrandList,
    fetchProductList,
    fetchAllServiceAndBrand,
    fetchRemunerationList,
    fetchServiceList,
    fetchTeam,
    getProfileWithoutToken,
    getProfileByUserName,
    fetchByAdvisorID,
    fetchByInvestorId,
    changeLoading
})(Profile);
