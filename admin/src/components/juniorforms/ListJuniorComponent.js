import React, { Component } from "react";

import UserService from "../../services/user.service";
import EventBus from "../../common/EventBus";
import JuniorService from '../../services/JuniorService';
import HttpCommon from "../../http-common";


export default class ListJuniorComponent extends Component {
  constructor(props) {
    super(props);

    this.state = {
      content: "",
      pager: {},
      juniorpurplesocieties: []
}
this.addJuniorPurpleSocity = this.addJuniorPurpleSocity.bind(this);
this.editJuniorPurpleSocity = this.editJuniorPurpleSocity.bind(this);
this.deleteJuniorPurpleSocity = this.deleteJuniorPurpleSocity.bind(this);

  }

  deleteJuniorPurpleSocity(_id){

  if(!window.confirm("Confirm the deletion attempt!")){
    return;
  }

    JuniorService.delete(_id).then( res => {
        this.setState({juniorpurplesocieties: this.state.juniorpurplesocieties.filter(JuniorPurpleSocity => JuniorPurpleSocity._id !== _id)});
    });
}
viewJuniorPurpleSocity(_id){
    this.props.history.push(`/view-juniorpurplesocieties/${_id}`);
}
editJuniorPurpleSocity(_id){
    this.props.history.push(`/add-juniorpurplesocieties/${_id}`);
}

addJuniorPurpleSocity(){
    this.props.history.push('/add-juniorpurplesocieties/_add');
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
          JuniorService.getLists(page).then((juniorpurplesocieties) => {

            //console.log("AMITABH");
            //console.log(users.data.users);

            this.setState({ juniorpurplesocieties: juniorpurplesocieties.data});
        });

  }




  }

  render() {

   console.log(this.state.juniorpurplesocieties);

    return (
      <div className="container">

        <div>
                <div className="content-wrapper">
                 <h2 className="text-center">Junior Purple Society Users</h2>
                 <div className = "row">
                    <button className="btn btn-primary" onClick={this.addJuniorPurpleSocity}> Add Junior Purple Society User</button>
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
                                    this.state.juniorpurplesocieties.map(
                                      JuniorPurpleSocity => 
                                        <tr key = {JuniorPurpleSocity._id}>
                                             <td> { JuniorPurpleSocity.first_name} { JuniorPurpleSocity.last_name} </td>   
                                             <td> { JuniorPurpleSocity.email} </td>   
                                      
                                             <td> { JuniorPurpleSocity.phone} </td>   
                                             <td> { JuniorPurpleSocity.message} </td>  
                                             <td>
                                                 <button onClick={ () => this.editJuniorPurpleSocity(JuniorPurpleSocity._id)} className="btn btn-info">Update </button>
                                                 <button style={{marginLeft: "10px"}} onClick={ () => this.deleteJuniorPurpleSocity(JuniorPurpleSocity._id)} className="btn btn-danger">Delete </button>
                                                
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
