import React, {Component} from "react";

import UserService from "../../services/user.service";
import EventBus from "../../common/EventBus";
import OurWorkService from '../../services/NitaliaBlanketService';
import HttpCommon from "../../http-common";

import { ColorRing } from 'react-loader-spinner';

export default class CreateNitaliaBlanketComponent extends Component {
    constructor(props) {
        super(props);
        var fileUpload = React.createRef();
        this.state = {
            content: "",
            _id: this.props.match.params._id,
            title: '',
            picture: '',
            src: "",
            fileUpload: fileUpload,
            uploaded_image: "",
            is_image_uploaded: 0,
            errors: '',
            saving:false,
            display:"none"
        }
        this.changeTitleHandler = this.changeTitleHandler.bind(this);
        this.saveOrUpdateOurWork = this.saveOrUpdateOurWork.bind(this);

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
            OurWorkService.getById(this.state._id).then((res) => {
                let ourwork = res.data;
                this.setState({
                    title: ourwork.title,
                    picture: ourwork.picture,
                });
            });
        }

    }

    saveOrUpdateOurWork = (e) => {
        e.preventDefault();
        //alert(this.state.uploaded_image);
        var error = 0;
        var errors = '';

        if (this.state.title === '') {
            errors += '<br>Title missing';
            error = 1;
        }

        if (this.state._id === '_add') {
            if (this.state.is_image_uploaded === 0) {
                errors += '<br>Picture missing';
                error = 1;
            }
        }

        if (error === 1) {
            this.setState({
                errors: errors,
            });
            return;
        }

        this.setState({saving: true});
        this.setState({display: "block"});

        let data = {title: this.state.title, image: this.state.uploaded_image};
        //console.log('data => ' + JSON.stringify(data));

        const formData = new FormData();
        formData.append("title", this.state.title);
        formData.append("image", this.state.uploaded_image);


        // step 5
        if (this.state._id === '_add') {
            OurWorkService.create(formData).then(res => {
                this.props.history.push('/nitaliablankets');
            });
        } else {
            OurWorkService.update(formData, this.state._id).then(res => {
                this.props.history.push('/nitaliablankets');
            });
        }
    }

    changeTitleHandler = (event) => {
        this.setState({title: event.target.value});
    }

    cancel() {
        this.props.history.push('/nitaliablankets');
    }

    getTitle() {
        if (this.state._id === '_add') {
            return <h2 className="text-center">Add Nitalia Blanket Gallery</h2>
        } else {
            return <h2 className="text-center">Update Nitalia Blanket Gallery</h2>
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
                        src={HttpCommon.defaults.imageURL + '/uploads/nitaliablankets/' + this.state.picture}/>;
        } else {
            return "";
        }
    }


    render() {

        console.log(this.state.ourworks);

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
                            this.getTitle()
                        }

                        <div className="content" dangerouslySetInnerHTML={{__html: this.state.errors}}></div>

                        <form>
                            <div className="form-group">
                                <label> Title: </label>
                                <input placeholder="Title" name="title" className="form-control"
                                       value={this.state.title} onChange={this.changeTitleHandler}/>
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
                                        <span>SVG, PNG, JPG or GIF (Best. 1600 x 800 px)</span>
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


                            <button className="btn btn-success" onClick={this.saveOrUpdateOurWork}>Save</button>
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
