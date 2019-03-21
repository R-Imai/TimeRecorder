import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import * as SettingAction from '../Actions/SettingAction';

class SettingPage extends Component {
  constructor() {
		super()
		this.state = {
      path: "",
      colorConfig: null,
      newValSubj: "",
      newValColor: "#ffffff"
    }
  }

  componentDidMount(){
    SettingAction.recordPathGet(this.setPath.bind(this))
    SettingAction.colorConfigGet(this.setColor.bind(this))
  }

  postPath(){
    SettingAction.recordPathSet(this.state.path, console.log)
  }

  setPath(path){
    this.setState({
      path: path
    })
  }

  setColor(color){
    this.setState({
      colorConfig: color
    })
  }

  changePath(e){
    this.setState({path:e.target.value})
  }

  changeColor(key, e){
    let color = this.state.colorConfig;
    color[key] = e.target.value
    SettingAction.colorConfigSet(color, console.log)
    this.setState({
      colorConfig: color
    })
  }

  addValue() {
    if(this.state.newValSubj === ""){
      return
    }
    let color = this.state.colorConfig
    color[this.state.newValSubj] = this.state.newValColor
    SettingAction.colorConfigSet(color, console.log)
    this.setState({
      colorConfig: color,
      newValSubj: "",
      newValColor: "#ffffff"
    })
  }

  deleteValue(key) {
    let color = this.state.colorConfig
    delete color[key]
    SettingAction.colorConfigSet(color, console.log)
    this.setState({
      colorConfig: color
    })
  }

  fontColor(hexcolor) {
    /** refs: https://lab.syncer.jp/Web/JavaScript/Snippet/55/ */
    const r = parseInt( hexcolor.substr( 1, 2 ), 16 ) ;
  	const g = parseInt( hexcolor.substr( 3, 2 ), 16 ) ;
  	const b = parseInt( hexcolor.substr( 5, 2 ), 16 ) ;

  	return ( ( ( (r * 299) + (g * 587) + (b * 114) ) / 1000 ) < 128 ) ? "#ffffff" : "#000000" ;
  }

  fontSize(strLength) {
    let size = 200/strLength > 18 ? 18 : 200/strLength
    return size
  }

  render (){
    const colorDataDOM = this.state.colorConfig !== null ? Object.keys(this.state.colorConfig).map((k) => {
      const bgStyle = {fontSize: this.fontSize(k.length) ,color: this.fontColor(this.state.colorConfig[k]), background: this.state.colorConfig[k]}
      return (
        <div key={k} className="flex-boxs color-setting">
          <div className="subject" style={bgStyle}>
            {k}
          </div>
          <input type="color" className="value" style={bgStyle} value={this.state.colorConfig[k]} onChange={function(e){this.changeColor(k, e)}.bind(this)}/>
          <button className="delete-button" onClick={() => {this.deleteValue(k)}}> - </button>
        </div>
      )
    }) : ""
    const addDataDOM = (
      <div className="flex-boxs color-setting color-setting-input">
        <input className="subject" value={this.state.newValSubj} onChange={(e) => {this.setState({newValSubj: e.target.value})}} />:
        <input type="color" className="value" value={this.state.newValColor} onChange={(e) => {this.setState({newValColor: e.target.value})}} />
        <button className="add-button" onClick={this.addValue.bind(this)}> add </button>
      </div>
    )
    return (
      <div className="input-form">
        <div className="save-file-setting">
          <div className="form-subject">
            記録先ファイル名
          </div>
          <div className="flex-boxs">
            <input className="save-file-name" value={this.state.path} onChange={this.changePath.bind(this)}/>
            <div className="submmit-button apply">
              <button onClick={this.postPath.bind(this)}>Apply</button>
            </div>
          </div>
        </div>
        <div className="color-setting-space">
          {colorDataDOM}
        </div>
        {addDataDOM}
        <div className="page-link">
          <Link to="/" className="padding-button transition-button to-top">
            <button type="button">TopPage</button>
          </Link>
          <Link to="/calc" className="padding-button transition-button to-calc">
            <button type="button">CalcPage</button>
          </Link>
        </div>
      </div>
    )
  }
}

export default SettingPage;
