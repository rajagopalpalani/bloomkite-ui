import React, { Component } from 'react';
import DashBoard from '../../components/investor/dashboard/dashboard';
import Password from '../../components/investor/password/password';
import Following from '../../components/investor/following/following';
import Area from '../../components/investor/area/area';
import PersonalInfo from '../../components/investor/personalInformation/personalInformation';
import MobileVerification from '../../components/investor/mobileVerification.js/mobileVerification';
import Loader from '../../components/common/loader';
import { uploadFile, clearImage } from '../../actions/uploadFile';
import { fetchCategoryList, changePassword, fetchProductList } from '../../actions/advisor';
import { fetchByInvestorIDSuccess, fetchInvestorList, fetchByInvestorId, modifyInvestor, addInvInterest, modifyInvInterest } from '../../actions/investor';
import { investorSelector } from '../../selectors/investor';
import { connect } from 'react-redux';
import ErrorBoundary from '../errorBoundary';

class Investor extends Component {
    constructor(props) {
        super(props);
        const { investorDetails } = props;
        this.state = {
            currentRole: '',
            name: '',
            roleId: 2,
            currentTab: 1,
            investorDetails,
            investorList: [],
            loading: false
        };
    }

    logout = () => {
        localStorage.clear();
        window.location.href = window.location.origin;
    };

    handleTabChange = (index) => {
        this.setState({ currentTab: index });
    };

    handleChange = (e) => {
        const { name, value } = e.target;
        this.setState({ [name]: value });
    };

    componentDidMount() {
        const { roleBasedId, partyId, roleId } = window.localStorage && JSON.parse(window.localStorage.getItem('bloomkiteUsername'));
        this.props.fetchByInvestorId(roleBasedId);
        // this.props.fetchInvestorList();
        this.props.fetchCategoryList();
        this.props.fetchProductList();
        this.setState({ loading: true, partyId, currentRole: roleId });
    }

    componentDidUpdate(oldProps) {
        if (JSON.stringify(this.props.investorDetails) != JSON.stringify(oldProps.investorDetails)) {
            this.setState({ investorDetails: this.props.investorDetails, categoryList: this.props.categoryList, productList: this.props.productList, loading: false });
        }
        if (JSON.stringify(this.props.categoryList) != JSON.stringify(oldProps.categoryList)) {
            this.setState({ categoryList: this.props.categoryList, loading: false });
        }
        if (JSON.stringify(this.props.loading) != JSON.stringify(oldProps.loading)) {
            this.setState({ loading: this.props.loading });
        }
        if (JSON.stringify(this.props.productList) != JSON.stringify(oldProps.productList)) {
            this.setState({ productList: this.props.productList, loading: false });
        }
        const { uploadFileDetails } = this.props;
        const { url, type } = uploadFileDetails || {};
        const { uploadFileDetails: prevFile } = oldProps;
        const { url: prevUrl } = prevFile || {};
        if (url !== prevUrl && url) {
            if (type === 'profile') {
                this.props.fetchByInvestorIDSuccess({ imagePath: url });
            }
            this.props.clearImage();
        }
    }

    updatePersonalInformation = (options) => {
        this.props.modifyInvestor(options);
    };

    addInvInterest = (options) => {
        let modifyCheck = false;
        options.invInterestReq.map((product) => {
            if (product.interestId) {
                modifyCheck = true;
            }
        });
        if (modifyCheck) {
            this.props.modifyInvInterest(options);
        } else {
            this.props.modifyInvInterest(options);
        }
    };

    updatePassword = (options) => {
        this.props.changePassword(options, 2);
    };

    uploadFile = (files, type) => {
        if (files && files[0]) {
            this.props.uploadFile(files[0], type);
        }
    };

    render() {
        const { uploadFileDetails } = this.props;
        const { url } = uploadFileDetails || {};
        return (
            <div className="main-container pt-1">
                {/* <Header logout={this.logout} role={this.state.currentRole} name={this.state.investorDetails && this.state.investorDetails.fullName && this.state.investorDetails.fullName} /> */}
                <ErrorBoundary investorDetails={this.props.investorDetails}>
                    {this.state.currentTab == 1 && (
                        <PersonalInfo
                            imagePath={url}
                            uploadFile={this.uploadFile}
                            investorDetails={this.state.investorDetails}
                            updatePersonalInformation={this.updatePersonalInformation}
                            currentTab={this.state.currentTab}
                            handleTabChange={this.handleTabChange}
                            loading={this.props.loading}
                        />
                    )}
                    {this.state.currentTab == 2 && (
                        <Area
                            imagePath={url}
                            uploadFile={this.uploadFile}
                            invInterest={this.state.invInterest}
                            categoryList={this.props.categoryList}
                            productList={this.props.productList}
                            investorDetails={this.state.investorDetails}
                            currentTab={this.state.currentTab}
                            handleTabChange={this.handleTabChange}
                            addInvInterest={this.addInvInterest}
                            loading={this.props.loading}
                        />
                    )}
                    {this.state.currentTab == 3 && (
                        <Password
                            imagePath={url}
                            uploadFile={this.uploadFile}
                            investorDetails={this.state.investorDetails}
                            invId={this.state.investorDetails.invId}
                            updatePassword={this.updatePassword}
                            currentTab={this.state.currentTab}
                            handleTabChange={this.handleTabChange}
                            loading={this.props.loading}
                            phoneNumber={this.state.investorDetails.phoneNumber}
                        />
                    )}
                    {this.state.currentTab == 5 && (
                        <DashBoard
                            imagePath={url}
                            uploadFile={this.uploadFile}
                            investorDetails={this.state.investorDetails}
                            currentTab={this.state.currentTab}
                            handleTabChange={this.handleTabChange}
                            loading={this.props.loading}
                        />
                    )}
                    {this.state.currentTab == 4 && (
                        <Following
                            imagePath={url}
                            uploadFile={this.uploadFile}
                            investorDetails={this.state.investorDetails}
                            currentTab={this.state.currentTab}
                            handleTabChange={this.handleTabChange}
                            loading={this.props.loading}
                        />
                    )}
                    {this.state.currentTab == 10 && (
                        <MobileVerification
                            investorDetails={this.state.investorDetails}
                            currentTab={this.state.currentTab}
                            handleTabChange={this.handleTabChange}
                            onPublish={this.updateAdvisorWorkflow}
                        />
                    )}
                    <Loader loading={this.state.loading} />
                </ErrorBoundary>
            </div>
        );
    }
}

const mapStateToProps = (state) => investorSelector(state);

Investor.defaultProps = {
    investorDetails: {}
};

export default connect(mapStateToProps, {
    fetchInvestorList,
    fetchByInvestorId,
    changePassword,
    fetchCategoryList,
    modifyInvestor,
    modifyInvInterest,
    addInvInterest,
    uploadFile,
    clearImage,
    fetchByInvestorIDSuccess,
    fetchProductList
})(Investor);
