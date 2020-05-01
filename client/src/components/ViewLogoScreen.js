import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import '../App.css';
import gql from 'graphql-tag';
import { Query, Mutation } from 'react-apollo';
import LogoWorkspace from './LogoWorkspace';
import Modal from './Modal.js';
import Cookie from 'js-cookie';
import Navbar from './Navbar.js';

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

    constructor(props){
        super(props);

        this.state = {
            modalShow: false,
            cookieOk: false
        }
    }

    toggleShow = () => {
        this.setState({
            modalShow: !this.state.modalShow
        });
    }

    componentWillMount = () => {
        const query = {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
              },
            body: JSON.stringify({mycookie: Cookie.get('jwt')})
        };

        fetch('http://localhost:3000/verify', query).then(
            res => {
                res.text().then( ok =>{
                    this.setState({
                        cookieOk: ok === 'true'
                    });
                })
            }
        );
    }

    processLogoutCallback = () => {
        
    }

    render() {
        let cookie = this.state.cookieOk;
        console.log(cookie);
        return (
            <div>
                <Navbar currentScreen="View Logo" logoutCallback={this.processLogoutCallback}/>
                { cookie ?
            <Query pollInterval={500} query={GET_LOGO} variables={{ logoId: this.props.match.params.id }}>
                {({ loading, error, data }) => {
                    if (loading) return 'Loading...';
                    if (error) return `Error! ${error.message}`;

                    return (
                        <div className="container mx-auto">
                            <div className="row" style={{
                                backgroundColor: '#ebd9ff',
                                paddingLeft: '20px', borderRadius: '20px'
                            }}>
                            <div className="panel panel-default">
                                <div className="panel-heading">
                                    <h4><Link to="/">Home</Link></h4>
                                    <h3 className="panel-title">
                                        View Logo
                                    </h3>
                                </div>
                            </div>
                            </div>
                            <div className="row">
                            <div className="panel-body col s5" style={{ borderRight: '2px solid #bababa'}}>
                                <dl>
                                    <dt>Text:</dt>
                                    <dd>{data.logo.text}</dd>
                                    <dt>Color:</dt>
                                    <dd>{data.logo.color}<div style={{ height: '20px', width: '20px', border: '2px solid black', backgroundColor: data.logo.color, display: 'inline-block', marginLeft: '10px' }} /></dd>
                                    <dt>background Color:</dt>
                                    <dd>{data.logo.backgroundColor}<div style={{ height: '20px', width: '20px', border: '2px solid black', backgroundColor: data.logo.backgroundColor, display: 'inline-block', marginLeft: '10px' }} /></dd>
                                    <dt>Border Color:</dt>
                                    <dd>{data.logo.borderColor}<div style={{ height: '20px', width: '20px', border: '2px solid black', backgroundColor: data.logo.borderColor, display: 'inline-block', marginLeft: '10px' }} /></dd>
                                    <dt>Font Size:</dt>
                                    <dd>{data.logo.fontSize}</dd>
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
                                <Mutation mutation={DELETE_LOGO} key={data.logo._id} onCompleted={() => this.props.history.push('/')}>
                                    {(removeLogo, { loading, error }) => (
                                        <div>
                                            <form
                                                onSubmit={e => {
                                                    e.preventDefault();
                                                    removeLogo({ variables: { id: data.logo._id } });
                                                }}>
                                                <Link to={`/edit/${data.logo._id}`} className="btn btn-success">Edit</Link>&nbsp;
                                                <button onClick={this.toggleShow} type="button" className="btn btn-danger">Delete</button>
                                                <Modal show={this.state.modalShow} toggle={this.toggleShow} header={
                                                    <>
                                                        <h3>Confirm Delete!</h3>
                                                    </>
                                                } body={
                                                    <>
                                                        <button type="submit" className="btn bg-info">Delete</button>
                                                        <button onClick={this.toggleShow} className="btn bg-info">Cancel</button>
                                                    </>
                                                }/>
                                            </form>
                                            {loading && <p>Loading...</p>}
                                            {error && <p>Error :( Please try again</p>}
                                        </div>
                                    )}
                                </Mutation>
                            </div>
                            <div className="col s7">
                                <LogoWorkspace text={data.logo.text} textColor={data.logo.color} backgroundColor={data.logo.backgroundColor}
                                borderColor={data.logo.borderColor} fontSize={data.logo.fontSize} borderRadius={data.logo.borderRadius}
                                borderWidth={data.logo.borderWidth} padding={data.logo.padding} margin={data.logo.margin}/>
                            </div>
                        </div>
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