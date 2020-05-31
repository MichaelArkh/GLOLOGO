import React, { Component } from 'react'
import { Modal } from 'react-materialize';
import Cookie from 'js-cookie';
import { Link } from 'react-router-dom';
import jwtDecode from 'jwt-decode';

class Navbar extends Component {
    constructor(props) {
        super(props);

        this.state = {
            email: !(typeof Cookie.get('jwt') === 'undefined') ? jwtDecode(Cookie.get('jwt'))["email"] : "",
            currentScreen: this.props.currentScreen,
            loggedin: !(typeof Cookie.get('jwt') === 'undefined'),
            cookieOk: true
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

    UNSAFE_componentWillReceiveProps = (newprops) => {
        this.setState({
            currentScreen: newprops.currentScreen
        });
    }

    logout = () => {
        Cookie.remove('jwt');
        this.setState({
            loggedin: !(typeof Cookie.get('jwt') === 'undefined')
        });
        this.props.logoutCallback();
    }

    render() {
        const login = this.state.loggedin && this.state.cookieOk;
        return (
            <div className="container " style={divStyle}>
                {login ?
                    <div className="row" style={{marginBottom: '0px'}}>
                        <div className="col s4"><h5><Link to="/">GloLogo Home</Link></h5></div>
                        <div className="col s4 center-align"><h5>{this.state.currentScreen}</h5></div>
                        <div className="col s4 center-align">
                            <Link to="/"><button className="waves-effect waves-light btn-large" style={{lineHeight: '20px'}} onClick={this.logout}>{"Logout: " + this.state.email}</button></Link>
                        </div>
                    </div>

                    : 
                    
                    <div className="row" style={{marginBottom: '0px', position: 'relative', height:'100%'}}>
                        <style>{modalStyle}</style>
                        <div className="col s6"><h5><Link to="/">GloLogo Home</Link></h5></div>
                        <div className="col s3 center-align" style={{borderLeft: '2px solid', height: '100%', borderRight: '2px solid'}}>
                            {/* <Modal trigger={<button className="waves-effect waves-light btn-large">Register</button>} header="Register">
                                <div className="center-align"><a href="http://localhost:3000/auth/google"><img alt="google-login" src="https://developers.google.com/identity/images/btn_google_signin_light_normal_web.png" /></a></div>
                            </Modal> */}
                        </div>
                        <div className="col s3 center-align">
                        <Modal trigger={<button className="waves-effect waves-light btn-large">Login/Register</button>} header="Login/Register">
                            <div className="center-align"><a href="http://localhost:3000/auth/google"><img alt="google-login" className="center-align" src="https://developers.google.com/identity/images/btn_google_signin_light_normal_web.png" /></a>
                                <p>Resetting your password is also done through google on their portal.</p>
                            </div>
                        </Modal>
                        </div>
                    </div>

                }
            </div>
        );
    }
}

const modalStyle = `
.modal {
    left: 0;
    right: 0;
    background-color: #fafafa;
    padding: 0;
    max-height: 40%;
    width: 20%;
    will-change: top, opacity;
  }
`

const divStyle = {
    marginTop: '15px',
    marginBottom: '10px',
    backgroundColor: '#f4c2ff',
    border: '1px solid black',
    padding: '20px',
    borderRadius: '20px'
}
export default Navbar;