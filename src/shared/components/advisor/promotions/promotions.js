import React, { Component } from 'react';
import { connect } from 'react-redux';
import Loader from '../../common/loader';
import ProfileHeader from '../../profileHeader';
import AdvisorLeftbar from '../advisorLeftbar';
import { promotionsSelector } from '../../../selectors/promotions';
import { uploadFile, clearImage } from '../../../actions/uploadFile';
import { addPromotions } from '../../../actions/promotions';
import AddPromotionModal from '../../promotions/addPromotionModal';
import Promotion from '../../promotions/promotion';
import PublishPopup from '../../Contact/publishPopup';

const initPromotion = {
    promotionId: '',
    title: '',
    description: '',
    fileUrl: '',
    type: 'image'
};

class Promotions extends Component {
    constructor(props) {
        super(props);
        this.state = {
            currentRole: '',
            loading: false,
            showModal: false,
            imgLoading: false,
            promotions: [],
            disableButton: true,
            openPopup: false,
            ...initPromotion
        };
    }

    componentDidMount() {
        const { advisorDetails } = this.props;
        const { promotions } = advisorDetails || {};
        const { partyId, rolebasedId, roleId } = window.localStorage && JSON.parse(window.localStorage.getItem('bloomkiteUsername'));
        this.setState({
            partyId,
            currentRole: roleId,
            advId: rolebasedId,
            promotions: this.formatPromotions(promotions)
        });
    }
    onOpenModal = () => {
        this.setState({ openPopup: true });
    };

    onCloseModal = () => {
        this.setState({ openPopup: false });
    };

    componentDidUpdate(prevProps) {
        const { file, advisorDetails, loading } = this.props;
        const { url } = file || {};
        const { file: prevFile, advisorDetails: prevAdvisorDetails, loading: oldLoading } = prevProps;
        const { url: prevUrl } = prevFile || {};
        if (url !== prevUrl && url) {
            this.setState({ fileUrl: url, imgLoading: false });
            this.props.clearImage();
        }

        const { promotions: currentPromotions = [] } = advisorDetails || {};
        const { promotions: prevPromotions = [] } = prevAdvisorDetails || {};
        if (JSON.stringify(currentPromotions) !== JSON.stringify(prevPromotions)) {
            this.setState({
                promotions: this.formatPromotions(currentPromotions)
            });
        }

        if (loading !== oldLoading) {
            this.setState({ loading });
        }
    }



    logout = () => {
        localStorage.clear();
        window.location.href = window.location.origin;
    };

    uploadFile = (files) => {
        if (files && files[0]) {
            this.setState({ imgLoading: true });
            this.props.uploadFile(files[0]);
        }
    };

    formatPromotions = (promotions) => {
        return promotions
            ? promotions.map((item) => {
                const { title, video, promotionId, imagePath, aboutVideo } = item;
                return {
                    ...item,
                    promotionId,
                    title,
                    fileUrl: imagePath || video,
                    type: imagePath ? 'image' : 'video',
                    description: aboutVideo
                };
            })
            : [];
    };

    handleChange = (e, field, i) => {
        const {
            target: { value }
        } = e;
        this.setState({ [field]: value });
    };

    openPromotionModal = () => {
        this.setState({ showModal: true });
    };

    closePromotionModal = () => {
        this.setState({ showModal: false });
    };

    handleAddPromotion = () => {
        const { promotions, title, description, type, fileUrl } = this.state;
        const obj = {
            title,
            description,
            type,
            fileUrl
        };
        this.setState({
            showModal: false,
            disableButton: false,
            promotions: [...promotions, { ...obj }],
            ...initPromotion
        });
    };

    handleSave = () => {
        if (!this.state.disableButton) {
            const { promotions } = this.state;
            const data = promotions.map((item, index) => {
                const { type, fileUrl, title, description, promotionId } = item;
                return {
                    aboutVideo: description || '',
                    imagePath: type === 'image' ? fileUrl : '',
                    promotionId,
                    title,
                    video: type === 'video' ? fileUrl : ''
                };
            });
            const reqBody = {
                advId: this.props.advisorDetails.advId,
                promotionReq: data
            };
            this.setState({
                disableButton: true,
                loading: true
            });
            this.props.addPromotions(reqBody);
            this.onOpenModal();
        }
    };

    renderControls = () => {
        return (
            <div className="pull-left col-12 nopadding promo-controls">
                <button className="btn btn-primary" onClick={this.openPromotionModal}>
                    Add Promotion
                </button>
            </div>
        );
    };

    removeHandler = (i) => {
        const { promotions } = this.state;
        const data = [...promotions];
        data.splice(i, 1);
        this.setState({ promotions: data, disableButton: false });
    };

    renderPromotions = () => {
        const { promotions } = this.state;
        return (
            <div className="promotion-list">
                {promotions &&
                    promotions.map((item, i) => <Promotion info={item} images={promotions} index={i} onRemove={() => this.removeHandler(i)} key={`promotion-info-${i}`} />)}
            </div>
        );
    };

    renderUploadForm = () => {
        const { showModal, title, description, type, fileUrl, imgLoading } = this.state;
        return (
            <div className="container-fluid promotion-add-forms">
                <div className="row">
                    <AddPromotionModal
                        show={showModal}
                        isLoading={imgLoading}
                        promotion={{
                            title,
                            description,
                            type,
                            fileUrl
                        }}
                        onClose={this.closePromotionModal}
                        onAdd={this.handleAddPromotion}
                        onUpload={(files) => this.uploadFile(files)}
                        onChange={(e, field) => this.handleChange(e, field)}
                    />
                </div>
            </div>
        );
    };

    render() {
        const { currentRole, loading } = this.state;
        const { advisorDetails } = this.props;
        const { userName } = advisorDetails || {};
        return (
            <div>
                <div className="col-12">
                    <ProfileHeader
                        name={this.props.advisorDetails.displayName || (this.props.advisorDetails && this.props.advisorDetails.name)}
                        location={this.props.advisorDetails && this.props.advisorDetails.city}
                        designation={this.props.advisorDetails.designation}
                        handleSave={this.handleSave}
                        showSaveButton={true}
                        disableButton={this.state.disableButton}
                        onPublish={this.props.onPublish}
                        advisorDetails={this.props.advisorDetails}
                        publicAdvisorDetails={this.props.publicAdvisorDetails}
                        role={true}
                    />
                </div>
                {this.props.advisorDetails.workFlowStatus == 4 && !loading && <PublishPopup openPopup={this.state.openPopup} showCloseIcon={true} onCloseModal={this.onCloseModal}></PublishPopup>}
                <div className="row col-12 advisor-gap">
                    <AdvisorLeftbar
                        userName={userName}
                        handleTabChange={this.props.handleTabChange}
                        currentTab={this.props.currentTab}
                        showBrandTag={this.props.showBrandTag}
                        parentPartyId={this.props.advisorDetails.parentPartyId != 0 ? this.props.advisorDetails.parentPartyId : ''}
                    />
                    <div className="col-10 nopadding">
                        <div className="col-12 center-page planning-right row">
                            <div className="page-center bg-white">
                                <div className="promotion-container">
                                    {this.renderControls()}
                                    {this.renderUploadForm()}
                                    {this.renderPromotions()}
                                    <Loader loading={loading} />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => promotionsSelector(state);

export default connect(mapStateToProps, {
    uploadFile,
    clearImage,
    addPromotions
})(Promotions);
