import React, { Component } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import logo from './logo.svg';
import './Pages/App.css';
import './Pages/button.css';
import './Pages/themeTop.css';
import './Pages/themeCalc.css';
import './Pages/themeSetting.css';

import App from './Pages/App';
import CalcPage from './Pages/CalcPage';
import SettingPage from './Pages/SettingPage';

export class Routes extends Component {

  render(){
    return (
        <Router>
          <div className="App">
            <div className="App-header">
              <img src={logo} className="App-logo" alt="logo" />
              <div className="App-title">Time Recorder</div>
            </div>
            <Switch>
              <Route exact path="/" component={App}/>
              <Route exact path="/calc" component={CalcPage}/>
              <Route exact path="/setting" component={SettingPage}/>
              <Route exact path="" component={App}/>
            </Switch>
          </div>
        </Router>
    )
  }
}

export default Routes;
