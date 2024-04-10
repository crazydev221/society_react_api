import React, { Component } from "react";
import { connect } from "react-redux";
import { Router, Switch, Route } from "react-router-dom";

import Home from "./components/home.component";

// import Footer from "./components/footer.component";

class App extends Component {

    render() {
        return (
            <Router>
                <Switch>
                    <Route exact path={["/", "/home"]} component={Home} />
                </Switch>
                {/* <Footer /> */}
            </Router>
        );
    }
}

function mapStateToProps(state) {
    const { user } = state.auth;
    return {
        user,
    };
}

export default connect(mapStateToProps)(App);
