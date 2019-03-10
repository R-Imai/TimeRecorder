import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import JsonForm from "react-jsonschema-form";
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

  handleSubmit(e) {
    CalcAction.dailyCalc(e.formData, this.setResTxt.bind(this));
    this.setState({
      day: e.formData.day,
      path: e.formData.path
    })
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
    const schema = {
      type: "object",
      required: ["path", "day"],
      properties: {
        path: {type: "string"},
        day: {type: "string"}
      }
    };
    const uiSchema = {
      path: {"ui:placeholder": "ファイルのパス"},
      day: {"ui:placeholder": "日付"}
    };
    const formData = {
      path: this.state.path || '',
      day: this.state.day || ''
    }
    const msg = this.state.msg === "" ? "" : (
      <div className="msg-box">{this.state.msg}</div>
    )
    return (
      <div className="input-form">
        <div className="form-style form-style-white">
          <JsonForm
            schema={schema}
            uiSchema={uiSchema}
            formData={formData}
            onSubmit={this.handleSubmit.bind(this)}
            showErrorList={false}
          />
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
