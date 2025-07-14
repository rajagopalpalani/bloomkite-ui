import React, { Component } from 'react';
import Header from '../../components/userHeader';
import Loader from '../../components/common/loader';
import Upload from '../../components/common/upload';
import { promotionsSelector } from '../../selectors/promotions';
import { connect } from 'react-redux';
import { uploadFile, clearImage } from '../../actions/uploadFile';
import { addPromotions } from '../../actions/promotions';

const types = [
    { title: 'Video', value: 'video' },
    { title: 'Image', value: 'image' }
];

const initPromotion = {
    title: '',
    description: '',
    fileUrl: '',
    type: 'image',
};

class Promotions extends Component {
    constructor(props) {
        super(props);
        this.state = {
            currentRole: '',
            loading: false,
            activeIndex: -1,
            promotions: [{ ...initPromotion }],
        };
    }

    componentDidMount() {
        const { partyId, rolebasedId, roleId } = window.localStorage &&
            JSON.parse(window.localStorage.getItem('bloomkiteUsername'));
        this.setState({
            partyId,
            currentRole: roleId,
            advId: rolebasedId,
        });
    }

    componentDidUpdate(prevProps) {
        const { activeIndex } = this.state;
        const { file, promotionSuccess } = this.props;
        const { url } = file || {};
        const { file: prevFile, promotionSuccess: prevPromotionSuccess } = prevProps;
        const { url: prevUrl } = prevFile || {};
        if (url !== prevUrl && url && activeIndex > -1) {
            this.updatePromotion({ key: 'fileUrl', value: url }, activeIndex);
            this.setState({ activeIndex: -1 });
            this.props.clearImage();
        }

        if (promotionSuccess !== prevPromotionSuccess && promotionSuccess) {
            this.setState({
                promotions: [{ ...initPromotion }],
            });
        }
    }

    logout = () => {
        localStorage.clear();
        window.location.href = window.location.origin;
    }

    handleTitleChange = (e, index) => {
        const { target: { value } } = e;
        this.updatePromotion({ key: 'title', value }, index);
    }

    handleDescriptionChange = (e, index) => {
        const { target: { value } } = e;
        this.updatePromotion({ key: 'description', value }, index);
    }

    handleChangeType = (e, index) => {
        const { target: { value } } = e;
        this.updatePromotion({ key: 'type', value }, index);
    }

    updatePromotion = ({ key, value }, index) => {
        const { promotions } = this.state;
        const data = [...promotions];
        data.splice(index, 1, { ...promotions[index], [key]: value });
        this.setState({ promotions: data });
    }

    uploadFile = (files, index) => {
        if (files && files[0]) {
            this.setState({ activeIndex: index });
            this.props.uploadFile(files[0]);
        }
    }

    handleAdd = () => {
        const { promotions } = this.state;
        this.setState({
            promotions: [...promotions, { ...initPromotion }],
        });
    }

    handleSave = () => {
        const { promotions } = this.state;
        const data = promotions.map((item, index) => {
            const { type, fileUrl, title, description } = item;
            return {
                aboutVideo: description || '',
                imagePath: type === 'image' ? fileUrl : '',
                promotionId: index,
                title,
                video: type === 'video' ? fileUrl : '',
            };
        });
        const reqBody = {
            advId: 'ADV0000000002',
            promotionReq: data,
        };
        this.props.addPromotions(reqBody);
    }

    renderTypes = (type, index) => {
        return (
            <div className="form-group promotions-type">
                {types.map((item) => (
                    <div className="form-check form-check-inline">
                        <input
                            id={`${item.value}-${index}`}
                            checked={item.value === type}
                            name={`types${index}`} type="radio"
                            className="form-check-input"
                            value={item.value}
                            onChange={(e) => this.handleChangeType(e, index)}
                        />
                        <label className="form-check-label" htmlFor={item.value}>{item.title}</label>
                    </div>
                ))}
            </div>
        );
    }

    renderTitle = (title, index) => {
        return (
            <div className="form-group">
                <label htmlFor={`title${index}`}>Title</label>
                <input id={`title${index}`} type="text" className="form-control" value={title} onChange={(e) => this.handleTitleChange(e, index)} />
            </div>
        );
    }

    renderDescription = (description, index) => {
        return (
            <div className="form-group">
                <label htmlFor={`description${index}`}>Description</label>
                <textarea
                    rows={5}
                    cols={50}
                    maxLength={500}
                    id={`description${index}`}
                    type="text"
                    className="form-control"
                    value={description}
                    onChange={(e) => this.handleDescriptionChange(e, index)}
                />
            </div>
        );
    }

    renderUploadBtn = (fileUrl, type, index) => {
        const accept = type === 'video' ? 'video/*' : 'image/*';
        return (
            <div className="form-group">
                <Upload
                    label="Upload"
                    defaultFiles={[fileUrl]}
                    accept={accept}
                    onChange={(files) => this.uploadFile(files, index)}
                    preview={true}
                />
            </div>
        );
    }

    renderPromotion = (item, index) => {
        const { type, title, description, fileUrl } = item;
        return (
            <div className="card promotion-card col-sm-12 col-md-6">
                <div className="card-body">
                    <div className="col-sm-12">
                        {this.renderTypes(type, index)}
                    </div>
                    <div className="col-sm-12">
                        {this.renderTitle(title, index)}
                    </div>
                    <div className="col-sm-12">
                        {type === 'video' && this.renderDescription(description, index)}
                    </div>
                    <div className="col-sm-12">
                        {this.renderUploadBtn(fileUrl, type, index)}
                    </div>
                </div>
            </div>
        );
    }

    renderControls = () => {
        return (
            <div className="promotion-header">
                <div className="pull-right">
                    <button
                        className="btn btn-primary"
                        onClick={this.handleAdd}
                    >
                        Add Promotion
                 </button>
                    <button
                        className="btn btn-primary"
                        onClick={this.handleSave}
                    >
                        Save
                 </button>
                </div>
            </div>
        );
    }

    renderUploadForm = () => {
        const { promotions } = this.state;
        return (
            <div className="container-fluid promotion-add-forms">
                <div className="row">
                    {promotions && promotions.map((item, i) =>
                        this.renderPromotion(item, i))}
                </div>
            </div>
        );
    }

    render() {
        const { currentRole } = this.state;
        const { advisorDetails, loading } = this.props;
        const { name } = advisorDetails || {};
        return (
            <div className="promotion-container">
                {this.renderControls()}
                {this.renderUploadForm()}
                <Loader loading={loading} />
            </div>
        );
    }

}

const mapStateToProps = state => promotionsSelector(state);

export default connect(mapStateToProps, {
    uploadFile,
    clearImage,
    addPromotions,
})(Promotions);
