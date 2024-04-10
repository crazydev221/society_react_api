import React, {Component} from "react";

import UserService1 from "../../services/user.service";
import EventBus from "../../common/EventBus";
import UserService from '../../services/UserService';
import {isEmail} from "validator";

import { ColorRing } from 'react-loader-spinner';

export default class UpdateUserComponent extends Component {
    constructor(props) {
        super(props);

        this.state = {
            content: "",
            _id: this.props.match.params._id,
            first_name: '',
            last_name: '',
            email: '',
            errors: ''
        }
        this.changeFirstNameHandler = this.changeFirstNameHandler.bind(this);
        this.changeLastNameHandler = this.changeLastNameHandler.bind(this);
        this.saveOrUpdateUser = this.saveOrUpdateUser.bind(this);

    }

    componentDidMount() {
        UserService1.getUserBoard().then(
            response => {
                this.setState({
                    content: response.data
                });
            },
            error => {
                this.setState({
                    content:
                        (error.response &&
                            error.response.data &&
                            error.response.data.message) ||
                        error.message ||
                        error.toString()
                });

                if (error.response && error.response.status === 401) {
                    EventBus.dispatch("logout");
                }
            }
        );

        if (this.state._id === '_add') {
            return
        } else {
            UserService.getUserById(this.state._id).then((res) => {
                let user = res.data;
                this.setState({
                    first_name: user.first_name,
                    last_name: user.last_name,
                    email: user.email
                });
            });
        }

    }

    saveOrUpdateUser = (e) => {
        e.preventDefault();

        var error = 0;
        var errors = '';

        if (this.state.first_name === '') {
            errors += '<br>First name missing';
            error = 1;
        }

        if (this.state.last_name === '') {
            errors += '<br>Last name missing';
            error = 1;
        }

        if (this.state.email === '') {
            errors += '<br>Email missing';
            error = 1;
        } else {
            if (!isEmail(this.state.email)) {
                errors += '<br>Invalid email entered';
                error = 1;
            }
        }

        if (error === 1) {
            this.setState({
                errors: errors,
            });
            return;
        }

        let user = {first_name: this.state.first_name, last_name: this.state.last_name, email: this.state.email};
        console.log('user => ' + JSON.stringify(user));

        // step 5
        if (this.state._id === '_add') {
            UserService.createUser(user).then(res => {
                this.props.history.push('/users');
            });
        } else {
            UserService.updateUser(user, this.state._id).then(res => {
                this.props.history.push('/users');
            });
        }
    }

    changeFirstNameHandler = (event) => {
        this.setState({first_name: event.target.value});
    }

    changeLastNameHandler = (event) => {
        this.setState({last_name: event.target.value});
    }

    changeEmailHandler = (event) => {
        this.setState({email: event.target.value});
    }

    cancel() {
        this.props.history.push('/users');
    }

    getTitle() {
        if (this.state._id === '_add') {
            return <h2 className="text-center">Add User</h2>
        } else {
            return <h2 className="text-center">Update User</h2>
        }
    }


    render() {

        console.log(this.state.users);

        return (
            <div className="col-lg-6 col-md-8 offset-lg-3 offset-md-2">
                <div className="card">
                    <div className="card-body">
                        <div className="loader-sd">
                            <ColorRing
                                visible={true}
                                height="60"
                                width="60"
                                ariaLabel="blocks-loading"
                                wrapperStyle={{}}
                                wrapperClass="blocks-wrapper"
                                colors={['#e15b64', '#f47e60', '#f8b26a', '#abbd81', '#849b87']}
                            />
                        </div>
                        {
                            this.getTitle()
                        }

                        <div className="content" dangerouslySetInnerHTML={{__html: this.state.errors}}></div>

                        <form>
                            <div className="form-group">
                                <label> First Name: </label>
                                <input placeholder="First Name" name="first_name" className="form-control"
                                       value={this.state.first_name} onChange={this.changeFirstNameHandler}/>
                            </div>
                            <div className="form-group">
                                <label> Last Name: </label>
                                <input placeholder="Last Name" name="last_name" className="form-control"
                                       value={this.state.last_name} onChange={this.changeLastNameHandler}/>
                            </div>
                            <div className="form-group">
                                <label> Email Id: </label>
                                <input placeholder="Email Address" name="email" className="form-control"
                                       value={this.state.email} onChange={this.changeEmailHandler}/>
                            </div>

                            <button className="btn btn-success" onClick={this.saveOrUpdateUser}>Save</button>
                            <button className="btn btn-danger" onClick={this.cancel.bind(this)}
                                    style={{marginLeft: "10px"}}>Cancel
                            </button>
                        </form>
                    </div>
                </div>
            </div>


        );
    }
}
