import React, { Component } from 'react';
import logo from '../logo.svg';
import './App.css';
import Form from './Form'



class App extends Component {
	constructor() {
		super();
		this.state = {
			workHistory:[],
			textValue: null,
			startTime: null,
			isWorking: false
		};
		this.day = this.getDay();
	}

	getDay(){
		const Now = new Date();
		return Now.getDate();
	}

	getTime(){
		const Now = new Date();
		const hh = Now.getHours();
		const mm = Now.getMinutes();
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

	reset(){
		this.setState({
			textValue: null,
			startTime: null,
			isWorking: false
		});
	}

	submit(){
		const finTime = this.getTime();
		let wh = this.state.workHistory
	 	wh.push('"' + this.state.textValue + '":"' + this.state.startTime + "-" + finTime + '"');
		this.setState({
			workHistory: wh,
			textValue: null,
			startTime: null,
			isWorking: false
		});
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


	render() {
		const mainText = this.state.isWorking ? (
					<div className="job-data">
						<div className="job-text">
							<div className="message">
								作業中...
							</div>
							{this.state.textValue + ": " + this.state.startTime + "-"}
						</div>
						<div className="finish-button">
							<button type="button" onClick={this.submit.bind(this)}>finish!</button>
						</div>
					</div>
				):(
					<Form
							callSubmit={this.tagChange.bind(this)}
					/>
				);

		return (
			<div className="App">
				<div className="App-header">
					<img src={logo} className="App-logo" alt="logo" />
					<div className="App-title">Time Recorder</div>
				</div>

				{mainText}


			<textarea className="record-space" name="example" value={this.arr2html(this.state.workHistory)} cols="50" rows="15" readOnly="readonly"></textarea>



				<div className="reset-button">
					<button type="button" onClick={this.reset.bind(this)}>reset</button>
				</div>
			</div>
		);
	}
}

export default App;
