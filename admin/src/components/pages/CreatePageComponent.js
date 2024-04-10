import React, {Component} from "react";
import './dist/quill.snow.css';
import UserService1 from "../../services/user.service";
import EventBus from "../../common/EventBus";
import PageService from '../../services/PageService';
import {isEmail} from "validator";
import HttpCommon from "../../http-common";
import ReactQuill, {Quill} from "react-quill";
import ImageUploader from "quill-image-uploader";

import { ColorRing } from 'react-loader-spinner';

Quill.register("modules/imageUploader", ImageUploader);

var Block = Quill.import('blots/block');
Block.tagName = 'DIV';
Quill.register(Block, true);


export default class CreatePageComponent extends Component {


    constructor(props) {
        super(props);

        this.state = {
            _id: this.props.match.params._id,
            title: '',
            content: '',
            errors: '',
            editorHtml: ""
        }
        this.changeTitleHandler = this.changeTitleHandler.bind(this);
        this.changeContentHandler = this.changeContentHandler.bind(this);
        this.saveOrUpdatePage = this.saveOrUpdatePage.bind(this);

        this.handleChange = this.handleChange.bind(this);
        this.textInput = React.createRef();

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

        if (this.state._id === '_add') {
            return
        } else {
            PageService.getPageById(this.state._id).then((res) => {
                let page = res.data;
                this.setState({
                    title: page.title,
                    content: page.content,
                    editorHtml: page.content,
                });
            });
        }

    }

    saveOrUpdatePage = (e) => {
        e.preventDefault();
        var editor = this.state.editorHtml;


        var error = 0;
        var errors = '';

        if (this.state.title === '') {
            errors += '<br>Title missing';
            error = 1;
        }

        if (this.state.content === '') {
            errors += '<br>Content missing';
            error = 1;
        }

        if (error === 1) {
            this.setState({
                errors: errors,
            });
            return;
        }

        let page = {title: this.state.title, content: this.state.content};
        console.log('page => ' + JSON.stringify(page));

        // step 5
        if (this.state._id === '_add') {
            PageService.createPage(page).then(res => {
                this.props.history.push('/pages');
            });
        } else {
            PageService.updatePage(page, this.state._id).then(res => {
                this.props.history.push('/pages');
            });
        }
    }

    changeTitleHandler = (event) => {
        this.setState({title: event.target.value});
    }

    changeContentHandler = (event) => {
        this.setState({content: event.target.value});
    }


    cancel() {
        this.props.history.push('/pages');
    }

    getTitle() {
        if (this.state._id === '_add') {
            return <h2 className="text-center">Add Page</h2>
        } else {
            return <h2 className="text-center">Update Page</h2>
        }
    }


    handleChange(html) {
        this.setState({editorHtml: html});
    }

    handleSubmit() {

        const editor = this.reactQuillRef.getEditor();
        this.setState({
            editorHtml: editor
        });
    }

    modules = {
        // #3 Add "image" to the toolbar
        toolbar: [
            [{header: [1, 2, false]}],
            ["bold", "italic", "underline", "strike", "blockquote"],
            [
                {list: "ordered"},
                {list: "bullet"},
                {indent: "-1"},
                {indent: "+1"}
            ],
            ["link", "image", "video"],
            ["clean", "code-block"]
        ],
        // # 4 Add module and upload function
        imageUploader: {
            upload: (file) => {
                return new Promise((resolve, reject) => {
                    const formData = new FormData();
                    formData.append("image", file);

                    fetch(
                        //"https://api.imgbb.com/1/upload?key=334ecea9ec1213784db5cb9a14dac265",

                        HttpCommon.defaults.baseURL + "/save-image",

                        {
                            method: "POST",
                            body: formData
                        }
                    )
                        .then((response) => response.json())
                        .then((result) => {
                            console.log(result);
                            resolve(result.url);
                        })
                        .catch((error) => {
                            reject("Upload failed");
                            console.error("Error:", error);
                        });
                });
            }
        }
    };

    formats = [
        "header",
        "bold",
        "italic",
        "underline",
        "strike",
        "blockquote",
        "list",
        "bullet",
        "indent",
        "link",
        "image",
        "imageBlot" // #5 Optinal if using custom formats
    ];


    render() {

        console.log(this.state.pages);

        return (
            <div className="col-lg-6 col-md-8 offset-lg-3 offset-md-2">
                <div className="card">
                    <div className="card-body">

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
                                <label> Content: </label>
                                <textarea style={{'display': 'block'}} className="form-control" cols="15"
                                          rows="10" name="content" value={this.state.content}
                                          onChange={this.changeContentHandler}>{this.state.content}</textarea>

                            </div>
                            <br/><br/><br/>
                            <div className="form-group">
                                <button className="btn btn-success" onClick={this.saveOrUpdatePage}>Save
                                </button>
                                <button className="btn btn-danger" onClick={this.cancel.bind(this)}
                                        style={{marginLeft: "10px"}}>Cancel
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        );
    }
}
