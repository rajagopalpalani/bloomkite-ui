import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { fetchSharedByPartyIdAndRefId, commentQueries, fetchQueries } from '../../actions/planning';
import SearchDropdown from '../common/searchDropdown';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPaperPlane } from '@fortawesome/free-solid-svg-icons';
import { planningMessage } from '../../constants/planningConstant';
import FontIcon from '../common/fontAwesomeIcon';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { TextareaAutosize } from '@material-ui/core';

class PlanChat extends Component {
    constructor(props) {
        super(props);
        this.state = {
            senderId: '',
            receiverId: '',
            query: '',
            calcQueryId: '',
            referenceId: '',
            receiver: '',
            disabled: true,
            currentPlanTab: ''
        };
    }

    handleSend = () => {
        const { query, senderId, receiverId, currentPlanTab, referenceId, calcQueryId, } = this.state;
        if (query.length > 0) {
            let options = {
                senderId,
                query,
                calcQueryId,
                receiverId,
                referenceId,
                plans: currentPlanTab
            };
            this.props.commentQueries(options);
            let options2 = { senderId, receiverId, plans: currentPlanTab };
            this.setState({ query: '' });
            setTimeout(() => {
                this.props.fetchQueries(options2);
            }, 1000);
        }

    };

    componentDidMount() {
        if (window.localStorage && JSON.parse(window.localStorage.getItem('bloomkiteUsername'))) {
            const { partyId } = window.localStorage && JSON.parse(window.localStorage.getItem('bloomkiteUsername'));
            let referenceId = window.localStorage.getItem('referenceId');
            let options = { partyId: partyId, referenceId: referenceId };
            this.props.fetchSharedByPartyIdAndRefId(options);
            let options2 = { senderId: this.props.mySharedPlans[0].partyId, receiverId: this.props.mySharedPlans[0].postedToPartyId, plans: this.props.currentPlanTab };
            this.props.fetchQueries(options2);
            this.setState({ senderId: partyId, referenceId: referenceId, currentPlanTab: this.props.currentPlanTab,calcQueryId: this.props.mySharedPlans[0].calcQueryId,receiverId: this.props.mySharedPlans[0].postedToPartyId });
            
        }
    }

    handlePlan = (e) => {
        const { name, value } = e.target;
        this.setState({ [name]: value });

        const { mySharedPlans } = this.props;
        let calcQuery = mySharedPlans.filter((item) => item.calcQueryId == value)[0];
        if (calcQuery) {
            this.setState((state) => ({ receiverId: calcQuery.postedToPartyId, calcQueryId: calcQuery.calcQueryId }));
            let options = { senderId: this.state.senderId, receiverId: calcQuery.postedToPartyId, plans: this.state.currentPlanTab };
            this.props.fetchQueries(options);
        }
    };

    handleChange = (e) => {
        const { name, value } = e.target;
        this.setState({ [name]: value, disabled: value.trim() == '' });
    };

    render() {
        const { queries, mySharedPlans } = this.props;
        return (
            <div className="page-height col-lg-12 row nopadding nomargin">
                <div className="chat-dropdown">
                    <select className="chat-dropdown" name="receiver" id="receiver" type="select" onChange={this.handlePlan}>
                        {mySharedPlans.map((plan, i) => {
                            let selectedPlan = plan.plans && plan.plans.length > 0 && plan.plans.includes(this.state.currentPlanTab);
                            if (selectedPlan) {
                                return (
                                    <option key={i} value={plan.calcQueryId} selected={i == 0}>
                                        {plan.receiverName}
                                    </option>
                                );
                            }
                        })}
                    </select>
                </div>
                <div className="col-lg-12">
                    <div className="messageInputContainer">
                        <div className="users-holder">
                            <div className="chat">
                                <div className="chat-box-header">Message</div>
                                <div className="messageContainer">
                                    <div className="scrollMsgContainer">
                                        {queries &&
                                            queries.map((item, i) => {
                                                return (
                                                    <div className="chat-cc-top" key={'item' + i}>
                                                        <div className={`single-chat ${item.receiverId == this.state.senderId ? 'right-chat' : 'left-chat'}`}>{item.query}</div>
                                                    </div>
                                                );
                                            })}
                                    </div>
                                </div>
                                <div className="message-box">
                                    <TextareaAutosize
                                        className="message-box-autoSize"
                                        maxRows={4}
                                        placeholder="Type message..."
                                        name="query"
                                        id="query"
                                        onChange={this.handleChange}
                                        value={this.state.query}
                                    />
                                    <button type="submit" className="message-submit"
                                        disabled={this.state.disabled}
                                        // <button className={classNames(message-submit, { disabled: this.state.disabled })}
                                        onClick={() => this.handleSend()}>
                                        <FontAwesomeIcon icon={faPaperPlane} />
                                        {planningMessage.post}
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        mySharedPlans: state.planningReducer.mySharedPlans,
        queries: state.planningReducer.queries
    };
};

function mapDispatchToProps(dispatch) {
    return {
        commentQueries: bindActionCreators(commentQueries, dispatch),
        fetchQueries: bindActionCreators(fetchQueries, dispatch),
        fetchSharedByPartyIdAndRefId: bindActionCreators(fetchSharedByPartyIdAndRefId, dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(PlanChat);
