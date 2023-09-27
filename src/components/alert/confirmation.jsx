/* eslint-disable react/prop-types */
import React from "react";
import { Button } from "react-bootstrap";
import '../../style/alert/confirmation.css';

class ConfirmationWindow extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            windowvisibility: this.props.visibility
        }
    }
    Confirm = () => {
        this.props.Confirm(true);
    }
    Cancel = () => {
        this.props.Confirm(false);
        this.setState({windowvisibility: 'none'});
    }
    render(){
        return(
            <div className="cw1-container" style={{display: `${this.state.windowvisibility}`}}>
                <div className="cw1-text">
                    <p>{this.props.message}</p>
                    <Button onClick={this.Confirm} className="cw1-ok-btn">Ok</Button>
                    <Button onClick={this.Cancel} className="cw1-cancel-btn">Cancel</Button>
                </div>
            </div>
        )
    }
}

export default ConfirmationWindow;