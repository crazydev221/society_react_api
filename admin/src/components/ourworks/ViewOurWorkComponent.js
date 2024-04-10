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
        <div className="col-lg-6 col-md-8 offset-lg-3 offset-md-2">
            <div className="card ">
                <div className="card-body">
                    <h2 className="text-center"> Our Work Gallery Details</h2>
                    <div className="card-body">
                        <div className="form-group">
                            <label> Title: </label>
                            <div> {this.state.ourwork.title}</div>
                        </div>
                        <div className="form-group">
                            <label> : </label>
                            <div><img className="main-img"
                                      src={HttpCommon.defaults.imageURL + '/uploads/ourworks/' + this.state.ourwork.picture}/>
                            </div>
                        </div>
                        <button className="btn btn-danger" onClick={this.cancel.bind(this)} style={{marginLeft: "10px"}}>Go
                            Back
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
  }
}
