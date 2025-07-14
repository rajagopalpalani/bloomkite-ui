import React, { Component } from 'react';
import Header from '../../components/userHeader';
import Loader from '../../components/common/loader';
import loginSelector from '../../selectors/login';
import { connect } from 'react-redux';

class Academy extends Component {
    constructor(props) {
        super(props);
        this.state = {
            currentRole: '',
            name: ''
        };
        this.handleChange = this.handleChange.bind(this);
    }

    logout = () => {
        localStorage.clear();
        this.props.history.push('/');
    };

    componentDidMount() {
        let self = this;
        const { roleBasedId, partyId, roleId } = window.localStorage && JSON.parse(window.localStorage.getItem('bloomkiteUsername'));
        let currentRole = window.localStorage && window.localStorage.getItem('ROLE');
        let username = window.localStorage && JSON.parse(window.localStorage.getItem('username'));
        let token = window.localStorage && JSON.parse(window.localStorage.getItem('bloomkiteBusinessUser'));
        window.localStorage.removeItem('username');
        this.setState({ currentRole: roleId });
    }

    render() {
        return (
            <div>
                {/* <Header active={4} logout={this.logout} role={this.state.currentRole} name={this.state.username && this.state.username} /> */}
                <div className="col-lg-12">
                    <h1 className="header-margin"></h1>
                    <div>Sample Academy</div>
                </div>
                <Loader loading={this.state.loading} />
            </div>
        );
    }
}

const mapStateToProps = (state) => loginSelector(state);

export default connect(mapStateToProps, {})(Academy);
