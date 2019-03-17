import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import copy from 'copy-to-clipboard';
import Form from './Form'

import * as RecordAction from "../Actions/RecordAction";
import * as SettingAction from '../Actions/SettingAction';

class App extends Component {
	constructor() {
		super();
		this.day = this.getDay();
		this.state = {
			workHistory:[],
			workHistoryStr: '',
			textValue: null,
			startTime: null,
			isWorking: false,
			isEdit: false,
      recordPath: "",
      sugestList: []
		};
	}

  componentDidMount() {
    RecordAction.recordStartGet(this.setTextValue.bind(this));
    SettingAction.recordPathGet(this.setPath.bind(this));
    SettingAction.colorConfigGet(this.setColor.bind(this))
  }

  setPath(path){
    RecordAction.recordGet(path, this.day, this.setWorkHistoryStr.bind(this))
    this.setState({
      recordPath: path
    })
  }

  setColor(color){
    this.setState({
      sugestList: Object.keys(color).map((v) => {return v})
    })
  }

  setTextValue(val){
    if(val !== ""){
      val = val.split("$")
      this.setState({
        textValue: val[0],
        startTime: val[1],
        isWorking: true
      })
    }
  }

	getDay(){
		const Now = new Date();
		return Now.getDate();
	}

	getTime(){
		const Now = new Date();
		const hh = ("00" + Now.getHours()).slice(-2);
		const mm = ("00" + Now.getMinutes()).slice(-2);
		return hh + ":" + mm;
	}

	tagChange(e){
		const msg = e.name != "" ? e.genre + "/" + e.name : e.genre;
    const sTime = this.getTime()
    RecordAction.recordStart(msg+"$"+sTime, console.log);
		this.setState({
			textValue: msg,
			startTime: sTime,
			isWorking: true
		});
	}

	clearInfo(){
    RecordAction.recordStart("", console.log);
		this.setState({
			textValue: null,
			startTime: null,
			isWorking: false
		});
	}

  setWorkHistoryStr(v){
    const strValue = JSON.stringify(v, null , "    ").slice(6, -2).replace(/\n    /g, "\n");
    this.setState({
      workHistory: v,
      workHistoryStr: strValue
    })
  }

  submit(){
		const finTime = this.getTime();
		let whStr = this.state.workHistoryStr;
		whStr = whStr.replace('"\n', '",\n')
		whStr = whStr.split("\n}")[0]
		whStr += '\n\t"' + this.state.textValue + '":"' + this.state.startTime + "-" + finTime + '"\n}'
    RecordAction.recordStart("", console.log);
    let param = {
      day: String(this.day),
      path: this.state.recordPath,
      subj: this.state.textValue,
      val: this.state.startTime + "-" + finTime
    }
    RecordAction.recordEnd(param, this.setWorkHistoryStr.bind(this));
		this.setState({
			workHistoryStr: whStr,
			textValue: null,
			startTime: null,
			isWorking: false
		});
	}

	edit(){
    if(this.state.isEdit){
      RecordAction.recordEdit(this.state.recordPath, "{"+this.state.workHistoryStr+"}", String(this.day), console.log)
    }
		this.setState({
			isEdit: !this.state.isEdit
		});
	}

	reset(){
		this.setState({workHistoryStr: '"' + this.day + '":{\n}'});
	}

	copy(){
		copy(this.state.workHistoryStr)
	}

	arr2html(arr){
		const len = arr.length - 1;
		let txt = '"' + this.day + '":{\n\t';
		arr.forEach((elem, i) => {
			txt += i < len ? elem + ",\n\t": elem;
		})
		txt += "\n}"
		return txt
	}

	changeText(e){
		this.setState({workHistoryStr:e.target.value});
	}


	render() {
		const mainText = this.state.isWorking ? (
          <div className="form-style form-style-black">
            <fieldset>
              <div className="job-text">
  							<div className="message">
  								作業中...
  							</div>
  							<div style={{"fontSize": this.state.textValue.length<15?20:(this.state.textValue.length<24?15:13)}}>
  								{this.state.textValue + ": " + this.state.startTime + "-"}
  							</div>
              </div>
						</fieldset>
						<div className="button-space">
							<div className="padding-button finish-button">
								<button type="button" onClick={this.submit.bind(this)}>Finish!</button>
							</div>
							<div className="padding-button clear-button">
								<button type="button" onClick={this.clearInfo.bind(this)}>Clear</button>
							</div>
						</div>
					</div>
				):(
					<Form
							callSubmit={this.tagChange.bind(this)}
              sugestList={this.state.sugestList}
					/>
				);
    const editBtnStyle = this.state.isEdit?"padding-button edit-doing":"padding-button edit-button"
		return (
			<div>
				{mainText}

				<textarea className="record-space" cols="50" rows="15" value={this.state.workHistoryStr} onChange={this.changeText.bind(this)} readOnly={!this.state.isEdit}></textarea>

				<div className="button-space">
          <div className="padding-button copy-button">
            <button type="button" onClick={this.copy.bind(this)}>Copy</button>
          </div>
					<div className={editBtnStyle}>
						<button type="button" onClick={this.edit.bind(this)}>{this.state.isEdit ?"Edit Finish":"Edit Start"}</button>
					</div>
				</div>
        <div className="flex-boxs link-space">
          <Link to="/calc" className="padding-button transition-button">
            <button type="button">CalcPage</button>
          </Link>
          <Link to="/setting">
            <button type="button" className="link-setting-button">
              Setting
            </button>
          </Link>
        </div>
			</div>
		);
	}
}

export default App;
