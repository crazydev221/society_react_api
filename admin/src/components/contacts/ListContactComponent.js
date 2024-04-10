import React, { Component } from "react";

import UserService from "../../services/user.service";
import EventBus from "../../common/EventBus";
import ContactService from '../../services/ContactService';
import HttpCommon from "../../http-common";


export default class ListContactComponent extends Component {
  constructor(props) {
    super(props);

    this.state = {
      content: "",
      pager: {},
      contacts: []
}
this.addContact = this.addContact.bind(this);
this.editContact = this.editContact.bind(this);
this.deleteContact = this.deleteContact.bind(this);

  }

  deleteContact(_id){

  if(!window.confirm("Confirm the deletion attempt!")){
    return;
  }

    ContactService.delete(_id).then( res => {
        this.setState({contacts: this.state.contacts.filter(Contact => Contact._id !== _id)});
    });
}
viewContact(_id){
    this.props.history.push(`/view-contacts/${_id}`);
}
editContact(_id){
    this.props.history.push(`/add-contacts/${_id}`);
}

addContact(){
    this.props.history.push('/add-contacts/_add');
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
          ContactService.getLists(page).then((contacts) => {

            //console.log("AMITABH");
            //console.log(users.data.users);

            this.setState({ contacts: contacts.data});
        });

  }




  }

  render() {

   //console.log(this.state.contacts);

    return (
      <div className="container">

        <div>
                <div className="content-wrapper">
                 <h2 className="text-center">Contacts</h2>
                 <div className = "row">
                    <button className="btn btn-primary" onClick={this.addContact}> Add Contact</button>
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
                                    this.state.contacts.map(
                                      Contact => 
                                        <tr key = {Contact._id}>
                                             <td> { Contact.first_name} { Contact.last_name} </td>   
                                             <td> { Contact.email} </td>   
                                      
                                             <td> { Contact.phone} </td>   
                                             <td> { Contact.message} </td>  
                                             <td>
                                                 <button onClick={ () => this.editContact(Contact._id)} className="btn btn-info">Update </button>
                                                 <button style={{marginLeft: "10px"}} onClick={ () => this.deleteContact(Contact._id)} className="btn btn-danger">Delete </button>
                                                
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
