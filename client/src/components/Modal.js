import React from "react";

class Modal extends React.Component {
    constructor(props){
        super(props);

        this.state = {
            visible: this.props.show
        };
    }
    componentWillReceiveProps(newprops){
        this.setState({
            visible: newprops.show
        })
    }

    toggleVis = () => {
        this.setState({visible: !this.state.visible});
    }

  render() {
    return(  <div>
         { this.state.visible 
               ? <div style={modalStyle}>
                    <div style={modalContent}>
                        <div className="header text-center text-secondary">
                            {this.props.header}
                            <hr></hr>
                        </div>
                        <div className="body text-center">
                            {this.props.body}
                            <hr></hr>
                        </div>
                        <div className="footer float-right">
                            
                            <button type="button" onClick={this.props.toggle} className="btn">CLOSE</button>
                        </div>
                    </div>    
                </div>
                : null  
        } 
        </div>
        );
  }
}

const modalStyle = {
    position: 'fixed',
    top: '0',
    left: '0',
    width: '100%',
    height: '100%',
    background: 'rgba(0, 0, 0, 0.6)',
    zIndex: '1'
};

const modalContent = {
    position: 'fixed',
    background: 'white',
    width: '50%',
    height: 'auto',
    top: '20%',
    left: '50%',
    transform: 'translate(-50%,-50%)'
};

export default Modal;