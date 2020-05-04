import React, { Component } from 'react'
import Draggable from 'react-draggable';

// THIS IS HOW WE DISPLAY THE LOGO, IN THIS COMPONENT
class LogoWorkspace extends Component {

    constructor(props) {
        super(props);
    }

    getText(text) {
        let newText = "";
        for (var i = 0; i < text.length; i++) {
            if (text.charAt(i) === ' ') {
                newText += "\u00a0"
            } else {
                newText += text.charAt(i);
            }
        }
        return newText;
    }

    controlledTextDrag = (index, pos) => {
        var texts = this.props.values.text;
        texts[index].position[0] = pos.x;
        texts[index].position[1] = pos.y;
        this.props.updatedTextCallback(texts);
    }

    controlledImgDrag = (index, pos) => {
        var texts = this.props.values.imgs;
        texts[index].position[0] = pos.x;
        texts[index].position[1] = pos.y;
        this.props.updatedImageCallback(texts);
    }

    render() {
        const styles = {
            container: {
                border: this.props.values.borderWidth + "px" + " solid " + this.props.values.borderColor,
                backgroundColor: this.props.values.backgroundColor,
                //borderColor: this.props.logo.borderColor,
                borderRadius: this.props.values.borderRadius + "px",
                //borderWidth: this.props.logo.borderWidth + "px",
                padding: this.props.values.padding + "px",
                margin: this.props.values.margin + "px",
                width: (this.props.values.dimensions[0] + this.props.values.borderWidth*2 + this.props.values.padding*2),
                height: (this.props.values.dimensions[1] + this.props.values.borderWidth*2 + this.props.values.padding*2),
               // maxWidth: (this.props.values.dimensions[0] + this.props.values.borderWidth + this.props.values.margin + this.props.values.padding),
                //maxHeight: (this.props.values.dimensions[1] + this.props.values.borderWidth + this.props.values.margin + this.props.values.padding),
                //boxSizing: 'border-box',
                position: 'relative'
            },
            imgs: {
                cursor: 'pointer',
                maxWidth: 'max-content',
                maxHeight: 'max-content'
            }
        }
        return (
            <div id="workspace" style={styles.container}>{this.props.values.text.map((e, index) => (
                <Draggable disabled={this.props.disabled} key={index} onDrag={(e, pos) => this.controlledTextDrag(index, pos)} position={{ x: this.props.values.text[index].position[0], y: this.props.values.text[index].position[1] }} bounds="parent">
                    <div style={{zIndex: e.index, fontSize: e.fontSize, color: e.color, cursor: 'pointer', height: 'auto', width: 'auto', position: 'absolute' }}>{this.getText(e.content)}</div>
                </Draggable>
            ))
            }{this.props.values.imgs.map((e, index) => (
                <Draggable disabled={this.props.disabled} key={index} onDrag={(e, pos) => this.controlledImgDrag(index, pos)} position={{ x: this.props.values.imgs[index].position[0], y: this.props.values.imgs[index].position[1] }} bounds="parent">
                        <img draggable="false" alt="" style={{zIndex: e.index, width: e.scale + '%', cursor: 'pointer', position: 'absolute'}} src={e.link}/>
                </Draggable>
            ))}</div>
        )
    }
}

export default LogoWorkspace