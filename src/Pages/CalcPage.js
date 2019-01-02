import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import JsonForm from "react-jsonschema-form";
import copy from 'copy-to-clipboard';

import * as CalcAction from "../Actions/CalcAction";

class CalcPage extends Component {
  constructor() {
		super();
		this.state = {
			day: "1",//String(this.getDay()),
      path: "sample_data.json",
			resultText: ""
		};
	}

	getDay(){
		const Now = new Date();
		return Now.getDate();
	}

  setResTxt(val){
    console.log(val)
    this.setState({
      resultText: val
    })
  }

  handleSubmit(e) {
    console.log(e)
    CalcAction.dailyCalc(e.formData, this.setResTxt.bind(this));
    // console.log(r
    this.setState({
      day: e.formData.day,
      path: e.formData.path
    })
  }

  copy(){
		copy(this.state.resultText)
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
    return (
      <div>
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
        <div className="button-space">
          <div className="padding-button copy-button">
            <button type="button" onClick={this.copy.bind(this)}>Copy</button>
          </div>
        </div>
        <Link to="/" className="padding-button transition-button">
          <button type="button">go to TopPage</button>
        </Link>
      </div>
    )
  }
}

export default CalcPage;
