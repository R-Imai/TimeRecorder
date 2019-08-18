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

    submit(e) {
      e.preventDefault()
      if (this.state.genre !== "") {
        this.props.callSubmit(this.state)
      }
    }

    render() {
      const dataList = this.props.sugestList.map((v) => {
        return (<option value={v} key={v} />)
      })
      return (
        <form className="form-style form-style-black">
          <fieldset>
            <input onChange={(e) => {this.setState({genre: e.target.value})}} placeholder="作業ジャンル" type="text" list="sudgest" />
            <datalist id="sudgest">
              {dataList}
            </datalist>
            <input onChange={(e) => {this.setState({name: e.target.value})}} placeholder="作業名" type="text" />
          </fieldset>
          <div className="button-space">
            <div className="padding-button finish-button">
							<button onClick={this.submit.bind(this)}>Job Start</button>
            </div>
					</div>
        </form>
      )
    }
}

Form.propTypes = {
  callSubmit: PropTypes.func
};

export default Form;
