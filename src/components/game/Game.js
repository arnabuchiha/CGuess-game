import React, { Component } from 'react';
import "./Game.css"
import Map from './Map';
import clock from "../../assets/clock.png"
import Score from './Score';
import Chat from './Chat.jsx'
import socketIOClient from "socket.io-client";
import Cookies from 'universal-cookie';
class Game extends Component{
    constructor(props){
        super(props);
        this.state={
            round:0,
            city:"_a__s",
            fact:"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur velit nisl, finibus vel pulvinar at, cursus id urna.",
            pageTime:'--'
        }
        this.ENDPOINT="ws://cguess-backend.herokuapp.com/";
        this.socket = socketIOClient(this.ENDPOINT);
        this.cookies=new Cookies();
        // this.cookies.set('username',this.props.location.nameprop,{path:'/'});
    }
    componentDidMount(){
        this.socket.emit('setUsername',{
            username:this.cookies.get('username')
        })
        this.socket.on("newmsg", data => {
            console.log("sadasd")
            // appendList(prevValue =>{
            //     return prevValue+'\n'+data.user+' : '+data.message;
            // });  
        });
        // this.socket.on("newFact",data=>{
        //     this.setState({
        //         fact:data
        //     })
        // })

        // this.socket.on("roomRound",data=>{
        //     this.setState({
        //         round:data
        //     })
        // })


        // this.socket.on("roomCity",data=>{
        //     this.setState({
        //         city:data
        //     })
        // })


        // this.socket.on("roomTime",(data) =>{
            
        //     var t=Number(data)
        //    // alert(typeof(data))
        //     setInterval(()=>{
        //           //  alert(t);
        //             if(t<0)
        //             {
        //             //    alert('HEYEYEYEY')
        //                 clearInterval();
        //             } 
        //             t=t-1
        //             this.setState({
        //                 pageTime:t
        //             })
        //             // alert('HEY!!')

        //     },1000)
        // })
            //extra added

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
                            {/* <figure>
                            <img className="responsive-img" src={clock}></img>
                            <figcaption style={{fontSize:"15px"}}>20 sec</figcaption>
                            </figure> */}
                            <p>{this.state.pageTime}sec</p>
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
                    <div className="col-md-3 chat"><Chat socket={this.socket} username={this.cookies.get('username')}/>
                    </div>
                </div>
            </div>
        )
    }
}
export default Game;