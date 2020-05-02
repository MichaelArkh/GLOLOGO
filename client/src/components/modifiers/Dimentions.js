import React, { Component } from "react";

class Dimentions extends Component {
    constructor(props) {
        super(props);

        this.state = {
            dimentions: [520, 200]
        }
    }

    handleyChange = (event) => {
        var xval = this.state.dimentions[0];
        this.setState({
            dimentions: [xval, parseInt(event.target.value)]
        });
    }
    
    handlexChange = (event) => {
        var yval = this.state.dimentions[1];
        this.setState({
            dimentions: [parseInt(event.target.value), yval]
        });
    }

    isDisabled() {
        return this.state.dimentions[0] < 0 || this.state.dimentions[1] < 0 || isNaN(this.state.dimentions[0]) || isNaN(this.state.dimentions[1])
    }

    doSubmit = () => {
        this.props.handleSubmit(this.state.dimentions);
        
    }

    render() {
        let submitClass = "btn waves-effect waves-light modal-close";
        if (this.isDisabled()) {
            submitClass += " disabled";
        }
        return (
            <div>
                <div className="row">
                    <div className="col s4">Width:</div>
                    <div className="col s8">
                        <input label="color" defaultValue={this.state.dimentions[0]} onChange={this.handlexChange} min="0" type="number" />
                    </div>
                </div>

                <div className="row">
                    <div className="col s4">Height:</div>
                    <div className="col s8">
                        <input label="color" defaultValue={this.state.dimentions[1]} onChange={this.handleyChange} min="0" type="number" />
                    </div>
                </div>
                <button className={submitClass} onClick={this.doSubmit}>Submit</button>
            </div>
        );
    }
}

export default Dimentions;