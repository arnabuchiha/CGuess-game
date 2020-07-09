import React from "react";
import image from "../../assets/CGuess.png"
import "./style.scss";
import Modal from "../Modal/Modal";
import socketIOClient from "socket.io-client";
import {Link } from "react-router-dom";
export class Login extends React.Component {
  
  constructor(props) {
    super(props);
    this.state={
      play:false,
      show:false,
      name:''
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
  // setName =() =>{
  //   this.setState({name:document.getElementById('username').value})
  // }
  // handleClick=()=>{
  //   this.setName();
    
  // }
  change=(e)=>{
		this.setState({
			name:e.target.value
		})
	}
  showModal = () => {
    this.setState({ show: true });
  };

  hideModal = () => {
    this.setState({ show: false });
  };
  setUsername=()=>{
    
  //   this.socket.emit('setUsername',this.state.name);
  //   this.socket.on('userExists', (data) =>{
  //     document.getElementById('msg').style.visibility="visible"
  //     document.getElementById('msg').innerHTML=data;
  //     console.log(data);
  //  });
  //  this.socket.on('userSet', (data) =>{
  //     this.user = data.username;
      
  //  });
  if(this.state.name==null){
    document.getElementById('msg').style.visibility="visible"
      document.getElementById('msg').innerHTML="Username cannot be empty";
  }
    //  return(<Redirect to={{
    //    pathname:"/game",
    //    state:{username:document.getElementById('username').value}
    //  }}
    //  ></Redirect>)
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
            <img src={image}/>
          </div>
          <div className="form" >
            <div className="form-group">
              <input onChange={e=>this.change(e)} type="text" name="username" placeholder="username" id="username" required="true" />
            </div>
    <label className="alert alert-danger" style={{visibility:"hidden",fontSize:"15px"}}id="msg"></label>
          </div>
        </div>
        <div className="footer">
        <Link to={{pathname:'/Game',nameprop:this.state.name}} onClick={this.setUsername}>
          <button  type="button" className="big-button" style={{backgroundColor:"#BED9A6",fontFamily:"CustomFont",color:"black"}}>
            Play
          </button>
          </Link>
         
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
