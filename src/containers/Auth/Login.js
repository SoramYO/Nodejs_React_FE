import React, { Component } from 'react';
import { connect } from 'react-redux';
import { push } from "connected-react-router";

import * as actions from "../../store/actions";
import './Login.scss'; // Import your SCSS file
import { FormattedMessage } from 'react-intl';
import { handleLoginApi } from '../../services/userService';

class Login extends Component {
    // eslint-disable-next-line no-useless-constructor
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: '',
            isShowPassword: false,
            errMessage: ''
        }
    }
    handleOnChangeUsername = (event) => {
        this.setState({
            username: event.target.value
        });
    }
    handleOnChangePassword = (event) => {
        this.setState({
            password: event.target.value
        });
    }
    handleLogin = async () => {
        this.setState({
            errMessage: ''
        });
        try {
            let data = await handleLoginApi(this.state.username, this.state.password)
            if (data && data.errCode !== 0) {
                this.setState({
                    errMessage: data.message
                })
            } if (data && data.errCode === 0) {
                this.props.userLoginSuccess(data.user)
                console.log('login success');
            }
        } catch (error) {
            console.log(error);
            if (error.response) {
                if (error.response.data) {
                    this.setState({
                        errMessage: error.response.data.message
                    });
                }
            }
        }
    }
    handleShowHidePassword = () => {
        this.setState({
            isShowPassword: !this.state.isShowPassword
        });
    }


    render() {
        return (
            <div className="login-background">
                <div className="login-container">
                    <div className="login-content row">
                        <div className="col-12 text-login">Login</div>
                        <div className="col-12 form-group login-input">
                            <label>Username:</label>
                            <input className="form-control"
                                type="text"
                                placeholder='Enter username'
                                value={this.state.username}
                                onChange={(event) => this.handleOnChangeUsername(event)}
                            />
                        </div>
                        <div className="col-12 form-group login-input">
                            <label>Password:</label>
                            <div className='show-hide-password'>
                                <input
                                    className="form-control"
                                    type={this.state.isShowPassword ? 'text' : 'password'}
                                    placeholder='Enter your pasword'
                                    value={this.state.password}
                                    onChange={(event) => this.handleOnChangePassword(event)}
                                />
                                <span onClick={() => { this.handleShowHidePassword() }} >

                                    <i class={this.state.isShowPassword ? 'fas fa-eye-slash' : 'fas fa-eye'}></i>

                                </span>


                            </div>

                        </div>
                        <div className="col-12" style={{ color: 'red' }}>
                            {this.state.errMessage}
                        </div>
                        <div className="col-12">
                            <button
                                className="btn-login"
                                onClick={() => { this.handleLogin() }}>
                                <FormattedMessage id="login.login" />
                            </button>
                        </div>
                        <div className="col-12">
                            <span className="forgot-password">Forgot password?</span>
                        </div>
                        <div className="col-12 text-center mt-3">
                            <span className="text-other-login">Or Login With</span>
                        </div>
                        <div className="col-12 social-login">
                            <i className="fab fa-facebook-f google"></i>
                            <i className="fab fa-google facebook"></i>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        languge: state.app.language
    };
};

const mapDispatchToProps = dispatch => {
    return {
        navigate: (path) => dispatch(push(path)),
        userLoginFail: () => dispatch(actions.userLoginFail()),
        userLoginSuccess: (userInfo) => dispatch(actions.userLoginSuccess(userInfo))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
