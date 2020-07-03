import React from "react";
import loginImg from "../../login.svg";
import image from "../../assets/CGuess.png"
import "./style.scss"
export class Login extends React.Component {
  constructor(props) {
    super(props); 
  }

  render() {
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
          <button type="button" className="btn" style={{backgroundColor:"#BED9A6",fontFamily:"CustomFont",color:"black"}}>
            Play
          </button>
        </div>
      </div>
    );
  }
}
