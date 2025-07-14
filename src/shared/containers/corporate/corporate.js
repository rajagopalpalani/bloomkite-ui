import React, { Component } from 'react';
// import Header from '../../components/userHeader';
import AwardsCertificates from '../../components/corporate/awardsCertificates/awardsCertificates';
import DashBoard from '../../components/corporate/dashboard/dashboard';
import Followers from '../../components/corporate/followers/followers';
import Articles from '../../components/corporate/articles/articles';
import Team from '../../components/corporate/team/team';
import MembershipPlan from '../../components/corporate/membershipPlan/membershipPlan';
import MobileVerification from '../../components/corporate/mobileVerification/mobileVerification';
import Password from '../../components/corporate/password/password';
import ProductService from '../../components/corporate/productService/productService';
import BrandTag from '../../components/corporate/brandTag/brandTag';
import Video from '../../components/corporate/video/video';
import Promotions from '../../components/corporate/promotions/promotions';
import PublicProfile from '../../components/corporate/publicProfile/publicProfile';
import CorporateInformation from '../../components/corporate/corporateInformation/corporateInformation';
import Loader from '../../components/common/loader';
import { uploadFile, clearImage } from '../../actions/uploadFile';
import { STATUSES } from '../../constants/appConstants';
import { deleteFile } from '../../actions/deleteFile';
import {
    fetchByAdvisorID,
    fetchByAdvisorIDSuccess,
    fetchAllConstantData,
    fetchBrandList,
    fetchCategoryList,
    fetchCategoryTypeList,
    fetchForumCategoryList,
    fetchForumStatusList,
    fetchForumSubCategoryList,
    fetchLicenseList,
    fetchPartyStatusList,
    fetchProductList,
    fetchAllServiceAndBrand,
    fetchRemunerationList,
    fetchRiskQuestionaireList,
    fetchRoleList,
    fetchServiceList,
    fetchAllStateCityPincode,
    modifyAdvisor,
    changePassword,
    modifyAdvisorProduct,
    modifyAdvProfessionalInfo,
    advisorProdDetails,
    advisorBrandDetails,
    advisorProfessionalDetails,
    advisorPersonalDetails,
    updateAdvisorWorkflow,
    fetchByPublicAdvisorID
} from '../../actions/advisor';
import { fetchSubscription, fetchAllMembershipPlan } from '../../actions/membership';
import { fetchTeam, fetchKeyPeopleByParentId } from '../../actions/teamSignup';
import { fetchFinancialPlanning } from '../../actions/planning';
import { fetchAllForumCategory } from '../../actions/blog';
import { advisorSelector } from '../../selectors/advisor';
import { connect } from 'react-redux';
import ErrorBoundary from '../errorBoundary';

