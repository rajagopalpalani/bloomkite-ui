import React from 'react';
import { connect } from 'react-redux';
import { homeMessage } from '../../constants/homeConstant';
import { planningSelector } from '../../selectors/planning';

class PlanningStatic extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div>
                <div className="container main-container pt-1">
                    <div className="plan-overview-size">
                        <h1 className="heading">{homeMessage.planningHeader1}</h1>
                        <p>{homeMessage.planningContent1}</p>
                        <p>
                            <span className="plan-title">{homeMessage.planningContent2}</span>
                            {homeMessage.planningContent21}
                        </p>
                        <p>
                            <span className="plan-title">{homeMessage.planningContent3}</span>
                            {homeMessage.planningContent31}
                        </p>
                        <p>
                            <span className="plan-title">{homeMessage.planningContent4}</span>
                            {homeMessage.planningContent41}
                        </p>
                        <p>
                            <span className="plan-title">{homeMessage.planningContent5}</span>
                            {homeMessage.planningContent51}
                        </p>
                        <p>
                            <span className="plan-title">{homeMessage.planningContent6}</span>
                            {homeMessage.planningContent61}
                        </p>
                        <p>{homeMessage.planningContent7}</p>
                    </div>
                    {/* <Footer /> */}
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => planningSelector(state);

export default connect(mapStateToProps, {})(PlanningStatic);
