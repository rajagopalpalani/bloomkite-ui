import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { profileSelector } from '../../selectors/profile';
import { fetchTeam } from '../../actions/teamSignup';
import { clearProfile } from '../../actions/profile';
import ProfileInfo from '../../components/profile/profileInfo';
import AboutMe from '../../components/profile/aboutMe';
import Products from '../../components/profile/products';
import Experience from '../../components/profile/experience';
import Promotions from '../../components/profile/promotions';
import Education from '../../components/profile/education';
import Awards from '../../components/profile/awards';
import Certificates from '../../components/profile/certificates';
import KeyPeople from '../../components/profile/keyPeople';
import Teams from '../../components/profile/teams';
import Brands from '../../components/profile/brands';
import Company from '../../components/profile/corporateTeam';
import PdfProfile from '../../components/advisor/pdfProfile';
import Loader from '../../components/common/loader';
import PDFHoc from '../../components/pdf/PDFHoc';
import ContactPopup from '../../components/Contact/contactPopup';
import ContactPopupSignup from '../../components/Contact/contactPopupSignup';
import ProfilePoints from '../../components/profile/profilePoints';
import ProfileHeader from '../../components/profileHeader';
//import { createChatRequest } from '../../components/chats/Chat.actions';
import { follow, fetchFollowersRequest, unFollowFollower } from '../../components/followers/Followers.actions';
import { canFollow } from '../../utils/functions';
import { faDownload } from '@fortawesome/free-solid-svg-icons';
import FontIcon from '../../components/common/fontAwesomeIcon';

