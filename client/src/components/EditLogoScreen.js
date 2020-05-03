import React, { Component } from 'react';
import gql from "graphql-tag";
import { Query, Mutation } from "react-apollo";
import LogoWorkspace from './LogoWorkspace';
import Navbar from './Navbar';
import { Modal, Range } from 'react-materialize';
import AddText from './modifiers/AddText.js';
import AddImage from './modifiers/AddImage.js';
import EditText from './modifiers/EditText.js';
import EditImage from './modifiers/EditImage.js';
import Dimentions from './modifiers/Dimentions.js';

const GET_LOGO = gql`
    query logo($logoId: String) {
        logo(id: $logoId) {
            _id
            name
            email
            text {
                content
                color
                fontSize
                position
            }
            imgs {
                link
                position
                scale
            }
            dimensions
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
        $name: String!,
        $email: String!,
        $text: [textInput]!,
        $imgs: [imgInput]!,
        $backgroundColor: String!,
        $borderColor: String!,
        $borderRadius: Int!,
        $borderWidth: Int!,
        $dimensions: [Int!]!,
        $padding: Int!,
        $margin: Int!) {
            updateLogo(
                id: $id,
                name: $name,
                email: $email,
                text: $text,
                imgs: $imgs,
                dimensions: $dimensions,
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

    handleNameChange = (event) => {
        this.setState({
            name: event.target.value
        });
    }

    isDisabled = () => {
        let length = 0;

        for (let i = 0; i < this.state.name.length; i++) {
            if (this.state.name.charAt(i) === ' ') {

            } else {
                length++;
            }
        }

        return length > 0;
    }

    processLogoutCallback = () => {

    }

    handleSubmitTextCallback = (newlogo) => {
        var newlist = this.state.text
        newlist.push(newlogo);
        this.setState({
            text: newlist
        });
    }

    handleSubmitImageCallback = (newlogo) => {
        var newlist = this.state.imgs
        newlist.push(newlogo);
        this.setState({
            imgs: newlist
        });
    }

    handleSubmitDimentionsCallback = (newlogo) => {
        this.setState({
            dimensions: newlogo
        });
    }

    handleEditTextCallback = (newlogo, pos) => {
        var logo = this.state.text;
        logo[pos] = newlogo;
        this.setState({
            text: logo
        });
    }

    handleEditImgCallback = (newimg, pos) => {
        var logo = this.state.imgs;
        logo[pos] = newimg;
        this.setState({
            imgs: logo
        });
    }

    handleDeleteText = (index) => {
        var logo = this.state.text;
        logo.splice(index, 1);
        this.setState({
            text: logo
        });
    }

    handleDeleteImg = (index) => {
        var logo = this.state.imgs;
        logo.splice(index, 1);
        this.setState({
            imgs: logo
        });
    }

    updateTextPos = (newText) => {
        this.setState({
            text: newText
        })
    }

    updateImagePos = (newImages) => {
        this.setState({
            imgs: newImages
        })
    }

    strip = (obj) => {
        var a = []
        for(var b = 0; b < obj.length; b++){
            const { __typename, ...other } = obj[b];
            a.push(other);

        }
        return a;
    }

    update = (data) => {
        this.setState({
            borderRadius: parseInt(data.logo.borderRadius),
            borderWidth: parseInt(data.logo.borderWidth),
            padding: parseInt(data.logo.padding),
            text: this.strip(data.logo.text),
            imgs: this.strip(data.logo.imgs),
            name: data.logo.name,
            dimensions: data.logo.dimensions,
            borderColor: data.logo.borderColor,
            backgroundColor: data.logo.backgroundColor,
            margin: parseInt(data.logo.margin)
        })
    }

    processLogoutCallback = () => { }

    render() {
        return (<div>
            <Navbar currentScreen="Edit Screen" logoutCallback={this.processLogoutCallback} />
            <Query query={GET_LOGO} fetchPolicy="no-cache" variables={{ logoId: this.props.match.params.id }} onCompleted={data => this.update(data)}>
                {({ loading, error, data }) => {
                    if (loading) return 'Loading...';
                    if (error) return `Error! ${error.message}`;

                    return (
                        <Mutation mutation={UPDATE_LOGO} key={data.logo._id} onCompleted={() => this.props.history.push(`/`)}>
                            {(updateLogo, { loading, error }) => (
                                <div className="container">

                                    <div className="row">
                                        <div className="col s5">
                                            <div className="panel-body">
                                                <form onSubmit={e => {
                                                    e.preventDefault();
                                                    updateLogo({
                                                        variables: {
                                                            id: data.logo._id, text: this.state.text, dimensions: this.state.dimensions, imgs: this.state.imgs, email: data.logo.email, name: this.state.name, backgroundColor: this.state.backgroundColor, borderColor: this.state.borderColor,
                                                            borderRadius: this.state.borderRadius, borderWidth: this.state.borderWidth, padding: this.state.padding, margin: this.state.margin
                                                        }
                                                    });
                                                }}>
                                                    <div className="card-panel">
                                                        <button className="btn btn-success " disabled={!this.isDisabled()}
                                                            style={{ cursor: !this.isDisabled() ? 'initial' : 'pointer' }}>Submit</button> <p style={{
                                                                visibility: !this.isDisabled() ? 'visible' : 'hidden',
                                                                display: 'inline-block',
                                                                color: 'grey'
                                                            }}>Name must be non-null and cannot be all spaces</p>
                                                        <div className="card blue-grey darken-1">
                                                            <div className="card-content white-text">
                                                                <span className="card-title">Text
                                                            <Modal header="Add Text" trigger={<div style={{ display: 'inline-block', float: 'right', cursor: 'pointer' }}><i className="small material-icons">add_circle</i></div>}>
                                                                        <AddText handleSubmit={this.handleSubmitTextCallback} bounds={this.state.dimensions} />
                                                                    </Modal>
                                                                </span>

                                                                <table>
                                                                    <thead>
                                                                        <tr>
                                                                            <th>Content</th>
                                                                            <th>Position</th>
                                                                            <th>Size</th>
                                                                            <th>Color</th>
                                                                            <th>Controls</th>
                                                                        </tr>
                                                                    </thead>
                                                                    <tbody>
                                                                        {this.state.text.map((e, index) => (
                                                                            <tr key={index}>
                                                                                <td>{e["content"].substring(0,15)}</td>
                                                                                <td>{e["position"].toString()}</td>
                                                                                <td>{e["fontSize"]}</td>
                                                                                <td><div style={{ height: '15px', width: '15px', border: '1px solid black', backgroundColor: e["color"] }} /></td>
                                                                                <td>
                                                                                    <Modal header="Edit Text" trigger={<div style={{ display: 'inline-block', cursor: 'pointer' }}><i className="tiny material-icons">edit</i></div>}>
                                                                                        <EditText bounds={this.state.dimensions} handleSubmit={this.handleEditTextCallback} pos={index} logo={e} />
                                                                                    </Modal>
                                                                                    <i className="tiny material-icons" style={{ cursor: 'pointer' }} onClick={() => this.handleDeleteText(index)}>delete</i>
                                                                                </td>
                                                                            </tr>
                                                                        ))}
                                                                    </tbody>
                                                                </table>
                                                            </div>
                                                        </div>

                                                        <div className="card blue-grey darken-1">
                                                            <div className="card-content white-text">
                                                                <span className="card-title">Images
                                                        <Modal header="Add Image" trigger={<div style={{ display: 'inline-block', float: 'right', cursor: 'pointer' }}><i className="small material-icons">add_circle</i></div>}>
                                                                        <AddImage bounds={this.state.dimensions} handleSubmit={this.handleSubmitImageCallback} />
                                                                    </Modal>
                                                                </span>

                                                                <table>
                                                                    <thead>
                                                                        <tr>
                                                                            <th>Min Url</th>
                                                                            <th>Position</th>
                                                                            <th>Scale</th>
                                                                            <th>Controls</th>
                                                                        </tr>
                                                                    </thead>
                                                                    <tbody>
                                                                        {this.state.imgs.map((e, index) => (
                                                                            <tr key={index}>
                                                                                <td>{e["link"].substring(0, 15)}</td>
                                                                                <td>{e["position"].toString()}</td>
                                                                                <td>{e["scale"] + " %"}</td>
                                                                                <td>
                                                                                    <Modal header="Edit Image" trigger={<div style={{ display: 'inline-block', cursor: 'pointer' }}><i className="tiny material-icons">edit</i></div>}>
                                                                                        <EditImage bounds={this.state.dimensions} handleSubmit={this.handleEditImgCallback} pos={index} img={e} />
                                                                                    </Modal>
                                                                                    <i className="tiny material-icons" style={{ cursor: 'pointer' }} onClick={() => this.handleDeleteImg(index)}>delete</i>
                                                                                </td>
                                                                            </tr>
                                                                        ))}
                                                                    </tbody>
                                                                </table>
                                                            </div>
                                                        </div>

                                                        <div className="card blue-grey darken-1">
                                                            <div className="card-content white-text">
                                                                <span className="card-title">Extra Options</span>
                                                                <div className="row">
                                                                    <div className="col s4">Logo Name:</div>
                                                                    <div className="col s8 input-field">
                                                                        <input placeholder="Type here" type="text" value={this.state.name} onChange={this.handleNameChange} />
                                                                    </div>
                                                                </div>

                                                                <div className="row">
                                                                    <div className="col s4">Dimensions:</div>
                                                                    <div className="col s8">
                                                                        {this.state.dimensions[0]} x {this.state.dimensions[1]} &nbsp;&nbsp;
                                                                        <Modal header="Edit Dimentions" trigger={<i style={{ cursor: 'pointer' }} className="material-icons tiny">edit</i>} >
                                                                            <Dimentions handleSubmit={this.handleSubmitDimentionsCallback} />
                                                                        </Modal>
                                                                    </div>
                                                                </div>

                                                                <div className="row">
                                                                    <div className="col s4">Background Color:</div>
                                                                    <div className="col s8">
                                                                        <input label="color" defaultValue={this.state.backgroundColor} onChange={this.updateBackgroundColor} type="color" />
                                                                    </div>
                                                                </div>

                                                                <div className="row">
                                                                    <div className="col s4">Border Color:</div>
                                                                    <div className="col s8">
                                                                        <input label="color" defaultValue={this.state.borderColor} onChange={this.updateBorderColor} type="color" />
                                                                    </div>
                                                                </div>

                                                                <div className="row">
                                                                    <div className="col s4">Border Radius:</div>
                                                                    <div className="col s8">
                                                                        <Range min="4" max="100" defaultValue={this.state.borderRadius} onChange={this.updateRadius} />
                                                                    </div>
                                                                </div>

                                                                <div className="row">
                                                                    <div className="col s4">Border Width:</div>
                                                                    <div className="col s8">
                                                                        <Range min="4" max="100" defaultValue={this.state.borderWidth} onChange={this.updateWidth} />
                                                                    </div>
                                                                </div>

                                                                <div className="row">
                                                                    <div className="col s4">Margin:</div>
                                                                    <div className="col s8">
                                                                        <Range min="4" max="100" defaultValue={this.state.margin} onChange={this.updateMargin} />
                                                                    </div>
                                                                </div>

                                                                <div className="row">
                                                                    <div className="col s4">Padding:</div>
                                                                    <div className="col s8">
                                                                        <Range min="4" max="100" defaultValue={this.state.padding} onChange={this.updatePadding} />
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>


                                                    <button type="submit" className="btn btn-success" disabled={!this.isDisabled()}
                                                        style={{ cursor: !this.isDisabled() ? 'initial' : 'pointer' }}>Submit</button> <p style={{
                                                            visibility: !this.isDisabled() ? 'visible' : 'hidden',
                                                            display: 'inline-block',
                                                            color: 'grey'
                                                        }}>Text must be non-null and cannot be all spaces</p>
                                                </form>
                                                {loading && <p>Loading...</p>}
                                                {error && <p>Error :( Please try again</p>}
                                            </div>
                                        </div>
                                        <div className="col s7">
                                             <LogoWorkspace disabled={false} values={JSON.parse(JSON.stringify(this.state))} updatedImageCallback={(newImage) => this.updateImagePos(newImage)}updatedTextCallback={(newText) => this.updateTextPos(newText)}/>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </Mutation>
                    );
                }}
            </Query>
        </div>
        );
    }
}

const valStyle = {
    display: 'inline-block',
    marginLeft: '10px',
    color: '#9758d6'
};

export default EditLogoScreen;