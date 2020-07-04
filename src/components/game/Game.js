import React, { Component } from 'react';
import "./Game.css"
import Map from './Map';
import clock from "../../assets/clock.png"
class Game extends Component{
    constructor(){
        super();
        this.state={
            round:1,
            city:"_a__s"
        }
    }
    render(){
        return(
            <div className="container-fluid">
                <div className="row align-items-start">
                    <div className="col-md-2 score"></div>
                    <div className="col-md map font-size">
                        <div className="d-flex justify-content-between h-1">
                        <div className="float-left bg-yellow m-1 p-1">
                            Round {this.state.round}
                        </div>
                        <div className="d-flex  m-1 p-1">
                            <figure>
                            <img className="responsive-img" src={clock}></img>
                            <figcaption>20 sec</figcaption>
                            </figure>
                        </div>   
                        <div className="float-right bg-yellow m-1 p-1">
                            {this.state.city}
                        </div>
                        </div>
                        <Map/>
                    </div>
                    <div className="col-md-3 chat">Column3</div>
                </div>
            </div>
        )
    }
}
export default Game;