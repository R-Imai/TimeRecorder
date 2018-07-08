import React, { Component } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import App from "./Pages/App";

export class Routes extends Component {
    constructor() {
        super();
        this.state = {
            active: "home"
        };
    }

    render(){
        window.history.pushState(null, null, "/"+this.state)
        return (
            <Router>
              <Switch>
                <Route exact path="/home" component={App}/>
              </Switch>
            </Router>
        )
    }
}

export default Routes;
