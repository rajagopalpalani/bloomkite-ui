import React, { Component } from 'react';
import { connect } from 'react-redux';
import PersonalInfo from '../advisor/personalInformation/personalInformation';
import CustomModal from '../common/customModal';
import { advisorSelector } from '../../selectors/advisor';
import { modifyAdvisor, advisorProfessionalDetails, modifyAdvProfessionalInfo, advisorProdDetails, modifyAdvisorProduct, advisorPersonalDetails } from '../../actions/advisor';
import AwardsCertificates from '../advisor/awardsCertificates/awardsCertificates';
import { uploadFile, clearImage } from '../../actions/uploadFile';
import { deleteFile } from '../../actions/deleteFile';
import ProductService from '../advisor/productService/productService';
import CorporateInformation from '../corporate/corporateInformation/corporateInformation';
import CorpAwardsCertificates from '../corporate/awardsCertificates/awardsCertificates';
import CorpProductService from '../corporate/productService/productService';

const styles = {
    fontFamily: 'sans-serif',
    textAlign: 'center',
    modal: {
        width: '700px'
    },
    overlay: {
        background: '#FFFF00'
    }
};

class ProfilePopup extends Component {
    constructor(props) {
        super(props);
        this.state = {
            currentTab: 1
        };
    }

    updatePersonalInformation = (options) => {
        this.props.modifyAdvisor(options);
    };

    handleTabChange = () => {
        let index = this.state.currentTab + 1;
        this.setState({ currentTab: index });
    };
    handlePrevTabChange = () => {
        let index = this.state.currentTab - 1;
        this.setState({ currentTab: index });
    };

    uploadFile = (files, type) => {
        if (files && files[0]) {
            this.props.uploadFile(files[0], type);
        }
    };
    addAdvProfessionalInfo = (options) => {
        this.props.advisorProfessionalDetails(options);
    };
    updateAwardsInformation = (options) => {
        this.props.modifyAdvProfessionalInfo(options);
    };
    addAdvProdInfo = (options) => {
        this.props.advisorProdDetails(options);
    };
    updateProdInformation = (options) => {
        this.props.modifyAdvisorProduct(options);
    };

    updateCorporateInfo = (options) => {
        this.props.advisorPersonalDetails(options);
    };

    render() {
        const { uploadFileDetails } = this.props;
        const { url } = uploadFileDetails || {};
        return (
            <div style={styles}>
                <CustomModal
                    className={"customModal"}
                    open={this.props.openPopup}
                    showCloseIcon={true}
                    onClose={this.props.handleClose}
                    closeOnOverlayClick={true}>
                    {this.state.currentTab == 1 && this.props.advisorDetails && this.props.advisorDetails.advType == 1 && (
                        <PersonalInfo
                            list={this.props.allStateCityPincode}
                            advisorDetails={this.props.advisorDetails}
                            updatePersonalInformation={this.updatePersonalInformation}
                            currentTab={this.state.currentTab}
                            loading={this.props.loading}
                            popup={true}
                        />
                    )}
                    {this.state.currentTab == 1 && this.props.advisorDetails && this.props.advisorDetails.advType == 2 && (
                        <CorporateInformation
                            list={this.props.allStateCityPincode}
                            advisorDetails={this.props.advisorDetails}
                            currentTab={this.state.currentTab}
                            updateCorporateInfo={this.updateCorporateInfo}
                            loading={this.props.loading}
                            popup={true}
                        />
                    )}
                    {this.state.currentTab == 2 && this.props.advisorDetails && this.props.advisorDetails.advType == 1 && (
                        <AwardsCertificates
                            imagePath={url}
                            uploadFile={this.uploadFile}
                            onDeleteFile={this.props.deleteFile}
                            advisorDetails={this.props.advisorDetails}
                            addAdvProfessionalInfo={this.addAdvProfessionalInfo}
                            updateAwardsInformation={this.updateAwardsInformation}
                            loading={this.props.loading}
                            popup={true}
                        />
                    )}
                    {this.state.currentTab == 2 && this.props.advisorDetails && this.props.advisorDetails.advType == 2 && (
                        <CorpAwardsCertificates
                            onDeleteFile={this.props.deleteFile}
                            imagePath={url}
                            uploadFile={this.uploadFile}
                            advisorDetails={this.props.advisorDetails}
                            addAdvProfessionalInfo={this.addAdvProfessionalInfo}
                            updateAwardsInformation={this.updateAwardsInformation}
                            loading={this.props.loading}
                            popup={true}
                        />
                    )}
                    {this.state.currentTab == 3 && this.props.advisorDetails && this.props.advisorDetails.advType == 1 && (
                        <ProductService
                            advisorDetails={this.props.advisorDetails}
                            addAdvProdInfo={this.addAdvProdInfo}
                            updateProdInformation={this.updateProdInformation}
                            loading={this.props.loading}
                            popup={true}
                        />
                    )}
                    {this.state.currentTab == 3 && this.props.advisorDetails && this.props.advisorDetails.advType == 2 && (
                        <CorpProductService
                            advisorDetails={this.props.advisorDetails}
                            addAdvProdInfo={this.addAdvProdInfo}
                            updateProdInformation={this.updateProdInformation}
                            loading={this.props.loading}
                            popup={true}
                        />
                    )}
                    <div className="profile-footer">
                        {this.state.currentTab != 3 && (
                            <span className="next-btn">
                                <button onClick={this.handleTabChange} className="btn btn-primary">
                                    Next
                                </button>
                            </span>
                        )}
                        {this.state.currentTab != 1 && (
                            <span className="prev-btn">
                                <button onClick={this.handlePrevTabChange} className="btn btn-primary">
                                    Prev
                                </button>
                            </span>
                        )}
                    </div>
                </CustomModal>
            </div>
        );
    }
}
const mapStateToProps = (state) => advisorSelector(state);
export default connect(mapStateToProps, {
    modifyAdvisor,
    uploadFile,
    advisorProfessionalDetails,
    modifyAdvProfessionalInfo,
    advisorProdDetails,
    modifyAdvisorProduct,
    advisorPersonalDetails,
    deleteFile
})(ProfilePopup);
