import React, { Component } from 'react';
import '../App.css';
import Navbar from './Navbar.js';

class WelcomeScreen extends Component {

    render() {
        return (
            <div><Navbar currentScreen="Welcome Screen" />
                <div className="container">
                    <div className="row" style={{border: '2px solid', marginTop: '30px'}}>
                        <h4>Welcome to GloLogo</h4>
                        <div className="center-align" style={{width: '300px', margin: 'auto'}}>
                            <br />
                            <p>A logo making app based on the MERN Stack.<br /><br />
                            
                            Now with: Image options, mutiple texts, and click and drag functionality<br /><br />
                            
                            In order to start using this amazing app please login or register by clicking the proper section on the navbar. (An account is required)</p>
                        </div>
                    </div>
                </div>
            </div>
        )
    };
}
export default WelcomeScreen;