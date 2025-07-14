import React, { Component } from 'react';
import { connect } from 'react-redux';
import Loader from '../../components/common/loader';
import { planningSelector } from '../../selectors/planning';
import GoalWithOutLogin from '../../components/planning/financial/goalWithOutLogin';
import Investment from '../../components/planning/investment';
import RiskProfileWithOutLogin from '../../components/planning/financial/riskprofilewithOutLogin';
import Loan from '../../components/planning/loan';
import Finance from '../../components/planning/financial';
import { fetchFinancialPlanning, fetchRiskQuestionaireList } from '../../actions/planning';

class Calculator extends Component {
    constructor(props) {
        super(props);

        let selectedPlan = 'loan,investment,goal,riskprofile,financial';
        let plan = {};
        let currentTab = 1;
        this.state = {
            currentRole: '',
            name: '',
            currentTab,
            selectedPlan,
            plan,
            advisorDetails: {}
        };
    }
    componentDidMount() {
        this.props.fetchFinancialPlanning();
        this.props.fetchRiskQuestionaireList();
    }

    logout = () => {
        localStorage.clear();
        window.location.href = window.location.origin;
    };

    handleTabChange = (index) => {
        this.setState({ currentTab: index });
    };

    render() {
        return (
            <div className="container main-container pt-1">
                {this.state.currentTab == 1 && (
                    <GoalWithOutLogin handleTabChange={this.handleTabChange} currentTab={this.state.currentTab} selectedPlan={this.state.selectedPlan} />
                )}
                {this.state.currentTab == 2 && <Finance handleTabChange={this.handleTabChange} currentTab={this.state.currentTab} selectedPlan={this.state.selectedPlan} />}
                {this.state.currentTab == 4 && <Investment handleTabChange={this.handleTabChange} currentTab={this.state.currentTab} selectedPlan={this.state.selectedPlan} />}
                {this.state.currentTab == 3 && (
                    <RiskProfileWithOutLogin handleTabChange={this.handleTabChange} currentTab={this.state.currentTab} selectedPlan={this.state.selectedPlan} />
                )}
                {this.state.currentTab == 5 && <Loan handleTabChange={this.handleTabChange} currentTab={this.state.currentTab} selectedPlan={this.state.selectedPlan} />}
                <Loader loading={this.props.loading} />
            </div>
        );
    }
}

const mapStateToProps = (state) => planningSelector(state);

export default connect(mapStateToProps, {
    fetchFinancialPlanning,
    fetchRiskQuestionaireList
})(Calculator);
