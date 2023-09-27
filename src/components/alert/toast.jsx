/* eslint-disable react/prop-types */
import React from "react";
import { Button } from "react-bootstrap";
import xmark from '../../../src/assets/solid/circle-xmark.svg';
import user from '../../../src/assets/solid/user.svg';
import '../../style/alert/toast.css';

class APIResponseToast extends React.Component {
constructor(props){
  super(props);
  this.state = {
    toastvisibility: this.props.visibility
  }
}
render(){
  return (
    <div className='t1-res-alert' style={{display: `${this.state.toastvisibility}`}}>
        <div className="t1-topbar">
            <img src={user} alt="" />
            <span>Shelf</span>
            <Button><img src={xmark} /></Button>
        </div>
        <div className="t1-message">
            <p>{this.props.message}</p>
        </div>
        <Button onClick={() => this.setState({toastvisibility: 'none'})}>Ok</Button>
    </div>
  );
}
}

export default APIResponseToast;