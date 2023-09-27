/* eslint-disable react/prop-types */
import React from "react";
import '../../style/notes/new.css';
import penIcon from '../../assets/solid/pen.svg';
import iconSave from '../../assets/solid/floppy-disk.svg';
import iconDiscard from '../../assets/solid/trash.svg';
import iconExit from '../../assets/solid/circle-chevron-left.svg';

class NewNote extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      content: '',
      width: '100%',
      height: '',
      background: ''
    }
    this.onChange = this.onChange.bind(this);
    this.handleColor = this.handleColor.bind(this);
  }
  onChange = (e) => this.setState({ [e.target.name]: e.target.value });
  handleColor = (e) => this.setState({background: e.target.value});
  Pen = () => {
    this.setState({ editable: true });
  }
  Exit = (e) => {
    this.setState({ width: '180px', height: '220px' });
    e.preventDefault();
    this.props.panelCallback('notes');
  }
  Save = (e) => {
    e.preventDefault();
    fetch(`http://localhost:4000/note`, {
      method: 'POST',
      headers: {
        "Accept": "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        creator: this.props.user,
        name: this.state.name,
        content: this.state.content,
        background: this.state.background
      })
    })
      .then(response => response.json())
      .then(result => {
        alert(result.message);
      })
      .catch(error => {
        alert("Save failed! Network error!");
        console.log(error);
      });
  }
  render() {
    return (
      <div className="new-note" style={{ width: `${this.state.width}`, height: `${this.state.height}`, background: `${this.state.background}` }}>
        <div className="newnote-option">
          <button className="exit-btn" onClick={this.Exit}><img src={iconExit} /></button>
          <input type="color" name="color" value={this.state.background} onChange={this.handleColor} />
          <button className="edit-btn" onClick={this.Pen}><img src={penIcon} /></button>
          <button className="save-btn" onClick={this.Save}><img src={iconSave} /></button>
          <button className="discard-btn" onClick={this.Discard}><img src={iconDiscard} /></button>
        </div>
        <div className="newnote-page">
          <input type="text" name="name" value={this.state.name} onChange={this.onChange} className="new-txtname" placeholder="Title..." required />
          <textarea name="content" value={this.state.content} onChange={this.onChange} className="new-txtcontent" placeholder=">Note..." />
        </div>
      </div>
    );
  }
}
export default NewNote;