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
      jobInfo: {
        subject: null,
        value: null,
        startTime: null,
      },
			isWorking: false,
			isEdit: false,
      recordPath: "",
      sugestList: []
		};
	}

  async componentDidMount() {
    const promiseAllRes = await Promise.all([
      RecordAction.recordStartGet(),
      SettingAction.recordPathGet(),
      SettingAction.getActiveSubject()
    ])
    const startVal = promiseAllRes[0]
    const recordPath = promiseAllRes[1]
    const sugestList = promiseAllRes[2]

    const workHistory = await RecordAction.recordGet(recordPath, this.day)
    const jobInfo = {
      subject: startVal.isDoing ? startVal.jobInfo.subject: null,
      value: startVal.isDoing ? startVal.jobInfo.value: null,
      startTime: startVal.isDoing ? startVal.jobInfo.startTime : null,
    }
    this.setState({
      jobInfo: jobInfo,
      isWorking: startVal.isDoing,
      recordPath: recordPath,
      sugestList: sugestList,
      workHistory: workHistory,
      workHistoryStr: JSON.stringify(workHistory, null , "    ").slice(6, -2).replace(/\n {4}/g, "\n")
    })
  }


	getDay(){
		const Now = new Date();
		return Now.getDate();
	}

	async tagChange(e){
    const param = {
      subject: e.genre,
      value: e.name
    }
    await RecordAction.recordStart(param)
    const startVal = await RecordAction.recordStartGet()
    const jobInfo = {
      subject: startVal.isDoing ? startVal.jobInfo.subject: null,
      value: startVal.isDoing ? startVal.jobInfo.value: null,
      startTime: startVal.isDoing ? startVal.jobInfo.startTime : null,
    }
		this.setState({
			jobInfo: jobInfo,
			isWorking: startVal.isDoing
		})
	}

	async clearInfo(){
    await RecordAction.recordClear();
    const jobInfo = {
      subject: null,
      value: null,
      startTime: null,
    }
		this.setState({
			jobInfo: jobInfo,
			isWorking: false
		});
	}

  async submit(){
    await RecordAction.recordEnd()

    const startVal = await RecordAction.recordStartGet()

    const workHistory = await RecordAction.recordGet(this.state.recordPath, this.day)
    const jobInfo = {
      subject: startVal.isDoing ? startVal.jobInfo.subject: null,
      value: startVal.isDoing ? startVal.jobInfo.value: null,
      startTime: startVal.isDoing ? startVal.jobInfo.startTime : null,
    }
    this.setState({
      jobInfo: jobInfo,
      isWorking: startVal.isDoing,
      workHistory: workHistory,
      workHistoryStr: JSON.stringify(workHistory, null , "    ").slice(6, -2).replace(/\n {4}/g, "\n")
    })
	}

	async edit(){
    if(this.state.isEdit){
      const parseData = JSON.parse("{"+this.state.workHistoryStr+"}")
      const param = {
        val: parseData,
        day: this.day,
        path: this.state.recordPath
      }
      await RecordAction.recordEdit(param)
    }
		this.setState({
			isEdit: !this.state.isEdit
		});
	}

	copy(){
		copy(this.state.workHistoryStr)
	}

	changeText(e){
		this.setState({workHistoryStr:e.target.value});
	}

  mkWorkInfoStr(){
    return this.state.jobInfo.value !== "" ? `${this.state.jobInfo.subject} / ${this.state.jobInfo.value}: ${this.state.jobInfo.startTime} - ` : `${this.state.jobInfo.subject}: ${this.state.jobInfo.startTime} - `
  }

  workInfoStrFont() {
    const workStr = this.mkWorkInfoStr()
    return workStr.length < 15 ? 20 : (workStr.length < 24 ? 15 : 13)
  }

	render() {
		const mainText = this.state.isWorking ? (
          <div className="form-style form-style-black">
            <fieldset>
              <div className="job-text">
  							<div className="message">
  								作業中...
  							</div>
  							<div style={{"fontSize": this.workInfoStrFont()}}>
  								{this.mkWorkInfoStr()}
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

				<textarea className="record-space" cols="50" rows="15" value={this.state.workHistoryStr} onChange={this.changeText.bind(this)} readOnly={!this.state.isEdit} placeholder="まだ本日の活動記録がありません"></textarea>

				<div className="button-space">
          <div className="padding-button copy-button">
            <button type="button" onClick={this.copy.bind(this)}>Copy</button>
          </div>
					<div className={editBtnStyle}>
						<button type="button" onClick={this.edit.bind(this)}>{this.state.isEdit ?"Edit Finish":"Edit Start"}</button>
					</div>
				</div>
        <div className="flex-boxs link-space">
          <Link to="/calc" className="padding-button transition-button to-calc">
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
