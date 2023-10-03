import React from "react";
import API from "../../config/api";
import '../../style/signup/signup.css';
import userplus from '../../assets/solid/user-plus.svg';
import axios from "axios";

class Signup extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      first_name: '',
      last_name: '',
      file: '',
      email: '',
      password: ''
    }
    this.onChange = this.onChange.bind(this);
    this.onFileChange = this.onFileChange.bind(this);
  }
  onChange = (e) => this.setState({ [e.target.name]: e.target.value });
  onFileChange = (e) => this.setState({file: e.target.files[0]});
  Signup = (e) => {
    e.preventDefault();
    const formdata = new FormData();
    formdata.append('first_name', this.state.first_name);
    formdata.append('last_name', this.state.last_name);
    formdata.append('email', this.state.email);
    formdata.append('password', this.state.password);
    formdata.append('file', this.state.file);
    axios.post(`${API}/user`, formdata, {})
      .then(result => {
        alert(result.data.message);
      })
      .catch(error => {
        alert("Sign up failed! Network error!");
        console.log(error.stack);
      });
  }
  render() {
    return (
      <div className="signup">
        <div className="signup-icon"><img src={userplus} alt="Signup" /><span>Signup</span></div>
        <label>Choose profile photo...</label>
        <input type="file" name="file" accept="image/jpeg, image/png" onChange={this.onFileChange} required />
        <input type="text" name="first_name" value={this.state.first_name} onChange={this.onChange} placeholder="First Name..." required />
        <input type="text" name="last_name" value={this.state.last_name} onChange={this.onChange} placeholder="Last Name..." />
        <input type="email" name="email" value={this.state.email} onChange={this.onChange} placeholder="Email..." required />
        <input type="password" name="password" value={this.state.password} onChange={this.onChange} placeholder="Password..." required />
        <input type="submit" onClick={this.Signup} value="Sign up" />
      </div>
    );
  }
}

export default Signup;
