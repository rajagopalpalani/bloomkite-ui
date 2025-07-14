import React from 'react';
import Modal from '../common/modal';
import Upload from '../common/upload';
import { maxLength, aplhaNumericMethod } from '../../constants/commonRules';
import { advisorMessage } from '../../constants/advisorConstant';
import CustomFragment from '../common/customFragment';

const types = [
    // { title: 'Video', value: 'video' },
    { title: 'Image', value: 'image' }
];

const AddPromotionModal = (props) => {
    const { show, onClose, promotion, onAdd, onUpload, onChange, isLoading } = props;
    const { title, description, fileUrl, type } = promotion;
    const accept = 'image/*';

    const renderUploadBtn = (
        <div className="form-group">
            <Upload label="Upload" defaultFiles={[fileUrl]} accept={accept} onChange={onUpload} preview={true} isLoading={isLoading} />
            <label>{advisorMessage.uploadImage}</label> <br />
            <span className="comments-details">{advisorMessage.supportFormats}</span>
        </div>
    );

    const renderTypes = (
        <div className="form-group promotions-type">
            {types.map((item) => (
                <div className="form-check form-check-inline">
                    <input
                        autoComplete="off"
                        id={item.value}
                        checked={item.value === type}
                        name="types"
                        type="radio"
                        className="form-check-input"
                        value={item.value}
                        onChange={(e) => onChange(e, 'type')}
                    />
                    <label className="form-check-label" htmlFor={item.value}>
                        {item.title}
                    </label>
                </div>
            ))}
        </div>
    );

    const renderTitle = (
        <div className="form-group">
            <label htmlFor="title">Title</label>
            <input
                autoComplete="off"
                id="title"
                type="text"
                className="form-control"
                maxLength={maxLength.content}
                onKeyPress={(e) => aplhaNumericMethod(e)}
                value={title}
                onChange={(e) => onChange(e, 'title')}
            />
        </div>
    );

    const renderDescription = (
        <div className="form-group">
            <label htmlFor="description">Description</label>
            <textarea
                rows={5}
                cols={50}
                maxLength={500}
                id="description"
                type="text"
                className="form-control"
                maxLength={maxLength.about}
                value={description}
                onChange={(e) => onChange(e, 'description')}
            />
        </div>
    );

    const body = (
        <div>
            {renderTypes}
            {renderTitle}
            {type === 'video' && renderDescription}
            {renderUploadBtn}
        </div>
    );

    const footer = (
        <CustomFragment>
            <button disabled={isLoading} className="btn btn-primary" onClick={onAdd}>
                Add
            </button>
            <button className="btn btn-light" onClick={onClose}>
                Cancel
            </button>
        </CustomFragment>
    );
    return <Modal show={show} title="Add Promotion" body={body} onClose={onClose} footer={footer} />;
};

export default AddPromotionModal;
