import React, {Component} from "react";

import UserService from "../../services/user.service";
import EventBus from "../../common/EventBus";
import OurWorkService from '../../services/PurpleApartmentService';
import HttpCommon from "../../http-common";


export default class ListPurpleApartmentComponent extends Component {
    constructor(props) {
        super(props);

        this.state = {
            content: "",
            pager: {},
            ourworks: []
        }
        this.addOurWork = this.addOurWork.bind(this);
        this.editOurWork = this.editOurWork.bind(this);
        this.deleteOurWork = this.deleteOurWork.bind(this);

    }

    deleteOurWork(_id) {

        if (!window.confirm("Confirm the deletion attempt!")) {
            return;
        }

        OurWorkService.delete(_id).then(res => {
            this.setState({ourworks: this.state.ourworks.filter(ourwork => ourwork._id !== _id)});
        });
    }

    viewOurWork(_id) {
        this.props.history.push(`/view-purpleapartment/${_id}`);
    }

    editOurWork(_id) {
        this.props.history.push(`/add-purpleapartment/${_id}`);
    }

    addOurWork() {
        this.props.history.push('/add-purpleapartment/_add');
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
            OurWorkService.getLists(page).then((ourworks) => {

                //console.log("AMITABH");
                //console.log(users.data.users);

                this.setState({ourworks: ourworks.data.purpleapartments});
            });

        }


    }

    render() {

        //console.log(this.state.ourworks);

        return (
            <div className="col-12">
                <h2 className="text-center">Purple Apartment List</h2>
                <div className="mb-3">
                    <button className="btn btn-primary" onClick={this.addOurWork}> Add Purple Apartment</button>
                </div>
                <div className="table-responsive">
                    <table className="table table-striped table-bordered gallery-table-one">
                        <thead>
                            <tr>
                                <th> Title</th>
                                <th>Picture</th>

                                <th> Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                        {
                            this.state.ourworks.map(
                                ourwork =>
                                    <tr key={ourwork._id}>
                                        <td> {ourwork.title} </td>
                                        <td><img className="main-img"
                                                 src={HttpCommon.defaults.imageURL + '/uploads/purpleapartments/' + ourwork.picture}
                                                 alt=""/></td>

                                        <td>
                                            <button style={{margin: "5px"}} onClick={() => this.editOurWork(ourwork._id)}
                                                    className="btn btn-info">Update
                                            </button>
                                            <button style={{margin: "5px"}}
                                                    onClick={() => this.deleteOurWork(ourwork._id)}
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
