import React, { Component } from "react";

import UserService from "../../services/user.service";
import EventBus from "../../common/EventBus";
import UserService1 from '../../services/UserService';

export default class ViewUserComponent extends Component {
  constructor(props) {
    super(props);

    this.state = {
      content: "",
      _id: this.props.match.params._id,
      user: {}
}


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

    UserService1.getUserById(this.state._id).then( res => {
      this.setState({user: res.data});
  })

  }
  cancel(){
    this.props.history.push('/users');
}
  render() {

   console.log(this.state.users);

    return (
      <div className="container">

<br></br><div className="content-wrapper">
                <div className = "card col-md-6 offset-md-3">
                    <h3 className = "text-center"> View User Details</h3>
                    <div className = "card-body">
                        <div className = "row">
                            <label> First Name: </label>
                            <div> { this.state.user.first_name }</div>
                        </div>
                        <div className = "row">
                            <label> Last Name: </label>
                            <div> { this.state.user.last_name }</div>
                        </div>
                        <div className = "row">
                            <label> Email ID: </label>
                            <div> { this.state.user.email }</div>
                        </div>


                        <button className="btn btn-danger" onClick={this.cancel.bind(this)} style={{marginLeft: "10px"}}>Go Back</button>
                    </div>

                </div>
            </div>

      </div>
    );
  }
}
