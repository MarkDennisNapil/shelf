/* eslint-disable react/prop-types */
import React from "react";
import API from "../../../config/api";
import '../../style/notes/note.css';
import penIcon from '../../assets/solid/pen.svg';
import iconSave from '../../assets/solid/floppy-disk.svg';
import iconDiscard from '../../assets/solid/trash.svg';
import iconDelete from '../../assets/solid/trash-can.svg';
import iconExit from '../../assets/solid/circle-chevron-left.svg';
import iconEditNote from '../../assets/solid/pen-to-square.svg';
import axios from "axios";
import APIResponseToast from "../alert/toast";
import ConfirmationWindow from "../alert/confirmation";

export default class Note extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      note: [],
      name: '',
      content: '',
      background: this.props.note.background,
      previewtext: 'block',
      edittext: 'none',
      width: '',
      height: '',
      displayOptionButtons: 'none', 
      notevisibility: '',
      alertwindow: '',
      deleteconfirm: ''
    }
    this.onChange = this.onChange.bind(this);
    this.handleColor = this.handleColor.bind(this);
    this.Alert = this.Alert.bind(this);
  }
  onChange = (e) => this.setState({ [e.target.name]: e.target.value });
  handleColor = (e) => this.setState({background: e.target.value});  
  DeleteConfirmCallback = (DelConfirmationStatus) => {
    this.setState({ deleteconfirm: DelConfirmationStatus });
    console.log("Callback confirm value" + this.state.deleteconfirm);
    if(DelConfirmationStatus == true){
    this.deleteNote()
    }
  }
  openNote = () => {
    this.setState({ 
      previewtext: 'none',
      edittext: 'block',
      width: '100%', 
      height: '100% auto', 
      displayOptionButtons: 'block',
      name: this.props.note.name,
      content: this.props.note.content,
      background: this.props.note.background
     });
    if (this.state.editable == true) {
      this.setState({ editable: false });
    } else {
      this.setState({ editable: true });
    }
  }
  Pen = () => {
    this.setState({ editable: true, alertwindow: <APIResponseToast message={"Hello World! Pen Mode"}/>, visibility: 'block' });
  }
  Exit = () => {
    this.setState({ 
      width: '200px', 
      height: '250px', 
      editable: false, 
      displayOptionButtons: 'none',
      previewtext: 'block',
      edittext: 'none'
    });
    const bgcolor = new FormData();
    bgcolor.append('background', this.state.background);
    axios.put(`${API}/note/${this.props.note._id}/background`, bgcolor, {})
    .then(response => {
      console.log(response.data.message);
    })
    .catch(error => {
      console.log(error);
    });
  }
  Save = (e) => {
    e.preventDefault();
    const formdata = new FormData();
    formdata.append('name', this.state.name);
    formdata.append('content', this.state.content);
      axios.put(`${API}/note/${this.props.note._id}`, formdata, {})
      .then(response => {
        console.log(response.data.message);
        return <APIResponseToast message={response.data.message}/>;
      })
      .catch(error => {
        console.log(error);
      });
  }
  Delete = () => {
    this.setState({alertwindow: <ConfirmationWindow message={"Are you sure you want to delete?"} Confirm={this.DeleteConfirmCallback} visibility={'block'}/>});
  }
  deleteNote() {
    axios.delete(`${API}/note/${this.props.note._id}`)
    .then(response => {
      this.setState({notevisibility: 'none', alertwindow: <APIResponseToast message={response.data.message} visibility={'block'}/>});
    })
    .catch(error => {
      console.log(error);
    });
  }
  Alert = () => {
    return this.state.alertwindow;
  }
  render() {
    return (
      <div className="note" style={{ width: `${this.state.width}`, height: `${this.state.height}`, background: `${this.state.background}`, display: `${this.state.notevisibility}` }}>
        <button className="open-note" onClick={this.openNote}><img src={iconEditNote} /></button>
        <div className="n1-option" style={{ display: `${this.state.displayOptionButtons}` }}>
          <button className="exit-btn" onClick={this.Exit}><img src={iconExit} /></button>
          <input type="color" name="color" value={this.state.background} onChange={this.handleColor} />
          <button className="edit-btn" onClick={this.Pen}><img src={penIcon} /></button>
          <button className="save-btn" onClick={this.Save}><img src={iconSave} /></button>
          <button className="discard-btn" onClick={this.Discard}><img src={iconDiscard} /></button>
          <button className="delete-btn" onClick={this.Delete}><img src={iconDelete} /></button>
        </div>
        <div className="page">
          {this.Alert()}
          <h3 style={{display: `${this.state.previewtext}`}}>{this.props.note.name}</h3>
          <p style={{display: `${this.state.previewtext}`}}>{this.props.note.content}</p>
          <input type="text" name="name" value={this.state.name} onChange={this.onChange} className="txtname" style={{display: `${this.state.edittext}`}} />
          <textarea name="content" value={this.state.content} onChange={this.onChange} className="txtcontent" style={{display: `${this.state.edittext}`}} />
        </div>
      </div>
    );
  }
}