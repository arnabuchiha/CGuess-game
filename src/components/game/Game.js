import React, { Component } from 'react';
import "./Game.css"
import Map from './Map';
import clock from "../../assets/clock.png"
import Score from './Score';
import Chat from './Chat.jsx'
import socketIOClient from "socket.io-client";
import Cookies from 'universal-cookie';
import Modal from "../Modal/Modal";
class Game extends Component{
    constructor(props){
        super(props);
        this.state={
            round:0,
            city:"_a__s",
            fact:"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur velit nisl, finibus vel pulvinar at, cursus id urna.",
            pageTime:'--',
            showFact:'Waiting',
            showModal:false
        }
        this.ENDPOINT="localhost:5000";
        this.socket = socketIOClient(this.ENDPOINT);
        this.cookies=new Cookies();
        // this.cookies.set('username',this.props.location.nameprop,{path:'/'});
    }
    showModal = (num) => {
        this.setState({ 
                showModal: true,
                showFact:this.state.fact[num]
            });
      };
    
      hideModal = () => {
        this.setState({ showModal: false });
      };
    componentDidMount(){
        this.socket.emit('setUsername',{
            username:this.cookies.get('username')
        })
        
        this.socket.on("updates",(data) =>{
            var t=Number(data.timer)
            console.log(data)
            this.setState({
                city:data.city,
                fact:data.currentFact,
                round:data.round,

            })

         var xx=  setInterval(()=>{

                if(t<=0)
                    clearInterval(xx);
                this.setState({
                    pageTime:t--
                })

            },1000)

        })


        // this.socket.on("round")
    }
    render(){
        return(
            <div className="container-fluid">
                <div className="row ">
                    <div className="col-md-2 score">
                        <Score socket={this.socket}/>
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
                            <figcaption style={{fontSize:"15px"}}>{this.state.pageTime}sec</figcaption>
                            </figure>
                            {/* <p>{this.state.pageTime}sec</p> */}
                        </div>   
                        <div className="float-right bg-yellow m-1 p-1 rounded" style={{height:"1%"}}>
                            {this.state.city}
                        </div>
                        </div>
                        
                        <Map socket={this.socket} />
                        <div className="bg-yellow p-4" style={{marginTop:"2.5vh",height:"14%",overflowY:"scroll",borderRadius:"10px"}}>
                            <button onClick={()=>this.showModal(1)}>Clue 1</button>
                            <button onClick={()=>this.showModal(2)}>Clue 2</button>
                            <button onClick={()=>this.showModal(3)}>Clue 3</button>
                        </div>
                        <Modal show={this.state.showModal}>
                            <button onClick={this.hideModal} type="button" class="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">×</span>
                            </button>
                            <img style={{margin:"auto",display:"block",maxWidth:"80vw",maxHeight:"80vh"}} src={this.state.showFact}/>
                            {/* <button onClick={this.hideModal} id="modal-close">close</button> */}
                        </Modal>
                    </div>
                    <div className="col-md-3 chat"><Chat socket={this.socket} username={this.cookies.get('username')}/>
                    </div>
                </div>
            </div>
        )
    }
}
export default Game;