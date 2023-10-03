import React from "react";
import axios from "axios";
import API from "../../config/api";
import '../../style/login/login.css';
import user from '../../assets/solid/user.svg';
class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: ''
    }
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }
  onChange = (e) => this.setState({ [e.target.name]: e.target.value });
  onSubmit = (e) => {
    e.preventDefault();
    const formdata = new FormData();
    formdata.append('email', this.state.email);
    formdata.append('password', this.state.password);
    axios.post(`${API}/login`, formdata, {})
    .then(response => {
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('user_id', response.data.id);
      window.location.assign('/');
    })
    .catch(error => {
      console.log(error);
    });
  }
  render() {
    return (
      <div className="login">
        <img src={user} alt="Login" />
        <input type="email" name="email" value={this.state.email} onChange={this.onChange} placeholder="Email..." />
        <input type="password" name="password" value={this.state.password} onChange={this.onChange} placeholder="Password..." />
        <input type="submit" value="Login" onClick={this.onSubmit} />
      </div>
    );
  }
}

export default Login;
