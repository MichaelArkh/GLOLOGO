import React, { Component } from 'react'

// THIS IS HOW WE DISPLAY THE LOGO, IN THIS COMPONENT
class LogoWorkspace extends Component {
    
    getText(){
        let text = this.props.text;
        let newText = "";
        for(var i = 0; i < text.length; i++){
            if(text.charAt(i) === ' '){
                newText += "\u00a0"
            } else {
                newText += text.charAt(i);
            }
        }
        return newText;
    }


    render() {
        const styles = {
            container: {
                color: this.props.textColor,
                fontSize: this.props.fontSize + "pt",
                border:  this.props.borderWidth + "px" + " solid " + this.props.borderColor,
                backgroundColor: this.props.backgroundColor,
                //borderColor: this.props.logo.borderColor,
                borderRadius: this.props.borderRadius + "px",
                //borderWidth: this.props.logo.borderWidth + "px",
                padding: this.props.padding + "px",
                margin: this.props.margin + "px",
                maxWidth: 'max-content',
                minWidth: 'min-content'
            }
        }
        //console.log(styles.container.border);
        return (
                    <div style={ styles.container }>{this.getText()}</div>
        )
    }
}

export default LogoWorkspace