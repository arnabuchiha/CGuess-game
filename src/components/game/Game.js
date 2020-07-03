import React, { Component } from 'react';
import "./Game.css"
class Game extends Component{
    constructor(){
        super();
    }
    render(){
        return(
            <div className="container1">
                <div className="row align-items-start">
                    <div className="col-2 score">Column1</div>
                    <div className="col map">Column2</div>
                    <div className="col-3 chat">Column3</div>
                </div>
            </div>
        )
    }
}
export default Game;