import React, { Component } from "react";

import UserService from "../../services/user.service";
import EventBus from "../../common/EventBus";
import UserService1 from '../../services/UserService';

export default class ListUserComponent extends Component {
  constructor(props) {
    super(props);

    this.state = {
      content: "",
      pager: {},
      users: []
}
this.addUser = this.addUser.bind(this);
this.editUser = this.editUser.bind(this);
this.deleteUser = this.deleteUser.bind(this);

  }

  deleteUser(_id){

  if(!window.confirm("Confirm the user deletion attempt!")){
    return;
  }

    UserService1.deleteUser(_id).then( res => {
        this.setState({users: this.state.users.filter(user => user._id !== _id)});
    });
}
viewUser(_id){
    this.props.history.push(`/view-user/${_id}`);
}
editUser(_id){
    this.props.history.push(`/add-user/${_id}`);
}


addUser(){
    this.props.history.push('/add-user/_add');
}


  componentDidMount() {
    UserService.getUserBoard().then(
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

    const params = new URLSearchParams(window.location.search);
    const page = parseInt(params.get('page')) || 1;

    if (page !== this.state.pager.currentPage) {
          UserService1.getUsers(page).then((users) => {

            //console.log("AMITABH");
            //console.log(users.data.users);

            this.setState({ users: users.data.users});
        });

  }




  }

  render() {

   console.log(this.state.users);

    return (
      <div className="container">

        <div>
                <div className="content-wrapper">
                 <h2 className="text-center">Users List</h2>
                 <div className = "row">
                    <button className="btn btn-primary" onClick={this.addUser}> Add User</button>
                 </div>
                 <br></br>
                 <div className = "row">
                        <table className = "table table-striped table-bordered">

                            <thead>
                                <tr>
                                    <th> First Name</th>
                                    <th> Last Name</th>
                                    <th> Email Id</th>
                                    <th> Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    this.state.users.map(
                                        user => 
                                        <tr key = {user._id}>
                                             <td> { user.first_name} </td>   
                                             <td> {user.last_name}</td>
                                             <td> {user.email}</td>
                                             <td>
                                                 <button onClick={ () => this.editUser(user._id)} className="btn btn-info">Update </button>
                                                 <button style={{marginLeft: "10px"}} onClick={ () => this.deleteUser(user._id)} className="btn btn-danger">Delete </button>
                                                 
                                             </td>
                                        </tr>
                                    )
                                }
                            </tbody>
                        </table>

                 </div>

            </div>
            </div>

      </div>
    );
  }
}
