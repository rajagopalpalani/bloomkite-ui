import React, { Component } from 'react';
import Helmet from 'react-helmet';
import UniversalComponent from './components/universalComponent';
import './styles/components/multiselect.css';
import './styles/styles.css';
import './styles/profileHeader.css';
import './styles/planningHeader.css';
import './styles/advisor.css';
import './styles/chat.css';
import './styles/investor.css';
import './styles/planning.css';
import './styles/nonIndividual.css';
import './styles/blog.css';
import './styles/reactMonthPickerInput.css';
import './styles/components/switch.css';
import './styles/components/tab.css';
import './styles/reactgoogle.css';
import './styles/publicProfile.css';
import './styles/home.css';
import './styles/explore.css';
import './styles/components/pagination.css';
import './styles/product.css';
import './styles/sass/grid.scss';
import './styles/sass/pages/home.scss';
import './styles/sass/common.scss';
import './styles/sass/navbar.scss';
import './styles/sass/button.scss';
import './styles/homeNew.css';
import './styles/planningWithOutLoginNew.css';
import './styles/newStyles';
import './styles/dashBoard.css';

/**
 * The `App` component is the entry point for the react app.
 * It is rendered on the client as well as on the server.
 *
 * You can start developing your react app here.
 */
export default class App extends Component {
    render() {
        return (
            <div>
                <Helmet>
                    <title>Bloomkite | {this.props.title}</title>
                </Helmet>
                <UniversalComponent name="getting-started" />
            </div>
        );
    }
}
