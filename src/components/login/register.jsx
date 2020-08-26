import React from "react";
import loginImg from "../../login.svg";

export class Register extends React.Component {
  // eslint-disable-next-line
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="base-container" ref={this.props.containerRef}>
        <div className="header">How To play?</div>
        <div className="content">
          <div className="image">
            <img src={loginImg} alt="" />
          </div>
          <div className="form">
          
           <p>Each player gets 60 seconds to guess the city based on the clues provided to them in a pictorial format and then  mark it on the map.The time taken  and the accuracy of the marked location play an important factor in determining your score!</p>
           
          
          </div>
        </div>
       
      </div>
    );
  }
}
