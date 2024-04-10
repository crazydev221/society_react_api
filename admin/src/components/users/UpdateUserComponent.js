import React, { Component } from "react";

import UserService1 from "../../services/user.service";
import EventBus from "../../common/EventBus";
import UserService from '../../services/UserService';
import { isEmail } from "validator";

export default class UpdateUserComponent extends Component {
  constructor(props) {
    super(props);

    this.state = {
      content: "",
      _id: this.props.match.params._id,
      first_name: '',
      last_name: '',
      email: '',
      errors:''
}
this.changeFirstNameHandler = this.changeFirstNameHandler.bind(this);
this.changeLastNameHandler = this.changeLastNameHandler.bind(this);
this.saveOrUpdateUser = this.saveOrUpdateUser.bind(this);

  }

  componentDidMount() {
    UserService1.getUserBoard().then(
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

    if(this.state._id === '_add'){
      return
  }else{
      UserService.getUserById(this.state._id).then( (res) =>{
          let user = res.data;
          this.setState({first_name: user.first_name,
            last_name: user.last_name,
              email : user.email
          });
      });
  }  

  }

  saveOrUpdateUser = (e) => {
    e.preventDefault();

    var error = 0;
    var errors = '';

    if(this.state.first_name === ''){
      errors += '<br>First name missing';
      error = 1;
    }

    if(this.state.last_name === ''){
      errors += '<br>Last name missing';
      error = 1;
    }

    if(this.state.email === ''){
      errors += '<br>Email missing';
      error = 1;
    }else {
      if (!isEmail(this.state.email)) {
        errors += '<br>Invalid email entered';
        error = 1;
      }
    } 

    if(error === 1){
      this.setState({
        errors: errors,
      });      
      return;
    }

    let user = {first_name: this.state.first_name, last_name: this.state.last_name, email: this.state.email};
    console.log('user => ' + JSON.stringify(user));

    // step 5
    if(this.state._id === '_add'){
        UserService.createUser(user).then(res =>{
            this.props.history.push('/users');
        });
    }else{
        UserService.updateUser(user, this.state._id).then( res => {
            this.props.history.push('/users');
        });
    }
}

changeFirstNameHandler= (event) => {
    this.setState({first_name: event.target.value});
}

changeLastNameHandler= (event) => {
    this.setState({last_name: event.target.value});
}

changeEmailHandler= (event) => {
    this.setState({email: event.target.value});
}

cancel(){
    this.props.history.push('/users');
}

getTitle(){
    if(this.state._id === '_add'){
        return <h3 className="text-center">Add User</h3>
    }else{
        return <h3 className="text-center">Update User</h3>
    }
}






  render() {

   console.log(this.state.users);

    return (
      <div className="container">

<div className="content-wrapper">



                        <div className = "row">
                          
                            <div className = "card col-md-6 offset-md-3 offset-md-3">
                                {
                                    this.getTitle()
                                }
                                <div className = "card-body">

                                <div className="content" dangerouslySetInnerHTML={{__html: this.state.errors}}></div>

                                    <form>
                                        <div className = "form-group">
                                            <label> First Name: </label>
                                            <input placeholder="First Name" name="first_name" className="form-control" 
                                                value={this.state.first_name} onChange={this.changeFirstNameHandler}/>
                                        </div>
                                        <div className = "form-group">
                                            <label> Last Name: </label>
                                            <input placeholder="Last Name" name="last_name" className="form-control" 
                                                value={this.state.last_name} onChange={this.changeLastNameHandler}/>
                                        </div>
                                        <div className = "form-group">
                                            <label> Email Id: </label>
                                            <input placeholder="Email Address" name="email" className="form-control" 
                                                value={this.state.email} onChange={this.changeEmailHandler}/>
                                        </div>

                                        <button className="btn btn-success" onClick={this.saveOrUpdateUser}>Save</button>
                                        <button className="btn btn-danger" onClick={this.cancel.bind(this)} style={{marginLeft: "10px"}}>Cancel</button>
                                    </form>
                                </div>
                            </div>
                        </div>

                   </div>
      </div>
    );
  }
}
