import React, { Component } from "react";

import UserService from "../../services/user.service";
import EventBus from "../../common/EventBus";
import NewsletterService from '../../services/NewsletterService';
import HttpCommon from "../../http-common";


export default class ListContactComponent extends Component {
  constructor(props) {
    super(props);

    this.state = {
      content: "",
      pager: {},
      newsletters: []
}
this.addContact = this.addContact.bind(this);
this.editContact = this.editContact.bind(this);
this.deleteContact = this.deleteContact.bind(this);

  }

  deleteContact(_id){

  if(!window.confirm("Confirm the deletion attempt!")){
    return;
  }

    NewsletterService.delete(_id).then( res => {
        this.setState({newsletters: this.state.newsletters.filter(Contact => Contact._id !== _id)});
    });
}
viewContact(_id){
    this.props.history.push(`/view-newsletters/${_id}`);
}
editContact(_id){
    this.props.history.push(`/add-newsletters/${_id}`);
}

addContact(){
    this.props.history.push('/add-newsletters/_add');
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
          NewsletterService.getLists(page).then((newsletters) => {

            //console.log("AMITABH");
            //console.log(users.data.users);

            this.setState({ newsletters: newsletters.data});
        });

  }




  }

  render() {

   //console.log(this.state.newsletters);

    return (
      <div className="container">

        <div>
                <div className="content-wrapper">
                 <h2 className="text-center">Newsletters</h2>
                 <div className = "row">
                    <button className="btn btn-primary" onClick={this.addContact}> Add Newsletter</button>
                 </div>
                 <br></br>
                 <div className = "row">
                        <table className = "table table-striped table-bordered">

                            <thead>
                                <tr>
   
                                    <th>Email</th>
                                    <th> Created At</th>
                                    <th> Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    this.state.newsletters.map(
                                      Contact => 
                                        <tr key = {Contact._id}>
                      
                                             <td> { Contact.email} </td>   
                                      
                                             <td> { Contact.createdAt} </td>  
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
