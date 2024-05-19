import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { emitter } from '../../utils/emitter';
class ModalUser extends Component {

    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '',
            firstName: '',
            lastName: '',
            address: '',
            phoneNumber: '',
            role: 'USER'

        };
        this.listenToEmmiter();
    }
    listenToEmmiter = () => {
        emitter.on('EVENT_CLEAR_MODAL_DATA', () => {
            this.setState({
                email: '',
                password: '',
                firstName: '',
                lastName: '',
                address: '',
                phoneNumber: '',
                role: 'USER'
            });
        });
    }
    componentDidMount() {
    }
    toggle = () => {
        this.props.toggleFromParent();
    }
    handleOnChangeInput = (event, id) => {
        /**
         * {
         * email: 'abc',
         * password: '
         * firstName: 'abc',
         * lastName: 'abc',
         * address: 'abc',
         * phoneNumber: 'abc',
         * role: 'USER'
         * }
         * 
         * this.state.email = this.state['email'] 
         */
        // this.state[id] = event.target.value;
        // this.setState({
        //     ...this.state

        // }, () => {
        //     console.log('Data:', this.state);
        // });
        //good code
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
    handleAddNewUser = () => {
        let isValid = this.checkValidateInput();
        if (isValid) {
            //call api
            this.props.createNewUser(this.state);
            this.toggle();
        }
    }

    render() {
        return (
            <Modal
                isOpen={this.props.isOpen}
                toggle={() => { this.toggle() }}
                className='modal-user-container'
                size='lg'
                centered
            >
                <ModalHeader toggle={() => { this.toggle() }}>Create a new user</ModalHeader>
                <ModalBody>
                    <div className='container'>
                        <div className='row'>
                            <div className='col-6'>
                                <div className='form-group'>
                                    <label>Email</label>
                                    <input type='text'
                                        onChange={(event) => this.handleOnChangeInput(event, "email")}
                                        className='form-control'
                                        value={this.state.email} />
                                </div>
                            </div>
                            <div className='col-6'>
                                <div className='form-group'>
                                    <label>Password</label>
                                    <input
                                        type='password'
                                        onChange={(event) => this.handleOnChangeInput(event, "password")}
                                        className='form-control'
                                        value={this.state.password} />
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
                        onClick={() => { this.handleAddNewUser() }}
                    >Add new</Button>{' '}
                    <Button className='btn-submit-close px-3' color="secondary" onClick={() => { this.toggle() }}>Close</Button>
                </ModalFooter>
            </Modal>
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

export default connect(mapStateToProps, mapDispatchToProps)(ModalUser);
