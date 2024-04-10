import React, { Component } from "react";

import UserService from "../../services/user.service";
import EventBus from "../../common/EventBus";
import SupportService from '../../services/SupportService';
import HttpCommon from "../../http-common";


export default class ListSupportComponent extends Component {
  constructor(props) {
    super(props);

    this.state = {
      content: "",
      pager: {},
      supports: []
}
this.addSupport = this.addSupport.bind(this);
this.editSupport = this.editSupport.bind(this);
this.deleteSupport = this.deleteSupport.bind(this);

  }

  deleteSupport(_id){

  if(!window.confirm("Confirm the deletion attempt!")){
    return;
  }

    SupportService.delete(_id).then( res => {
        this.setState({Supports: this.state.supports.filter(Support => Support._id !== _id)});
    });
}
viewSupport(_id){
    this.props.history.push(`/view-support/${_id}`);
}
editSupport(_id){
    this.props.history.push(`/add-support/${_id}`);
}

addSupport(){
    this.props.history.push('/add-support/_add');
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
          SupportService.getLists(page).then((Supports) => {

            //console.log("AMITABH");
            //console.log(users.data.users);

            this.setState({ supports: Supports.data.supports});
        });

  }




  }

  render() {

   //console.log(this.state.Supports);

    return (
        <div className="col-12">
            <h2 className="text-center">Support List</h2>
            <div className="mb-3">
                <button className="btn btn-primary" onClick={this.addSupport}> Add Support</button>
            </div>
            <div className="table-responsive">
                <table className="table table-striped table-bordered gallery-table-one">
                    <thead>
                        <tr>
                            <th> Name</th>
                            <th>Disease</th>
                            <th>Picture</th>
                            <th>Description</th>
                            <th> Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                    {
                        this.state.supports.map(
                            Support =>
                            <tr key={Support._id}>
                                <td> {Support.name} </td>
                                <td> {Support.disease} </td>
                                <td><img className="main-img"
                                         src={HttpCommon.defaults.imageURL + '/uploads/supports/' + Support.picture}
                                         alt=""/></td>
                                <td> {Support.description} </td>
                                <td>
                                    <button style={{margin: "5px"}} onClick={() => this.editSupport(Support._id)}
                                            className="btn btn-info">Update
                                    </button>
                                    <button style={{margin: "5px"}}
                                            onClick={() => this.deleteSupport(Support._id)}
                                            className="btn btn-danger">Delete
                                    </button>

                                </td>
                            </tr>
                        )
                    }
                    </tbody>
                </table>
            </div>
        </div>
    );
  }
}
