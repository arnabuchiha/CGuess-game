import React from "react";
import image from "../../assets/CGuess.png"
import "./style.scss";
import {Redirect} from 'react-router-dom';
import Modal from "../Modal/Modal"
import socketIOClient from "socket.io-client";
export class Login extends React.Component {
  
  constructor(props) {
    super(props);
    this.state={
      play:false,
      show:false
    }
    this.ENDPOINT="localhost:4000";
    this.socket = socketIOClient(this.ENDPOINT);
    this.user=null;
  }
  clicked=(event)=>{
    event.preventDefault();
    this.setState({
      play:true
    })

  }
  showModal = () => {
    this.setState({ show: true });
  };

  hideModal = () => {
    this.setState({ show: false });
  };
  setUsername=()=>{
    
  //   this.socket.emit('setUsername',document.getElementById('username').value);
  //   this.socket.on('userExists', (data) =>{
  //     document.getElementById('msg').style.visibility="visible"
  //     document.getElementById('msg').innerHTML=data;
  //     console.log(data);
  //  });
  //  this.socket.on('userSet', (data) =>{
  //     this.user = data.username;
      
  //  });
     return(<Redirect to={{
       pathname:"/game",
       state:{username:document.getElementById('username').value}
     }}
     ></Redirect>)
  }
  render() {
    if(this.state.play){
      window.location.href="/game";
    }
    return (
      <div className="base-container" ref={this.props.containerRef}>
        {/* <div className="header">Login</div> */}
        <div className="content">
          <div className="image">
            <img src={image} />
          </div>
          <div className="form" >
            <div className="form-group">
              <input type="text" name="username" placeholder="username" id="username" />
            </div>
    <label className="alert alert-danger" style={{visibility:"hidden",fontSize:"15px"}}id="msg"></label>
          </div>
        </div>
        <div className="footer">
          <button onClick={this.setUsername} type="button" className="big-button" style={{backgroundColor:"#BED9A6",fontFamily:"CustomFont",color:"black"}}>
            Play
          </button>
          
        </div>
        <Modal show={this.state.show} handleClose={this.hideModal}>
          <p>When its your turn to draw, you will have to choose a word from three options and visualize that word in 80 seconds, alternatively when somebody else is drawing you have to type your guess into the chat to gain points, be quick, the earlier you guess a word the more points you get!</p>
        </Modal>
        <button onClick={this.showModal} id="instruct" type="button" className="instruct" style={{backgroundColor:"#BED9A6",fontFamily:"CustomFont",color:"black"}}>
            How to play?
          </button>
      </div>
    );
  }
}
