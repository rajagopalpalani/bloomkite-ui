import React from 'react';
import ProfileHeader from '../../profileHeader';
import CorporateLeftbar from '../corporateLeftbar';
import { teamSignupSelector } from '../../../selectors/team';
import { teamSignupUser, keypeopleSignupUser, teamMemberDeactivate, deleteKeypeople, modifyKeypeople } from '../../../actions/teamSignup';
import { connect } from 'react-redux';
import CustomReactTooltip from '../../common/customReactTooltip';
import Loader from '../../common/loader';
import { toastrError } from '../../../helpers/toastrHelper';
import { maskEmail, maskPanNumber, maskPhoneNumber } from '../../../helpers/maskHelper';
import { toastrMessage } from '../../../constants/toastrMessage';
import { teamSignupMessage } from '../../../constants/teamSignupInfo';
import { advisorMessage } from '../../../constants/advisorConstant';
import { validateUniqueFields } from '../../../actions/signup';
import {
    maxLength,
    validEmailRegex,
    validAdvisorPANnumberRegex,
    validPasswordRegex,
    validPhoneNumberRegex,
    panMethod,
    numberMethod,
    contentMethod,
    aplhaNumericMethod
} from '../../../constants/commonRules';
import Upload from '../../common/upload';
import { clearImage } from '../../../actions/uploadFile';
import FontIcon from '../../common/fontAwesomeIcon';
import { faInfo, faEdit, faTrash, faPaperPlane } from '@fortawesome/free-solid-svg-icons';
import { resendMail } from '../../../actions/accountDetails/resendMail';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

