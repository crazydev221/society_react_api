import React, {Component} from "react";

import UserService from "../../services/user.service";
import EventBus from "../../common/EventBus";
import JuniorService from '../../services/JuniorService';
import HttpCommon from "../../http-common";

import {ColorRing} from 'react-loader-spinner';

export default class CreateJuniorComponent extends Component {
    constructor(props) {
        super(props);
        var fileUpload = React.createRef();
        this.state = {
            Juniorpurplesocieties: [],
            content: "",
            _id: this.props.match.params._id,
            first_name: '',
            last_name: '',
            email: '',
            phone: '',
            message: '',
            content: '',
            errors: '',
            saving:false,
            display:"none"
        }
        this.changenameHandler = this.changenameHandler.bind(this);
        this.changelast_nameHandler = this.changelast_nameHandler.bind(this);
        this.changemessageHandler = this.changemessageHandler.bind(this);
        this.changeEmailHandler = this.changeEmailHandler.bind(this);
        this.changePhoneHandler = this.changePhoneHandler.bind(this);
        this.saveOrUpdateJunior = this.saveOrUpdateJunior.bind(this);

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

        if (this.state._id === '_add') {
            return
        } else {
            JuniorService.getById(this.state._id).then((res) => {
                let Junior = res.data;
                this.setState({
                    first_name: Junior.first_name,
                    last_name: Junior.last_name,
                    email: Junior.email,
                    phone: Junior.phone,
                    message: Junior.message
                });
            });
        }
    }

    saveOrUpdateJunior = (e) => {
        e.preventDefault();
        //alert(this.state.uploaded_image);
        var error = 0;
        var errors = '';

        if (this.state.first_name === '') {
            errors += '<br>First Name missing';
            error = 1;
        }

        if (this.state.last_name === '') {
            errors += '<br>Last Name missing';
            error = 1;
        }

        if (this.state.email === '') {
            errors += '<br>Email missing';
            error = 1;
        }

        if (this.state.phone === '') {
            errors += '<br>Phone missing';
            error = 1;
        }


        if (this.state.message === '') {
            errors += '<br>message missing';
            error = 1;
        }


        if (error === 1) {
            this.setState({
                errors: errors,
            });
            return;
        }

        this.setState({saving: true});
        this.setState({display: "block"});

        let data = {
            first_name: this.state.first_name,
            last_name: this.state.last_name,
            email: this.state.email,
            phone: this.state.phone,
            message: this.state.message
        };
        //console.log('data => ' + JSON.stringify(data));

        // step 5
        if (this.state._id === '_add') {
            JuniorService.create(data).then(res => {

                this.props.history.push('/juniorpurplesocieties');
            });
        } else {
            JuniorService.update(data, this.state._id).then(res => {
                this.props.history.push('/juniorpurplesocieties');
            });
        }
    }

    changenameHandler = (event) => {
        this.setState({first_name: event.target.value});
    }

    changelast_nameHandler = (event) => {
        this.setState({last_name: event.target.value});
    }


    changeEmailHandler = (event) => {
        this.setState({email: event.target.value});
    }

    changePhoneHandler = (event) => {
        this.setState({phone: event.target.value});
    }


    changemessageHandler = (event) => {
        this.setState({message: event.target.value});
    }

    changecontentHandler = (event) => {
        this.setState({content: event.target.value});
    }

    cancel() {
        this.props.history.push('/juniorpurplesocieties');
    }

    getname() {
        if (this.state._id === '_add') {
            return <h3 className="text-center">Add Junior Purple Society User</h3>
        } else {
            return <h3 className="text-center">Update Junior Purple Society User</h3>
        }
    }


    handlePictureSelected(event) {
        var picture = event.target.files[0];
        var src = URL.createObjectURL(picture);

        this.setState({uploaded_image: event.target.files[0]});

        this.setState({
            src: src,
            is_image_uploaded: 1,
        });

        //alert(this.state.is_image_uploaded);

    }

    handleClick = () => {
        this.state.fileUpload.current.click();
    };

    renderPreview() {
        if (this.state.src) {
            return <img class="main-img" src={this.state.src}/>;
        } else if (this.state.picture) {
            return <img class="main-img"
                        src={HttpCommon.defaults.imageURL + '/uploads/Juniors/' + this.state.picture}/>;
        } else {
            return "";
        }
    }


    render() {

        console.log(this.state.Juniors);

        return (
            <div className="col-lg-6 col-md-8 offset-lg-3 offset-md-2">
                <div className="card">
                    <div className="card-body">
                    <div className="loader-sd" style={{display:this.state.display}}>
                            <ColorRing
                                visible={this.state.saving}
                                height="60"
                                width="60"
                                ariaLabel="blocks-loading"
                                wrapperStyle={{}}
                                wrapperClass="blocks-wrapper"
                                colors={['#e15b64', '#f47e60', '#f8b26a', '#abbd81', '#849b87']}
                            />
                        </div>
                        {
                            this.getname()
                        }
                        <div className="content" dangerouslySetInnerHTML={{__html: this.state.errors}}></div>

                        <form>
                            <div className="form-group">
                                <label>First Name: </label>
                                <input placeholder="First Name" name="first_name" className="form-control"
                                       value={this.state.first_name} onChange={this.changenameHandler}/>
                            </div>
                            <div className="form-group">
                                <label> Last Name: </label>
                                <input placeholder="Last Name" name="last_name" className="form-control"
                                       value={this.state.last_name} onChange={this.changelast_nameHandler}/>

                            </div>

                            <div className="form-group">
                                <label> Email: </label>
                                <input placeholder="Email" name="email" className="form-control"
                                       value={this.state.email} onChange={this.changeEmailHandler}/>
                            </div>

                            <div className="form-group">
                                <label> Phone: </label>
                                <input placeholder="Phone" name="phone" className="form-control"
                                       value={this.state.phone} onChange={this.changePhoneHandler}/>
                            </div>

                            <div className="form-group">
                                <label> Message: </label>
                                <textarea style={{'display': 'block'}} className="form-control" cols="15"
                                          rows="10" name="message" value={this.state.message}
                                          onChange={this.changemessageHandler}>{this.state.message}</textarea>
                            </div>


                            <button className="btn btn-success" onClick={this.saveOrUpdateJunior}>Save</button>
                            <button className="btn btn-danger" onClick={this.cancel.bind(this)}
                                    style={{marginLeft: "10px"}}>Cancel
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        );
    }
}
