import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import '../App.css';
import gql from 'graphql-tag';
import { Query } from 'react-apollo';

const GET_LOGOS = gql`
  {
    logos {
      _id
      text
      lastUpdate
    }
  }
`;

class HomeScreen extends Component {

    sortdata(a, b) {
        //needs to return the lowest difference first
        let data1 = new Date(a.lastUpdate);
        let data2 = new Date(b.lastUpdate);
        return data2 - data1;
    }

    render() {
        return (
            <Query pollInterval={500} query={GET_LOGOS}>
                {({ loading, error, data }) => {
                    if (loading) return 'Loading...';
                    if (error) return `Error! ${error.message}`;

                    return (
                        <div className="container row mx-auto" style={{width: '80%'}}>
                            <div className="col s4">
                                <h3>Recent Work</h3>
                                {data.logos.sort((a,b) => this.sortdata(a,b)).map((logo, index) => (
                                    <div key={index} className='home_logo_link'
                                        style={{ cursor: "pointer" }}>
                                        <Link to={`/view/${logo._id}`}>
                                            <button className="btn btn-outline-secondary" style={{padding: '0px 10px 0px 10px',
                                                                                                  marginBottom: '5px'}}>
                                                {logo.text}
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
                                        <button className="btn btn-outline-* btn-lg" style={{backgroundColor: '#deba2c',
                                                                                            margin: '5px'}}>
                                            Add Logo
                                        </button>
                                    </Link>
                                </div>
                            </div>
                        </div>
                    );
                }
                }
            </Query >
        );
    }
}

export default HomeScreen;
