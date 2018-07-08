import React, { Component } from 'react';
import './App.css';
import JsonForm from "react-jsonschema-form";

import PropTypes from "prop-types";

const schema = {
  type: "object",
  required: ["tag"],
  properties: {
    tag: {type: "string"},
    name: {type: "string"}
  }
};
const uiSchema = {
  tag: {"ui:placeholder": "作業ジャンル"},
  name: {"ui:placeholder": "作業名"}
};


class Form extends Component {
    constructor() {
        super();
        this.state = {
            textValue: ""
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
        return (
            <div className="input-form">
                <div>
                    {this.state.textValue}
                </div>
                <div className="form-style">
                <JsonForm
                    schema={schema}
                    uiSchema={uiSchema}
                    onSubmit={this.props.callSubmit}
                />
                </div>
            </div>
        );
    }
}

Form.propTypes = {
  callSubmit: PropTypes.func
};

export default Form;