class Corporate extends Component {
    constructor(props) {
        super(props);
        const { advisorDetails } = props;
        this.data = {};
        this.state = {
            currentRole: '',
            name: '',
            currentTab: 1,
            advisorDetails,
            allStateCityPincode: [],
            productList: [],
            showBrandTag: false
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
        this.props.fetchByAdvisorID(roleBasedId);
        this.props.fetchByPublicAdvisorID(roleBasedId);
        this.props.fetchBrandList();
        this.props.fetchCategoryList();
        this.props.fetchCategoryTypeList();
        this.props.fetchForumCategoryList();
        this.props.fetchForumStatusList();
        this.props.fetchForumSubCategoryList();
        this.props.fetchLicenseList();
        this.props.fetchPartyStatusList();
        this.props.fetchProductList();
        this.props.fetchAllServiceAndBrand();
        this.props.fetchRemunerationList();
        this.props.fetchRiskQuestionaireList();
        this.props.fetchRoleList();
        this.props.fetchServiceList();
        this.props.fetchAllStateCityPincode();
        this.props.fetchAllForumCategory();
        this.props.fetchTeam(partyId);
        this.props.fetchKeyPeopleByParentId(partyId);
        this.updateShowBrandTag();
        this.setState({ loading: true, partyId, advId: roleBasedId, currentRole: roleId });
        this.props.fetchSubscription({ advId: roleBasedId });
        this.props.fetchAllMembershipPlan({});
        //this.props.fetchAllConstantData();
    }

    componentDidUpdate(oldProps) {
        if (JSON.stringify(this.props.advisorDetails) != JSON.stringify(oldProps.advisorDetails)) {
            this.setState(
                {
                    advisorDetails: this.props.advisorDetails,
                    productList: this.props.productList,
                    serviceList: this.props.serviceList,
                    remunerationList: this.props.remunerationList,
                    licenseList: this.props.licenseList,
                    loading: false
                },
                () => {
                    this.updateShowBrandTag();
                }
            );
        }
        if (JSON.stringify(this.props.productList) != JSON.stringify(oldProps.productList)) {
            this.setState(
                {
                    productList: this.props.productList,
                    serviceList: this.props.serviceList,
                    remunerationList: this.props.remunerationList,
                    licenseList: this.props.licenseList,
                    loading: false
                },
                () => {
                    this.updateShowBrandTag();
                }
            );
        }
        if (JSON.stringify(this.props.loading) != JSON.stringify(oldProps.loading)) {
            this.setState({ loading: this.props.loading });
        }
        if (JSON.stringify(this.props.allStateCityPincode) != JSON.stringify(oldProps.allStateCityPincode)) {
            this.setState({ allStateCityPincode: this.props.allStateCityPincode });
        }

        const { uploadFileDetails } = this.props;
        const { url, type } = uploadFileDetails || {};
        const { uploadFileDetails: prevFile } = oldProps;
        const { url: prevUrl } = prevFile || {};
        if (url !== prevUrl && url) {
            if (type === 'profile') {
                this.props.fetchByAdvisorIDSuccess({ imagePath: url });
            }
            this.props.clearImage();
        }
    }

    updateShowBrandTag = () => {
        let showBrandTag = false;
        let showBrandsList = [];
        this.props.advisorDetails &&
            this.props.advisorDetails.advProducts &&
            this.props.advisorDetails.advProducts.length > 0 &&
            this.props.advisorDetails.advProducts.map((advProduct) => {
                let showBrandsAvailable = this.props.productList && this.props.productList.find((a) => advProduct.prodId == a.prodId && a.brands);
                if (showBrandsAvailable) {
                    showBrandsList.push(showBrandsAvailable.brands && showBrandsAvailable.brands.length > 0);
                }
            });
        showBrandTag = showBrandsList.length > 0 && showBrandsList.includes(true);
        this.setState({ showBrandTag });
    };
    updateAdvisorWorkflow = () => {
        const { advId } = this.state;
        const obj = {
            advId,
            screen: 0,
            status: STATUSES.CREATED
        };
        this.props.updateAdvisorWorkflow(obj);
    };

    updateCorporateInfo = (options) => {
        this.props.advisorPersonalDetails(options);
    };

    updateAwardsInformation = (options) => {
        this.props.modifyAdvProfessionalInfo(options);
    };

    updateProdInformation = (options) => {
        this.props.modifyAdvisorProduct(options);
    };

    addAdvProfessionalInfo = (options) => {
        this.props.advisorProfessionalDetails(options);
    };

    addAdvProdInfo = (options) => {
        this.props.advisorProdDetails(options);
    };

    addAdvBrandInfo = (options) => {
        this.props.advisorBrandDetails(options);
    };

    updatePassword = (options) => {
        this.props.changePassword(options, 3);
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
                {/* <Header logout={this.logout} role={this.state.currentRole} name={this.state.advisorDetails && this.state.advisorDetails.name && this.state.advisorDetails.name} /> */}
                <ErrorBoundary advisorDetails={this.props.advisorDetails}>
                    {this.state.currentTab == 1 && (
                        <CorporateInformation
                            list={this.props.allStateCityPincode}
                            advisorDetails={this.state.advisorDetails}
                            publicAdvisorDetails={this.props.publicAdvisorDetails}
                            currentTab={this.state.currentTab}
                            updateCorporateInfo={this.updateCorporateInfo}
                            handleTabChange={this.handleTabChange}
                            showBrandTag={this.state.showBrandTag}
                            loading={this.props.loading}
                            onPublish={this.updateAdvisorWorkflow}
                        />
                    )}
                    {this.state.currentTab == 2 && (
                        <AwardsCertificates
                            onDeleteFile={this.props.deleteFile}
                            imagePath={url}
                            uploadFile={this.uploadFile}
                            advisorDetails={this.state.advisorDetails}
                            publicAdvisorDetails={this.props.publicAdvisorDetails}
                            addAdvProfessionalInfo={this.addAdvProfessionalInfo}
                            updateAwardsInformation={this.updateAwardsInformation}
                            currentTab={this.state.currentTab}
                            handleTabChange={this.handleTabChange}
                            showBrandTag={this.state.showBrandTag}
                            loading={this.props.loading}
                            onPublish={this.updateAdvisorWorkflow}
                        />
                    )}
                    {this.state.currentTab == 3 && (
                        <Team
                            imagePath={url}
                            uploadFile={this.uploadFile}
                            advisorDetails={this.state.advisorDetails}
                            publicAdvisorDetails={this.props.publicAdvisorDetails}
                            currentTab={this.state.currentTab}
                            handleTabChange={this.handleTabChange}
                            showBrandTag={this.state.showBrandTag}
                            partyId={this.state.partyId}
                            onPublish={this.updateAdvisorWorkflow}
                        />
                    )}
                    {this.state.currentTab == 4 && (
                        <ProductService
                            advisorDetails={this.state.advisorDetails}
                            addAdvProdInfo={this.addAdvProdInfo}
                            updateProdInformation={this.updateProdInformation}
                            publicAdvisorDetails={this.props.publicAdvisorDetails}
                            currentTab={this.state.currentTab}
                            handleTabChange={this.handleTabChange}
                            showBrandTag={this.state.showBrandTag}
                            updateShowBrandTag={this.updateShowBrandTag}
                            loading={this.props.loading}
                            onPublish={this.updateAdvisorWorkflow}
                        />
                    )}
                    {this.state.currentTab == 5 && (
                        <BrandTag
                            advisorDetails={this.state.advisorDetails}
                            publicAdvisorDetails={this.props.publicAdvisorDetails}
                            addAdvBrandInfo={this.addAdvBrandInfo}
                            currentTab={this.state.currentTab}
                            handleTabChange={this.handleTabChange}
                            serviceList={this.props.serviceList}
                            productList={this.props.productList}
                            showBrandTag={this.state.showBrandTag}
                            loading={this.props.loading}
                            onPublish={this.updateAdvisorWorkflow}
                        />
                    )}
                    {this.state.currentTab == 6 && (
                        <MembershipPlan
                            advisorDetails={this.state.advisorDetails}
                            publicAdvisorDetails={this.props.publicAdvisorDetails}
                            currentTab={this.state.currentTab}
                            handleTabChange={this.handleTabChange}
                            showBrandTag={this.state.showBrandTag}
                            onPublish={this.updateAdvisorWorkflow}
                        />
                    )}
                    {this.state.currentTab == 7 && (
                        <Password
                            advisorDetails={this.state.advisorDetails}
                            publicAdvisorDetails={this.props.publicAdvisorDetails}
                            advId={this.state.advisorDetails.advId}
                            updatePassword={this.updatePassword}
                            currentTab={this.state.currentTab}
                            handleTabChange={this.handleTabChange}
                            showBrandTag={this.state.showBrandTag}
                            loading={this.props.loading}
                            onPublish={this.updateAdvisorWorkflow}
                            phoneNumber={this.state.advisorDetails.phoneNumber}
                        />
                    )}
                    {this.state.currentTab == 14 && (
                        <MobileVerification
                            advisorDetails={this.state.advisorDetails}
                            currentTab={this.state.currentTab}
                            handleTabChange={this.handleTabChange}
                            showBrandTag={this.state.showBrandTag}
                            onPublish={this.updateAdvisorWorkflow}
                        />
                    )}
                    {this.state.currentTab == 13 && (
                        <Promotions
                            advisorDetails={this.state.advisorDetails}
                            advId={this.state.advisorDetails.advId}
                            publicAdvisorDetails={this.props.publicAdvisorDetails}
                            currentTab={this.state.currentTab}
                            handleTabChange={this.handleTabChange}
                            loading={this.props.loading}
                            showBrandTag={this.state.showBrandTag}
                            onPublish={this.updateAdvisorWorkflow}
                        />
                    )}
                    {this.state.currentTab == 8 && (
                        <DashBoard
                            advisorDetails={this.state.advisorDetails}
                            publicAdvisorDetails={this.props.publicAdvisorDetails}
                            currentTab={this.state.currentTab}
                            handleTabChange={this.handleTabChange}
                            showBrandTag={this.state.showBrandTag}
                        />
                    )}
                    {this.state.currentTab == 9 && (
                        <Video
                            imagePath={url}
                            uploadFile={this.uploadFile}
                            advisorDetails={this.state.advisorDetails}
                            publicAdvisorDetails={this.props.publicAdvisorDetails}
                            currentTab={this.state.currentTab}
                            handleTabChange={this.handleTabChange}
                            showBrandTag={this.state.showBrandTag}
                            onPublish={this.updateAdvisorWorkflow}
                        />
                    )}

                    {this.state.currentTab == 10 && (
                        <PublicProfile
                            advisorDetails={this.state.advisorDetails}
                            serviceList={this.props.serviceList}
                            remunerationList={this.props.remunerationList}
                            publicAdvisorDetails={this.props.publicAdvisorDetails}
                            productList={this.props.productList}
                            currentTab={this.state.currentTab}
                            handleTabChange={this.handleTabChange}
                            showBrandTag={this.state.showBrandTag}
                            onPublish={this.updateAdvisorWorkflow}
                        />
                    )}
                    {this.state.currentTab == 11 && (
                        <Followers
                            advisorDetails={this.state.advisorDetails}
                            currentTab={this.state.currentTab}
                            handleTabChange={this.handleTabChange}
                            showBrandTag={this.state.showBrandTag}
                            onPublish={this.updateAdvisorWorkflow}
                        />
                    )}
                    {this.state.currentTab == 12 && (
                        <Articles
                            advisorDetails={this.state.advisorDetails}
                            currentTab={this.state.currentTab}
                            handleTabChange={this.handleTabChange}
                            showBrandTag={this.state.showBrandTag}
                        />
                    )}
                    <Loader loading={this.state.loading} />
                </ErrorBoundary>
            </div>
        );
    }
}

