import React from 'react';
import { Link } from 'react-router-dom';

class ErrorBoundary extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            hasError: false,
            error: null,
            errorInfo: null
        };
    }

    static getDerivedStateFromError(error) {
        return { hasError: true };
    }

    componentDidCatch(error, errorInfo) {
        this.setState({ error, errorInfo });
    }

    render() {
        if (this.state.hasError) {
            return (
                <div>
                    {this.props.advisorDetails || this.props.investorDetails ? (
                        <div className="main-container pt-1 advisor-landing">
                            <h1 className="error-head">Oops!</h1>
                            <h4 className="error-subhead">Something went wrong...</h4>
                            <Link className="save-btn2 btn white-color" to="/advisor">
                                Return to Home
                            </Link>
                        </div>
                    ) : (
                        <div className="main-container pt-1 advisor-landing">
                            <h1 className="error-head">Oops!</h1>
                            <h4 className="error-subhead">Something went wrong...</h4>
                            <Link className="save-btn2 btn white-color" to="/">
                                Return to Home
                            </Link>
                        </div>
                    )}
                </div>
            );
        } else {
            return this.props.children;
        }
    }
}

export default ErrorBoundary;
