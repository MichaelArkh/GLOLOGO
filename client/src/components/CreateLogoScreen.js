import React, { Component } from 'react';
import gql from "graphql-tag";
import { Mutation } from "react-apollo";
import { Link } from 'react-router-dom';
import Navbar from './Navbar.js';
import LogoWorkspace from './LogoWorkspace';
import Cookie from 'js-cookie';
import { Modal, TextInput, Range } from 'react-materialize';
import AddText from './AddText.js';
var jwtDecode = require('jwt-decode');


// id name email text[] imgs[] backgroundcolor bordercolor
// dimentions borderradius borderwidth padding margin lastupdate

const ADD_LOGO = gql`
    type textObj {
        content: String!,
        color: String!,
        fontSize: Int!,
        position: [Int!]!
    }

    type imgObj {
        link: String!,
        position: [Int!]!,
        scale: Int!
    }

    mutation AddLogo(
        $name: String!,
        $email: String!,
        $text: [textObj]!,
        $imgs: [imgObj]!,
        $backgroundColor: String!,
        $borderColor: String!,
        $borderRadius: Int!,
        $borderWidth: Int!,
        $dimentions: [Int!]!,
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
            dimentions: $dimentions,
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
    position: [0,0]
};

var imgObj = {
    // link position[] scale
    link: "",
    position: [0,0],
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
            dimentions: [],
            backgroundColor: '#ebd9ff',
            borderColor: '#7900ff',
            borderRadius: '5',
            borderWidth: '5',
            padding: '5',
            margin: '10'
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

        // for (let i = 0; i < this.state.text.length; i++) {
        //     if (this.state.text.charAt(i) === ' ') {

        //     } else {
        //         length++;
        //     }
        // }

        return length > 0;
    }

    componentWillMount = () => {
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
    processLogoutCallback = () => {

    }

    handleSubmitCallback = (newlogo) => {
        var newlist = this.state.text
        newlist.push(newlogo);
        console.log(newlist);
        this.setState({
            text: newlist
        });
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
                                                        borderRadius: this.state.borderRadius, dimentions: this.state.dimentions, borderWidth: this.state.borderWidth, padding: this.state.padding, margin: this.state.margin
                                                    }
                                                });
                                            }}>
                                            <div className="card-panel">
                                                <div className="card blue-grey darken-1">
                                                    <div className = "card-content white-text">
                                                        <span className="card-title">Text
                                                        <Modal header="Add Text" trigger={<div style={{display: 'inline-block', float: 'right', cursor: 'pointer'}}><i className="small material-icons">add_circle</i></div>}>
                                                            <AddText handleSubmit={this.handleSubmitCallback}/>
                                                        </Modal>
                                                        
                                                        </span>
                                                        
                                                    </div>
                                                </div>    
                                            </div>    


                                                <button className="btn btn-success " disabled={!this.isDisabled()}
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
                                        {/* <LogoWorkspace text={this.state.text} textColor={this.state.textColor} fontSize={this.state.fontSize}
                                            backgroundColor={this.state.backgroundColor} borderColor={this.state.borderColor} borderRadius={this.state.borderRadius}
                                            borderWidth={this.state.borderWidth} padding={this.state.padding} margin={this.state.margin} /> */}
                                    </div>
                                </div>
                                </div>
                        )}
                    </Mutation>
                    
                    :
                    <div>You must be logged in to do this!</div>
                }
            </div>
            </div>
        );
    }
}

const valStyle = {
    display: 'inline-block',
    marginLeft: '10px',
    color: '#9758d6'
};

export default CreateLogoScreen;