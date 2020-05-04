import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import '../App.css';
import gql from 'graphql-tag';
import { Query, Mutation } from 'react-apollo';
import LogoWorkspace from './LogoWorkspace';
import { Modal } from 'react-materialize';
import Cookie from 'js-cookie';
import Navbar from './Navbar.js';
import jwtDecode from 'jwt-decode';
import html2canvas from 'html2canvas';

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
                index
            }
            imgs {
                link
                position
                scale
                index
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

    downloadHandle = () => {
        html2canvas(document.getElementById('workspace'), { useCORS: true }).then(function (canvas) {
            var myImage = canvas.toDataURL("image/png").replace("image/png", "image/octet-stream");;
            //window.open(myImage);
            console.log(canvas);
            document.body.appendChild(canvas);
        });
    }

    processLogoutCallback = () => {

    }

    render() {
        let cookie = this.state.cookieOk;
        let cookieEmail = "null";
        if (this.state.cookieOk) {
            cookieEmail = jwtDecode(Cookie.get('jwt')).email
        }
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
                                            <div className="col s5" style={{ borderRight: '2px solid #bababa' }}>
                                                <div className="card-panel">
                                                    <Mutation mutation={DELETE_LOGO} key={data.logo._id} >
                                                        {(removeLogo, { loading, error }) => (
                                                            <div>
                                                                <form id="form"
                                                                    onSubmit={e => {
                                                                        removeLogo({ variables: { id: data.logo._id } });
                                                                    }}>
                                                                    <div className="row">
                                                                        <div className="col s3 center-align"><Link to={`/edit/${data.logo._id}`}><button className="btn waves-effect waves-light">Edit<i className="material-icons right tiny">edit</i></button></Link></div>
                                                                        <div className="col s4 center-align">
                                                                            <Modal header="Confirm Delete" trigger={<button onClick={this.toggleShow} type="button" className="btn waves-effect waves-light red" >Delete<i className="material-icons right tiny">delete</i></button>}>
                                                                                <div className="center-align">
                                                                                    <button form="form" type="submit" className="btn waves-effect waves-light modal-close green">Confirm</button>
                                                                                    <button className="btn waves-effect waves-light modal-close red">Cancel</button>
                                                                                </div>
                                                                            </Modal>
                                                                        </div>
                                                                        <div className="col center-align"><button className="btn waves-effect waves-light modal-close blue" onClick={this.downloadHandle}>Download<i className="material-icons right tiny">file_download</i></button></div>
                                                                    </div>
                                                                </form>
                                                                {loading && <p>Loading...</p>}
                                                                {error && <p>Error :( Please try again</p>}
                                                            </div>
                                                        )}
                                                    </Mutation>
                                                    <div className="card blue-grey darken-1">
                                                        <div className="card-content white-text">
                                                            <span className="card-title">Text</span>
                                                            <table>
                                                                <thead>
                                                                    <tr>
                                                                        <th>Content</th>
                                                                        <th>Position</th>
                                                                        <th>Size</th>
                                                                        <th>Color</th>
                                                                        <th>Index</th>
                                                                    </tr>
                                                                </thead>
                                                                <tbody>
                                                                    {data.logo.text.map((e, index) => (
                                                                        <tr key={index}>
                                                                            <td>{e["content"].substring(0, 15)}</td>
                                                                            <td>{e["position"].toString()}</td>
                                                                            <td>{e["fontSize"]}</td>
                                                                            <td><div style={{ height: '15px', width: '15px', border: '1px solid black', backgroundColor: e["color"] }} /></td>
                                                                            <td>{e["index"]}</td>
                                                                        </tr>
                                                                    ))}
                                                                </tbody>
                                                            </table>
                                                        </div>
                                                    </div>

                                                    <div className="card blue-grey darken-1">
                                                        <div className="card-content white-text">
                                                            <span className="card-title">Images</span>
                                                            <table>
                                                                <thead>
                                                                    <tr>
                                                                        <th>Min Url</th>
                                                                        <th>Position</th>
                                                                        <th>Scale</th>
                                                                        <th>Index</th>
                                                                    </tr>
                                                                </thead>
                                                                <tbody>
                                                                    {data.logo.imgs.map((e, index) => (
                                                                        <tr key={index}>
                                                                            <td>{e["link"].substring(0, 15)}</td>
                                                                            <td>{e["position"].toString()}</td>
                                                                            <td>{e["scale"] + " %"}</td>
                                                                            <td>{e["index"]}</td>
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
                                                                    <div className="col s8">
                                                                        {data.logo.name}
                                                                    </div>
                                                                </div>
                                                                <div className="row">
                                                                    <div className="col s4">Dimensions</div>
                                                                    <div className="col s8">
                                                                    {data.logo.dimensions[0] + " x " + data.logo.dimensions[1]}
                                                                    </div>
                                                                </div>
                                                                <div className="row">
                                                                    <div className="col s4">Background Color:</div>
                                                                    <div className="col s8">
                                                                        {data.logo.backgroundColor}<div style={{ height: '20px', width: '20px', border: '2px solid black', backgroundColor: data.logo.backgroundColor, display: 'inline-block', marginLeft: '10px' }} />
                                                                    </div>
                                                                </div>
                                                                <div className="row">
                                                                    <div className="col s4">Border Color:</div>
                                                                    <div className="col s8">
                                                                    {data.logo.borderColor}<div style={{ height: '20px', width: '20px', border: '2px solid black', backgroundColor: data.logo.borderColor, display: 'inline-block', marginLeft: '10px' }} />
                                                                    </div>
                                                                </div>

                                                                <div className="row">
                                                                    <div className="col s4">Border Radius:</div>
                                                                    <div className="col s8">
                                                                    {data.logo.borderRadius}
                                                                    </div>
                                                                </div>
                                                                <div className="row">
                                                                    <div className="col s4">Border Width:</div>
                                                                    <div className="col s8">
                                                                    {data.logo.borderWidth}
                                                                    </div>
                                                                </div>
                                                                <div className="row">
                                                                    <div className="col s4">Margin:</div>
                                                                    <div className="col s8">
                                                                    {data.logo.margin}
                                                                    </div>
                                                                </div>
                                                                <div className="row">
                                                                    <div className="col s4">Padding:</div>
                                                                    <div className="col s8">
                                                                    {data.logo.padding}
                                                                    </div>
                                                                </div>


                                                        </div>
                                                    </div>

                                                </div>
                                            </div>
                                            <div className="col s7">
                                                <LogoWorkspace disabled={true} values={JSON.parse(JSON.stringify(data.logo))} updatedImageCallback={(newImage) => this.updateImagePos(newImage)} updatedTextCallback={(newText) => this.updateTextPos(newText)} />
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