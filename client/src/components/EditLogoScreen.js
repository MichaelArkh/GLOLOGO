import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import gql from "graphql-tag";
import { Query, Mutation } from "react-apollo";
import LogoWorkspace from './LogoWorkspace';

const GET_LOGO = gql`
    query logo($logoId: String) {
        logo(id: $logoId) {
            _id
            text
            color
            fontSize
            borderColor
            backgroundColor
            borderRadius
            borderWidth
            padding
            margin
        }
    }
`;

const UPDATE_LOGO = gql`
    mutation updateLogo(
        $id: String!,
        $text: String!,
        $color: String!,
        $fontSize: Int!,
        $backgroundColor: String!,
        $borderColor: String!,
        $borderRadius: Int!,
        $borderWidth: Int!,
        $padding: Int!,
        $margin: Int!) {
            updateLogo(
                id: $id,
                text: $text,
                color: $color,
                fontSize: $fontSize,
                backgroundColor: $backgroundColor,
                borderColor: $borderColor,
                borderRadius: $borderRadius,
                borderWidth: $borderWidth,
                padding: $padding,
                margin: $margin) {
                    lastUpdate
                }
        }
`;

class EditLogoScreen extends Component {

    constructor(props) {
        super(props);

        this.state = {
            fontSize: 50,
            borderRadius: 50,
            borderWidth: 50,
            padding: 50,
            text: "",
            textColor: "#000000",
            borderColor: "#7900ff",
            backgroundColor: "#ebd9ff",
            margin: 50
        }
    }
    updateTextColor = (event) => {
        this.setState({
            textColor: event.target.value
        })
    }

    updateBorderColor = (event) => {
        this.setState({
            borderColor: event.target.value
        })
    }

    updateBackgroundColor = (event) => {
        this.setState({
            backgroundColor: event.target.value
        })
    }

    updateText = (event) => {
        this.setState({
            text: event.target.value
        })
    }
    updateFont = (event) => {
        this.setState({
            fontSize: parseInt(event.target.value)
        });
    }

    updateRadius = (event) => {
        this.setState({
            borderRadius: parseInt(event.target.value)
        });
    }

    updateWidth = (event) => {
        this.setState({
            borderWidth: parseInt(event.target.value)
        });
    }

    updatePadding = (event) => {
        this.setState({
            padding: parseInt(event.target.value)
        });
    }

    updateMargin = (event) => {
        this.setState({
            margin: parseInt(event.target.value)
        });
    }

    isDisabled = () => {
        let length = 0;

        for(let i = 0; i < this.state.text.length; i++){
            if( this.state.text.charAt(i) === ' '){

            } else {
                length++;
            }
        }

        return length > 0;
    }

    update = (data) => {
        this.setState({
            fontSize: parseInt(data.logo.fontSize),
            borderRadius: parseInt(data.logo.borderRadius),
            borderWidth: parseInt(data.logo.borderWidth),
            padding: parseInt(data.logo.padding),
            text: data.logo.text,
            textColor: data.logo.color,
            borderColor: data.logo.borderColor,
            backgroundColor: data.logo.backgroundColor,
            margin: parseInt(data.logo.margin)
        })
    }

