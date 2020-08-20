import React, { Component } from 'react';
import "./modal.css";
class Modal extends Component {
  constructor(props){
    super(props);
    console.log(props)
    
  }

  render(){
    this.showHideClassName = this.props.show ? "modal display-block" : "modal display-none";
    console.log(this.props.show)
    return (
      <div className={this.showHideClassName}>
        <section className="modal-main">
          {this.props.children}
          
        </section>
      </div>
    );
  }
};
export default Modal;