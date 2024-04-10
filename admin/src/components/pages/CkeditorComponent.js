import React, { Component } from "react";
import UserService1 from "../../services/user.service";
import EventBus from "../../common/EventBus";
import PageService from '../../services/PageService';
import { isEmail } from "validator";
import HttpCommon from "../../http-common";


import { CKEditor, CKEditorContext } from '@ckeditor/ckeditor5-react';

import { ClassicEditor } from '@ckeditor/ckeditor5-editor-classic';
import { Context } from '@ckeditor/ckeditor5-core';
import { Bold, Italic } from '@ckeditor/ckeditor5-basic-styles';
import { Essentials } from '@ckeditor/ckeditor5-essentials';
import { Paragraph } from '@ckeditor/ckeditor5-paragraph';




export default class CkeditorComponent extends Component {


  constructor(props) {
    super(props);

    this.state = {
      _id: this.props.match.params._id,
      title: '',
      content: '',
      errors:'',
      editorHtml:""
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

    if(this.state._id === '_add'){
      return
  }else{
    PageService.getPageById(this.state._id).then( (res) =>{
          let page = res.data;
          this.setState({title: page.title,
              content: page.content,
              editorHtml:page.content,
          });
      });
  }  

  }

  saveOrUpdatePage = (e) => {
    e.preventDefault();
    var editor = this.state.editorHtml;

  
    var error = 0;
    var errors = '';

    if(this.state.title === ''){
      errors += '<br>Title missing';
      error = 1;
    }

    if(this.state.content === ''){
      errors += '<br>Content missing';
      error = 1;
    }

    if(error === 1){
      this.setState({
        errors: errors,
      });      
      return;
    }

    let page = {title: this.state.title, content: this.state.content};
    console.log('page => ' + JSON.stringify(page));

    // step 5
    if(this.state._id === '_add'){
        PageService.createPage(page).then(res =>{
            this.props.history.push('/pages');
        });
    }else{
      PageService.updatePage(page, this.state._id).then( res => {
            this.props.history.push('/pages');
        });
    }
}

changeTitleHandler= (event) => {
    this.setState({title: event.target.value});
}

changeContentHandler= (event) => {
    this.setState({content: event.target.value});
}



cancel(){
    this.props.history.push('/pages');
}

getTitle(){
    if(this.state._id === '_add'){
        return <h3 className="text-center">Add Page</h3>
    }else{
        return <h3 className="text-center">Update Page</h3>
    }
}


handleChange(html) {
  this.setState({ editorHtml: html });
}

handleSubmit() {
  

  this.setState({
    editorHtml: editor
  });
}
modules = {
  // #3 Add "image" to the toolbar
  toolbar: [
    [{ header: [1, 2, false] }],
    ["bold", "italic", "underline", "strike", "blockquote"],
    [
      { list: "ordered" },
      { list: "bullet" },
      { indent: "-1" },
      { indent: "+1" }
    ],
    ["link", "image","video"],
    ["clean","code-block"]
  ],
  // # 4 Add module and upload function
  imageUploader: {
    upload: (file) => {
      return new Promise((resolve, reject) => {
        const formData = new FormData();
        formData.append("image", file);

        fetch(
          //"https://api.imgbb.com/1/upload?key=334ecea9ec1213784db5cb9a14dac265",

          HttpCommon.defaults.baseURL+"/save-image",

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
      <div className="container">
                                                  <CKEditorContext context={ Context }>
                    <h2>Using the CKeditor 5 context feature in React</h2>
                    <CKEditor
                        editor={ ClassicEditor }
                        config={ {
                            plugins: [ Paragraph, Bold, Italic, Essentials ],
                            toolbar: [ 'bold', 'italic' ]
                        } }
                        data="<p>Hello from the first editor working with the context!</p>"
                        onReady={ editor => {
                            // You can store the "editor" and use when it is needed.
                            console.log( 'Editor1 is ready to use!', editor );
                        } }
                    />

                    <CKEditor
                        editor={ ClassicEditor }
                        config={ {
                            plugins: [ Paragraph, Bold, Italic, Essentials ],
                            toolbar: [ 'bold', 'italic' ]
                        } }
                        data="<p>Hello from the second editor working with the context!</p>"
                        onReady={ editor => {
                            // You can store the "editor" and use when it is needed.
                            console.log( 'Editor2 is ready to use!', editor );
                        } }
                    />
                </CKEditorContext>                                      
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
                                            <label> Title: </label>
                                            <input placeholder="Title" name="title" className="form-control" 
                                                value={this.state.title} onChange={this.changeTitleHandler}/>
                                        </div>
                                        <div className = "form-group">
                                            <label> Content: </label>
                                            <textarea style={{'display':'block'}} className="form-control"  cols="15" rows="10" name="content" value={this.state.content} onChange={this.changeContentHandler}>{this.state.content}</textarea>
                                        
                                            



                                        </div>
    <br/><br/><br/>
                                        <div className = "form-group">
                                        <button className="btn btn-success" onClick={this.saveOrUpdatePage}>Save</button>
                                        <button className="btn btn-danger" onClick={this.cancel.bind(this)} style={{marginLeft: "10px"}}>Cancel</button>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>

                   </div>
      </div>
    );
  }
}
