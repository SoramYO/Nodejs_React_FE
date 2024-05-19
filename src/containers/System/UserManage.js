import React, { Component } from 'react';
import { connect } from 'react-redux';
import './UserManage.scss';
import { getAllUsers, addNewUserService, deleteUserService, editUserService } from '../../services/userService';
import ModalUser from './ModalUser';
import ModalEditUser from './ModalEditUser';
import { emitter } from '../../utils/emitter';
class UserManage extends Component {

    constructor(props) {
        super(props);
        this.state = {
            arrUsers: [],
            isOpenModelUser: false,
            isOpenModelEditUser: false,
            userEdit: {}
        };
    }

    async componentDidMount() {
        let response = await getAllUsers('ALL');
        if (response && response.errCode === 0) {
            this.setState({
                arrUsers: response.users
            });
        }
    }
    handleAddNewUser = () => {
        this.setState({
            isOpenModelUser: true
        });
    }
    handleDeleteUser = async (user) => {
        try {
            let response = await deleteUserService(user.id);
            if (response && response.errCode === 0) {
                this.getAllUsersFromReact();
            } else {
                alert(response.message);
            }
        } catch (error) {
            console.log('Error in UserManage:', error);
        }
    }
    handleEditUser = (user) => {
        this.setState({
            isOpenModelEditUser: true,
            userEdit: user
        });

    }
    getAllUsersFromReact = async () => {
        let response = await getAllUsers('ALL');
        if (response && response.errCode === 0) {
            this.setState({
                arrUsers: response.users
            });
        }
    }
    toggleUserModal = () => {
        this.setState({
            isOpenModelUser: !this.state.isOpenModelUser
        });
    }
    toggleEditUserModel = () => {
        this.setState({
            isOpenModelEditUser: !this.state.isOpenModelEditUser
        });
    }
    createNewUser = async (data) => {
        try {
            let response = await addNewUserService(data);
            if (response && response.errCode !== 0) {
                alert(response.message);
            } else {
                await this.getAllUsersFromReact();
                this.setState({
                    isOpenModelUser: false
                });
                emitter.emit('EVENT_CLEAR_MODAL_DATA');
            }
        } catch (error) {
            console.log('Error in UserManage:', error);
        }
    }
    doEditUser = async (user) => {
        let response = await editUserService(user);
        if (response && response.errCode !== 0) {
            alert(response.message);
        } else {
            await this.getAllUsersFromReact();
            this.setState({
                isOpenModelEditUser: false
            });
        }


    }


    /*
    Life cycle
    1. Run constructor -> init state
    2. Did mount (set state) : born; unmount
    3. Render
    */


    render() {
        let arrUsers = this.state.arrUsers;
        return (
            < div className="users-container" >
                <ModalUser
                    isOpen={this.state.isOpenModelUser}
                    toggleFromParent={this.toggleUserModal}
                    createNewUser={this.createNewUser} />
                {this.state.isOpenModelEditUser &&
                    <ModalEditUser
                        isOpen={this.state.isOpenModelEditUser}
                        toggleFromParent={this.toggleEditUserModel}
                        currentUser={this.state.userEdit}
                        editUser={this.doEditUser}
                    />
                }
                <div className="title text-center">
                    Manager User
                </div>
                <div className='mx-1'>
                    <button className="btn btn-primary btn-add-user px-3"
                        onClick={() => this.handleAddNewUser()}
                    >
                        <i className="fas fa-plus"></i> Add new user
                    </button>
                </div>
                <div className='users-table mt-3 mx-4'>
                    <table id="customers">
                        <tbody>
                            <tr>
                                <th>Email</th>
                                <th>First name</th>
                                <th>Last name</th>
                                <th>Address</th>
                                <th>Phone</th>
                                <th>Action</th>
                            </tr>
                            {arrUsers && arrUsers.map((item) => (
                                <tr key={item.id}>
                                    <td>{item.email}</td>
                                    <td>{item.firstName}</td>
                                    <td>{item.lastName}</td>
                                    <td>{item.address}</td>
                                    <td>{item.phoneNumber}</td>
                                    <td>
                                        <button className="btn-edit" onClick={() => this.handleEditUser(item)}>
                                            <i className="fas fa-pencil-alt"></i>
                                        </button>
                                        <button className="btn-delete" onClick={() => this.handleDeleteUser(item)}>
                                            <i className="fas fa-trash"></i>
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div >
        );
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

export default connect(mapStateToProps, mapDispatchToProps)(UserManage);
