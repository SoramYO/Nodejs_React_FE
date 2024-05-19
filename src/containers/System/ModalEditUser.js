import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import _ from 'lodash';
class ModalEditUser extends Component {

    constructor(props) {
        super(props);
        this.state = {
            id: '',
            email: '',
            password: '',
            firstName: '',
            lastName: '',
            address: '',
            phoneNumber: '',
            role: 'USER'

        };

    }

    componentDidMount() {
        let user = this.props.currentUser;
        //let {currentUser} = this.props;
        if (user && !_.isEmpty(user)) {
            this.setState({
                id: user.id,
                email: user.email,
                password: "user.password,", //this is a fake password
                firstName: user.firstName,
                lastName: user.lastName,
                address: user.address,
                phoneNumber: user.phoneNumber,
                role: user.role

            }
            )
        }
    }
    toggle = () => {
        this.props.toggleFromParent();
    }
    handleOnChangeInput = (event, id) => {
        let copyState = { ...this.state };
        copyState[id] = event.target.value;
        this.setState({
            ...copyState
        });
    }
    checkValidateInput = () => {
        let isValid = true;
        let arrInput = ['email', 'password', 'firstName', 'lastName'];
        for (let i = 0; i < arrInput.length; i++) {
            if (!this.state[arrInput[i]]) {
                isValid = false;
                alert('Missing parameter: ' + arrInput[i]);
                break;
            }
        }
        return isValid;
    }
    handleSaveUser = () => {
        let isValid = this.checkValidateInput();
        if (isValid) {
            //call api
            this.props.editUser(this.state);
            this.toggle();
        }
    }

    render() {
        return (
            <Modal
                isOpen={this.props.isOpen}
                toggle={() => {
                    this.toggle()
                }}
                className='modal-user-container'
                size='lg'
                centered
            >
                <ModalHeader toggle={() => { this.toggle() }}>Edit a user</ModalHeader>
                <ModalBody>
                    <div className='container'>
                        <div className='row'>
                            <div className='col-6'>
                                <div className='form-group'>
                                    <label>Email</label>
                                    <input type='text'
                                        onChange={(event) => this.handleOnChangeInput(event, "email")}
                                        className='form-control'
                                        value={this.state.email}
                                        disabled={true}
                                    />
                                </div>
                            </div>
                            <div className='col-6'>
                                <div className='form-group'>
                                    <label>Password</label>
                                    <input
                                        type='password'
                                        onChange={(event) => this.handleOnChangeInput(event, "password")}
                                        className='form-control'
                                        value={this.state.password}
                                        disabled={true}
                                    />
                                </div>
                            </div>

                        </div>
                        <div className='row'>
                            <div className='col-6'>
                                <div className='form-group'>
                                    <label>First name</label>
                                    <input
                                        type='text'
                                        className='form-control'
                                        onChange={(event) => this.handleOnChangeInput(event, "firstName")}
                                        value={this.state.firstName}
                                    />
                                </div>
                            </div>
                            <div className='col-6'>
                                <div className='form-group'>
                                    <label>Last name</label>
                                    <input type='text'
                                        className='form-control'
                                        onChange={(event) => this.handleOnChangeInput(event, "lastName")}
                                        value={this.state.lastName}
                                    />
                                </div>
                            </div>

                        </div>
                        <div className='row'>

                            <div className='col-12'>
                                <div className='form-group'>
                                    <label>Address</label>
                                    <input type='text'
                                        className='form-control'
                                        onChange={(event) => this.handleOnChangeInput(event, "address")}
                                        value={this.state.address}
                                    />
                                </div>
                            </div>

                        </div>
                        <div className='row'>
                            <div className='col-6'>
                                <div className='form-group'>
                                    <label>Phone number</label>
                                    <input type='text'
                                        className='form-control'
                                        onChange={(event) => this.handleOnChangeInput(event, "phoneNumber")}
                                        value={this.state.phoneNumber}
                                    />
                                </div>
                            </div>
                            <div className='col-6'>
                                <div className='form-group'>
                                    <label>Role</label>
                                    <select className='form-control'
                                        onChange={(event) => this.handleOnChangeInput(event, "role")}
                                        value={this.state.role}
                                    >
                                        <option value='USER'>User</option>
                                        <option value='ADMIN'>Admin</option>
                                    </select>
                                </div>
                            </div>
                        </div>
                    </div>
                </ModalBody>
                <ModalFooter>
                    <Button
                        className='btn-submit px-3'
                        color="primary"
                        onClick={() => { this.handleSaveUser() }}
                    >Save change</Button>{' '}
                    <Button className='btn-submit-close px-3' color="secondary" onClick={() => { this.toggle() }}>Close</Button>
                </ModalFooter>
            </Modal >
        )
    }

}

const mapStateToProps = state => {
    return {
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ModalEditUser);
