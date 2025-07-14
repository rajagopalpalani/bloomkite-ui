import React from 'react';
import PropTypes from 'prop-types';
import Loader from 'react-loader-spinner';
import ImageGallery from './imageGallery';
import FontIcon from '../common/fontAwesomeIcon';
import { faUpload } from '@fortawesome/free-solid-svg-icons';

const ERROR = {
    NOT_SUPPORTED_EXTENSION: 'NOT_SUPPORTED_EXTENSION',
    FILESIZE_TOO_LARGE: 'FILESIZE_TOO_LARGE'
};

class Upload extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            files: [],
            fileErrors: []
        };
        this.inputElement = '';
        this.onDropFile = this.onDropFile.bind(this);
        this.onUploadClick = this.onUploadClick.bind(this);
        this.triggerFileUpload = this.triggerFileUpload.bind(this);
        this.renderElement = this.renderElement.bind(this);
    }

    componentDidMount() {
        const { defaultFiles } = this.props;
        if (defaultFiles && defaultFiles.length) {
            const files = [];
            defaultFiles.forEach((item) => {
                if (item) {
                    const fileName = item.split('/').pop();
                    // files.push(new File([item], fileName));
                    files.push({ fileName, url: item });
                }
            });
            this.setState({ files });
        }
    }

    componentDidUpdate(prevProps) {
        const oldFiles = JSON.stringify(prevProps.defaultFiles);
        const newFiles = JSON.stringify(this.props.defaultFiles);
        if (newFiles !== oldFiles && newFiles.length) {
            const files = [];
            this.props.defaultFiles.forEach((item) => {
                if (item) {
                    const fileName = item.split('/').pop();
                    // files.push(new File([item], fileName));
                    files.push({ fileName, url: item });
                }
            });
            this.setState({ files });
        }
    }

    hasExtension(fileName) {
        const pattern = '(' + this.props.imgExtension.join('|').replace(/\./g, '\\.') + ')$';
        return new RegExp(pattern, 'i').test(fileName);
    }

    onDropFile(e) {
        const files = e.target.files;
        const allFilePromises = [];
        const fileErrors = [];

        // Iterate over all uploaded files
        for (let i = 0; i < files.length; i++) {
            let file = files[i];
            let fileError = {
                name: file.name
            };
            // Check for file extension
            if (!this.hasExtension(file.name)) {
                fileError = Object.assign(fileError, {
                    type: ERROR.NOT_SUPPORTED_EXTENSION
                });
                fileErrors.push(fileError);
                continue;
            }
            // Check for file size
            if (file.size > this.props.maxFileSize) {
                fileError = Object.assign(fileError, {
                    type: ERROR.FILESIZE_TOO_LARGE
                });
                fileErrors.push(fileError);
                continue;
            }

            allFilePromises.push(this.readFile(file));
        }

        this.setState({ fileErrors });

        Promise.all(allFilePromises).then((newFilesData) => {
            const files = [];
            newFilesData.forEach((newFileData) => {
                files.push(newFileData.file);
            });
            // this.setState({ files: files });
            this.props.onChange(files);
        });
    }

    onUploadClick(e) {
        e.target.value = null;
    }

    readFile(file) {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.onload = function (e) {
                let dataURL = e.target.result;
                dataURL = dataURL.replace(';base64', `;name=${file.name};base64`);
                resolve({ file, dataURL });
            };
            reader.readAsDataURL(file);
        });
    }

    removeFile = (e, index) => {
        e.preventDefault();
        const { files } = this.state;
        const list = [...files];
        const item = list.splice(index, 1);
        this.setState({ files: list }, () => {
            this.props.onDelete(item[0]);
        });
    };

    renderErrors() {
        const { fileErrors } = this.state;
        return fileErrors.map((fileError, index) => {
            return (
                <small className="text-danger errorMessage" key={index}>
                    * {fileError.name} {fileError.type === ERROR.FILESIZE_TOO_LARGE ? this.props.fileSizeError : this.props.fileTypeError}
                </small>
            );
        });
    }

    renderFileList() {
        const { preview, allImages, index } = this.props;
        if (preview) {
            return <ImageGallery images={allImages} index={index} url={this.state.files[0].url} name={this.state.files[0].name} removeFile={this.removeFile} />;
            {
                /* {file && <ImageGallery images={this.props.allImages} index={index} url={file.url} name={file.name} removeFile={this.removeFile} />} */
            }
            // return this.state.files.map((file, index) => {
            //     return (
            //         <div key={`list-${index}`}>
            //             <a href="/" onClick={(e) => this.removeFile(e, index)}>
            //                 &times;
            //             </a>
            //             <img src={file.url} alt={file.name} />
            //         </div>
            //     );
            // });
        }
        return this.state.files.map((file, index) => {
            return (
                <div key={`list-${index}`} className="file-list-item">
                    <a href="/" onClick={(e) => this.removeFile(e, index)}>
                        &times;
                    </a>
                    <p>{file.fileName}</p>
                </div>
            );
        });
    }

    renderLabel() {
        return <p>{this.props.label}</p>;
    }

    triggerFileUpload(e) {
        e.preventDefault();
        this.inputElement.click();
    }

    renderElement() {
        const { multiple, children, buttonText, showLabel, isLoading } = this.props;
        const { files } = this.state;
        const showbtn = multiple || !(!multiple && files.length);
        return !children ? (
            showbtn ? (
                isLoading ? (
                    this.renderLoader()
                ) : (
                    <button className="btn-primary form-control choose-file-button" onClick={this.triggerFileUpload}>
                         <FontIcon icon={faUpload}/> {showLabel && buttonText}
                    </button>
                )
            ) : (
                this.renderFileList()
            )
        ) : (
            <a href="/" onClick={this.triggerFileUpload}>
                {children}
            </a>
        );
    }

    renderLoader = () => {
        return (
            <div className="file-list-item preview loader">
                <Loader type="Rings" color="#251534" height={50} width={50} />
            </div>
        );
    };

    render() {
        return (
            <div className="bloomkite-file-upload">
                <div className="file-upload-container">
                    {this.renderLabel()}
                    {this.renderElement()}
                    <div className="errorsContainer">{this.renderErrors()}</div>
                    <input
                        className="displayHide"
                        type="file"
                        ref={(input) => (this.inputElement = input)}
                        name="file-input"
                        multiple={this.props.multiple}
                        onChange={this.onDropFile}
                        onClick={this.onUploadClick}
                        accept={this.props.accept}
                    />
                </div>
            </div>
        );
    }
}

Upload.defaultProps = {
    accept: 'image/*',
    buttonText: 'Upload',
    label: '',
    imgExtension: ['.jpg', '.jpeg', '.gif', '.png'],
    maxFileSize: 5242880,
    fileSizeError: ' file size is too big',
    fileTypeError: ' is not a supported file extension',
    multiple: false,
    showLabel: true,
    onChange: () => {},
    onDelete: () => {},
    defaultFiles: []
};

Upload.propTypes = {
    onChange: PropTypes.func,
    onDelete: PropTypes.func,
    accept: PropTypes.string,
    name: PropTypes.string,
    buttonText: PropTypes.string,
    label: PropTypes.string,
    imgExtension: PropTypes.array,
    maxFileSize: PropTypes.number,
    fileSizeError: PropTypes.string,
    fileTypeError: PropTypes.string,
    multiple: PropTypes.bool,
    defaultFiles: PropTypes.array
};

export default Upload;
