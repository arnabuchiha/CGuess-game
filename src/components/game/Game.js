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
        // if(this.props.location.bclick===undefined )
        // {
        //     window.location.href = '/';
        // }
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
        this.slide=0;
        // this.cookies.set('username',this.props.location.nameprop,{path:'/'});
    }
    plusSlides=(num)=>{
        if(num===-1){
            if(this.slide===0){
                this.setState({
                    showFact:this.state.fact[3]
                });
                this.slide=3;
            }
            else{
                this.setState({
                    showFact:this.state.fact[--this.slide]
                });
            }
        }
        else{
            if(this.slide===3){
                this.setState({
                    showFact:this.state.fact[0]
                });
                this.slide=0;
            }
            else{
                this.setState({
                    showFact:this.state.fact[++this.slide]
                });
            }
        }
        
    }
    showModal = (num) => {
        this.setState({ 
                showModal: true,
                showFact:this.state.fact[this.slide]
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
                            <img className="responsive-img" src={clock} alt=""></img>
                            <figcaption style={{fontSize:"15px"}}>{this.state.pageTime}sec</figcaption>
                            </figure>
                            {/* <p>{this.state.pageTime}sec</p> */}
                        </div>   
                        <div className="float-right bg-yellow m-1 p-1 rounded" style={{height:"1%"}}>
                            {this.state.city}
                        </div>
                        </div>
                        
                        <Map style={{position:"relative"}} socket={this.socket} />
                            <button  type="button" className="big-button" style={{backgroundColor:"#BED9A6",fontFamily:"CustomFont",color:"black",fontSize:"16px",width:"100%",marginTop:"4%"}} onClick={()=>this.showModal(0)}>
                                Show Clues
                            </button>
                        <Modal show={this.state.showModal} imageCSS={"modalImage"}>
                            <button onClick={this.hideModal} type="button" class="close cursor" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">×</span>
                            </button>
                            <div className="modal-content">
                            
                    
                            <img alt="" style={{margin:"auto",display:"block",maxWidth:"100%",maxHeight:"80vh",objectFit:"contain"}} src={this.state.showFact}/>
                            {/* <button onClick={this.hideModal} id="modal-close">close</button> */}
                                   
                            <a   className="prev" onClick={()=>this.plusSlides(-1)}>&#10094;</a>
                
                            <a className="next" onClick={()=>this.plusSlides(1)}>&#10095;</a>
                            </div>
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