import React, { Component } from "react";

import UserService from "../../services/user.service";
import EventBus from "../../common/EventBus";
import OurWorkService from '../../services/OurWorkService';
import HttpCommon from "../../http-common";

export default class ViewUserComponent extends Component {
  constructor(props) {
    super(props);

    this.state = {
      content: "",
      _id: this.props.match.params._id,
      ourwork: {}
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

    OurWorkService.getById(this.state._id).then( res => {
      this.setState({ourwork: res.data});
  })

  }
  cancel(){
    this.props.history.push('/ourworks');
}
  render() {

   console.log(this.state.users);

    return (
      <div className="container">

<br></br><div className="content-wrapper">
                <div className = "card col-md-6 offset-md-3">
                    <h3 className = "text-center"> Our Work Gallery Details</h3>
                    <div className = "card-body">
                        <div className = "row">
                            <label> Title: </label>
                            <div> { this.state.ourwork.title }</div>
                        </div>
                        <div className = "row">
                            <label> : </label>
                            <div> <img class="main-img" src={HttpCommon.defaults.imageURL+'/uploads/ourworks/'+this.state.ourwork.picture} /></div>
                        </div>


                        <button className="btn btn-danger" onClick={this.cancel.bind(this)} style={{marginLeft: "10px"}}>Go Back</button>
                    </div>

                </div>
            </div>

      </div>
    );
  }
}
