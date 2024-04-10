import React, {Component} from "react";
import {connect} from "react-redux";
import {Router, Switch, Route, Link} from "react-router-dom";

import "./App.css";

import Login from "./components/login.component";
import Register from "./components/register.component";
import Home from "./components/home.component";
import Profile from "./components/profile.component";


import ListUserComponent from './components/users/ListUserComponent'
import CreateUserComponent from './components/users/CreateUserComponent'
import UpdateUserComponent from './components/users/UpdateUserComponent'
import ViewUserComponent from './components/users/ViewUserComponent'

import ListPageComponent from './components/pages/ListPageComponent'
import CreatePageComponent from './components/pages/CreatePageComponent'
//import ViewUserComponent from './components/pages/ViewUserComponent'

import ListOurWorkComponent from './components/ourworks/ListOurWorkComponent'
import CreateOurWorkComponent from './components/ourworks/CreateOurWorkComponent'
import UpdateOurWorkComponent from './components/ourworks/UpdateOurWorkComponent'
import ViewOurWorkComponent from './components/ourworks/ViewOurWorkComponent'

import ListLeadershipTeamComponent from './components/leadershipteams/ListLeadershipTeamComponent'
import CreateLeadershipTeamComponent from './components/leadershipteams/CreateLeadershipTeamComponent'


import ListLeadershipTestimonialComponent from './components/leadershiptestimonials/ListLeadershipTestimonialComponent'
import CreateLeadershipTestimonialComponent
    from './components/leadershiptestimonials/CreateLeadershipTestimonialComponent'

import ListSupportComponent from './components/supports/ListSupportComponent'
import CreateSupportComponent from './components/supports/CreateSupportComponent'

import ListNitaliaBlanketComponent from './components/nitaliablankets/ListNitaliaBlanketComponent'
import CreateNitaliaBlanketComponent from './components/nitaliablankets/CreateNitaliaBlanketComponent'

import ListPurpleApartmentComponent from './components/purpleapartments/ListPurpleApartmentComponent'
import CreatePurpleApartmentComponent from './components/purpleapartments/CreatePurpleApartmentComponent'

import ListJuniorPurpleSocietyComponent from './components/juniors/ListJuniorComponent'
import CreateJuniorPurpleSocietyComponent from './components/juniors/CreateJuniorComponent'


import ListJuniorComponent from './components/juniorforms/ListJuniorComponent'
import CreateJuniorComponent from './components/juniorforms/CreateJuniorComponent'

import ListVolunteerComponent from './components/volunteers/ListVolunteerComponent'
import CreateVolunteerComponent from './components/volunteers/CreateVolunteerComponent'

import ListContactComponent from './components/contacts/ListContactComponent'
import CreateContactComponent from './components/contacts/CreateContactComponent'


import ListNewsletterComponent from './components/newsletters/ListNewsletterComponent'
import CreateNewsletterComponent from './components/newsletters/CreateNewsletterComponent'


import BoardModerator from "./components/board-moderator.component";
import BoardAdmin from "./components/board-admin.component";

import {logout} from "./actions/auth";
import {clearMessage} from "./actions/message";

import {history} from './helpers/history';

// import AuthVerify from "./common/auth-verify";
import EventBus from "./common/EventBus";


class App extends Component {
    constructor(props) {
        super(props);
        this.logOut = this.logOut.bind(this);

        this.state = {
            showModeratorBoard: false,
            showAdminBoard: false,
            currentUser: undefined,
        };

        history.listen((location) => {
            props.dispatch(clearMessage()); // clear message when changing location
        });
    }

    componentDidMount() {
        const user = this.props.user;

        if (user) {
            this.setState({
                currentUser: user,
                showModeratorBoard: user.roles.includes("ROLE_MODERATOR"),
                showAdminBoard: user.roles.includes("ROLE_ADMIN"),
            });
        }

        EventBus.on("logout", () => {
            this.logOut();
        });
    }

