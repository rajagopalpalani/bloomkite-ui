import React, { Component } from 'react';
// import Header from '../../components/userHeader';
import AwardsCertificates from '../../components/advisor/awardsCertificates/awardsCertificates';
import DashBoard from '../../components/advisor/dashboard/dashboard';
import Articles from '../../components/advisor/articles/articles';
import MembershipPlan from '../../components/advisor/membershipPlan/membershipPlan';
import Password from '../../components/advisor/password/password';
import PersonalInfo from '../../components/advisor/personalInformation/personalInformation';
import ProductService from '../../components/advisor/productService/productService';
import BrandTag from '../../components/advisor/brandTag/brandTag';
import Video from '../../components/advisor/video/video';
import PublicProfile from '../../components/advisor/publicProfile/publicProfile';
import Promotions from '../../components/advisor/promotions/promotions';
import MobileVerification from '../../components/advisor/mobileVerification/mobileVerification';
import Loader from '../../components/common/loader';
import { uploadFile, clearImage } from '../../actions/uploadFile';
import { deleteFile } from '../../actions/deleteFile';
import { STATUSES } from '../../constants/appConstants';
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
    updateAdvisorWorkflow,
    fetchByPublicAdvisorID
} from '../../actions/advisor';
import { fetchSubscription, fetchAllMembershipPlan } from '../../actions/membership';
import { fetchAllForumCategory } from '../../actions/blog';
import { advisorSelector } from '../../selectors/advisor';
import { connect } from 'react-redux';
import ErrorBoundary from '../errorBoundary';
import Followers from '../../components/followers';
// import io from 'socket.io-client';
// const socketUrl = "http://localhost:3235"
class Advisor extends Component {
    constructor(props) {
        super(props);
        const { advisorDetails } = props;
        this.data = {};
        this.state = {
            currentRole: '',
            currentTab: 1,
            advisorDetails,
            allStateCityPincode: [],
            // socket: null,
            // user: null,
            // name: '',
            pageNumber: 1,
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
        // try {
        //     throw new Error("Error from handle change");
        // } catch (error) {
        //     console.log("errors: ", e);
        // }
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
        this.updateShowBrandTag();
        this.setState({ loading: true, partyId, advId: roleBasedId, currentRole: roleId });
        this.props.fetchSubscription({ advId: roleBasedId });
        this.props.fetchAllMembershipPlan({});
        // try {
        //     throw new Error("Error from handle change");
        // } catch (error) {
        //     console.log("errors: ", e);
        // }
        // this.initSocket()
    }

    // initSocket = ()=>{
    //     const socket = io(socketUrl)
    //     socket.on('connect', ()=>{
    //         console.log("Connected");
    //     });
    //     this.setState({socket})
    // }

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

    updatePersonalInformation = (options) => {
        this.props.modifyAdvisor(options);
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
        this.props.changePassword(options, 1);
    };

    uploadFile = (files, type) => {
        if (files && files[0]) {
            this.props.uploadFile(files[0], type);
        }
    };

    // pageChangeHandler = (pageNumber) => {
    //     const { activeTabIndex } = this.state;
    //     this.setState({ pageNumber }, () => {
    //         this.search = true;
    //         const reqBody = {
    //             ...this.data, records: ITEMS_PER_COUNT,
    //             pageNum: pageNumber,
    //         };
    //         if (activeTabIndex === 0) {
    //             this.props.exploreByUser(reqBody);
    //         } else {
    //             this.props.exploreAdvisorByProducts(reqBody);
    //         }
    //     });
    // }

    // callingSetUser = ({ user, isUser }) => {
    //     console.log(":::::isUser", user,  isUser)
    //             if (!isUser) {
    //                 this.setUser(user);
    //                 this.setState({user: user});
    //             }
    //         }
    // createSocketUser = (name) => {
    //     let {socket} = this.state;
    //     if(name&&(this.state.name!==name)) {
    //         socket.emit('VERIFY_USER', name, this.callingSetUser);
    //         this.setState({name: name });
    //     }
    // }

    // setUser = (userSoc)=>{
    // 	const { socket } = this.state;
    // 	socket.emit('USER_CONNECTED', userSoc);
    //     socket.emit("NEW USER", userSoc)
    // }

    // updateUser = () => {
    //     this.setState({user:null});
    // }

    render() {
        const { uploadFileDetails } = this.props;
        const { url } = uploadFileDetails || {};
        return (
            <div className="main-container pt-1">
                {/* <Header logout={this.logout} role={this.state.currentRole} name={this.state.advisorDetails && this.state.advisorDetails.name && this.state.advisorDetails.name} /> */}
                <ErrorBoundary>
                    {this.state.currentTab == 1 && (
                        <PersonalInfo
                            list={this.props.allStateCityPincode}
                            advisorDetails={this.state.advisorDetails}
                            publicAdvisorDetails={this.props.publicAdvisorDetails}
                            updatePersonalInformation={this.updatePersonalInformation}
                            currentTab={this.state.currentTab}
                            handleTabChange={this.handleTabChange}
                            showBrandTag={this.state.showBrandTag}
                            loading={this.props.loading}
                            onPublish={this.updateAdvisorWorkflow}
                        />
                    )}
                    {this.state.currentTab == 2 && (
                        <AwardsCertificates
                            imagePath={url}
                            uploadFile={this.uploadFile}
                            onDeleteFile={this.props.deleteFile}
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
                        <ProductService
                            advisorDetails={this.state.advisorDetails}
                            publicAdvisorDetails={this.props.publicAdvisorDetails}
                            addAdvProdInfo={this.addAdvProdInfo}
                            updateProdInformation={this.updateProdInformation}
                            currentTab={this.state.currentTab}
                            handleTabChange={this.handleTabChange}
                            showBrandTag={this.state.showBrandTag}
                            updateShowBrandTag={this.updateShowBrandTag}
                            loading={this.props.loading}
                            onPublish={this.updateAdvisorWorkflow}
                        />
                    )}
                    {this.state.currentTab == 4 && (
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
                    {this.state.currentTab == 5 && (
                        <MembershipPlan
                            advisorDetails={this.state.advisorDetails}
                            currentTab={this.state.currentTab}
                            handleTabChange={this.handleTabChange}
                            showBrandTag={this.state.showBrandTag}
                            productList={this.props.productList}
                        />
                    )}
                    {this.state.currentTab == 6 && (
                        <Promotions
                            advisorDetails={this.state.advisorDetails}
                            publicAdvisorDetails={this.props.publicAdvisorDetails}
                            advId={this.state.advisorDetails.advId}
                            currentTab={this.state.currentTab}
                            handleTabChange={this.handleTabChange}
                            loading={this.props.loading}
                            showBrandTag={this.state.showBrandTag}
                            onPublish={this.updateAdvisorWorkflow}
                        />
                    )}
                    {this.state.currentTab == 7 && (
                        <PublicProfile
                            fetchByAdvisorID={this.props.fetchByAdvisorID}
                            advisorDetails={this.state.advisorDetails}
                            serviceList={this.props.serviceList}
                            remunerationList={this.props.remunerationList}
                            productList={this.props.productList}
                            currentTab={this.state.currentTab}
                            handleTabChange={this.handleTabChange}
                            showBrandTag={this.state.showBrandTag}
                            onPublish={this.updateAdvisorWorkflow}
                        />
                    )}
                    {this.state.currentTab == 8 && (
                        <Password
                            onPublish={this.updateAdvisorWorkflow}
                            advisorDetails={this.state.advisorDetails}
                            advId={this.state.advisorDetails.advId}
                            updatePassword={this.updatePassword}
                            currentTab={this.state.currentTab}
                            handleTabChange={this.handleTabChange}
                            showBrandTag={this.state.showBrandTag}
                            loading={this.props.loading}
                            phoneNumber={this.state.advisorDetails.phoneNumber}
                        />
                    )}
                    {this.state.currentTab == 9 && (
                        <MobileVerification
                            advisorDetails={this.state.advisorDetails}
                            currentTab={this.state.currentTab}
                            handleTabChange={this.handleTabChange}
                            showBrandTag={this.state.showBrandTag}
                            onPublish={this.updateAdvisorWorkflow}
                        />
                    )}
                    {this.state.currentTab == 10 && (
                        <Followers
                            advisorDetails={this.state.advisorDetails}
                            currentTab={this.state.currentTab}
                            handleTabChange={this.handleTabChange}
                            showBrandTag={this.state.showBrandTag}
                            onPublish={this.updateAdvisorWorkflow}
                        />
                    )}
                    {/* {this.state.currentTab == 7 && (
                        <DashBoard
                            advisorDetails={this.state.advisorDetails}
                            currentTab={this.state.currentTab}
                            handleTabChange={this.handleTabChange}
                            showBrandTag={this.state.showBrandTag}
                        />
                    )}
                    {this.state.currentTab == 8 && (
                        <Video
                            onPublish={this.updateAdvisorWorkflow}
                            advisorDetails={this.state.advisorDetails}
                            publicAdvisorDetails={this.props.publicAdvisorDetails}
                            currentTab={this.state.currentTab}
                            handleTabChange={this.handleTabChange}
                            showBrandTag={this.state.showBrandTag}
                        />
                    )}
                    {this.state.currentTab == 11 && (
                        <Articles
                            advisorDetails={this.state.advisorDetails}
                            currentTab={this.state.currentTab}
                            handleTabChange={this.handleTabChange}
                            showBrandTag={this.state.showBrandTag}
                        />
                    )} */}
                    <Loader loading={this.props.loading} />
                </ErrorBoundary>
            </div>
        );
    }
}

const mapStateToProps = (state) => advisorSelector(state);

Advisor.defaultProps = {
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
    modifyAdvisor,
    changePassword,
    modifyAdvisorProduct,
    modifyAdvProfessionalInfo,
    fetchAllForumCategory,
    advisorProdDetails,
    advisorBrandDetails,
    advisorProfessionalDetails,
    fetchAllStateCityPincode,
    uploadFile,
    clearImage,
    fetchByAdvisorIDSuccess,
    deleteFile,
    updateAdvisorWorkflow,
    fetchByPublicAdvisorID,
    fetchSubscription,
    fetchAllMembershipPlan
})(Advisor);
