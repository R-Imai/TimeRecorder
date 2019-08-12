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

  async componentDidMount(){
    const recordPath = await SettingAction.recordPathGet()
    this.setState({
      path: recordPath
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

  async handleSubmit() {
    const query = {
      date: this.state.day,
      path: this.state.path
    }
    const resTxt = await CalcAction.dailyCalc(query, this.setResTxt.bind(this));
    this.setState({
      resultText: resTxt
    })
  }

  copy(){
		copy(this.state.resultText)
	}

  async save(){
    const param = {json_path: this.state.path, save_path: this.state.path.replace(".json", ".png")}
		const figURL = await CalcAction.save(param)
    this.setState({
      msg: figURL
    })
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
            <div className="padding-button calc-button button-mt">
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
          <Link to="/" className="padding-button transition-button to-top">
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
