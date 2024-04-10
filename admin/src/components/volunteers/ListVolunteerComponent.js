import React, { Component } from "react";

import UserService from "../../services/user.service";
import EventBus from "../../common/EventBus";
import VolunteerService from '../../services/VolunteerService';
import HttpCommon from "../../http-common";


export default class ListVolunteerComponent extends Component {
  constructor(props) {
    super(props);

    this.state = {
      content: "",
      pager: {},
      volunteers: []
}
this.addVolunteer = this.addVolunteer.bind(this);
this.editVolunteer = this.editVolunteer.bind(this);
this.deleteVolunteer = this.deleteVolunteer.bind(this);

  }

  deleteVolunteer(_id){

  if(!window.confirm("Confirm the deletion attempt!")){
    return;
  }

    VolunteerService.delete(_id).then( res => {
        this.setState({volunteers: this.state.volunteers.filter(Volunteer => Volunteer._id !== _id)});
    });
}
viewVolunteer(_id){
    this.props.history.push(`/view-volunteers/${_id}`);
}
editVolunteer(_id){
    this.props.history.push(`/add-volunteers/${_id}`);
}

addVolunteer(){
    this.props.history.push('/add-volunteers/_add');
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
          VolunteerService.getLists(page).then((volunteers) => {

            //console.log("AMITABH");
            //console.log(users.data.users);

            this.setState({ volunteers: volunteers.data});
        });

  }




  }

  render() {

   //console.log(this.state.volunteers);

    return (
      <div className="container">

        <div>
                <div className="content-wrapper">
                 <h2 className="text-center">Volunteers</h2>
                 <div className = "row">
                    <button className="btn btn-primary" onClick={this.addVolunteer}> Add Volunteer</button>
                 </div>
                 <br></br>
                 <div className = "row">
                        <table className = "table table-striped table-bordered">

                            <thead>
                                <tr>
                                    <th> Name</th>
                                    <th>Email</th>
                                    <th>Phone</th>
                                    <th>Message</th>
                                    <th> Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    this.state.volunteers.map(
                                      Volunteer => 
                                        <tr key = {Volunteer._id}>
                                             <td> { Volunteer.first_name} { Volunteer.last_name} </td>   
                                             <td> { Volunteer.email} </td>   
                                      
                                             <td> { Volunteer.phone} </td>   
                                             <td> { Volunteer.message} </td>  
                                             <td>
                                                 <button onClick={ () => this.editVolunteer(Volunteer._id)} className="btn btn-info">Update </button>
                                                 <button style={{marginLeft: "10px"}} onClick={ () => this.deleteVolunteer(Volunteer._id)} className="btn btn-danger">Delete </button>
                                                
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
