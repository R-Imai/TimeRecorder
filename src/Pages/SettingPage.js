import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import * as SettingAction from '../Actions/SettingAction';

class SettingPage extends Component {
  constructor() {
		super()
		this.state = {
      path: "",
      colorConfigActv: [],
      colorConfigNote: [],
      sortValMax: 0,
      newValSubj: "",
      newValColor: "#ffffff"
    }
  }

  async componentDidMount(){
    const promiseAllRes = await Promise.all([
      SettingAction.recordPathGet(),
      SettingAction.getSubjectColor()
    ])
    const recordPath = promiseAllRes[0]
    const colorList = promiseAllRes[1]


    const maxVal = Math.max(...colorList.active.concat(colorList.note).map((v) => {
      return v.sort_val
    }))

    this.setState({
      path: recordPath,
      colorConfigActv: colorList.active,
      colorConfigNote: colorList.note,
      sortValMax: maxVal
    })
  }

  async sendMergeColor(){
    const colorSetting = this.state.colorConfigActv.concat(this.state.colorConfigNote)
    await SettingAction.sendSubjectColor(colorSetting)
    const colorList = await SettingAction.getSubjectColor()
    const maxVal = Math.max(...colorList.active.concat(colorList.note).map((v) => {
      return v.sort_val
    }))
    this.setState({
      colorConfigActv: colorList.active,
      colorConfigNote: colorList.note,
      sortValMax: maxVal
    })
  }

  async postPath(){
    await SettingAction.recordPathSet(this.state.path)
  }

  changePath(e){
    this.setState({path:e.target.value})
  }

  async changeColor(key, e){
    let color = this.state.colorConfigActv;
    color[key].color = e.target.value
    // SettingAction.colorConfigSet(color, console.log)
    this.setState({
      colorConfigActv: color
    })
    await this.sendMergeColor()
  }

  async changeNoteColor(key, e){
    let color = this.state.colorConfigNote;
    color[key].color = e.target.value
    // SettingAction.colorConfigSet(color, console.log)
    this.setState({
      colorConfigNote: color
    })
    await this.sendMergeColor()
  }

  async addValue() {
    if(this.state.newValSubj === ""){
      return
    }
    let colorList = this.state.colorConfigActv
    const addVal = {
      color: this.state.newValColor,
      is_active: true,
      name: this.state.newValSubj,
      sort_val: this.state.sortValMax + 1
    }
    colorList.push(addVal)
    this.setState({
      colorConfigActv: colorList,
      sortValMax: this.state.sortValMax + 1,
      newValSubj: "",
      newValColor: "#ffffff"
    })
    await this.sendMergeColor()
  }

  async deleteActivValue(key) {
    let colorList = this.state.colorConfigActv
    colorList.splice(key, 1)
    this.setState({
      colorConfigActv: colorList
    })
    await this.sendMergeColor()
  }

  async deleteNoteValue(key) {
    let colorList = this.state.colorConfigNote
    colorList.splice(key, 1)
    this.setState({
      colorConfigNote: colorList
    })
    await this.sendMergeColor()
  }

  async changeActv(state, key) {
    // state: 0: active, 1: note
    if (state !== 0 && state !== 1){
      return
    }
    let colorList = [this.state.colorConfigActv, this.state.colorConfigNote]
    const destinationKey = 1 - state

    let pushVal = colorList[state][key]
    pushVal.is_active = state === 1
    colorList[destinationKey].push(pushVal)
    colorList[state].splice(key, 1)
    this.setState({
      colorConfigActv: colorList[0],
      colorConfigNote: colorList[1]
    })
    await this.sendMergeColor()
  }

  async changeSortActivValue(key1, key2) {
    let colorList = this.state.colorConfigActv
    if (key1 < 0 || key2 < 0 || colorList.length <= key1 || colorList.length <= key2) {
      return
    }
    const sortValTmp = colorList[key1].sort_val
    colorList[key1].sort_val = colorList[key2].sort_val
    colorList[key2].sort_val = sortValTmp
    this.setState({
      colorConfigActv: colorList
    })
    await this.sendMergeColor()
  }

