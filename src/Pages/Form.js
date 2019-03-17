import React, { Component } from 'react';
import './App.css';

import PropTypes from "prop-types";


class Form extends Component {
    constructor() {
        super();
        this.state = {
            genre: "",
            name: ""
        };
    }

    // tagChange(e){
    //     console.log(e);
    //     let msg = e.formData.name != null ? e.formData.tag + "/" + e.formData.name : e.formData.tag;
    //     this.setState({
    //         textValue: msg
    //     });
    // }

    render() {
      const dataList = this.props.sugestList.map((v) => {
        return (<option value={v} key={v} />)
      })
      return (
          <div className="input-form">
            <div className="form-style form-style-black">
              <fieldset>
                <input onChange={(e) => {this.setState({genre: e.target.value})}} placeholder="作業ジャンル" type="text" list="sudgest" />
                <datalist id="sudgest">
                  {dataList}
                </datalist>
                <input onChange={(e) => {this.setState({name: e.target.value})}} placeholder="作業名" type="text" />
              </fieldset>
              <div className="padding-button finish-button button-mt">
								<button onClick={() => {this.props.callSubmit(this.state)}}>Job Start</button>
							</div>
            </div>
          </div>
      )
    }
}

Form.propTypes = {
  callSubmit: PropTypes.func
};

export default Form;
