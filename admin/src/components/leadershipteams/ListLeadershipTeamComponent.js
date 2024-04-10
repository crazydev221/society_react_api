import React, {Component} from "react";

import UserService from "../../services/user.service";
import EventBus from "../../common/EventBus";
import LeadershipTeamService from '../../services/LeadershipTeamService';
import HttpCommon from "../../http-common";


export default class ListLeadershipTeamComponent extends Component {
    constructor(props) {
        super(props);

        this.state = {
            content: "",
            pager: {},
            LeadershipTeams: []
        }
        this.addLeadershipTeam = this.addLeadershipTeam.bind(this);
        this.editLeadershipTeam = this.editLeadershipTeam.bind(this);
        this.deleteLeadershipTeam = this.deleteLeadershipTeam.bind(this);

    }

    deleteLeadershipTeam(_id) {

        if (!window.confirm("Confirm the our work gallery deletion attempt!")) {
            return;
        }

        LeadershipTeamService.delete(_id).then(res => {
            this.setState({LeadershipTeams: this.state.LeadershipTeams.filter(LeadershipTeam => LeadershipTeam._id !== _id)});
        });
    }

    viewLeadershipTeam(_id) {
        this.props.history.push(`/view-leadershipteam/${_id}`);
    }

    editLeadershipTeam(_id) {
        this.props.history.push(`/add-leadershipteam/${_id}`);
    }

    addLeadershipTeam() {
        this.props.history.push('/add-leadershipteam/_add');
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
            LeadershipTeamService.getLists(page).then((LeadershipTeams) => {

                //console.log("AMITABH");
                //console.log(users.data.users);

                this.setState({LeadershipTeams: LeadershipTeams.data.leadershipteams});
            });

        }


    }

    render() {

        //console.log(this.state.LeadershipTeams);

        return (
            <div className="col-12">
                <h2 className="text-center">Leadership Team List</h2>
                <div className="mb-3">
                    <button className="btn btn-primary" onClick={this.addLeadershipTeam}> Add Leadership Team
                    </button>
                </div>
                <div className="table-responsive">
                    <table className="table table-striped table-bordered">

                        <thead>
                        <tr>
                            <th> Name</th>
                            <th>Designation</th>
                            <th>Picture</th>
                            <th>Description</th>
                            <th> Actions</th>
                        </tr>
                        </thead>
                        <tbody>
                        {
                            this.state.LeadershipTeams.map(
                                LeadershipTeam =>
                                <tr key={LeadershipTeam._id}>
                                    <td> {LeadershipTeam.name} </td>
                                    <td> {LeadershipTeam.designation} </td>
                                    <td><img className="main-img"
                                             src={HttpCommon.defaults.imageURL + '/uploads/leadershipteams/' + LeadershipTeam.picture}
                                             alt=""/></td>
                                    <td> {LeadershipTeam.description} </td>
                                    <td>
                                        <button style={{margin: "5px"}}
                                                onClick={() => this.editLeadershipTeam(LeadershipTeam._id)}
                                                className="btn btn-info">Update
                                        </button>
                                        <button style={{margin: "5px"}}
                                                onClick={() => this.deleteLeadershipTeam(LeadershipTeam._id)}
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
