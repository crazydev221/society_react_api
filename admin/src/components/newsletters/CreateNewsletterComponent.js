import React, {Component} from "react";

import UserService from "../../services/user.service";
import EventBus from "../../common/EventBus";
import NewsletterService from '../../services/NewsletterService';
import HttpCommon from "../../http-common";

import {ColorRing} from 'react-loader-spinner';

export default class CreateNewsletterComponent extends Component {
    constructor(props) {
        super(props);
        var fileUpload = React.createRef();
        this.state = {
            Newsletters: [],
            content: "",
            _id: this.props.match.params._id,
            email: '',
            content: '',
            errors: '',
            saving:false,
            display:"none"
        }

        this.changeEmailHandler = this.changeEmailHandler.bind(this);
        this.saveOrUpdateNewsletter = this.saveOrUpdateNewsletter.bind(this);

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
            NewsletterService.getById(this.state._id).then((res) => {
                let Newsletter = res.data;
                this.setState({
                    email: Newsletter.email
                });
            });
        }
    }

    saveOrUpdateNewsletter = (e) => {
        e.preventDefault();
        //alert(this.state.uploaded_image);
        var error = 0;
        var errors = '';

        if (this.state.email === '') {
            errors += '<br>Email missing';
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

        let data = {email: this.state.email};
        //console.log('data => ' + JSON.stringify(data));

        // step 5
        if (this.state._id === '_add') {
            NewsletterService.create(data).then(res => {

                this.props.history.push('/newsletters');
            });
        } else {
            NewsletterService.update(data, this.state._id).then(res => {
                this.props.history.push('/newsletters');
            });
        }
    }


    changeEmailHandler = (event) => {
        this.setState({email: event.target.value});
    }


    cancel() {
        this.props.history.push('/newsletters');
    }

    getname() {
        if (this.state._id === '_add') {
            return <h3 className="text-center">Add Newsletter</h3>
        } else {
            return <h3 className="text-center">Update Newsletter</h3>
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
                        src={HttpCommon.defaults.imageURL + '/uploads/Newsletters/' + this.state.picture}/>;
        } else {
            return "";
        }
    }


    render() {

        console.log(this.state.Newsletters);

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
                                <label> Email: </label>
                                <input placeholder="Email" name="email" className="form-control"
                                       value={this.state.email} onChange={this.changeEmailHandler}/>
                            </div>


                            <button className="btn btn-success" onClick={this.saveOrUpdateNewsletter}>Save
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
