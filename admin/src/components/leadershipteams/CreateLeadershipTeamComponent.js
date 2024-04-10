import React, {Component} from "react";

import UserService from "../../services/user.service";
import EventBus from "../../common/EventBus";
import LeadershipTeamService from '../../services/LeadershipTeamService';
import HttpCommon from "../../http-common";

import { ColorRing } from 'react-loader-spinner';

export default class CreateLeadershipTeamComponent extends Component {
    constructor(props) {
        super(props);
        var fileUpload = React.createRef();
        this.state = {
            content: "",
            _id: this.props.match.params._id,
            name: '',
            designation: '',
            description: '',
            twitter: '',
            facebook: '',
            instagram: '',
            picture: '',
            src: "",
            fileUpload: fileUpload,
            uploaded_image: "",
            is_image_uploaded: 0,
            errors: '',
            saving:false,
            display:"none"
        }
        this.changenameHandler = this.changenameHandler.bind(this);
        this.changeDesignationHandler = this.changeDesignationHandler.bind(this);
        this.changeDescriptionHandler = this.changeDescriptionHandler.bind(this);
        this.changeTwitterHandler = this.changeTwitterHandler.bind(this);
        this.changeFacebookHandler = this.changeFacebookHandler.bind(this);
        this.changeInstagramHandler = this.changeInstagramHandler.bind(this);
        this.saveOrUpdateLeadershipTeam = this.saveOrUpdateLeadershipTeam.bind(this);

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
            LeadershipTeamService.getById(this.state._id).then((res) => {
                let LeadershipTeam = res.data;
                this.setState({
                    name: LeadershipTeam.name,
                    designation: LeadershipTeam.designation,
                    description: LeadershipTeam.description,
                    twitter: LeadershipTeam.twitter,
                    facebook: LeadershipTeam.facebook,
                    instagram: LeadershipTeam.instagram,
                    picture: LeadershipTeam.picture,
                });
            });
        }

    }

    saveOrUpdateLeadershipTeam = (e) => {
        e.preventDefault();
        //alert(this.state.uploaded_image);
        var error = 0;
        var errors = '';

        if (this.state.name === '') {
            errors += '<br>Name missing';
            error = 1;
        }

        if (this.state.designation === '') {
            errors += '<br>Designation missing';
            error = 1;
        }

        if (this.state.description === '') {
            errors += '<br>Description missing';
            error = 1;
        }

        if (this.state._id === '_add') {
            if (this.state.is_image_uploaded === 0) {
                errors += '<br>Picture missing';
                error = 1;
            }
        }

        if (this.state.twitter === '') {
            errors += '<br>Twitter missing';
            error = 1;
        }

        if (this.state.facebook === '') {
            errors += '<br>Facebook missing';
            error = 1;
        }

        if (this.state.instagram === '') {
            errors += '<br>Instagram missing';
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

        let data = {name: this.state.name, image: this.state.uploaded_image};
        //console.log('data => ' + JSON.stringify(data));

        const formData = new FormData();
        formData.append("name", this.state.name);
        formData.append("designation", this.state.designation);
        formData.append("description", this.state.description);
        formData.append("twitter", this.state.twitter);
        formData.append("facebook", this.state.facebook);
        formData.append("instagram", this.state.instagram);
        formData.append("image", this.state.uploaded_image);


        // step 5
        if (this.state._id === '_add') {
            LeadershipTeamService.create(formData).then(res => {
                this.props.history.push('/LeadershipTeams');
            });
        } else {
            LeadershipTeamService.update(formData, this.state._id).then(res => {
                this.props.history.push('/LeadershipTeams');
            });
        }
    }

    changenameHandler = (event) => {
        this.setState({name: event.target.value});
    }

    changeDesignationHandler = (event) => {
        this.setState({designation: event.target.value});
    }

    changeDescriptionHandler = (event) => {
        this.setState({description: event.target.value});
    }

    changeTwitterHandler = (event) => {
        this.setState({twitter: event.target.value});
    }

    changeFacebookHandler = (event) => {
        this.setState({facebook: event.target.value});
    }

    changeInstagramHandler = (event) => {
        this.setState({instagram: event.target.value});
    }

    cancel() {
        this.props.history.push('/LeadershipTeams');
    }

    getname() {
        if (this.state._id === '_add') {
            return <h2 className="text-center">Add Leadership Team</h2>
        } else {
            return <h2 className="text-center">Update Leadership Team</h2>
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
                        src={HttpCommon.defaults.imageURL + '/uploads/leadershipteams/' + this.state.picture}/>;
        } else {
            return "";
        }
    }


    render() {

        console.log(this.state.LeadershipTeams);

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
                                <label> Name: </label>
                                <input placeholder="Name" name="name" className="form-control"
                                       value={this.state.name} onChange={this.changenameHandler}/>
                            </div>
                            <div className="form-group">
                                <label> Designation: </label>
                                <input placeholder="Designation" name="name" className="form-control"
                                       value={this.state.designation} onChange={this.changeDesignationHandler}/>
                            </div>
                            <div className="form-group">
                                <label> Description: </label>
                                <textarea style={{'display': 'block'}} className="form-control" cols="15"
                                          rows="10" name="description" value={this.state.description}
                                          onChange={this.changeDescriptionHandler}>{this.state.description}</textarea>
                            </div>

                            <div className="form-group">
                                <label> Picture: </label>
                                <div className="profile-pic">
                                    {this.renderPreview()}
                                    <div
                                        className="upload-sec"
                                        id="div_upload"
                                        onClick={this.handleClick}
                                        style={{cursor: "pointer"}}
                                    >
                                        <i>
                                            <img src="../../images/upload.svg" alt=""/>
                                        </i>
                                        <span>
                            <b>Click to upload</b> a profile image
                          </span>
                                        <span>SVG, PNG, JPG or GIF (Best. 100 x 100 px)</span>
                                    </div>
                                </div>
                            </div>

                            <div className="form-group" style={{display: "none"}}>
                                <label> Picture: </label>
                                <input
                                    id="image_upload"
                                    ref={this.state.fileUpload}
                                    type="file"
                                    onChange={this.handlePictureSelected.bind(this)}
                                />
                            </div>

                            <div className="form-group">
                                <label> Twitter: </label>
                                <input placeholder="Twitter" name="twitter" className="form-control"
                                       value={this.state.twitter} onChange={this.changeTwitterHandler}/>
                            </div>
                            <div className="form-group">
                                <label> Facebook: </label>
                                <input placeholder="Facebook" name="facebook" className="form-control"
                                       value={this.state.facebook} onChange={this.changeFacebookHandler}/>
                            </div>

                            <div className="form-group">
                                <label> Instagram: </label>
                                <input placeholder="Instagram" name="instagram" className="form-control"
                                       value={this.state.instagram} onChange={this.changeInstagramHandler}/>
                            </div>
                            <button className="btn btn-success" onClick={this.saveOrUpdateLeadershipTeam}>Save
                            </button>
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