class Team extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            fullName: '',
            designation: '',
            image: '',
            name: '',
            emailId: '',
            panNumber: '',
            password: '',
            phoneNumber: '',
            parentPartyId: '',
            keyPeopleId: '',
            roleId: 1,
            loading: false,
            domLoaded: false,
            teamMember: {},
            teamDelete: false,
            currentDeleteKeyPeople: {},
            nameError : false,
            panError : false,
            phoneNumberError : false,
            emailIdError : false,
            passwordError : false,
            confirmPasswordError : false
        };
    }

    handleTabChange = (index) => {
        this.setState({ currentTab: index });
        this.props.handleTabChange(index);
    };

    componentDidMount() {
        this.setState({ advisorDetails: this.props.advisorDetails, keyPeopleDetails: this.state.keyPeopleDetails, domLoaded: true });
    }

    componentDidUpdate(oldProps) {
        const { file: prevFile } = oldProps;
        const { file } = this.props;
        if (JSON.stringify(this.props.advisorDetails) != JSON.stringify(oldProps.advisorDetails)) {
            this.setState({ advisorDetails: this.props.advisorDetails, keyPeopleDetails: this.state.keyPeopleDetails, loading: false });
        }
        if (JSON.stringify(this.props.loading) != JSON.stringify(oldProps.loading)) {
            this.setState({ loading: this.props.loading });
        }
        const { url } = file || {};
        const { url: prevUrl } = prevFile || {};
        if (url && url !== prevUrl) {
            this.setState({ image: url });
            this.props.clearImage();
        }
    }

    handleKeySignup = (e) => {
        e.preventDefault();
        if (this.state.fullName.trim() != '' && this.state.designation.trim() != '') {
            if (this.state.fullName.length > 3) {
                if (this.state.designation) {
                    let options = {
                        fullName: this.state.fullName,
                        designation: this.state.designation,
                        image: this.state.image,
                        parentPartyId: this.props.partyId
                    };
                    this.props.keypeopleSignupUser(options);
                    this.clearState();
                } else {
                    toastrError(toastrMessage.designationError);
                }
            } else {
                toastrError(toastrMessage.emptyName);
            }
        } else {
            toastrError(toastrMessage.emptyAll);
        }
    };

    handleUpdateKeyPeople = (e) => {
        e.preventDefault();
        if (this.state.fullName.trim() != '' && this.state.designation.trim() != '') {
            if (this.state.fullName.length > 3) {
                if (this.state.designation) {
                    let options = {
                        fullName: this.state.fullName,
                        designation: this.state.designation,
                        image: this.state.image,
                        keyPeopleId: this.state.currentKeyPeopleId,
                        parentPartyId: this.props.partyId
                    };
                    this.props.modifyKeypeople(options);
                    this.clearState();
                } else {
                    toastrError(toastrMessage.designationError);
                }
            } else {
                toastrError(toastrMessage.emptyName);
            }
        } else {
            toastrError(toastrMessage.emptyAll);
        }
    };

    handleFocus = (e) => {
        const { name, value } = e.target;
        this.setState({ [`${name}Info`]: true });
    };

    handleBlur = (e) => {
        const { name, value } = e.target;
        let fullNameError = false;
        let designationError = false;
        let nameError = false;
        let panError = false;
        let phoneNumberError = false;
        let emailIdError = false;
        let passwordError = false;
        let confirmPasswordError = false;
        if (name === 'name') {
            nameError = value.length < 3;
            nameError && toastrError(toastrMessage.emptyName);
            this.setState({nameError : nameError})
        }
        if (name === 'fullName') {
            fullNameError = value.length < 3;
            fullNameError && toastrError(toastrMessage.emptyName);
        }
        if (name === 'designation') {
            designationError = value.length < 3;
            designationError && toastrError(toastrMessage.designationError);
        }
        if (name === 'panNumber') {
            panError = !validAdvisorPANnumberRegex.test(value);
            panError && toastrError(toastrMessage.emptyPan);
            this.setState({panError : panError})
            let options = {
                panNumber: value
            };
            if (value.length > 3) {
                this.props.validateUniqueFields(options, name);
            }
        }
        if (name === 'phoneNumber') {
            phoneNumberError = !validPhoneNumberRegex.test(value);
            phoneNumberError && toastrError(toastrMessage.emptyPhoneNumber);
            this.setState({phoneNumberError : phoneNumberError})
            let options = {
                phoneNumber: value
            };
            if (value.length > 3) {
                this.props.validateUniqueFields(options, name);
            }
        }
        if (name === 'emailId') {
            emailIdError = !validEmailRegex.test(value);
            emailIdError && toastrError(toastrMessage.emptyMail);
            this.setState({emailIdError : emailIdError})
            let options = {
                emailId: value
            };
            if (value.length > 3) {
                this.props.validateUniqueFields(options, name);
            }
        }
        if (name === 'password') {
            passwordError = !validPasswordRegex.test(value);
            passwordError && toastrError(toastrMessage.emptyPassword);
            this.setState({passwordError : passwordError})
        }
        if (name === 'confirmPassword') {
            confirmPasswordError = this.state.password !== value;
            confirmPasswordError && toastrError(toastrMessage.emptyConfirmPassword);
            this.setState({confirmPasswordError : confirmPasswordError})
        }
        this.setState({ [`${name}Info`]: false });
    };

    handleTeamSignup = (e) => {
        e.preventDefault();
        if (
            this.state.emailId.trim() != '' &&
            this.state.name.trim() != '' &&
            this.state.panNumber.trim() != '' &&
            this.state.password.trim() != '' &&
            this.state.phoneNumber.trim() != '' &&
            this.state.confirmPassword.trim() != ''
        ) {
            if (this.state.name.length > 3) {
                if (validAdvisorPANnumberRegex.test(this.state.panNumber)) {
                    if (validPhoneNumberRegex.test(this.state.phoneNumber)) {
                        if (validEmailRegex.test(this.state.emailId)) {
                            if (validPasswordRegex.test(this.state.password)) {
                                if (this.state.confirmPassword === this.state.password) {
                                    let options = {
                                        emailId: this.state.emailId,
                                        name: this.state.name,
                                        panNumber: this.state.panNumber,
                                        password: this.state.password,
                                        phoneNumber: this.state.phoneNumber,
                                        confirmPassword: this.state.confirmPassword,
                                        roleId: this.state.roleId,
                                        parentPartyId: this.props.partyId
                                    };
                                    this.props.teamSignupUser(options);
                                    this.clearState();
                                } else {
                                    toastrError(toastrMessage.emptyConfirmPassword);
                                }
                            } else {
                                toastrError(toastrMessage.emptyPassword);
                            }
                        } else {
                            toastrError(toastrMessage.emptyMail);
                        }
                    } else {
                        toastrError(toastrMessage.emptyPhoneNumber);
                    }
                } else {
                    toastrError(toastrMessage.emptyPan);
                }
            } else {
                toastrError(toastrMessage.emptyName);
            }
        } else {
            toastrError(toastrMessage.emptyAll);
        }
    };

    clearState = () => {
        this.setState({
            emailId: '',
            name: '',
            panNumber: '',
            password: '',
            phoneNumber: '',
            confirmPassword: '',
            roleId: 1,
            parentPartyId: 0,
            fullName: '',
            designation: '',
            image: ''
        });
    };

    handleChange = (e) => {
        const { name, value } = e.target;
        this.setState({ [name]: name == 'panNumber' ? value.toLocaleUpperCase() : value });
    };

    addTeamMember = () => {
        this.setState({ addTeamMember: true });
    };

    handleDelete = (teamMember) => {
        this.props.teamMemberDeactivate(teamMember);
    };

    handleDeleteKey = (deleteKey) => {
        this.props.deleteKeypeople(deleteKey);
    };

    editKeyPeople = (peopleIndex) => {
        let currentKeyPeople = this.props.keyPeopleDetails.find((a) => a.keyPeopleId == peopleIndex);
        this.setState({
            currentKeyPeople,
            fullName: currentKeyPeople.fullName,
            designation: currentKeyPeople.designation,
            image: currentKeyPeople.image,
            currentKeyPeopleId: currentKeyPeople.keyPeopleId
        });
    };

    deleteKeyPeople = (peopleIndex) => {
        let currentDeleteKeyPeople = this.props.keyPeopleDetails.find((a) => a.keyPeopleId == peopleIndex);
        this.setState({ currentDeleteKeyPeople });
    };
    handleImageDelete = (file, type, peopleIndex) => {
        let keyIndex = this.props.keyPeopleDetails.findIndex((a) => a.keyPeopleId == peopleIndex);
        const { fileName } = file;
        const data = [...this.props.keyPeopleDetails];
        let item = data[keyIndex];
        item = { ...item, image: '' };
        data.splice(keyIndex, 1, item);
        this.setState({ keyPeopleDetails: data, image: '', selectedItem: null });
    };

    resendMail = (teamMember) => {
        let options = {
            key: 'signup',
            teamEmail: teamMember.emailId
        };
        this.props.resendMail(options);
    };

    render() {
        const { fullName, designation, emailId, name, panNumber, password, confirmPassword, phoneNumber } = this.state;
        return (
            <div>
                <div className="col-12">
                    <ProfileHeader
                        name={this.props.advisorDetails.displayName || (this.props.advisorDetails && this.props.advisorDetails.name)}
                        location={this.props.advisorDetails && this.props.advisorDetails.city}
                        designation={this.props.advisorDetails.designation}
                        onPublish={this.props.onPublish}
                        advisorDetails={this.props.advisorDetails}
                    />
                </div>
                <div className="row col-12 advisor-gap">
                    <CorporateLeftbar
                        handleTabChange={this.props.handleTabChange}
                        currentTab={this.props.currentTab}
                        showBrandTag={this.props.showBrandTag}
                        parentPartyId={this.props.advisorDetails.parentPartyId != 0 ? this.props.advisorDetails.parentPartyId : ''}
                    />
                    <div className="col-10 nopadding">
                        <div className="col-12 center-page planning-right row">
                            <div className="page-center bg-white">
                                <div className="key-people-container">
                                    <h4 className="key-title">
                                        {teamSignupMessage.signupKey}{' '}
                                        {this.props.keyPeopleDetails && this.props.keyPeopleDetails.length < 3 && (
                                            <a data-toggle="modal" data-target="#keyModal">
                                                <img className="add-plus" src="/images/add.png" alt="add image" />
                                            </a>
                                        )}
                                    </h4>
                                    <div className="col-12 row team-design">
                                        {this.props.keyPeopleDetails &&
                                            this.props.keyPeopleDetails.length > 0 &&
                                            this.props.keyPeopleDetails.map((keyPeople, peopleIndex) => {
                                                return (
                                                    <div className="col-3 text-center keypeople" key={'key-people-' + peopleIndex}>
                                                        <div className="profileImage">
                                                            <img
                                                                id="favicon"
                                                                className="profile-image1"
                                                                src={keyPeople && keyPeople.image ? keyPeople.image : '/images/avatar.png'}
                                                                alt="profile image"
                                                            />
                                                        </div>
                                                        <strong className="keypeople-name">{keyPeople.fullName}</strong>
                                                        <br />
                                                        <strong className="keypeople-name">{keyPeople.designation}</strong>
                                                        <br />
                                                        <div>
                                                            <a
                                                                className="btn btn-secondary ml-2"
                                                                data-toggle="modal"
                                                                data-target="#keyEditModal"
                                                                title="Edit"
                                                                onClick={() => this.editKeyPeople(keyPeople.keyPeopleId)}>
                                                                <FontIcon icon={faEdit} />
                                                            </a>
                                                            <a
                                                                className="btn btn-secondary ml-2"
                                                                data-toggle="modal"
                                                                data-target="#keyDeleteModal"
                                                                title="Delete"
                                                                onClick={() => this.deleteKeyPeople(keyPeople.keyPeopleId)}>
                                                                <FontIcon icon={faTrash} />
                                                            </a>
                                                        </div>
                                                    </div>
                                                );
                                            })}
                                        {(!this.props.keyPeopleDetails || this.props.keyPeopleDetails.length == 0) && (
                                            <div className="key-add">{teamSignupMessage.signupAddKeyPeople}</div>
                                        )}
                                    </div>
                                    <div className="modal fade" id="keyModal" role="dialog">
                                        <div className="modal-dialog">
                                            <div className="modal-content keypeople-landing-design">
                                                <div className="modal-header no-border key-header">
                                                    <h6 className="modal-title land-Title">{teamSignupMessage.signupAddKey}</h6>
                                                    <button type="button" className="close" onClick={() => this.clearState()} data-dismiss="modal">
                                                        &times;
                                                    </button>
                                                </div>
                                                <div className="modal-body">
                                                    <div className="col-4 adv-box key-form">
                                                        <label>{teamSignupMessage.signupName}</label>
                                                        <input
                                                            className=" text-border-team"
                                                            autoComplete="off"
                                                            name="fullName"
                                                            id="fullName"
                                                            type="text"
                                                            maxLength={maxLength.content}
                                                            onKeyPress={(e) => contentMethod(e)}
                                                            onChange={this.handleChange}
                                                            value={fullName}
                                                            onFocus={this.handleFocus}
                                                            onBlur={this.handleBlur}
                                                            noValidate
                                                        />
                                                        <label>{teamSignupMessage.signupDesignation}</label>
                                                        <input
                                                            className="text-border-team"
                                                            autoComplete="off"
                                                            name="designation"
                                                            id="designation"
                                                            type="text"
                                                            maxLength={maxLength.content}
                                                            onKeyPress={(e) => contentMethod(e)}
                                                            onChange={this.handleChange}
                                                            value={designation}
                                                            onFocus={this.handleFocus}
                                                            onBlur={this.handleBlur}
                                                            noValidate
                                                        />
                                                        <div className="key-upload">
                                                            <Upload label="Upload Image" onChange={this.props.uploadFile} preview={true} defaultFiles={[this.state.image]} />
                                                        </div>
                                                        <label className="upload-size">{advisorMessage.uploadImage}</label>
                                                        <label>{advisorMessage.supportFormats}</label>
                                                        <button
                                                            className="key-create-btn"
                                                            onClick={(e) => this.handleKeySignup(e)}
                                                            data-dismiss={fullName != '' && designation != '' && 'modal'}>
                                                            {teamSignupMessage.keyPeopleCreate}
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="modal fade" id="keyEditModal" role="dialog">
                                        <div className="modal-dialog">
                                            <div className="modal-content keypeople-landing-design">
                                                <div className="modal-header no-border key-header">
                                                    <h6 className="modal-title land-Title">{teamSignupMessage.signupEditKey}</h6>
                                                    <button type="button" className="close" onClick={() => this.clearState()} data-dismiss="modal">
                                                        &times;
                                                    </button>
                                                </div>
                                                <div className="modal-body">
                                                    <div className="col-4 adv-box key-form">
                                                        <label>{teamSignupMessage.signupName}</label>
                                                        <input
                                                            className=" text-border-team"
                                                            autoComplete="off"
                                                            name="fullName"
                                                            id="fullName"
                                                            type="text"
                                                            maxLength={maxLength.content}
                                                            onKeyPress={(e) => contentMethod(e)}
                                                            onChange={this.handleChange}
                                                            value={fullName}
                                                            onFocus={this.handleFocus}
                                                            onBlur={this.handleBlur}
                                                            noValidate
                                                        />
                                                        <label>{teamSignupMessage.signupDesignation}</label>
                                                        <input
                                                            className="text-border-team"
                                                            autoComplete="off"
                                                            name="designation"
                                                            id="designation"
                                                            type="text"
                                                            maxLength={maxLength.content}
                                                            onKeyPress={(e) => contentMethod(e)}
                                                            onChange={this.handleChange}
                                                            value={designation}
                                                            onFocus={this.handleFocus}
                                                            onBlur={this.handleBlur}
                                                            noValidate
                                                        />
                                                        <div className="key-upload">
                                                            <Upload
                                                                label="Upload Image"
                                                                onChange={this.props.uploadFile}
                                                                preview={true}
                                                                onDelete={(item) => this.handleImageDelete(item, 'key-people', this.state.currentKeyPeopleId)}
                                                                defaultFiles={[this.state.image]}
                                                            />
                                                        </div>
                                                        <label className="upload-size">{advisorMessage.uploadImage}</label>
                                                        <label>{advisorMessage.supportFormats}</label>
                                                        <button
                                                            className="key-create-btn"
                                                            onClick={(e) => this.handleUpdateKeyPeople(e)}
                                                            data-dismiss={fullName != '' && designation != '' && 'modal'}>
                                                            {teamSignupMessage.keyPeopleSave}
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="modal fade" id="keyDeleteModal" role="dialog" data-backdrop="static" data-keyboard="false">
                                        <div className="modal-dialog">
                                            <div className="modal-content">
                                                <div className="modal-header">
                                                    <h4 className="modal-title text-center">{'Delete Key People'}</h4>
                                                    <button type="button" className="close" data-dismiss="modal">
                                                        &times;
                                                    </button>
                                                </div>
                                                <div className="modal-body keypeople-delete">
                                                    {`Are you sure want to delete ${this.state.currentDeleteKeyPeople && this.state.currentDeleteKeyPeople.fullName}?`}
                                                </div>
                                                <div className="modal-footer">
                                                    <button
                                                        type="button"
                                                        className="btn btn-danger"
                                                        data-dismiss="modal"
                                                        onClick={() => this.handleDeleteKey(this.state.currentDeleteKeyPeople)}>
                                                        Delete
                                                    </button>
                                                    <button type="button" className="btn btn-primary" data-dismiss="modal">
                                                        Cancel
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="team-member-container">
                                    <div className="add-member">
                                        <h4 className="team-title">
                                            {teamSignupMessage.signupTeam}{' '}
                                            {this.props.teamDetails.length < 10 && (
                                                <a data-toggle="modal" data-target="#planModal">
                                                    <img src="/images/add.png" alt="add image" height="20px" width="20px" />
                                                </a>
                                            )}
                                        </h4>
                                    </div>
                                    {this.props.teamDetails && this.props.teamDetails.length > 0 ? (
                                        <div className="col-12 ">
                                            <table className="team-table">
                                                <tbody>
                                                    <tr className="team-table-align">
                                                        <th>{teamSignupMessage.teamTableName}</th>
                                                        <th>{teamSignupMessage.teamTableRefId}</th>
                                                        <th>{teamSignupMessage.teamTableEmail}</th>
                                                        <th>{teamSignupMessage.teamTablePhone}</th>
                                                        <th>{teamSignupMessage.teamTablePanNumber}</th>
                                                        <th>{teamSignupMessage.accountStatus}</th>
                                                        <th>{teamSignupMessage.teamTableAction}</th>
                                                    </tr>
                                                    {this.props.teamDetails.map((teamMember, teamIndex) => {
                                                        return (
                                                            <tr className="team-table-align" key={'team-member-' + teamIndex}>
                                                                <td>{teamMember.name}</td>
                                                                <td>{teamMember.advId}</td>
                                                                <td className="uppercase">{maskEmail(teamMember.emailId)}</td>
                                                                <td>{maskPhoneNumber(teamMember.phoneNumber)}</td>
                                                                <td className="uppercase">{maskPanNumber(teamMember.panNumber)}</td>
                                                                {teamMember.isVerified == 1 && <td>Verified</td>}
                                                                {teamMember.isVerified != 1 && <td>Not Verified</td>}
                                                                <td className="landing-manage">
                                                                    <ul className="Team-button-manage">
                                                                        <li>
                                                                            <a
                                                                                className="btn btn-danger ml-2"
                                                                                title={'Deactivate'}
                                                                                data-toggle="modal"
                                                                                data-target="#teamDeactivateModal"
                                                                                onClick={() => this.setState({ teamDelete: true, teamMember })}>
                                                                                <FontIcon icon={faTrash} />
                                                                            </a>
                                                                        </li>
                                                                        <li>
                                                                            {teamMember.isVerified != 1 && (
                                                                                <a
                                                                                    className="btn btn-primary ml-2"
                                                                                    title={'Resend Verification Email'}
                                                                                    data-toggle="modal"
                                                                                    data-target="#planEditModal"
                                                                                    onClick={() => this.resendMail(teamMember)}>
                                                                                    <FontAwesomeIcon icon={faPaperPlane} />
                                                                                </a>
                                                                            )}
                                                                        </li>
                                                                    </ul>
                                                                </td>
                                                            </tr>
                                                        );
                                                    })}
                                                </tbody>
                                            </table>
                                        </div>
                                    ) : (
                                        <div className="col-12 add-team-member">{teamSignupMessage.signupTeamAdd}</div>
                                    )}
                                    <div className="modal fade" id="planModal" role="dialog">
                                        <div className="modal-dialog">
                                            <div className="modal-content team-landing-design">
                                                <div className="modal-header no-border key-header">
                                                    <h6 className="modal-title land-Title">{teamSignupMessage.signupTeam}</h6>
                                                    <button type="button" className="close" onClick={() => this.clearState()} data-dismiss="modal">
                                                        &times;
                                                    </button>
                                                </div>
                                                <div className="modal-body">
                                                    <div id="individual" className="col-12 form-group team-bundle">
                                                        <div className="row">
                                                            <div className="col-xs-6 box-top box-side">
                                                                <label>{teamSignupMessage.signupName}</label>
                                                                <input
                                                                    className={`${this.state.nameError ? "teamSignup-error" : 'signup-border'}`}
                                                                    autoComplete="off"
                                                                    name="name"
                                                                    id="name"
                                                                    spellCheck="false"
                                                                    maxLength={maxLength.content}
                                                                    onKeyPress={(e) => contentMethod(e)}
                                                                    onChange={this.handleChange}
                                                                    value={name}
                                                                    onBlur={this.handleBlur}
                                                                    onFocus={this.handleFocus}
                                                                    type="text"
                                                                    noValidate
                                                                />
                                                                {this.state.nameInfo && <span className="nameInfo signup-color">{teamSignupMessage.nameInfo}</span>}
                                                            </div>
                                                            <div className="col-xs-6 box-top">
                                                                <label>{teamSignupMessage.signupPanNumber}</label>
                                                                <input
                                                                    className={`${this.state.panError ? "teamSignup-error" : 'signup-border'}`}
                                                                    autoComplete="off"
                                                                    name="panNumber"
                                                                    id="panNumber"
                                                                    spellCheck="false"
                                                                    maxLength={maxLength.panNumber}
                                                                    onKeyPress={(e) => panMethod(e)}
                                                                    onChange={this.handleChange}
                                                                    value={panNumber}
                                                                    onBlur={this.handleBlur}
                                                                    onFocus={this.handleFocus}
                                                                    type="text"
                                                                    noValidate
                                                                />
                                                                {this.state.panNumberInfo && <span className="panNumberInfo signup-color">{teamSignupMessage.panInfo}</span>}
                                                            </div>
                                                        </div>
                                                        <div className="row">
                                                            <div className="col-xs-6 box-top box-side">
                                                                <label>{teamSignupMessage.signupMobile}</label>
                                                                <input
                                                                    className={`${this.state.phoneNumberError ? "teamSignup-error" : 'signup-border'}`}
                                                                    autoComplete="off"
                                                                    name="phoneNumber"
                                                                    id="phoneNumber"
                                                                    spellCheck="false"
                                                                    maxLength={maxLength.phoneNumber}
                                                                    onKeyPress={(e) => numberMethod(e)}
                                                                    onChange={this.handleChange}
                                                                    value={phoneNumber}
                                                                    onFocus={this.handleFocus}
                                                                    onBlur={this.handleBlur}
                                                                    noValidate
                                                                />
                                                                {this.state.phoneNumberInfo && (
                                                                    <span className="phoneNumberInfo signup-color">{teamSignupMessage.phoneNumberInfo}</span>
                                                                )}
                                                            </div>
                                                            <div className="col-xs-6 box-top">
                                                                <label>{teamSignupMessage.signupEmailId}</label>
                                                                <input
                                                                    className={`${this.state.emailIdError ? "teamSignup-error" : 'signup-border'}`}
                                                                    autoComplete="off"
                                                                    name="emailId"
                                                                    id="emailId"
                                                                    spellCheck="false"
                                                                    type="email"
                                                                    maxLength={maxLength.email}
                                                                    onChange={this.handleChange}
                                                                    value={emailId}
                                                                    onFocus={this.handleFocus}
                                                                    onBlur={this.handleBlur}
                                                                    noValidate
                                                                />
                                                                {this.state.emailIdInfo && <span className="emailIdInfo signup-color">{teamSignupMessage.emailInfo}</span>}
                                                            </div>
                                                        </div>
                                                        <div className="row">
                                                            <div className="col-xs-6 box-top box-side">
                                                                <label>{teamSignupMessage.signupPassword}</label>
                                                                <input
                                                                    className={`${this.state.passwordError ? "teamSignup-error" : 'signup-border'}`}
                                                                    name="password"
                                                                    id="password"
                                                                    spellCheck="false"
                                                                    type="password"
                                                                    maxLength={maxLength.password}
                                                                    onBlur={this.handleBlur}
                                                                    onFocus={this.handleFocus}
                                                                    onChange={this.handleChange}
                                                                    value={password}
                                                                    noValidate
                                                                />
                                                                <a className="comments-icon" id="comments-icon" data-tip data-for="rejectComments">
                                                                    <FontIcon icon={faInfo} />
                                                                </a>
                                                                {this.state.domLoaded && (
                                                                    <CustomReactTooltip id="rejectComments" type="info" effect="solid">
                                                                        <span className="comments-details">
                                                                            Password must be 8-16 characters
                                                                            <br />
                                                                            one capital
                                                                            <br /> one special character
                                                                            <br />
                                                                            numeric value
                                                                        </span>
                                                                    </CustomReactTooltip>
                                                                )}
                                                                {this.state.passwordInfo && <span className="passwordInfo signup-color">{teamSignupMessage.passwordInfo}</span>}
                                                            </div>
                                                            <div className="col-xs-6 box-top">
                                                                <label>{teamSignupMessage.signupConfirm}</label>
                                                                <input
                                                                    className={`${this.state.confirmPasswordError ? "teamSignup-error" : 'signup-border'}`}
                                                                    name="confirmPassword"
                                                                    spellCheck="false"
                                                                    id="confirmPassword"
                                                                    type="password"
                                                                    maxLength={maxLength.password}
                                                                    onBlur={this.handleBlur}
                                                                    onFocus={this.handleFocus}
                                                                    onChange={this.handleChange}
                                                                    value={confirmPassword}
                                                                    noValidate
                                                                />
                                                                {this.state.confirmPasswordInfo && (
                                                                    <span className="confirmPasswordInfo signup-color">{teamSignupMessage.confirmPasswordInfo}</span>
                                                                )}
                                                            </div>
                                                        </div>
                                                        <button
                                                            className="create-btn"
                                                            onClick={(e) => this.handleTeamSignup(e)}
                                                            data-dismiss={phoneNumber != '' && emailId != '' && 'modal'}>
                                                            {teamSignupMessage.signupCreateAccount}
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="modal fade" id="teamDeactivateModal" role="dialog" data-backdrop="static" data-keyboard="false">
                                        <div className="modal-dialog">
                                            <div className="modal-content">
                                                <div className="modal-header">
                                                    <h4 className="modal-title text-center">{teamSignupMessage.deactiveTeamMember}</h4>
                                                    <button type="button" className="close" data-dismiss="modal">
                                                        &times;
                                                    </button>
                                                </div>
                                                <div className="modal-body">{teamSignupMessage.deactivateInfo}</div>
                                                <div className="modal-footer">
                                                    <button type="button" className="btn btn-danger" data-dismiss="modal" onClick={() => this.handleDelete(this.state.teamMember)}>
                                                        {teamSignupMessage.teamTableDeactivate}
                                                    </button>
                                                    <button type="button" className="btn btn-primary" data-dismiss="modal">
                                                        {teamSignupMessage.teamCancel}
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <Loader loading={this.props.loading} />
            </div>
        );
    }
}

const mapStateToProps = (state) => teamSignupSelector(state);

export default connect(mapStateToProps, {
    teamSignupUser,
    keypeopleSignupUser,
    teamMemberDeactivate,
    deleteKeypeople,
    modifyKeypeople,
    clearImage,
    validateUniqueFields,
    resendMail
})(Team);