    componentWillUnmount() {
        EventBus.remove("logout");
    }

    logOut() {
        this.props.dispatch(logout());
        this.setState({
            showModeratorBoard: false,
            showAdminBoard: false,
            currentUser: undefined,
        });
    }

    render() {
        const {currentUser, showModeratorBoard, showAdminBoard} = this.state;

        return (
            <Router history={history}>
                <div>
                    <nav className="navbar navbar-expand-md navbar-dark bg-dark">
                        <div className="container">
                            <Link to={"/admin"} className="navbar-brand">
                                Werpurple Admin Panel
                            </Link>
                            <button className="navbar-toggler" type="button" data-toggle="collapse"
                                    data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent"
                                    aria-expanded="false" aria-label="Toggle navigation">
                                <span className="navbar-toggler-icon"></span>
                            </button>

                            <div className="collapse navbar-collapse" id="navbarSupportedContent">
                                <ul className="navbar-nav">
                                    <li className="nav-item" style={{display: 'none'}}>
                                        <Link to={"/home"} className="nav-link">
                                            Home
                                        </Link>
                                    </li>

                                    {showModeratorBoard && (
                                        <li className="nav-item">
                                            <Link to={"/mod"} className="nav-link">
                                                Moderator Board
                                            </Link>
                                        </li>
                                    )}

                                    {showAdminBoard && (
                                        <li className="nav-item" style={{display: 'none'}}>
                                            <Link to={"/admin"} className="nav-link">
                                                Admin Board
                                            </Link>
                                        </li>
                                    )}

                                    {currentUser && (
                                        <li className="nav-item dropdown">
                                            <a href={''} className="nav-link dropdown-toggle" id="navbarDropdown"
                                               role="button" data-toggle="dropdown" aria-haspopup="true"
                                               aria-expanded="false">
                                                Support our Cause
                                            </a>
                                            <div className="dropdown-menu" aria-labelledby="navbarDropdown">
                                                {currentUser && (
                                                    <Link to={"/supports"} className="dropdown-item">
                                                        Supports
                                                    </Link>
                                                )}
                                                {currentUser && (
                                                    <Link to={"/ourworks"} className="dropdown-item">
                                                        Our Work Gallery
                                                    </Link>
                                                )}
                                                {currentUser && (
                                                    <Link to={"/nitaliablankets"} className="dropdown-item">
                                                        Nitalia Blankets
                                                    </Link>
                                                )}
                                                {currentUser && (
                                                    <Link to={"/purpleapartments"} className="dropdown-item">
                                                        Purple Apartments
                                                    </Link>
                                                )}
                                                {currentUser && (
                                                    <Link to={"/juniors"} className="dropdown-item">
                                                        Junior Purple Societies
                                                    </Link>
                                                )}
                                            </div>
                                        </li>
                                    )}


                                    {currentUser && (
                                        <li className="nav-item">
                                            <Link to={"/leadershipteams"} className="nav-link">
                                                Teams
                                            </Link>
                                        </li>
                                    )}

                                    {currentUser && (
                                        <li className="nav-item">
                                            <Link to={"/leadershiptestimonials"} className="nav-link">
                                                Testimonials
                                            </Link>
                                        </li>
                                    )}


{currentUser && (
    <li className="nav-item">
        <Link to={"/volunteers"} className="nav-link">
            Volunteers
        </Link>
    </li>
)}
{currentUser && (
    <li className="nav-item">
        <Link to={"/juniorpurplesocieties"} className="nav-link">
        Junior Purple Society Users
        </Link>
    </li>
)}

{currentUser && (
    <li className="nav-item">
        <Link to={"/contacts"} className="nav-link">
            Contacts
        </Link>
    </li>
)}    
{currentUser && (
    <li className="nav-item">
        <Link to={"/newsletters"} className="nav-link">
            Newsletters
        </Link>
    </li>
)}                   


                                </ul>
                                <ul className="navbar-nav ml-auto">
                                    {currentUser ? (
                                        <li className="nav-item">
                                            <a href="/login" className="nav-link" onClick={this.logOut}>
                                                Logout
                                            </a>
                                        </li>
                                    ) : (
                                        <li className="nav-item">
                                            <Link to={"/login"} className="nav-link">
                                                Login
                                            </Link>
                                        </li>
                                    )}
                                </ul>
                            </div>
                        </div>
                    </nav>

                    <section className="body-content">
                        <div className="container">
                            <div className="row">
                                <Switch>
                                    <Route exact path={["/", "/home"]} component={Home}/>
                                    <Route exact path="/login" component={Login}/>
                                    <Route exact path="/register" component={Register}/>
                                    <Route exact path="/profile" component={Profile}/>

                                    <Route path="/users" component={ListUserComponent}></Route>
                                    <Route path="/add-user/:_id" component={CreateUserComponent}></Route>
                                    <Route path="/update-user/:_id" component={UpdateUserComponent}></Route>
                                    <Route path="/view-user/:_id" component={ViewUserComponent}></Route>

                                    <Route path="/ourworks" component={ListOurWorkComponent}></Route>
                                    <Route path="/add-ourwork/:_id" component={CreateOurWorkComponent}></Route>
                                    <Route path="/update-ourwork/:_id" component={UpdateOurWorkComponent}></Route>
                                    <Route path="/view-ourwork/:_id" component={ViewOurWorkComponent}></Route>

                                    <Route path="/leadershipteams" component={ListLeadershipTeamComponent}></Route>
                                    <Route path="/add-leadershipteam/:_id"
                                           component={CreateLeadershipTeamComponent}></Route>


                                    <Route path="/leadershiptestimonials"
                                           component={ListLeadershipTestimonialComponent}></Route>
                                    <Route path="/add-leadershiptestimonial/:_id"
                                           component={CreateLeadershipTestimonialComponent}></Route>


                                    <Route path="/supports" component={ListSupportComponent}></Route>
                                    <Route path="/add-support/:_id" component={CreateSupportComponent}></Route>


                                    <Route path="/nitaliablankets" component={ListNitaliaBlanketComponent}></Route>
                                    <Route path="/add-nitaliablanket/:_id"
                                           component={CreateNitaliaBlanketComponent}></Route>

                                    <Route path="/purpleapartments" component={ListPurpleApartmentComponent}></Route>
                                    <Route path="/add-purpleapartment/:_id"
                                           component={CreatePurpleApartmentComponent}></Route>

                                    <Route path="/juniors" component={ListJuniorPurpleSocietyComponent}></Route>
                                    <Route path="/add-junior/:_id"
                                           component={CreateJuniorPurpleSocietyComponent}></Route>


                                    <Route path="/juniorpurplesocieties" component={ListJuniorComponent}></Route>
                                    <Route path="/add-juniorpurplesocieties/:_id"
                                           component={CreateJuniorComponent}></Route>

                                    <Route path="/volunteers" component={ListVolunteerComponent}></Route>
                                    <Route path="/add-volunteers/:_id" component={CreateVolunteerComponent}></Route>

                                    <Route path="/contacts" component={ListContactComponent}></Route>
                                    <Route path="/add-contacts/:_id" component={CreateContactComponent}></Route>

                                    <Route path="/newsletters" component={ListNewsletterComponent}></Route>
                                    <Route path="/add-newsletters/:_id" component={CreateNewsletterComponent}></Route>

                                    <Route path="/pages" component={ListPageComponent}></Route>
                                    <Route path="/add-page/:_id" component={CreatePageComponent}></Route>


                                    <Route path="/mod" component={BoardModerator}/>
                                    <Route path="/admin" component={BoardAdmin}/>
                                </Switch>
                            </div>
                        </div>
                    </section>
                </div>
            </Router>
        )
            ;
    }
}

function mapStateToProps(state) {
    const {user} = state.auth;
    return {
        user,
    };
}

export default connect(mapStateToProps)(App);
