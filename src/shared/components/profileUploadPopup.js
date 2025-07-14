import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Modal from './common/modal';
import Upload from './common/upload';
import { getProfile, updateProfile, updateInvestorProfile } from '../actions/profile';
import { uploadFile, clearImage } from '../actions/uploadFile';
import { profileSelector } from '../selectors/profile';
import { advisorMessage } from '../constants/advisorConstant';
import { fetchByInvestorId } from '../actions/investor';
import CustomFragment from './common/customFragment';

const DEFAULT_IMAGE = '/images/avatar.png';

class ProfileUploadPopup extends Component {
    constructor(props) {
        super(props);
        const { profile, investorDetails, advisorDetails } = props;
        let { imagePath } = profile || {};
        if (imagePath) {
            if (advisorDetails) {
                imagePath = advisorDetails.imagePath;
            } else if (investorDetails) {
                imagePath = investorDetails.imagePath;
            }
        }
        this.state = {
            showModal: false,
            imageUrl: imagePath,
            imgLoading: false,
            type: 'image'
        };
    }

    componentDidMount() {
        const bloomkiteUsername = window.localStorage.getItem('bloomkiteUsername');
        if (bloomkiteUsername) {
            let { roleBasedId, roleId } = JSON.parse(bloomkiteUsername);
            if (roleId == 2) {
                this.props.fetchByInvestorId(roleBasedId);
            } else {
                this.props.getProfile(roleBasedId);
            }
        }
    }

    componentDidUpdate(prevProps) {
        const { profile, file } = this.props;
        let { imagePath } = profile || {};
        const { profile: prevProfile, file: prevFile } = prevProps;
        let { imagePath: prevImagePath } = prevProfile || {};
        if (imagePath && imagePath !== prevImagePath) {
            this.setState({ imageUrl: imagePath });
            this.closeModal();
        }
        const { url, type } = file || {};
        const { url: prevUrl } = prevFile || {};
        if (url && url !== prevUrl && type === 'profile') {
            this.setState({ imageUrl: url, imgLoading: false });
            this.props.clearImage();
        }
    }

    fileChangeHandler = (files) => {
        if (files && files[0]) {
            this.setState({ imgLoading: true });
            this.props.uploadFile(files[0], 'profile');
        }
    };

    renderBody = () => {
        let { imageUrl, imgLoading } = this.state;
        const { investorDetails } = this.props;
        if (!imageUrl && investorDetails && investorDetails.imagePath) {
            imageUrl = investorDetails.imagePath;
        }
        let url = imageUrl || DEFAULT_IMAGE;
        const accept = 'image/*';
        return (
            <div className="profile-picture-body">
                {!imgLoading && <img src={url} alt="profile picture" />}
                <Upload onChange={this.fileChangeHandler} isLoading={imgLoading} accept={accept} preview={true} />
                <label>{advisorMessage.uploadImage}</label>
                <br />
                <span className="comments-details">{advisorMessage.supportFormats}</span>
            </div>
        );
    };

    openModal = () => {
        this.setState({ showModal: true });
    };

    closeModal = () => {
        this.setState({ showModal: false });
    };

    saveHandler = () => {
        const { imageUrl, type } = this.state;
        if (this.props.advisorDetails && this.props.advisorDetails.advId) {
            const { profile } = this.props;
            let { imagePath } = profile || {};
            const fileName = imagePath ? imagePath.split('/').pop() : '';
            this.props.updateProfile({
                ...profile,
                imagePath: type === 'image' ? imageUrl : '',
                oldFileName: fileName,
                isLoading: true
            });
        }
        if (this.props.investorDetails && this.props.investorDetails.invId) {
            this.props.updateInvestorProfile({
                invId: this.props.investorDetails.invId,
                imagePath: imageUrl
            });
        }
    };

    renderFooter = () => {
        return (
            <CustomFragment>
                <button onClick={this.closeModal} className="btn btn-light">
                    Cancel
                </button>
                <button onClick={this.saveHandler} className="btn btn-primary">
                    Save
                </button>
            </CustomFragment>
        );
    };

    render() {
        const { showModal } = this.state;
        const { profile } = this.props;
        const { investorDetails } = this.props;
        let { imagePath } = profile || {};
        if (!imagePath && investorDetails && investorDetails.imagePath) {
            imagePath = investorDetails.imagePath;
        }
        return (
            <CustomFragment>
                <a
                    className="image-container"
                    onClick={(e) => {
                        e.preventDefault();
                        this.openModal();
                    }}>
                    {this.props.children(imagePath)}
                </a>
                <Modal title="Change profile photo" show={showModal} onClose={this.closeModal} body={this.renderBody()} footer={this.renderFooter()} />
            </CustomFragment>
        );
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        getProfile: bindActionCreators(getProfile, dispatch),
        updateProfile: bindActionCreators(updateProfile, dispatch),
        updateInvestorProfile: bindActionCreators(updateInvestorProfile, dispatch),
        fetchByInvestorId: bindActionCreators(fetchByInvestorId, dispatch),
        uploadFile: bindActionCreators(uploadFile, dispatch),
        clearImage: bindActionCreators(clearImage, dispatch)
    };
};

const mapStateToProps = (state) => profileSelector(state);

export default connect(mapStateToProps, mapDispatchToProps)(ProfileUploadPopup);