    render() {
        let text, color, backgroundColor, borderColor;
        return (
            <Query query={GET_LOGO} fetchPolicy="no-cache" variables={{ logoId: this.props.match.params.id }} onCompleted={data => this.update(data)}>
                {({ loading, error, data }) => {
                    if (loading) return 'Loading...';
                    if (error) return `Error! ${error.message}`;

                    return (
                        <Mutation mutation={UPDATE_LOGO} key={data.logo._id} onCompleted={() => this.props.history.push(`/`)}>
                            {(updateLogo, { loading, error }) => (
                                <div className="container mx-auto">
                                    <div className="row" style={{
                                        backgroundColor: '#ebd9ff',
                                        paddingLeft: '20px', borderRadius: '20px'
                                    }}>
                                    <div className="panel panel-default">
                                        <div className="panel-heading">
                                            <h4><Link to="/">Home</Link></h4>
                                            <h3 className="panel-title">
                                                Edit Logo
                                        </h3>
                                        </div>
                                    </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-5">
                                            <div className="panel-body">
                                                <form onSubmit={e => {
                                                    e.preventDefault();
                                                    updateLogo({
                                                        variables: {
                                                            id: data.logo._id, text: text.value, color: color.value, fontSize: this.state.fontSize, backgroundColor: backgroundColor.value, borderColor: borderColor.value,
                                                            borderRadius: this.state.borderRadius, borderWidth: this.state.borderWidth, padding: this.state.padding, margin: this.state.margin
                                                        }
                                                    });
                                                    text.value = "";
                                                }}>

                                                    <div className="form-group">
                                                        <label htmlFor="text">Text:</label>
                                                        <input type="text" className="form-control" onChange={this.updateText} name="text" ref={node => {
                                                            text = node;
                                                        }} defaultValue={this.state.text} />
                                                    </div>

                                                    <div className="form-group">
                                                        <label htmlFor="color">Text Color:</label>
                                                        <input type="color" className="form-control" defaultValue={this.state.textColor} onChange={this.updateTextColor} name="color" ref={node => {
                                                            color = node;
                                                        }} placeholder="Color" />
                                                    </div>

                                                    <div className="form-group">
                                                        <label htmlFor="backgroundColor">Background Color:</label>
                                                        <input type="color" className="form-control" defaultValue={this.state.backgroundColor} onChange={this.updateBackgroundColor} name="backgroundColor" ref={node => {
                                                            backgroundColor = node;
                                                        }} placeholder="BackgroundColor" />
                                                    </div>

                                                    <div className="form-group">
                                                        <label htmlFor="borderColor">Border Color:</label>
                                                        <input type="color" className="form-control" defaultValue={this.state.borderColor} onChange={this.updateBorderColor} name="borderColor" ref={node => {
                                                            borderColor = node;
                                                        }} placeholder="BorderColor" />
                                                    </div>

                                                    <div className="form-group">
                                                        <label htmlFor="fontSize">Font Size:</label>
                                                        <input type="range" min="2" max="144" className="slider" defaultValue={this.state.fontSize} onChange={this.updateFont} />
                                                        <div style={valStyle}>{this.state.fontSize}</div>
                                                    </div>

                                                    <div className="form-group">
                                                        <label htmlFor="borderRadius">Border Radius:</label>
                                                        <input type="range" min="2" max="144" className="slider" defaultValue={this.state.borderRadius} onChange={this.updateRadius} />
                                                        <div style={valStyle}>{this.state.borderRadius}</div>
                                                    </div>

                                                    <div className="form-group">
                                                        <label htmlFor="borderWidth">Border Width:</label>
                                                        <input type="range" min="2" max="144" className="slider" defaultValue={this.state.borderWidth} onChange={this.updateWidth} />
                                                        <div style={valStyle}>{this.state.borderWidth}</div>
                                                    </div>

                                                    <div className="form-group">
                                                        <label htmlFor="padding">Padding:</label>
                                                        <input type="range" min="2" max="144" className="slider" defaultValue={this.state.padding} onChange={this.updatePadding} />
                                                        <div style={valStyle}>{this.state.padding}</div>
                                                    </div>

                                                    <div className="form-group">
                                                        <label htmlFor="margin">Margin:</label><br />
                                                        <input type="range" min="2" max="144" className="slider" defaultValue={this.state.margin} onChange={this.updateMargin} />
                                                        <div style={valStyle}>{this.state.margin}</div>
                                                    </div>

                                                    <button type="submit" className="btn btn-success"disabled={!this.isDisabled()}
                                        style={{cursor: !this.isDisabled() ? 'initial' : 'pointer'}}>Submit</button> <p style={{visibility: !this.isDisabled() ? 'visible' : 'hidden',
                                                                                                                                    display: 'inline-block',
                                                                                                                                    color: 'grey' }}>Text must be non-null and cannot be all spaces</p>
                                                </form>
                                                {loading && <p>Loading...</p>}
                                                {error && <p>Error :( Please try again</p>}
                                            </div>
                                        </div>
                                        <div className="col-7">
                                        <LogoWorkspace text={this.state.text} textColor={this.state.textColor} fontSize={this.state.fontSize}
                            backgroundColor={this.state.backgroundColor} borderColor={this.state.borderColor} borderRadius={this.state.borderRadius}
                            borderWidth={this.state.borderWidth} padding={this.state.padding} margin={this.state.margin}/>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </Mutation>
                    );
                }}
            </Query>
        );
    }
}

const valStyle = {
    display: 'inline-block',
    marginLeft: '10px',
    color: '#9758d6'
};

export default EditLogoScreen;