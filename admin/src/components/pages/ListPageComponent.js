import React, {Component} from "react";

import UserService from "../../services/user.service";
import EventBus from "../../common/EventBus";
import PageService from '../../services/PageService';

export default class ListPageComponent extends Component {
    constructor(props) {
        super(props);

        this.state = {
            content: "",
            pager: {},
            pages: []
        }
        this.addPage = this.addPage.bind(this);
        this.editPage = this.editPage.bind(this);
        this.deletePage = this.deletePage.bind(this);

    }

    deletePage(_id) {

        if (!window.confirm("Confirm the page deletion attempt!")) {
            return;
        }

        PageService.deletePage(_id).then(res => {
            this.setState({pages: this.state.pages.filter(page => page._id !== _id)});
        });
    }

    viewPage(_id) {
        this.props.history.push(`/view-page/${_id}`);
    }

    editPage(_id) {
        this.props.history.push(`/add-page/${_id}`);
    }


    addPage() {
        this.props.history.push('/add-page/_add');
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
            PageService.getPages(page).then((pages) => {
                this.setState({pages: pages.data.pages});
            });

        }


    }

    render() {

        console.log(this.state.pages);

        return (
            <div className="col-12">
                <h2 className="text-center">Pages List</h2>
                <div className="mb-3" style={{"display": "none"}}>
                    <button className="btn btn-primary" onClick={this.addPage}> Add Page</button>
                </div>
                <div className="table-responsive">
                    <table className="table table-striped table-bordered">
                        <thead>
                        <tr>
                            <th> Title</th>
                            <th> Actions</th>
                        </tr>
                        </thead>
                        <tbody>
                        {
                            this.state.pages.map(
                                page =>
                                    <tr key={page._id}>
                                        <td> {page.title} </td>
                                        <td>
                                            <button onClick={() => this.editPage(page._id)}
                                                    className="btn btn-info">Update
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
