import React, { Component } from 'react';
import cx from 'classnames';
import FontIcon from '../common/fontAwesomeIcon';
import { faEye } from '@fortawesome/free-solid-svg-icons';

class PasswordInput extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showPassword: false,
        };
    }

    showPasswordHandler = () => {
        const { showPassword } = this.state;
        this.setState({
            showPassword: !showPassword,
        });
    }

    render() {
        const {
            name, value,
            onChange, maxLength,
            className, parentClassName
        } = this.props;
        const { showPassword } = this.state;
        const type = showPassword ? 'text' : 'password';
        const styles = cx('show-password', { active: showPassword });
        const parentStyles = cx('position-relative', parentClassName);
        return (
            <div className={parentStyles}>
                <input
                    className={className}
                    name={name}
                    id={name}
                    type={type}
                    maxLength={maxLength}
                    onChange={onChange}
                    value={value}
                />
                <span className={styles} href="#" onClick={this.showPasswordHandler}>
                    {/* <i className="fa fa-eye" /> */}
                    <FontIcon icon={faEye} />
                </span>
            </div>
        );
    }
}

export default PasswordInput;
