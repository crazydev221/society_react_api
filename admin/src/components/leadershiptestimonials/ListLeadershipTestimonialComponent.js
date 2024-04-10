import React, {Component} from "react";

import UserService from "../../services/user.service";
import EventBus from "../../common/EventBus";
import LeadershipTestimonialService from '../../services/LeadershipTestimonialService';
import HttpCommon from "../../http-common";


export default class ListLeadershipTestimonialComponent extends Component {
    constructor(props) {
        super(props);

        this.state = {
            content: "",
            pager: {},
            leadershiptestimonials: []
        }
        this.addLeadershipTestimonial = this.addLeadershipTestimonial.bind(this);
        this.editLeadershipTestimonial = this.editLeadershipTestimonial.bind(this);
        this.deleteLeadershipTestimonial = this.deleteLeadershipTestimonial.bind(this);

    }

    deleteLeadershipTestimonial(_id) {

        if (!window.confirm("Confirm the deletion attempt!")) {
            return;
        }

        LeadershipTestimonialService.delete(_id).then(res => {
            this.setState({leadershiptestimonials: this.state.leadershiptestimonials.filter(LeadershipTestimonial => LeadershipTestimonial._id !== _id)});
        });
    }

    viewLeadershipTestimonial(_id) {
        this.props.history.push(`/view-leadershiptestimonials/${_id}`);
    }

    editLeadershipTestimonial(_id) {
        this.props.history.push(`/add-leadershiptestimonial/${_id}`);
    }

    addLeadershipTestimonial() {
        this.props.history.push('/add-leadershiptestimonial/_add');
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
            LeadershipTestimonialService.getLists(page).then((LeadershipTestimonials) => {

                //console.log("AMITABH");
                //console.log(users.data.users);

                this.setState({leadershiptestimonials: LeadershipTestimonials.data.leadershiptestimonials});
            });

        }


    }

    render() {

        //console.log(this.state.LeadershipTestimonials);

        return (
            <div className="col-12">
                <h2 className="text-center">Leadership Testimonial List</h2>
                <div className="mb-3">
                    <button className="btn btn-primary" onClick={this.addLeadershipTestimonial}> Add Leadership
                        Testimonial
                    </button>
                </div>
                <div className="table-responsive">
                    <table className="table table-striped table-bordered gallery-table-one">

                        <thead>
                            <tr>
                                <th> Name</th>
                                <th>Note</th>
                                <th>Description</th>
                                <th> Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                        {
                            this.state.leadershiptestimonials.map(
                                LeadershipTestimonial =>
                                    <tr key={LeadershipTestimonial._id}>
                                        <td> {LeadershipTestimonial.name} </td>
                                        <td> {LeadershipTestimonial.note} </td>

                                        <td> {LeadershipTestimonial.description} </td>
                                        <td>
                                            <button style={{margin: "5px"}}
                                                onClick={() => this.editLeadershipTestimonial(LeadershipTestimonial._id)}
                                                className="btn btn-info">Update
                                            </button>
                                            <button style={{margin: "5px"}}
                                                    onClick={() => this.deleteLeadershipTestimonial(LeadershipTestimonial._id)}
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
