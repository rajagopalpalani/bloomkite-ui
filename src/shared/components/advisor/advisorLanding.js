import React from 'react';


class AdvisorLanding extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            sideOpen: false
        }
    }

    sideOpen = () => {
        this.setState({ sideOpen: !this.state.sideOpen });
    }

    render() {
        return (
         
            <div className="col-12">
                    <h2>sample Advisor landing page</h2>
            </div>
        )
    }
}

export default AdvisorLanding;