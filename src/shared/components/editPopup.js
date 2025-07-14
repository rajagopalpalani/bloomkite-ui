import React from 'react';
import { planningMessage } from '../constants/planningConstant';
import { maxLength, contentMethod, pincodeMethod } from '../constants/commonRules';
import classNames from 'classnames';
import { connect } from 'react-redux';
import { planningSelector } from '../selectors/planning';
import { fetchSharedByRefId, clearFetchSharedByRefId } from '../actions/planning';

class EditLandingPopup extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            "age": 0,
            "child1": false,
            "child2": false,
            "child3": false,
            "grandParent": false,
            "planUsername": "",
            "parentPartyId": 0,
            "father": false,
            "mother": false,
            "sibilings": false,
            "spouse": false,
            "others": false,
            "financial": false,
            "loan": false,
            "investment": false,
            "goal": false,
            "riskprofile": false,
            "s_financial": false,
            "s_loan": false,
            "s_investment": false,
            "s_goal": false,
            "s_riskprofile": false,
            "inLaws": false,
            "disabled": false,
        }
    }

    handleChange = (e) => {
        const { name, value } = e.target;
        this.setState({ [name]: value });
    }

    handleCheckBoxChange = (e) => {
        const { name, checked } = e.target;
        this.setState({ [name]: checked });
    }

    handleUpdatePlan = () => {
        let selectedPlan = [];
        if (this.state.financial) {
            selectedPlan.push("financial");
        }
        if (this.state.loan) {
            selectedPlan.push("loan");
        }
        if (this.state.investment) {
            selectedPlan.push("investment");
        }
        if (this.state.goal) {
            selectedPlan.push("goal");
        }
        if (this.state.riskprofile) {
            selectedPlan.push("riskprofile");
        }
        let options = {
            "age": this.state.age,
            "child1": this.state.child1 ? 'YES' : 'NO',
            "child2": this.state.child2 ? 'YES' : 'NO',
            "child3": this.state.child3 ? 'YES' : 'NO',
            "grandParent": this.state.grandParent ? 'YES' : 'NO',
            "name": this.state.planUsername,
            "father": this.state.father ? 'YES' : 'NO',
            "mother": this.state.mother ? 'YES' : 'NO',
            "selectedPlan": selectedPlan,
            "sibilings": this.state.sibilings ? 'YES' : 'NO',
            "spouse": this.state.spouse ? 'YES' : 'NO',
            "inLaws": this.state.inLaws ? 'YES' : 'NO',
            "others": this.state.others ? 'YES' : 'NO',
            "referenceId": this.props.selectedUser.referenceId,
            "parentPartyId": this.props.selectedUser.parentPartyId
        }
        if (this.props.partyId != this.props.parentPartyId) {
            options.partyId = this.props.partyId;
        }
        this.props.handleUpdatePlan(options);
        this.handleClose();
    }

    componentDidUpdate(oldProps) {
        if (JSON.stringify(this.props.mySharedPlansByRef) != JSON.stringify(oldProps.mySharedPlansByRef)) {
            this.props.mySharedPlansByRef && this.props.mySharedPlansByRef.map((mySharedPlansByRef, i) => { this.updateSharePlan(mySharedPlansByRef) });
        }
        if (JSON.stringify(this.props.selectedUser) != JSON.stringify(oldProps.selectedUser)) {
            this.props.selectedUser && this.updatePlan(this.props.selectedUser);
        }
    }

    componentDidMount() {
        this.props.selectedUser && this.updatePlan(this.props.selectedUser);
    }

    updateSharePlan = (sharedPlan) => {
        let sharedSelectedPlans = sharedPlan && sharedPlan.plans && sharedPlan.plans.length > 0 && sharedPlan.plans.split(',');
        let s_financial = sharedSelectedPlans && sharedSelectedPlans.length > 0 && sharedSelectedPlans.includes('financial');
        let s_investment = sharedSelectedPlans && sharedSelectedPlans.length > 0 && sharedSelectedPlans.includes('investment');
        let s_goal = sharedSelectedPlans && sharedSelectedPlans.length > 0 && sharedSelectedPlans.includes('goal');
        let s_loan = sharedSelectedPlans && sharedSelectedPlans.length > 0 && sharedSelectedPlans.includes('loan');
        let s_riskprofile = sharedSelectedPlans && sharedSelectedPlans.length > 0 && sharedSelectedPlans.includes('riskprofile');
        this.setState({
            "s_financial": s_financial,
            "s_loan": s_loan,
            "s_investment": s_investment,
            "s_goal": s_goal,
            "s_riskprofile": s_riskprofile
        });
    }

    updatePlan = (planUser) => {
        let selectedPlans = planUser && planUser.selectedPlan && planUser.selectedPlan.length > 0 && planUser.selectedPlan.split(',');
        let financial = selectedPlans && selectedPlans.length > 0 && selectedPlans.includes('financial');
        let investment = selectedPlans && selectedPlans.length > 0 && selectedPlans.includes('investment');
        let goal = selectedPlans && selectedPlans.length > 0 && selectedPlans.includes('goal');
        let loan = selectedPlans && selectedPlans.length > 0 && selectedPlans.includes('loan');
        let riskprofile = selectedPlans && selectedPlans.length > 0 && selectedPlans.includes('riskprofile');
        this.setState({
            "age": planUser.age,
            "child1": planUser.child1 == 'YES' ? true : false,
            "child2": planUser.child2 == 'YES' ? true : false,
            "child3": planUser.child3 == 'YES' ? true : false,
            "grandParent": planUser.grandParent == 'YES' ? true : false,
            "planUsername": planUser.name,
            "father": planUser.father == 'YES' ? true : false,
            "mother": planUser.mother == 'YES' ? true : false,
            "sibilings": planUser.sibilings == 'YES' ? true : false,
            "spouse": planUser.spouse == 'YES' ? true : false,
            "others": planUser.others == 'YES' ? true : false,
            "financial": financial,
            "loan": loan,
            "investment": investment,
            "goal": goal,
            "riskprofile": riskprofile,
            "inLaws": planUser.inLaws == 'YES' ? true : false
        });
    }

    handleClose = () => {
        this.props.clearFetchSharedByRefId();
        this.setState({
            "s_financial": false,
            "s_loan": false,
            "s_investment": false,
            "s_goal": false,
            "s_riskprofile": false
        })
    }

    render() {
        const { planUsername, age, child1, child2, child3, financial, loan, investment, goal, riskprofile, spouse, father, mother, grandParent, sibilings, inLaws, others, s_financial, s_loan, s_investment, s_goal, s_riskprofile } = this.state;
        const isPlanSelected = this.state.financial || this.state.goal || this.state.riskprofile || this.state.loan || this.state.investment;
        return (
            <div className="modal fade" id="planEditModal" role="dialog" data-backdrop="static" data-keyboard="false">
                <div className="modal-dialog">
                    <div className="modal-content landing-design">
                        <div className="modal-header no-border">
                            <h6 className="modal-title land-Title">{planningMessage.plan}</h6>
                            <button type="button" className="close" data-dismiss="modal" onClick={() => this.handleClose()}>&times;</button>
                        </div>
                        <div className="modal-body">
                            <div className="form-group row">
                                <div className="col-5 box-align">
                                    <label>{planningMessage.name}</label>
                                    <input className="name-textbox" name="planUsername" id="editPlanUsername" type="text" maxLength={maxLength.content} onKeyPress={(e) => contentMethod(e)} value={planUsername} onChange={this.handleChange} />
                                </div>
                                <div className="col-3 box-align">
                                    <label>{planningMessage.age}</label>
                                    <input className="age-Text" name="age" id="editAge" type="text" maxLength={maxLength.age} onKeyPress={(e) => pincodeMethod(e)} value={age} onChange={this.handleChange} />
                                </div>
                            </div>
                            <div className="select-plan-align">
                                <h6 className="land-plans">{planningMessage.selectPlan}</h6>
                                <form className="checkbox-align">
                                    <div className="row">
                                        <div className="col-lg-3">
                                            <input type="checkbox" id="editriskprofile" name="riskprofile" checked={riskprofile} value={riskprofile} onChange={this.handleCheckBoxChange} disabled={this.state.s_riskprofile} />
                                            <label htmlFor="editriskprofile">{planningMessage.riskProfile}</label>
                                        </div>
                                        <div className="col-lg-3"><input type="checkbox" id="editgoal" name="goal" checked={goal} value={goal} onChange={this.handleCheckBoxChange} disabled={this.state.s_goal} />
                                            <label htmlFor="editgoal">{planningMessage.goals}</label></div>
                                        <div className="col-lg-3"><input type="checkbox" id="editfinancial" name="financial" checked={financial} value={financial} onChange={this.handleCheckBoxChange} disabled={this.state.s_financial} />
                                            <label htmlFor="editfinancial">{planningMessage.financial}</label></div>
                                    </div>
                                    <div className="row">
                                        <div className="col-lg-3"><input type="checkbox" id="editinvestment" name="investment" checked={investment} value={investment} onChange={this.handleCheckBoxChange} disabled={this.state.s_investment} />
                                            <label htmlFor="editinvestment">{planningMessage.investments}</label></div>
                                        <div className="col-lg-3"><input type="checkbox" id="editloan" name="loan" checked={loan} value={loan} onChange={this.handleCheckBoxChange} disabled={this.state.s_loan} />
                                            <label htmlFor="editloan">{planningMessage.homeLoan}</label></div>
                                    </div>
                                </form>
                            </div>
                            <div className="select-plan-align">
                                <h6 className="land-plans">{planningMessage.familyTitle}</h6>
                                <div className="toggle-align">
                                    <div>
                                        <div>{planningMessage.spouse}</div>
                                        <label className="switch1">
                                            <input type="checkbox" name="spouse" checked={spouse} value={spouse} onChange={this.handleCheckBoxChange} />
                                            <span className="slider1"></span>
                                        </label>
                                    </div>
                                    <div>
                                        <div> {planningMessage.childA}</div>
                                        <label className="switch1">
                                            <input type="checkbox" name="child1" checked={child1} value={child1} onChange={this.handleCheckBoxChange} />
                                            <span className="slider1"></span>
                                        </label>
                                    </div>
                                    <div>
                                        <div> {planningMessage.childB}</div>
                                        <label className="switch1">
                                            <input type="checkbox" name="child2" checked={child2} value={child2} onChange={this.handleCheckBoxChange} />
                                            <span className="slider1"></span>
                                        </label>
                                    </div>
                                    <div>
                                        <div> {planningMessage.childC}</div>
                                        <label className="switch1">
                                            <input type="checkbox" name="child3" checked={child3} value={child3} onChange={this.handleCheckBoxChange} />
                                            <span className="slider1"></span>
                                        </label>
                                    </div>
                                    <div>
                                        <div> {planningMessage.father}</div>
                                        <label className="switch1">
                                            <input type="checkbox" name="father" checked={father} value={father} onChange={this.handleCheckBoxChange} />
                                            <span className="slider1"></span>
                                        </label>
                                    </div>
                                    <div>
                                        <div> {planningMessage.mother}</div>
                                        <label className="switch1">
                                            <input type="checkbox" name="mother" checked={mother} value={mother} onChange={this.handleCheckBoxChange} />
                                            <span className="slider1"></span>
                                        </label>
                                    </div>
                                    <div>
                                        <div> {planningMessage.grandParent}</div>
                                        <label className="switch1">
                                            <input type="checkbox" name="grandParent" checked={grandParent} value={grandParent} onChange={this.handleCheckBoxChange} />
                                            <span className="slider1"></span>
                                        </label>
                                    </div>
                                    <div>
                                        <div> {planningMessage.sibilings}</div>
                                        <label className="switch1">
                                            <input type="checkbox" name="sibilings" checked={sibilings} value={sibilings} onChange={this.handleCheckBoxChange} />
                                            <span className="slider1"></span>
                                        </label>
                                    </div>
                                    <div>
                                        <div> {planningMessage.inlaws}</div>
                                        <label className="switch1">
                                            <input type="checkbox" name="inLaws" checked={inLaws} value={inLaws} onChange={this.handleCheckBoxChange} />
                                            <span className="slider1"></span>
                                        </label>
                                    </div>
                                    <div>
                                        <div>{planningMessage.others}</div>
                                        <label className="switch1">
                                            <input type="checkbox" name="others" checked={others} value={others} onChange={this.handleCheckBoxChange} />
                                            <span className="slider1"></span>
                                        </label>
                                    </div>
                                </div>
                            </div>
                            <div className="col-12">
                                <button type="button" className={classNames('btn btn-primary-create btn-lg', { disabled: (planUsername == '' || age == 0 || !isPlanSelected) })} data-dismiss={(planUsername != '' && age != 0 && isPlanSelected) && 'modal'} onClick={(planUsername == '' || age == 0 || !isPlanSelected) ? () => { } : () => this.handleUpdatePlan()}>{planningMessage.save}</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => planningSelector(state);

export default connect(mapStateToProps, {
    fetchSharedByRefId, clearFetchSharedByRefId
})(EditLandingPopup);