import React, { Component } from "react";

import UserService from "../services/user.service";
import EventBus from "../common/EventBus";
import { Redirect } from 'react-router-dom';

export default class BoardAdmin extends Component {
  constructor(props) {
    super(props);

    this.state = {
      content: ""
    };
  }

  componentDidMount() {
    UserService.getAdminBoard().then(
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
  }

  render() {
    return (
      <div className="container">
        <header className="jumbotron">
 
        <a class="btn btn-primary" style={{marginTop:"15px"}} href="/ourworks">Our Work Gallery</a>&nbsp;&nbsp;&nbsp;&nbsp;<a class="btn btn-primary" style={{marginTop:"15px"}}  href="/leadershipteams">Teams</a>&nbsp;&nbsp;&nbsp;&nbsp;<a class="btn btn-primary" style={{marginTop:"15px"}}  href="/leadershiptestimonials">Testimonials</a>&nbsp;&nbsp;&nbsp;&nbsp;<a class="btn btn-primary" style={{marginTop:"15px"}}  href="/supports">Supports</a>&nbsp;&nbsp;&nbsp;&nbsp;<a class="btn btn-primary" style={{marginTop:"15px"}} href="/nitaliablankets">Nitalia Blankets</a>&nbsp;&nbsp;&nbsp;&nbsp;<a class="btn btn-primary" style={{marginTop:"15px"}} href="/purpleapartments">Purple Apartments</a>&nbsp;&nbsp;&nbsp;&nbsp;<a class="btn btn-primary" style={{marginTop:"15px"}} href="/juniors">Junior Purple Society</a>&nbsp;&nbsp;&nbsp;&nbsp;<a class="btn btn-primary" style={{marginTop:"15px"}} href="/volunteers">Volunteers</a>&nbsp;&nbsp;&nbsp;&nbsp;<a class="btn btn-primary" style={{marginTop:"15px"}} href="/juniorpurplesocieties">Junior Purple Society Users</a>&nbsp;&nbsp;&nbsp;&nbsp;<a class="btn btn-primary" style={{marginTop:"15px"}}  href="/contacts">Contacts</a>&nbsp;&nbsp;&nbsp;&nbsp;<a class="btn btn-primary" style={{marginTop:"15px"}} href="/newsletters">Newsletters</a>

        </header>

        

      </div>
    );
  }
}
