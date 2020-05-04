import { Range } from "react-materialize";
import React, { Component } from "react";

const defaults = {
    // link position[] scale
    link: "",
    position: [0, 0],
    scale: 50
};

class AddImage extends Component {
    constructor(props) {
        super(props);

        this.state = {
            link: "",
            position: [50, 50],
            scale: 50,
            index: 0
        }
    }

    handleIndexChange = (event) => {
        this.setState({
            index: parseInt(event.target.value)
        });
    }


    handleLinkChange = (event) => {
        this.setState({
            link: event.target.value
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

    handleScaleChange = (event) => {
        this.setState({
            scale: parseInt(event.target.value)
        });
    }

    isDisabled = () => {
        return this.state.link === ""
    }
    doSubmit = () => {
        this.props.handleSubmit(this.state);
        this.setState({defaults});
    }

    render() {
        let submitClass = "btn waves-effect waves-light modal-close";
        if (this.isDisabled()) {
            submitClass += " disabled";
        }
        return (
            <div>
                <div className="row input-field">
                    <label>Link Src</label>
                    <input label="Link Src" style={{ display: 'inline-block', width: '75%' }} type="text" onChange={this.handleLinkChange} />
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
                        <Range min="4" max={this.props.bounds[0]/1.2 + ''} defaultValue={this.state.position[0]} onChange={this.handlexChange} />
                    </div>
                </div>
                <div className="row">
                    <div className="col s4">Y Offset:</div>
                    <div className="col s8">
                        <Range min="4" max={this.props.bounds[0]/1.2 + ''} defaultValue={this.state.position[1]}  onChange={this.handleyChange} />
                    </div>
                </div>
                <div className="row">
                    <div className="col s4">Scale:</div>
                    <div className="col s8">
                        <Range min="0" max="200" onChange={this.handleScaleChange} />
                    </div>
                </div>
                <button className={submitClass} onClick={this.doSubmit}>Submit</button>
            </div>
        );
    }
}

export default AddImage;