import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import '../App.css';
import gql from 'graphql-tag';
import { Query } from 'react-apollo';
import Navbar from './Navbar.js';
import WelcomeScreen from './WelcomeScreen';
import Cookie from 'js-cookie';
import jwtDecode from 'jwt-decode';

const GET_LOGOS = gql`
query email($email: String!)
  {
    logosE(email: $email) {
      _id
      name
      lastUpdate
    }
  }
`;

class HomeScreen extends Component {

    constructor(props) {
        super(props);

        this.state = {
            loggedin: false,
            cookieOk: true
        };

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

    sortdata(a, b) {
        //needs to return the lowest difference first
        let data1 = new Date(a.lastUpdate);
        let data2 = new Date(b.lastUpdate);
        return data2 - data1;
    }

    processLogoutCallback = () => {
        this.setState({
            cookieOk: false
        });
    }

    render() {
        var login = this.state.cookieOk;
        return (
            <div>
                {login ?
                    <Query pollInterval={500} query={GET_LOGOS} variables={{email: !(typeof Cookie.get('jwt') === 'undefined') ? jwtDecode(Cookie.get('jwt'))["email"] : ""}}>
                        {({ loading, error, data }) => {
                            if (loading) return 'Loading...';
                            if (error) return `Error! ${error.message}`;
                            return (
                                <div>
                                    <Navbar currentScreen="Home Screen" logoutCallback={this.processLogoutCallback}/>
                                    <div className="container row">
                                        <div className="col s4">
                                            <h3>Recent Work</h3>
                                            {data.logosE.sort((a, b) => this.sortdata(a, b)).map((logo, index) => (
                                                <div key={index} className='home_logo_link'
                                                    >
                                                    <Link to={`/view/${logo._id}`}>
                                                        <button className="btn btn-outline-secondary" style={{
                                                            padding: '0px 10px 0px 10px',
                                                            marginBottom: '5px'
                                                        }}>
                                                            {logo.name}
                                                        </button>
                                                    </Link>
                                                </div>
                                            ))}
                                        </div>
                                        <div className="col s8">
                                            <div id="home_banner_container">
                                                @todo<br />
                                    Gologolo
                                </div>
                                            <div>
                                                <Link id="add_logo_button" to="/create">
                                                    <button className="btn btn-outline-* btn-lg" style={{
                                                        backgroundColor: '#deba2c',
                                                        margin: '5px'
                                                    }}>
                                                        Add Logo
                                        </button>
                                                </Link>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            );
                        }
                        }
                    </Query >
                    :
                    <div><WelcomeScreen /></div>
                }
            </div>
        );
    }
}

export default HomeScreen;
