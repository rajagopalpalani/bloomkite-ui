import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { commentQueries, fetchQueries } from '../../actions/planning';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPaperPlane } from '@fortawesome/free-solid-svg-icons';
import { planningMessage } from '../../constants/planningConstant';
import FontIcon from '../common/fontAwesomeIcon';
import { faTimes } from '@fortawesome/free-solid-svg-icons';

class SharedPlanChat extends Component {

    constructor(props) {
        super(props);
        this.state = {
            senderId: '',
            query: '',
            referenceId: '',
            receiver: '',
            disabled: true,
            currentPlanTab: '',
        };
    }
    
    componentDidMount() {
        if (window.localStorage && JSON.parse(window.localStorage.getItem('bloomkiteUsername'))) {
            const { partyId } = window.localStorage && JSON.parse(window.localStorage.getItem('bloomkiteUsername'));
            let referenceId = window.localStorage.getItem('referenceId');
            this.setState({ senderId: partyId, referenceId: referenceId, currentPlanTab: this.props.currentPlanTab });
            let options = { "senderId": this.props.sharedTab.partyId, "receiverId": this.props.sharedTab.postedToPartyId, "plans": this.props.currentPlanTab }
            this.props.fetchQueries(options);
        }
    }
    handleSend = (sharedTab) => {
        const { query} = this.state;
        if (query.length > 0) {
            let options = { "senderId": sharedTab.postedToPartyId, "receiverId": sharedTab.partyId, "plans": this.state.currentPlanTab, "referenceId": this.state.referenceId, "query": this.state.query, "calcQueryId": sharedTab.calcQueryId }
            this.props.commentQueries(options);

            let options2 = { "senderId": sharedTab.postedToPartyId, "receiverId": sharedTab.partyId, "plans": this.state.currentPlanTab }
            this.setState({ query: '', senderId: sharedTab.postedToPartyId });
            setTimeout(() => {
                this.props.fetchQueries(options2);
            }, 1000);
        }
    };
    handleChange = (e) => {
        const { name, value } = e.target;
        this.setState({ [name]: value, disabled: value.trim() == '' });
    };
    render() {
        const { queries, sharedTab } = this.props;
        return (
            <div className="page-height col-lg-12 row nopadding nomargin">
                <div className="chat-dropdown">
                    <select className="chat-dropdown" name="receiver" id="receiver" type="select" >
                        <option>{sharedTab.name}</option>
                    </select>
                </div>
                <div className="col-lg-12">
                    <div className="messageInputContainer">
                        <div className="users-holder">
                            <div className="chat">
                                <div className="chat-box-header">
                                    Message
                                </div>
                                <div className="messageContainer">
                                    <div className="scrollMsgContainer">
                                        {queries && queries.map((item, i) => {
                                            return (
                                                <div className="chat-cc-top" key={'item' + i}>
                                                    <div className={`single-chat ${(item.receiverId == this.state.senderId) ? 'right-chat' : 'left-chat'}`}>
                                                        {item.query}
                                                    </div>
                                                </div>
                                            );
                                        })}
                                    </div>
                                </div>
                                <div className="message-box">
                                    <textarea type="text" className="message-input" placeholder="Type message..."
                                        name="query"
                                        id="query"
                                        onChange={this.handleChange}
                                        value={this.state.query}>
                                    </textarea>
                                    <button type="submit" className="message-submit"
                                        disabled={this.state.disabled}
                                        onClick={() => this.handleSend(sharedTab)}>
                                        <FontAwesomeIcon icon={faPaperPlane} />
                                        {planningMessage.post}
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div >
        );
    }


}

const mapStateToProps = (state) => {
    return {
        queries: state.planningReducer.queries,
    };
}

function mapDispatchToProps(dispatch) {
    return {
        commentQueries: bindActionCreators(commentQueries, dispatch),
        fetchQueries: bindActionCreators(fetchQueries, dispatch),
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(SharedPlanChat);