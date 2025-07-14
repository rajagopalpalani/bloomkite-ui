import React from 'react';
import ProfileHeader from '../../profileHeader';
import InvestorLeftbar from '../investorLeftbar';
import moment, { formatDate, parseDate } from 'moment';
import CustomDatePicker from '../../common/datePicker';
import Loader from '../../common/loader';
import { toastrError } from '../../../helpers/toastrHelper';
import { pincodeMethod, maxLength } from '../../../constants/commonRules';
import { maskEmail, maskPhoneNumber } from '../../../helpers/maskHelper';
import { toastrMessage } from '../../../constants/toastrMessage';

class PersonalInfo extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            investorDetails: this.props.investorDetails,
            fullName: '',
            emailId: '',
            phoneNumber: '',
            invId: '',
            roleId: 2,
            dob: '',
            gender: '',
            pincode: '',
            imagePath: '',
            render: false,
            currentTab: 0,
            loading: false,

            disableButton: true
        };
    }

    handleTabChange = (index) => {
        this.setState({ currentTab: index });
        this.props.handleTabChange(index);
    };

    componentDidUpdate(oldProps) {
        if (JSON.stringify(this.props.investorDetails) != JSON.stringify(oldProps.investorDetails) || this.state.currentTab != this.props.currentTab) {
            this.setState({ investorDetails: this.props.investorDetails, currentTab: this.props.currentTab });
            this.updateCurrentInformation(this.props.investorDetails);
        }
        if (JSON.stringify(this.props.loading) != JSON.stringify(oldProps.loading)) {
            this.setState({ loading: this.props.loading });
        }
    }

    componentDidMount() {
        this.setState({ investorDetails: this.props.investorDetails, currentTab: this.props.currentTab });
        this.updateCurrentInformation(this.props.investorDetails);
    }

    updateCurrentInformation = (investorDetails) => {
        let investorNewDetails = JSON.parse(JSON.stringify(investorDetails));
        this.setState({
            fullName: investorNewDetails.fullName,
            emailId: investorNewDetails.emailId,
            phoneNumber: investorNewDetails.phoneNumber,
            invId: this.props.invId,
            dob: investorNewDetails.dob ? new Date(investorNewDetails.dob) : '',
            gender: investorNewDetails.gender,
            pincode: investorNewDetails.pincode,
            loading: false,
            disableButton: true
        });
    };

    handleChange = (e) => {
        const { name, value } = e.target;
        this.setState(
            {
                [name]: value
            },
            () => {
                if (
                    this.props.investorDetails.dob != this.state.dob ||
                    this.props.investorDetails.gender != this.state.gender ||
                    this.props.investorDetails.pincode != this.state.pincode
                ) {
                    this.setState({ disableButton: false });
                } else {
                    this.setState({ disableButton: true });
                }
            }
        );
    };

    handlePersonalInformation = (e) => {
        e.preventDefault();
        if (!this.state.disableButton) {
            if (this.state.dob && this.state.gender && this.state.pincode) {
                if (
                    this.props.investorDetails.dob != this.state.dob ||
                    this.props.investorDetails.gender != this.state.gender ||
                    this.props.investorDetails.pincode != this.state.pincode
                ) {
                    var testDateUtc = moment.utc(this.state.dob);
                    var localDate = testDateUtc.local();
                    let options = {
                        fullName: this.state.fullName,
                        emailId: this.state.emailId,
                        phoneNumber: this.state.phoneNumber,
                        invId: this.state.investorDetails.invId,
                        dob: localDate.format('MM-DD-YYYY'),
                        gender: this.state.gender,
                        pincode: this.state.pincode,
                        imagePath: this.state.investorDetails.imagePath
                    };
                    this.props.updatePersonalInformation(options);
                    this.setState({ loading: true });
                } else {
                    this.setState({ disableButton: true });
                }
            } else {
                toastrError(toastrMessage.emptyError);
                return false;
            }
        }
    };

    handleDate = (day) => {
        var testDateUtc = moment.utc(this.state.dob);
        var localDate = testDateUtc.local();
        this.setState({ dob: day });
        if (this.props.investorDetails.dob != localDate.format('MM-DD-YYYY')) {
            this.setState({ disableButton: false });
        } else {
            this.setState({ disableButton: true });
        }
    };

    render() {
        return (
            <div>
                <div className="col-12">
                    <ProfileHeader
                        name={this.props.investorDetails.displayName || (this.props.investorDetails && this.props.investorDetails.fullName)}
                        handleSave={this.handlePersonalInformation}
                        showSaveButton={true}
                        disableButton={this.state.disableButton}
                        investorDetails={this.props.investorDetails}
                    />
                </div>
                <div className="row col-12 advisor-gap">
                    <InvestorLeftbar handleTabChange={this.handleTabChange} currentTab={this.state.currentTab} showBrandTag={this.props.showBrandTag} />
                    <div className="col-10 nopadding">
                        <div className="col-12 center-page planning-right row">
                            <div className="page-center bg-white">
                                <form className="form">
                                    <div className="form-group row">
                                        <div className="col-4 adv-box">
                                            <label>Full Name</label>
                                            <input
                                                className="text-border-pi"
                                                autoComplete="fullName"
                                                name="fullName"
                                                id="fullName"
                                                type="text"
                                                onChange={this.handleChange}
                                                value={this.state.fullName}
                                                disabled
                                            />
                                        </div>
                                        <div className="col-4 adv-box">
                                            <label>Email Address</label>
                                            <input
                                                className="text-border-pi uppercase"
                                                autoComplete="emailId"
                                                name="emailId"
                                                id="emailId"
                                                type="email"
                                                onChange={this.handleChange}
                                                value={maskEmail(this.state.emailId)}
                                                disabled
                                            />
                                        </div>
                                    </div>
                                    <div className="form-group row">
                                        <div className="col-4 adv-box">
                                            <label>Mobile</label>
                                            <input
                                                className="text-border-pi"
                                                autoComplete="phoneNumber"
                                                name="phoneNumber"
                                                id="phoneNumber"
                                                type="text"
                                                onChange={this.handleChange}
                                                value={maskPhoneNumber(this.state.phoneNumber)}
                                                disabled
                                            />
                                        </div>
                                        <div className="col-4 adv-box">
                                            <label>Pincode</label>
                                            <input
                                                className="text-border-pi"
                                                autoComplete="pincode"
                                                name="pincode"
                                                id="pincode"
                                                type="text"
                                                maxLength={maxLength.pincode}
                                                onKeyPress={(e) => pincodeMethod(e)}
                                                onChange={this.handleChange}
                                                value={this.state.pincode}
                                            />
                                        </div>
                                    </div>
                                    <div className="form-group">
                                        <div className="col-4 adv-box">
                                            <label>Date Of Birth</label>
                                            <CustomDatePicker
                                                displayFormat="dd-MM-yyyy"
                                                onChange={(day) => this.handleDate(day)}
                                                showOnInputClick
                                                date={this.state.dob ? this.state.dob : ''}
                                                placeholder="Select Date"
                                                className="text-border-pi my-custom-datepicker-component datePicker-Input"
                                                disabled={this.state.dob ? true : false}
                                                readOnly={true}
                                            />
                                        </div>
                                        <div className="col-4 adv-box">
                                            <label>Gender</label>
                                            <select className=" text-border-pi" name="gender" id="gender" type="select" onChange={this.handleChange} value={this.state.gender}>
                                                <option value="">Select</option>
                                                <option value="M">Male</option>
                                                <option value="F">Female</option>
                                                <option value="O">Others</option>
                                            </select>
                                        </div>
                                    </div>
                                </form>
                                {/* <button className="save-btn2" onClick={(e) => this.handlePersonalInformation(e)}>SAVE</button> */}
                            </div>
                        </div>
                    </div>
                </div>
                <Loader loading={this.props.loading} />
            </div>
        );
    }
}

export default PersonalInfo;
