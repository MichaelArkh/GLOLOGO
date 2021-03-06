import { Range } from "react-materialize";
import React, { Component } from "react";

const defaults = {
    content: "",
    color: "#000000",
    fontSize: 50,
    position: [50, 50],
    index: 0
};

class AddText extends Component {
    constructor(props) {
        super(props);

        this.state = {
            content: "",
            color: "#000000",
            fontSize: 50,
            position: [50, 50],
            index: 0
        }
    }


    handleIndexChange = (event) => {
        this.setState({
            index: parseInt(event.target.value)
        });
    }

    handleTextChange = (event) => {
        this.setState({
            content: event.target.value
        });
    }

    handleColorChange = (event) => {
        this.setState({
            color: event.target.value
        });
    }

    handleFontSizeChange = (event) => {
        this.setState({
            fontSize: parseInt(event.target.value)
        });
    }

    handlexChange = (event) => {
        var yval = this.state.position[1];
        this.setState({
            position: [parseInt(event.target.value), yval]
        });
    }

    handleyChange = (event) => {
        var xval = this.state.position[0];
        this.setState({
            position: [xval, parseInt(event.target.value)]
        });
    }

    isDisabled = () => {
        return this.state.content === ""
    }

    doSubmit = () => {
        this.props.handleSubmit(this.state);
        this.setState(defaults);
    }

    render() {
        let submitClass = "btn waves-effect waves-light modal-close";
        if (this.isDisabled()) {
            submitClass += " disabled";
        }
        return (
            <div>
                <div className="row input-field">
                    <label>Content(Text)</label>
                    <input label="Content(Text)" value={this.state.content} style={{ display: 'inline-block', width: '75%' }} type="text" onChange={this.handleTextChange} />
                </div>
                <div className="row">
                    <div className="col s4">Index:</div>
                    <div className="col s8">
                        <Range min="0" max={'100'} value={this.state.index} onChange={this.handleIndexChange} />
                    </div>
                </div>
                <div className="row">
                    <div className="col s4">X Offset:</div>
                    <div className="col s8">
                        <Range min="0" max={this.props.bounds[0]-((this.state.fontSize * this.state.content.length)/2) + ''} value={this.state.position[0]} onChange={this.handlexChange} />
                    </div>
                </div>
                <div className="row">
                    <div className="col s4">Y Offset:</div>
                    <div className="col s8">
                        <Range min="0" max={this.props.bounds[1]-(this.state.fontSize * 1.5) + ''} value={this.state.position[1]} onChange={this.handleyChange} />
                    </div>
                </div>
                <div className="row">
                    <div className="col s4">Color:</div>
                    <div className="col s8">
                        <input label="color" value={this.state.color} onChange={this.handleColorChange} type="color" />
                    </div>
                </div>
                <div className="row">
                    <div className="col s4">Font Size:</div>
                    <div className="col s8">
                        <Range min="4" max="100" value={this.state.fontSize} onChange={this.handleFontSizeChange} />
                    </div>
                </div>
                <button className={submitClass} onClick={this.doSubmit}>Submit</button>
            </div>
        );
    }
}

export default AddText;