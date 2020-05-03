import React, { Component } from 'react';
import gql from "graphql-tag";
import { Mutation } from "react-apollo";
import Navbar from './Navbar.js';
import LogoWorkspace from './LogoWorkspace';
import Cookie from 'js-cookie';
import { Modal, Range } from 'react-materialize';
import AddText from './modifiers/AddText.js';
import AddImage from './modifiers/AddImage.js';
import EditText from './modifiers/EditText.js';
import EditImage from './modifiers/EditImage.js';
import Dimentions from './modifiers/Dimentions.js';
import jwtDecode from 'jwt-decode';


// id name email text[] imgs[] backgroundcolor bordercolor
// dimentions borderradius borderwidth padding margin lastupdate

const ADD_LOGO = gql`
    mutation AddLogo(
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
        addLogo(
            name: $name,
            email: $email,
            text: $text,
            imgs: $imgs,
            backgroundColor: $backgroundColor,
            borderColor: $borderColor,
            borderRadius: $borderRadius,
            borderWidth: $borderWidth,
            dimensions: $dimensions,
            padding: $padding,
            margin: $margin) {
            _id
        }
    }
`;

var textObj = {
    // content color fontsize position[]
    content: "",
    color: "",
    fontSize: '',
    position: [0, 0]
};

var imgObj = {
    // link position[] scale
    link: "",
    position: [0, 0],
    scale: 50
};

class CreateLogoScreen extends Component {

    constructor(props) {
        super(props);

        this.state = {
            // id name email text[] imgs[] backgroundcolor bordercolor
            // dimentions borderradius borderwidth padding margin lastupdate
            name: "",
            email: !(typeof Cookie.get('jwt') === 'undefined') ? jwtDecode(Cookie.get('jwt'))["email"] : "",
            text: [],
            imgs: [],
            dimensions: [520, 200],
            backgroundColor: '#ebd9ff',
            borderColor: '#7900ff',
            borderRadius: 5,
            borderWidth: 5,
            padding: 5,
            margin: 10
        }

        const query = {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ mycookie: Cookie.get('jwt') })
        };

        fetch('http://localhost:3000/verify', query).then(
            res => {
                res.text().then(ok => {
                    this.setState({
                        cookieOk: ok === 'true'
                    });
                })
            }
        );
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

    render() {
        let cookie = this.state.cookieOk;
        return (
            <div>
                <Navbar currentScreen="Create Logo" logoutCallback={this.processLogoutCallback} />
                <div className="container">
                    {cookie ?

                        <Mutation mutation={ADD_LOGO} onCompleted={() => this.props.history.push('/')}>
                            {(addLogo, { loading, error }) => (
                                <div>
                                    <div className="row">
                                        <div className="col s5">
                                            <div className="panel-body">
                                                <form onSubmit={e => {
                                                    e.preventDefault();
                                                    addLogo({
                                                        variables: {
                                                            name: this.state.name, email: this.state.email, imgs: this.state.imgs, text: this.state.text, backgroundColor: this.state.backgroundColor, borderColor: this.state.borderColor,
                                                            borderRadius: this.state.borderRadius, dimensions: this.state.dimensions, borderWidth: this.state.borderWidth, padding: this.state.padding, margin: this.state.margin
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
                                                                        <AddText handleSubmit={this.handleSubmitTextCallback} bounds={this.state.dimensions}/>
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
                                                                                <td>{e["content"]}</td>
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
                                                                                <td>{e["link"].substring(0,15)}</td>
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
                                                                        
                                                                        <input placeholder="Type here" type="text" defaultValue={this.state.inputText} onChange={this.handleNameChange} />
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
                                                </form>
                                                {loading && <p>Loading...</p>}
                                                {error && <p>Error :( Please try again</p>}
                                            </div>
                                        </div>

                                        <div className="col s7" style={{overflow: 'auto'}}>
                                            <LogoWorkspace disabled={false} values={JSON.parse(JSON.stringify(this.state))} updatedImageCallback={(newImage) => this.updateImagePos(newImage)}updatedTextCallback={(newText) => this.updateTextPos(newText)}/>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </Mutation>

                        :
                        <div>You must be logged in to do this!</div>
                    }
                </div>
            </div >
        );
    }
}

const valStyle = {
    display: 'inline-block',
    marginLeft: '10px',
    color: '#9758d6'
};

export default CreateLogoScreen;