class Particulars extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            openPopup: false,
            domLoaded: false
        };
    }

    onOpenModal = () => {
        this.setState({ openPopup: true });
    };

    onCloseModal = () => {
        this.setState({ openPopup: false });
    };

    componentDidMount() {
        const { advisorDetails: { advId } = {}, investorDetails: { invId } = {} } = this.props;
        if (advId || invId) {
            this.props.getFollowersRequest({ userId: advId || invId, statusId: 1 });
        }
        this.setState({ domLoaded: true });
    }

    componentDidUpdate(prevProps) {
        const { advisorDetails: { advId } = {}, investorDetails: { invId } = {} } = this.props;
        const { advisorDetails: { advId: prevAdvId } = {}, investorDetails: { invId: prevInvId } = {} } = prevProps;
        if ((advId && prevAdvId !== advId) || (invId && prevInvId !== invId)) {
            this.props.getFollowersRequest({ userId: advId || invId, statusId: 1 });
        }
    }

    handleFollow = (userId, statusId = 1) => {
        const { advisorDetails: { advId } = {}, investorDetails: { invId } = {} } = this.props;
        this.props.follow({ advId: userId, userId: advId || invId, statusId });
    };

    handleUnfollowClick = (user) => {
        const { advisorDetails: { advId } = {}, investorDetails: { invId } = {} } = this.props;
        this.props.unFollowFollower({ userId: advId || invId, advId: user, statusId: 1 });
    };

    // handleChat = (user) => {
    //     const { advisorDetails: { advId } = {}, investorDetails: { invId } = {} } = this.props;
    //     this.props.createChatRequest({ advId: user, userId: advId || invId });
    // };

    componentWillUnmount() {
        this.props.clearProfile();
    }

    renderProfiles = () => {
        const { profile, advisorDetails: { advId: currentUserId } = {}, investorDetails: { invId } = {}, followings } = this.props;
        const userId = currentUserId || invId;
        const { displayName, designation, city, imagePath, advId } = profile;
        const ableToFollow = canFollow(userId, advId);
        const user = (followings || []).find((item) => item.advId === advId) || {};
        return (
            <div className="col-lg-3 col-md-12 profile-info">
                {profile && <div className="profile-dark-bg" />}
                <div className="profile-light-bg">
                    {profile && (
                        <ProfileInfo
                            displayName={displayName}
                            designation={designation}
                            city={city}
                            corporate={profile.corporateUsername}
                            image={imagePath}
                            downloadLink={profile && this.renderDownloadLink()}
                            contactLink={profile && this.renderContact()}
                        />
                    )}
                    {userId && advId !== userId && (
                        <ProfilePoints
                            advId={advId}
                            canFollow={ableToFollow}
                            user={user}
                            //onChatClick={() => this.handleChat(advId)}
                            onUnfollowClick={() => this.handleUnfollowClick(advId)}
                            onRefollowClick={() => this.handleFollow(advId, 4)}
                            onFollowClick={() => this.handleFollow(advId)}
                            contactLink={profile && this.renderContact()}
                        />
                    )}
                    {this.renderExperience()}
                    {this.renderEducation()}
                </div>
            </div>
        );
    };

    renderContact = () => {
        const { profile, advisorDetails, investorDetails } = this.props;
        const { userName } = advisorDetails || {};
        const hasProfile = profile && Object.keys(profile).length;
        if (investorDetails || (hasProfile && userName && userName !== profile.userName)) {
            return (
                <span>
                    <button type="button" className="btn btn-primary" onClick={this.onOpenModal}>
                        Contact
                    </button>
                    {this.state.openPopup && <ContactPopup openPopup={this.state.openPopup} profile={this.props.profile} showCloseIcon={true} onCloseModal={this.onCloseModal} />}
                </span>
            );
        }
        if (hasProfile && userName && userName === profile.userName) {
            return null;
        }
        return <ContactPopupSignup buttonName={'Contact'} />;
    };

    renderAboutMe = () => {
        const { profile } = this.props;
        const { aboutme } = profile;
        return <AboutMe text={aboutme} />;
    };

    renderCompany = () => {
        const { profile } = this.props;
        const { corporateUsername, corporateLable } = profile;
        return <Company corporateUsername={corporateUsername} corporateLable={corporateLable} />;
    };

    renderExperience = () => {
        const { profile } = this.props;
        const { experiences } = profile;
        return <Experience list={experiences} />;
    };

    renderPromotions = () => {
        const { profile } = this.props;
        const { promotions } = profile;
        return <Promotions list={promotions} />;
    };

    renderAwards = () => {
        const { profile } = this.props;
        const { awards } = profile;
        return <Awards list={awards} />;
    };

    renderCertificates = () => {
        const { profile } = this.props;
        const { certificates } = profile;
        return <Certificates list={certificates} />;
    };

    renderEducation = () => {
        const { profile } = this.props;
        const { educations } = profile;
        return <Education list={educations} />;
    };

    renderKeypeople = () => {
        const { profile } = this.props;
        const { keyPeopleList } = profile;
        return <KeyPeople list={keyPeopleList} />;
    };

    renderTeams = () => {
        const { profile } = this.props;
        const { teamMemberList } = profile;
        return <Teams list={teamMemberList} />;
    };

    renderProducts = () => {
        const { profile, productList, remunerationList, serviceList } = this.props;
        const { advProducts, advBrandRank } = profile;
        return <Products list={advProducts} products={productList} remuneration={remunerationList} services={serviceList} brands={advBrandRank} />;
    };

    renderBrands = () => {
        const { profile } = this.props;
        return <Brands list={profile.advBrandRank} />;
    };

    renderDownloadLink = () => {
        const { profile, productList, serviceList, remunerationList, advisorDetails } = this.props;
        const { userName } = advisorDetails || {};
        const { advBrandRank, name } = profile || {};
        const hasProfile =
            profile &&
            Object.keys(profile).length &&
            productList &&
            Object.keys(productList).length &&
            advBrandRank &&
            advBrandRank.length &&
            serviceList &&
            Object.keys(serviceList).length &&
            remunerationList &&
            Object.keys(remunerationList).length;
        if (hasProfile && userName === profile.userName) {
            const downloadIcon = (
                <span>
                    <FontIcon icon={faDownload} /> Download
                </span>
            );
            const loader = <span>Loading document...</span>;
            return (
                <PDFHoc name={name} icon={downloadIcon} loader={loader}>
                    {profile && (
                        <PdfProfile
                            profileImage={profile.imagePath ? profile.imagePath : `${window.location.origin}/images/avatar.png`}
                            profile={profile}
                            productList={productList}
                            advBrandRank={advBrandRank}
                            serviceList={serviceList}
                            remunerationList={remunerationList}
                        />
                    )}
                </PDFHoc>
            );
        }
    };

    render() {
        const { profile, isLoading } = this.props;
        const hasProfile = profile && Object.keys(profile).length;
        return (
            <div className="particulars-container">
                <div className="col-12">
                    {!this.props.hideProfileHeader && <ProfileHeader showPrevious={true} advisorDetails={this.props.advisorDetails} />}
                    <div className={`${!this.props.hideProfileHeader ? 'experts-top' : 'center-profile-landing'}`}>
                        <div className="container align-center">
                            <div className="row nomargin nopadding">
                                {hasProfile && this.renderProfiles()}
                                <div className="col-lg-9 col-md-12">
                                    {this.renderPromotions()}
                                    <div
                                        ref={(ele) => {
                                            this.profile = ele;
                                        }}>
                                        <div id="logo-profile-name profile-particular"></div>
                                        {this.renderAboutMe()}
                                        {this.props.profile.corporateUsername && this.renderCompany()}
                                        {this.renderProducts()}
                                        {this.renderKeypeople()}
                                        {this.renderTeams()}
                                        {this.renderAwards()}
                                        {this.renderCertificates()}
                                        {this.props.brandList && this.renderBrands()}
                                    </div>
                                </div>
                            </div>
                        </div>
                        {!this.props.loaderHide && isLoading && <Loader loading={isLoading} />}
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => profileSelector(state);

const mapDispatchToProps = (dispatch) => {
    return {
        fetchTeam: bindActionCreators(fetchTeam, dispatch),
        follow: bindActionCreators(follow, dispatch),
        getFollowersRequest: bindActionCreators(fetchFollowersRequest, dispatch),
        unFollowFollower: bindActionCreators(unFollowFollower, dispatch),
        clearProfile: bindActionCreators(clearProfile, dispatch)
        //createChatRequest: bindActionCreators(createChatRequest, dispatch)
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Particulars);
