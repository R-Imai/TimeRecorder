import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import copy from 'copy-to-clipboard';
import Form from './Form'



class App extends Component {
	constructor() {
		super();
		this.day = this.getDay();
		this.state = {
			workHistory:[],
			workHistoryStr: '"' + this.day + '":{\n}',
			textValue: null,
			startTime: null,
			isWorking: false,
			isEdit: false
		};
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
		const msg = e.formData.name != null ? e.formData.tag + "/" + e.formData.name : e.formData.tag;
		this.setState({
			textValue: msg,
			startTime: this.getTime(),
			isWorking: true
		});
	}

	clearInfo(){
		this.setState({
			textValue: null,
			startTime: null,
			isWorking: false
		});
	}

	submit(){
		const finTime = this.getTime();
		let wh = this.state.workHistory;
	 	wh.push('"' + this.state.textValue + '":"' + this.state.startTime + "-" + finTime + '"');
		let whStr = this.state.workHistoryStr;
		whStr = whStr.replace('"\n', '",\n')
		whStr = whStr.split("\n}")[0]
		whStr += '\n\t"' + this.state.textValue + '":"' + this.state.startTime + "-" + finTime + '"\n}'
		this.setState({
			workHistory: wh,
			workHistoryStr: whStr,
			textValue: null,
			startTime: null,
			isWorking: false
		});
	}

	edit(){
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
					<div className="job-data">
						<div className="job-text">
							<div className="message">
								作業中...
							</div>
							<div style={{"fontSize": this.state.textValue.length<15?20:(this.state.textValue.length<24?15:13)}}>
								{this.state.textValue + ": " + this.state.startTime + "-"}
							</div>
						</div>
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
					/>
				);

		return (
			<div>
				{mainText}

				<textarea className="record-space" cols="50" rows="15" value={this.state.workHistoryStr} onChange={this.changeText.bind(this)} readOnly={!this.state.isEdit}></textarea>

				<div className="button-space">
          <div className="padding-button copy-button">
            <button type="button" onClick={this.copy.bind(this)}>Copy</button>
          </div>
					<div className="padding-button edit-button">
						<button type="button" onClick={this.edit.bind(this)}>{this.state.isEdit ?"Edit finish":"Edit start"}</button>
					</div>
				</div>
        <Link to="/calc" className="padding-button transition-button">
          <button type="button">go to CalcPage</button>
        </Link>
			</div>
		);
	}
}

export default App;
