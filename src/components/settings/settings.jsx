/* eslint-disable react/prop-types */
import React from "react";
import API from "../../api";
import '../../style/settings/settings.css';
import axios from "axios";

class Settings extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      user: [this.props.user],
      first_name: this.props.user.first_name,
      last_name: this.props.user.last_name,
      photo: '',
      editvisibility: 'none',
      modify_type: '',
      background: localStorage.getItem('settingswindow_background'),
    }
    this.onChange = this.onChange.bind(this);
    this.handleEmailChange = this.handleImageChange.bind(this);
    this.handleColor = this.handleColor.bind(this);
  }
  onChange = (e) => this.setState({[e.target.name]: e.target.value});
  handleColor = (e) => {
    this.setState({background: e.target.value});
    localStorage.setItem('settingswindow_background', this.state.background);
  }
  handleImageChange = (e) => this.setState({photo: e.target.files[0]});
  ChangePhotoInput(){
    return  <div className="eu-photo">
      <input type="file" name="photo" onChange={this.handleImageChange} />
      <button onClick={this.UploadNewPhoto}>Upload</button>
      </div>;
  }
  ChangeNameInput(){
    return  <div className="eu-text">
      <input type="text" name="first_name" className="eu-fn" value={this.state.first_name} onChange={this.onChange} placeholder="First Name..." required />
      <input type="text" name="last_name" className="eu-ln" value={this.state.last_name} onChange={this.onChange} placeholder="Last Name..." required />
      <button onClick={this.SaveName}>Save Changes</button>
    </div>;
  }
  UploadNewPhoto = (e) => {
    e.preventDefault();
    const filedata = new FormData();
    filedata.append('file', this.state.photo);
    axios.put(`${API}/user/${this.props.user._id}/photo`, filedata, {})
    .then(result => {
      alert(result.data.message);
      window.location.assign('/');
    })
    .catch(error => {
      console.log(error);
    });
  }
  toggleChangePhoto = () => {
    this.setState({editvisibility: 'block', modify_type: 'photo'});
  }
  toggleChangeName = () => {
    this.setState({editvisibility: 'block', modify_type: 'name'});
  }
  ModifyForm(){
    if(this.state.modify_type === 'photo'){
      return this.ChangePhotoInput()
    }
    else if(this.state.modify_type === 'name'){
      return this.ChangeNameInput()
    }
    else{
      return 0;
    }
  }
  SaveName = (e) => {
    e.preventDefault();
    const formdata = new FormData();
    formdata.append('first_name', this.state.first_name);
    formdata.append('last_name', this.state.last_name);
    axios.put(`${API}/user/${this.props.user._id}`, formdata, {})
    .then(result => {
      alert(result.data.message);
      window.location.assign('/');
    })
    .catch(error => {
      console.log(error);
    });
  }
  Logout = () => {
    localStorage.setItem('user_id', null);
    localStorage.setItem('token', null);
    window.location.assign('/');
  }
  render() {
    return (
      <div className="settings" style={{background: `${this.state.background}`, boxShadow: `${this.state.shadow}`}}>
        <div className="user-photo">
        <input type="color" name="color" value={this.state.background} onChange={this.handleColor} />
          <img src={`${API}/resources/` + this.props.user.photo} alt="Image" />
        </div>
        <div className="user-name"><h1>{this.props.user.first_name + " " + this.props.user.last_name}</h1>
        </div>
        <div className="edit-user" style={{display: `${this.state.editvisibility}`}}>
         {this.ModifyForm()}
        </div>
        <div className="logout">
          <button onClick={this.toggleChangePhoto}>Change Photo</button>
          <button onClick={this.toggleChangeName}>Change Name</button>
          <button onClick={this.Logout}>Logout</button></div>
      </div>
    );
  }
}

export default Settings;
