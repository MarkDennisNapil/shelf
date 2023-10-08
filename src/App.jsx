import React from 'react';
import plus from './assets/solid/plus.svg';
import gear from './assets/solid/gear.svg';
import xmark from './assets/solid/circle-xmark.svg';
import notesticky from './assets/solid/note-sticky.svg';
import loginicon from './assets/solid/user-tie.svg';
import signupicon from './assets/solid/user-plus.svg';
import searchicon from './assets/solid/magnifying-glass.svg';
import './App.css';
import API from './api';
import Note from './components/notes/note';
import NewNote from './components/notes/new';
import Signup from './components/signup/signup';
import Login from './components/login/login';
import Settings from './components/settings/settings';
import { Button } from 'react-bootstrap';
import axios from 'axios';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      notes: [],
      user: [],
      panel: 'notes',
      token: localStorage.getItem('token'),
      user_id: localStorage.getItem('user_id'),
      loginbtn: 'flex',
      signupbtn: 'flex',
      showPopupWindow: 'none',
      popwindow: '',
      keyword: localStorage.getItem('keyword'),
      searchwindow: 'none',
      searchresult: [],
      searchbtn: 'flex',
      newnotebtn: 'flex',
      searchbarvisibility: 'none', 
      settingsvisibility: 'flex'
    }
    this.KeywordChange = this.KeywordChange.bind(this);
    this.SearchResult = this.SearchResult.bind(this);
  }
  KeywordChange = (e) => {
    this.setState({keyword: e.target.value});
  }
  handlePanelCallback = (panelData) => {
    this.setState({ panel: panelData });
    this.FetchNotes()
  }
  componentDidMount() {
    if(this.state.user_id === 'null' && this.state.token === 'null'){
      this.setState({popwindow: 'login', showPopupWindow: 'block', loginbtn: 'flex', signupbtn: 'flex', settingsvisibility: 'none', newnotebtn: 'none', searchbtn: 'none'});
    }
    else{
      this.FetchNotes()
      this.UserData()
      this.setState({loginbtn: 'none', signupbtn: 'none'});
    }
  }
  FetchNotes = () => {
    fetch(`${API}/user/${this.state.user_id}/notes`, {
      method: 'GET', 
      headers: {
        "Accept": "application/json",
        "Content-Type": "application/json"
      }
    })
      .then(response => response.json())
      .then(data => {
        this.setState({ notes: data });
      })
      .catch(error => {
        console.log(error);
      });
      this.setState({panel: 'notes'});
  }
  UserData() {
    fetch(`${API}/user/${this.state.user_id}`, {
      method: 'GET',
      headers: {
        "Accept": "application/json",
        "Content-Type": "application/json"
      }
    })
      .then(response => response.json())
      .then(result => {
        this.setState({ user: result });
      })
      .catch(error => {
        console.log(error);
      });
  }
  Notes() {
    return this.state.notes.map((item, i) => {
      return <Note note={item} key={i} />;
    });
  }
  toggleSearchBar = () => {
    this.setState({searchbarvisibility: 'flex', searchbtn: 'none'});
  }
  SearchResult = () => {
    return this.state.notes.map((item, i) => {
      return <Note note={item} key={i} />;
    });
  }
  newNote = () => {
    this.setState({ panel: 'newnote' });
  }
  Panel = () => {
    if (this.state.panel === 'newnote') {
      return <NewNote user={this.state.user_id} panelCallback={this.handlePanelCallback} />;
    } 
    else if(this.state.panel === 'searchresult'){
      this.SearchResult()
    }
    else {
      return this.Notes()
    }
  }
  triggerLogin = () => {
    this.setState({ popwindow: 'login', showPopupWindow: 'block' });
  }
  triggerSignup = () => {
    this.setState({ popwindow: 'signup', showPopupWindow: 'block' });
  }
  triggerSettings = () => {
    this.setState({ popwindow: 'settings', showPopupWindow: 'block' });
  }
  closePopUp = () => {
    this.setState({showPopupWindow: 'none'});
  }
  PopUpWindow() {
    const {user_id, token, popwindow} = this.state;
    if(token === null && user_id === null) {
      this.setState({popwindow: 'login', showPopupWindow: 'block', loginbtn: 'flex', signupbtn: 'flex'});
      console.log("Token & UID is null");
      return <Login />;
    }
    else if (popwindow === 'login') {
      return <Login />;
    }
    else if (popwindow === 'signup') {
      return <Signup />;
    }
    else if (popwindow === 'settings') {
      if(user_id === null) {
        alert("Not Login");
        return <Login />;
      } else{
        return <Settings user={this.state.user} />;
    }
  }
  }
  Search = (e) => {
    e.preventDefault();
    localStorage.setItem('keyword', this.state.keyword);
    axios.get(`${API}/note/user/${this.state.user_id}/search/${this.state.keyword}`)
    .then(response => {
      this.setState({
        notes: response.data,
        searchbtn: 'flex',
        searchbarvisibility: 'none'
      });
    })
    .catch(error => {
      console.log(error);
    });
  }
  render() {
    return (
      <div className='main'>
        <div className='topbar'>
          <button onClick={this.newNote} className='newnote-btn' style={{display: `${this.state.newnotebtn}`}}><img src={plus} alt='New' /><span>New Note</span></button>
          <button onClick={this.FetchNotes} className='notes-btn'><img src={notesticky} /><span>Notes</span></button>
          <button onClick={this.toggleSearchBar} style={{display: `${this.state.searchbtn}`}}><img src={searchicon} /></button>
          <button onClick={this.triggerLogin} className='login-btn' style={{display: `${this.state.loginbtn}`}}><img src={loginicon} /><span>Login</span></button>
          <button onClick={this.triggerSignup} className='signup-btn' style={{display: `${this.state.signupbtn}`}}><img src={signupicon} /><span>Signup</span></button>
          <button onClick={this.triggerSettings} className='settings-btn' style={{display: `${this.state.settingsvisibility}`}}><img src={gear} alt='Settings' /></button>
        </div>
        <div className='searchbar' style={{display: `${this.state.searchbarvisibility}`}}>
          <input type='text' name='keyword' value={this.state.keyword} onChange={this.KeywordChange} placeholder='Search' />
          <Button onClick={this.Search}><img src={searchicon} /></Button>
        </div>
        <div className='shelf'>
          <div className='popup-window' style={{display: `${this.state.showPopupWindow}`}}>
            <button onClick={this.closePopUp}><img src={xmark} alt="X" /></button>
            {this.PopUpWindow()}
            </div>
          {this.Panel()}
        </div>
      </div>
    );
  }
}

export default App;
