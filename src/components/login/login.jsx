import React from "react";
import loginImg from "../../login.svg";
import image from "../../assets/CGuess.png"
import "./style.scss"
import { Redirect } from "react-router-dom";
export class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state={
      play:false
    }
  }
  clicked=(event)=>{
    event.preventDefault();
    this.setState({
      play:true
    })
    // <Redirect to="/game"/>

  }
  render() {
    if(this.state.play){
      window.location.href="/game";
    }
    // return(
    //   <Redirect to="/game"/>
    // )
    return (
      <div className="base-container" ref={this.props.containerRef}>
        {/* <div className="header">Login</div> */}
        <div className="content">
          <div className="image">
            <img src={image} />
          </div>
          <div className="form" >
            <div className="form-group">
              <input type="text" name="username" placeholder="username" />
            </div>
            {/* <div className="form-group">
              <label htmlFor="password">Password</label>
              <input type="password" name="password" placeholder="password" />
            </div> */}
          </div>
        </div>
        <div className="footer">
          <button onClick={this.clicked} type="button" className="big-button" style={{backgroundColor:"#BED9A6",fontFamily:"CustomFont",color:"black"}}>
            Play
          </button>
          
        </div>
        <button onClick={console.log("Hello")} type="button" className="instruct" style={{backgroundColor:"#BED9A6",fontFamily:"CustomFont",color:"black"}}>
            How to play?
          </button>
      </div>
    );
  }
}
