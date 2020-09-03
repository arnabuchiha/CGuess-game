import React from "react";
import image from "../../assets/CGuess.png"
import "./style.scss";
import Modal from "../Modal/Modal";
// import socketIOClient from "socket.io-client";
import {Link } from "react-router-dom";
import Cookies from 'universal-cookie'
export class Login extends React.Component {
  
  constructor(props) {
    super(props);
    this.state={
      play:false,
      show:false,
      name:'',
      url:'/'
    }
    
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


    if(e.target.value.length>0)
    {
      this.setState({
        url:'/game'
      })
    }
    else
    {
      this.setState({
        url:'/'
      })
    }
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
  if(this.state.name==null|| this.state.name===''){
    document.getElementById('msg').style.visibility="visible"
      document.getElementById('msg').innerHTML="Username cannot be empty";
  }
    //  return(<Redirect to={{
    //    pathname:"/game",
    //    state:{username:document.getElementById('username').value}
    //  }}
    //  ></Redirect>)
    this.cookies=new Cookies();
    this.cookies.set('username',this.state.name,{path:'/'});
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
            <img src={image} alt="CGuess Logo"/>
          </div>
          <div className="form" >
            <div className="form-group">
              <input onChange={e=>this.change(e)} type="text" name="username" placeholder="username" id="username" required="required" />
            </div>
    <label className="alert alert-danger" style={{visibility:"hidden",fontSize:"15px"}}id="msg"></label>
          </div>
        </div>
        <div className="footer">
        <Link to={{pathname:this.state.url,nameprop:this.state.name,bclick:true}}>
          <button  type="button" className="big-button" style={{backgroundColor:"#BED9A6",fontFamily:"CustomFont",color:"black"}} onClick={
            this.setUsername   
            }>
            Play
          </button>
          </Link>
         
        </div>
        <Modal show={this.state.show}>
          <p>Each player gets 60 seconds to guess the city based on the clues provided to them in a pictorial format and then  mark it on the map.The time taken  and the accuracy of the marked location play an important factor in determining your score!</p>
          <button onClick={this.hideModal} id="modal-close">close</button>
        </Modal>
        
        <button onClick={this.showModal} id="instruct" type="button" className="instruct" style={{backgroundColor:"#BED9A6",fontFamily:"CustomFont",color:"black"}}>
            How to play?
          </button>

      </div>
    );
  }
}
