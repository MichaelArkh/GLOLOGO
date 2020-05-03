import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import '../App.css';
import gql from 'graphql-tag';
import { Query, Mutation } from 'react-apollo';
import LogoWorkspace from './LogoWorkspace';
import {Modal} from 'react-materialize';
import Cookie from 'js-cookie';
import Navbar from './Navbar.js';
import jwtDecode from 'jwt-decode';

// id name email text[] imgs[] backgroundcolor bordercolor
// dimentions borderradius borderwidth padding margin lastupdate
// content color fontsize position[]
// link position[] scale
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
            lastUpdate
        }
    }
`;

const DELETE_LOGO = gql`
  mutation removeLogo($id: String!) {
    removeLogo(id:$id) {
      _id
    }
  }
`;

class ViewLogoScreen extends Component {

    constructor(props) {
        super(props);

        this.state = {
            modalShow: false,
            cookieOk: false
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

    toggleShow = () => {
        this.setState({
            modalShow: !this.state.modalShow
        });
    }

    processLogoutCallback = () => {

    }

    render() {
        let cookie = this.state.cookieOk;
        let cookieEmail = jwtDecode(Cookie.get('jwt')).email
        return (
            <div>
                <Navbar currentScreen="View Logo" logoutCallback={this.processLogoutCallback} />
                {cookie ?
                    <Query pollInterval={500} query={GET_LOGO} variables={{ logoId: this.props.match.params.id }}>
                        {({ loading, error, data }) => {
                            if (loading) return 'Loading...';
                            if (error) return `Error! ${error.message}`;

                            return (
                                <div className="container">
                                    {data.logo === null ? this.props.history.push('/') : data.logo.email === cookieEmail ?
                                        <div className="row">
                                            <div className="panel-body col s5" style={{ borderRight: '2px solid #bababa' }}>
                                                <dl>
                                                    <dt>Name:</dt>
                                                    <dd>{data.logo.name}</dd>
                                                    <dt>Text:</dt>
                                                    
                                                        <table>
                                                            <thead>
                                                                <tr>
                                                                    <th>Content</th>
                                                                    <th>Position</th>
                                                                    <th>Size</th>
                                                                    <th>Color</th>
                                                                </tr>
                                                            </thead>
                                                            <tbody>
                                                                {data.logo.text.map((e, index) => (
                                                                    <tr key={index}>
                                                                        <td>{e["content"]}</td>
                                                                        <td>{e["position"].toString()}</td>
                                                                        <td>{e["fontSize"]}</td>
                                                                        <td><div style={{ height: '15px', width: '15px', border: '1px solid black', backgroundColor: e["color"] }} /></td>
                                                                    </tr>
                                                                ))}
                                                            </tbody>
                                                        </table>
                                                    
                                                    <dt>Images:</dt>
                                                    
                                                        <table>
                                                            <thead>
                                                                <tr>
                                                                    <th>Min Url</th>
                                                                    <th>Position</th>
                                                                    <th>Scale</th>
                                                                </tr>
                                                            </thead>
                                                            <tbody>
                                                                {data.logo.imgs.map((e, index) => (
                                                                    <tr key={index}>
                                                                        <td>{e["link"].substring(0, 15)}</td>
                                                                        <td>{e["position"].toString()}</td>
                                                                        <td>{e["scale"] + " %"}</td>
                                                                    </tr>
                                                                ))}
                                                            </tbody>
                                                        </table>
                                                    
                                                    <dt>Background Color:</dt>
                                                    <dd>{data.logo.backgroundColor}<div style={{ height: '20px', width: '20px', border: '2px solid black', backgroundColor: data.logo.backgroundColor, display: 'inline-block', marginLeft: '10px' }} /></dd>
                                                    <dt>Border Color:</dt>
                                                    <dd>{data.logo.borderColor}<div style={{ height: '20px', width: '20px', border: '2px solid black', backgroundColor: data.logo.borderColor, display: 'inline-block', marginLeft: '10px' }} /></dd>
                                                    <dt>Dimensions</dt>
                                                    <dd>{data.logo.dimensions[0] + " x " + data.logo.dimensions[1]}</dd>
                                                    <dt>Border Radius:</dt>
                                                    <dd>{data.logo.borderRadius}</dd>
                                                    <dt>Border Width:</dt>
                                                    <dd>{data.logo.borderWidth}</dd>
                                                    <dt>Padding:</dt>
                                                    <dd>{data.logo.padding}</dd>
                                                    <dt>Margin:</dt>
                                                    <dd>{data.logo.margin}</dd>
                                                    {            //id,text,text-color,fontsize,backgroundcolor,bordercolor,
                                                        // borderradius, borderwidth, padding, margin 
                                                    }
                                                </dl>
                                                <Mutation mutation={DELETE_LOGO} key={data.logo._id} >
                                                    {(removeLogo, { loading, error }) => (
                                                        <div>
                                                            <form id="form"
                                                                onSubmit={e => {
                                                                    removeLogo({ variables: { id: data.logo._id } });
                                                                }}>
                                                                <Link to={`/edit/${data.logo._id}`} className="btn btn-success">Edit</Link>&nbsp;
                                                                <Modal header="Delete Logo" trigger={<button onClick={this.toggleShow} type="button" className="btn waves-effect waves-light" >Delete</button>}>
                                                                    <button form="form" type="submit" className="btn waves-effect waves-light modal-close">Delete</button>
                                                                    <button className="btn waves-effect waves-light modal-close">Cancel</button>
                                                                </Modal>
                                                                
                                                            </form>
                                                            {loading && <p>Loading...</p>}
                                                            {error && <p>Error :( Please try again</p>}
                                                        </div>
                                                    )}
                                                </Mutation>
                                            </div>
                                            <div className="col s7">
                                                <LogoWorkspace disabled={true} values={JSON.parse(JSON.stringify(data.logo))} updatedImageCallback={(newImage) => this.updateImagePos(newImage)}updatedTextCallback={(newText) => this.updateTextPos(newText)}/>
                                            </div>
                                        </div>
                                        :
                                        this.props.history.push('/')}
                                </div>
                            );
                        }
                        }
                    </Query >
                    : <div>

                        <h5>Cookie not ok, please relogin.</h5>
                    </div>}
            </div>
        );
    }
}

export default ViewLogoScreen;