const mapStateToProps = (state) => advisorSelector(state);

Corporate.defaultProps = {
    advisorDetails: {}
};

export default connect(mapStateToProps, {
    fetchByAdvisorID,
    fetchAllConstantData,
    fetchBrandList,
    fetchCategoryList,
    fetchCategoryTypeList,
    fetchForumCategoryList,
    fetchForumStatusList,
    fetchForumSubCategoryList,
    fetchLicenseList,
    fetchPartyStatusList,
    fetchProductList,
    fetchAllServiceAndBrand,
    fetchRemunerationList,
    fetchRiskQuestionaireList,
    fetchRoleList,
    fetchServiceList,
    fetchAllStateCityPincode,
    modifyAdvisor,
    changePassword,
    modifyAdvisorProduct,
    modifyAdvProfessionalInfo,
    fetchAllForumCategory,
    advisorProdDetails,
    advisorBrandDetails,
    advisorProfessionalDetails,
    advisorPersonalDetails,
    fetchTeam,
    fetchKeyPeopleByParentId,
    uploadFile,
    clearImage,
    fetchByAdvisorIDSuccess,
    deleteFile,
    updateAdvisorWorkflow,
    fetchByPublicAdvisorID,
    fetchSubscription,
    fetchAllMembershipPlan
    // fetchFinancialPlanning
})(Corporate);
