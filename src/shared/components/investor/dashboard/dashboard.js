import React from 'react';
import ProfileHeader from '../../profileHeader';
import InvestorLeftbar from '../investorLeftbar';

class DashBoard extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div>
                <div className="col-12">
                <ProfileHeader 
                 advisorDetails={this.props.advisorDetails}/>
                </div>
                <div className="row col-12 advisor-gap">
                    <InvestorLeftbar handleTabChange={this.props.handleTabChange} currentTab={this.props.currentTab} />
                    <div className="col-10">
                        <div className="col-12">
                            <h1 className="header-margin"></h1>
                            <div>Sample DashBoard</div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default DashBoard;