import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import copy from 'copy-to-clipboard';

import * as CalcAction from "../Actions/CalcAction";
import * as SettingAction from '../Actions/SettingAction';

class CalcPage extends Component {
  constructor() {
		super();
		this.state = {
			day: String(this.getDay()),
      path: "",
			resultText: "",
      msg: ""
		};
	}

  componentDidMount(){
    SettingAction.recordPathGet(this.setPath.bind(this));
  }

  setPath(path){
    this.setState({
      path: path
    })
  }

	getDay(){
		const Now = new Date();
		return Now.getDate();
	}

  setResTxt(val){
    this.setState({
      resultText: val
    })
  }

  handleSubmit() {
    const query = {
      day: this.state.day,
      path: this.state.path
    }
    CalcAction.dailyCalc(query, this.setResTxt.bind(this));
  }

  copy(){
		copy(this.state.resultText)
	}

  plot(){
    const param = {json_path: this.state.path}
		CalcAction.plot(param, console.log);
	}

  setMsg(val) {
    if (val !== ""){
      setTimeout(this.setMsg.bind(this), 5000, "");
    }
    this.setState({
      msg: val
    })
  }

  save(){
    const param = {json_path: this.state.path, save_path: this.state.path.replace(".json", ".png")}
		CalcAction.save(param, this.setMsg.bind(this));
	}

  render (){
    const formData = {
      path: this.state.path || '',
      day: this.state.day || ''
    }
    const msg = this.state.msg === "" ? "" : (
      <div className="msg-box">{this.state.msg}</div>
    )
    return (
      <div>
        <div className="input-form">
          <div className="form-style form-style-white">
            <fieldset>
              <input onChange={(e) => {this.setState({path: e.target.value})}} value={formData.path} placeholder="ファイルのパス" type="text" />
              <input onChange={(e) => {this.setState({day: e.target.value})}} value={formData.day} placeholder="日付" type="text" />
            </fieldset>
            <div className="padding-button finish-button">
              <button onClick={this.handleSubmit.bind(this)}>Calc</button>
            </div>
          </div>
        </div>
        <textarea className="daily-report" cols="50" rows="15" value={this.state.resultText} readOnly={true}></textarea>
        {msg}
        <div className="button-space">
          <div className="padding-button copy-button">
            <button type="button" onClick={this.copy.bind(this)}>Copy</button>
          </div>
          <div className="padding-button save-button">
            <button type="button" onClick={this.save.bind(this)}>Save Figure</button>
          </div>
        </div>
        <div className="flex-boxs link-space">
          <Link to="/" className="padding-button transition-button">
            <button type="button">TopPage</button>
          </Link>
          <Link to="/setting">
            <button type="button" className="link-setting-button">
              Setting
            </button>
          </Link>
        </div>
      </div>
    )
  }
}

export default CalcPage;
