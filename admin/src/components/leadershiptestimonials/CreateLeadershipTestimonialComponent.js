import React, {Component} from "react";

import UserService from "../../services/user.service";
import EventBus from "../../common/EventBus";
import LeadershipTestimonialService from '../../services/LeadershipTestimonialService';
import HttpCommon from "../../http-common";

import { ColorRing } from 'react-loader-spinner';

export default class CreateLeadershipTestimonialComponent extends Component {
    constructor(props) {
        super(props);
        var fileUpload = React.createRef();
        this.state = {
            content: "",
            _id: this.props.match.params._id,
            name: '',
            note: '',
            description: '',
            content: '',
            errors: '',
            saving:false,
            display:"none"
        }
        this.changenameHandler = this.changenameHandler.bind(this);
        this.changenoteHandler = this.changenoteHandler.bind(this);
        this.changeDescriptionHandler = this.changeDescriptionHandler.bind(this);
        this.changecontentHandler = this.changecontentHandler.bind(this);
        this.saveOrUpdateLeadershipTestimonial = this.saveOrUpdateLeadershipTestimonial.bind(this);

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
            LeadershipTestimonialService.getById(this.state._id).then((res) => {
                let LeadershipTestimonial = res.data;
                this.setState({
                    name: LeadershipTestimonial.name,
                    note: LeadershipTestimonial.note,
                    description: LeadershipTestimonial.description,
                    content: LeadershipTestimonial.content
                });
            });
        }
    }

    saveOrUpdateLeadershipTestimonial = (e) => {
        e.preventDefault();
        //alert(this.state.uploaded_image);
        var error = 0;
        var errors = '';

        if (this.state.name === '') {
            errors += '<br>Name missing';
            error = 1;
        }

        if (this.state.note === '') {
            errors += '<br>note missing';
            error = 1;
        }

        if (this.state.description === '') {
            errors += '<br>Description missing';
            error = 1;
        }

        if (this.state.content === '') {
            errors += '<br>content missing';
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
        formData.append("note", this.state.note);
        formData.append("description", this.state.description);
        formData.append("content", this.state.content);

        // step 5
        if (this.state._id === '_add') {
            LeadershipTestimonialService.create(formData).then(res => {
                this.props.history.push('/leadershiptestimonials');
            });
        } else {
            LeadershipTestimonialService.update(formData, this.state._id).then(res => {
                this.props.history.push('/leadershiptestimonials');
            });
        }
    }

    changenameHandler = (event) => {
        this.setState({name: event.target.value});
    }

    changenoteHandler = (event) => {
        this.setState({note: event.target.value});
    }

    changeDescriptionHandler = (event) => {
        this.setState({description: event.target.value});
    }

    changecontentHandler = (event) => {
        this.setState({content: event.target.value});
    }

    cancel() {
        this.props.history.push('/leadershiptestimonials');
    }

    getname() {
        if (this.state._id === '_add') {
            return <h2 className="text-center">Add Leadership Testimonial</h2>
        } else {
            return <h2 className="text-center">Update Leadership Testimonial</h2>
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
                        src={HttpCommon.defaults.imageURL + '/uploads/LeadershipTestimonials/' + this.state.picture}/>;
        } else {
            return "";
        }
    }


    render() {

        console.log(this.state.LeadershipTestimonials);

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
                                <label> Note: </label>
                                <textarea style={{'display': 'block'}} className="form-control" cols="15"
                                          rows="10" name="note" value={this.state.note}
                                          onChange={this.changenoteHandler}>{this.state.note}</textarea>
                            </div>
                            <div className="form-group">
                                <label> Description: </label>
                                <textarea style={{'display': 'block'}} className="form-control" cols="15"
                                          rows="10" name="description" value={this.state.description}
                                          onChange={this.changeDescriptionHandler}>{this.state.description}</textarea>
                            </div>
                            <div className="form-group">
                                <label> Content: </label>
                                <textarea style={{'display': 'block'}} className="form-control" cols="15"
                                          rows="10" name="content" value={this.state.content}
                                          onChange={this.changecontentHandler}>{this.state.content}</textarea>
                            </div>

                            <button className="btn btn-success"
                                    onClick={this.saveOrUpdateLeadershipTestimonial}>Save
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
