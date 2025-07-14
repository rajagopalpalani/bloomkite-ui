import React from 'react';
import { maxLength, contentMethod, pincodeMethod } from '../constants/commonRules';
import { planningMessage } from '../constants/planningConstant';
import classNames from 'classnames';

class LandingPopup extends React.Component {
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
            "inLaws": false
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

    handleAddPlan = () => {
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
            "parentPartyId": this.props.parentPartyId,
            "father": this.state.father ? 'YES' : 'NO',
            "mother": this.state.mother ? 'YES' : 'NO',
            "selectedPlan": selectedPlan,
            "sibilings": this.state.sibilings ? 'YES' : 'NO',
            "spouse": this.state.spouse ? 'YES' : 'NO',
            "inLaws": this.state.inLaws ? 'YES' : 'NO',
            "others": this.state.others ? 'YES' : 'NO',
        }
        if (this.props.partyId != this.props.parentPartyId) {
            options.partyId = this.props.partyId;
        }
        this.props.handleAddPlan(options);
        this.clearState();
    }
    clearState = () => {
        this.setState({
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
            "inLaws": false,
            "goal": false,
            "riskprofile": false
        });
    }

    render() {
        const { planUsername, age, child1, child2, child3, financial, loan, investment, goal, riskprofile, spouse, father, mother, grandParent, sibilings, inLaws, others } = this.state;
        const isPlanSelected = this.state.financial || this.state.goal || this.state.riskprofile || this.state.loan || this.state.investment;
        return (
            <div className="modal fade" id="planModal" role="dialog">
                <div className="modal-dialog">
                    <div className="modal-content landing-design">
                        <div className="modal-header no-border">
                            <h6 className="modal-title land-Title">{'NEW PLAN'}</h6>
                            <button type="button" className="close" onClick={() => this.clearState()} data-dismiss="modal">&times;</button>
                        </div>
                        <div className="modal-body">
                            <div className="form-group row">
                                <div className="col-5 box-align">
                                    <label>{planningMessage.name}</label>
                                    <input className="name-textbox" name="planUsername" id="planUsername" type="text" maxLength={maxLength.content} onKeyPress={(e) => contentMethod(e)} value={planUsername} onChange={this.handleChange} />
                                </div>
                                <div className="col-3 box-align">
                                    <label>{planningMessage.age}</label>
                                    <input className="age-Text" name="age" id="age" type="text" maxLength={maxLength.age} onKeyPress={(e) => pincodeMethod(e)} value={age} onChange={this.handleChange} />
                                </div>
                            </div>
                            <div className="select-plan-align">
                                <h6 className="land-plans">{planningMessage.selectPlan}</h6>
                                <form className="checkbox-align">
                                    <div className="row">
                                        <div className="col-lg-3"><input type="checkbox" id="riskprofile" name="riskprofile" checked={riskprofile} value={riskprofile} onChange={this.handleCheckBoxChange} />
                                            <label htmlFor="riskprofile">{planningMessage.riskProfile}</label></div>
                                        <div className="col-lg-3"><input type="checkbox" id="goal" name="goal" checked={goal} value={goal} onChange={this.handleCheckBoxChange} />
                                            <label htmlFor="goal">{planningMessage.goals}</label></div>
                                        <div className="col-lg-3"><input type="checkbox" id="financial" name="financial" checked={financial} value={financial} onChange={this.handleCheckBoxChange} />
                                            <label htmlFor="financial">{planningMessage.financial}</label></div>
                                    </div>
                                    <div className="row">
                                        <div className="col-lg-3"><input type="checkbox" id="investment" name="investment" checked={investment} value={investment} onChange={this.handleCheckBoxChange} />
                                            <label htmlFor="investment">{planningMessage.investments}</label></div>
                                        <div className="col-lg-3"><input type="checkbox" id="loan" name="loan" checked={loan} value={loan} onChange={this.handleCheckBoxChange} />
                                            <label htmlFor="loan">{planningMessage.homeLoan}</label></div>
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
                                        <div> {planningMessage.childB} </div>
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
                                        <div> {planningMessage.others}</div>
                                        <label className="switch1">
                                            <input type="checkbox" name="others" checked={others} value={others} onChange={this.handleCheckBoxChange} />
                                            <span className="slider1"></span>
                                        </label>
                                    </div>
                                </div>
                            </div>
                            <div className="col-12">
                                <button type="button" className={classNames('btn btn-primary-create btn-lg', {disabled : (planUsername == '' || age == 0 || !isPlanSelected)})} data-dismiss={(planUsername != '' && age != 0 && isPlanSelected) && 'modal'} onClick={(planUsername == '' || age == 0 || !isPlanSelected) ? () => { } : () => this.handleAddPlan()}>{'Create'} </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default LandingPopup;