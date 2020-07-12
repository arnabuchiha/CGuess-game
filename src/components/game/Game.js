import React, { Component } from 'react';
import "./Game.css"
import Map from './Map';
import clock from "../../assets/clock.png"
import Score from './Score';
import Chat from './Chat.jsx'
import socketIOClient from "socket.io-client";
class Game extends Component{
    constructor(){
        super();
        this.state={
            round:1,
            city:"_a__s",
            fact:"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur velit nisl, finibus vel pulvinar at, cursus id urna."
        }
        this.ENDPOINT="localhost:5000";
        this.socket = socketIOClient(this.ENDPOINT);
    }
    render(){
        return(
            <div className="container-fluid">
                <div className="row ">
                    <div className="col-md-2 score">
                        <Score/>
                    </div>
                    <div className="col-md map font-size">
                        <div className="d-flex justify-content-between" style={{marginBottom:"-2.5vh"}}>
                        <div className="float-left bg-yellow m-1 p-1 rounded" style={{height:"1%"}}>
                            Round {this.state.round}
                            {/* {this.props.location.nameprop} */}
                        </div>
                        <div className="d-flex  m-1 p-1">
                            <figure>
                            <img className="responsive-img" src={clock}></img>
                            <figcaption style={{fontSize:"15px"}}>20 sec</figcaption>
                            </figure>
                        </div>   
                        <div className="float-right bg-yellow m-1 p-1 rounded" style={{height:"1%"}}>
                            {this.state.city}
                        </div>
                        </div>
                        <Map/>
                        <div className="bg-yellow p-4" style={{marginTop:"2.5vh",height:"14%",overflowY:"scroll",borderRadius:"10px"}}>
                            {this.state.fact}
                        </div>
                    </div>
                    <div className="col-md-3 chat"><Chat socket={this.socket} username={this.props.location.nameprop}/>
                    </div>
                </div>
            </div>
        )
    }
}
export default Game;