  async changeSortNoteValue(key1, key2) {
    let colorList = this.state.colorConfigNote
    if (key1 < 0 || key2 < 0 || colorList.length <= key1 || colorList.length <= key2) {
      return
    }
    const sortValTmp = colorList[key1].sort_val
    colorList[key1].sort_val = colorList[key2].sort_val
    colorList[key2].sort_val = sortValTmp
    this.setState({
      colorConfigNote: colorList
    })
    await this.sendMergeColor()
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
    const colorDataDOM = this.state.colorConfigActv !== null ? this.state.colorConfigActv.map((val, i) => {
      const bgStyle = {fontSize: this.fontSize(val.name.length) ,color: this.fontColor(val.color), background: val.color}
      return (
        <div key={val.name} className="flex-boxs color-setting">
          <button className="delete-button" onClick={() => {this.deleteActivValue(i)}}> - </button>
          <div className="flex-boxs subject" style={bgStyle}>
            <div className="sort-button-space">
              <button className="up-button" onClick={() => {this.changeSortActivValue(i-1, i)}} disabled={i <= 0}> ▲ </button>
              <button className="down-button" onClick={() => {this.changeSortActivValue(i, i+1)}} disabled={this.state.colorConfigActv.length-1 <= i}> ▼ </button>
            </div>
            <span className="subject-value" title={val.name}>
              {val.name}
            </span>
          </div>
          <input type="color" className="value" style={bgStyle} value={val.color} onChange={function(e){this.changeColor(i, e)}.bind(this)}/>
          <button className="actv-button" onClick={() => {this.changeActv(0, i)}}> ▶ </button>
        </div>
      )
    }) : ""

    const noteDataDOM = this.state.colorConfigNote !== null ? this.state.colorConfigNote.map((val, i) => {
      const bgStyle = {fontSize: this.fontSize(val.name.length) ,color: this.fontColor(val.color), background: val.color}
      return (
        <div key={val.name} className="flex-boxs color-setting">
          <button className="actv-button" onClick={() => {this.changeActv(1, i)}}> ◀ </button>
          <div className="flex-boxs subject" style={bgStyle}>
            <div className="sort-button-space">
              <button className="up-button" onClick={() => {this.changeSortNoteValue(i-1, i)}} disabled={i <= 0}> ▲ </button>
              <button className="down-button" onClick={() => {this.changeSortNoteValue(i, i+1)}} disabled={this.state.colorConfigNote.length-1 <= i}> ▼ </button>
            </div>
            <span className="subject-value" title={val.name}>
              {val.name}
            </span>
          </div>
          <input type="color" className="value" style={bgStyle} value={val.color} onChange={function(e){this.changeNoteColor(i, e)}.bind(this)}/>
          <button className="delete-button" onClick={() => {this.deleteNoteValue(i)}}> - </button>
        </div>
      )
    }) : ""

    const addDataDOM = (
      <div className="flex-boxs color-setting color-setting-input">
        <input className="subject" value={this.state.newValSubj} onChange={(e) => {this.setState({newValSubj: e.target.value})}} />
        <input type="color" className="value bg-white" value={this.state.newValColor} onChange={(e) => {this.setState({newValColor: e.target.value})}} />
        <button className="add-button" onClick={this.addValue.bind(this)}> add </button>
      </div>
    )
    return (
      <div className="input-form">
        <div className="save-file-setting">
          <div className="form-subject">
            記録先ファイル名
          </div>
          <div className="flex-boxs space-around">
            <input className="save-file-name" value={this.state.path} onChange={this.changePath.bind(this)}/>
            <div className="submmit-button apply">
              <button onClick={this.postPath.bind(this)}>Apply</button>
            </div>
          </div>
        </div>
        <div className="flex-boxs space-around">
          <div>
            <div className="color-setting-space actv-space">
              <div className="space-label">
                アクティブタスク
              </div>
              {colorDataDOM}
            </div>
            {addDataDOM}
          </div>
          <div>
            <div className="color-setting-space note-space">
              <div className="space-label">
                非アクティブタスク
              </div>
              {noteDataDOM}
            </div>
          </div>
        </div>
        <div className="button-space page-link">
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
