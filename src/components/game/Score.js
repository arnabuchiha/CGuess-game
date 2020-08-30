import React, { Component } from 'react';
import Cookies from 'universal-cookie';
import "./Game.css";
import Modal from "../Modal/Modal";
// import winnerImage from "../../assets/winner.png"
class Score extends Component{
    constructor(props){
        super(props);
        this.state={
            players:[
                
            ],
            showResult:false
        }
        this.cookies=new Cookies();
    }
    showModal = () => {
        this.setState({ showResult: true });
      };
    
      hideModal = () => {
        this.setState({ showResult: false });
        window.location.href="/"
      };
    componentDidMount(){
        this.props.socket.on('scores',data=>{
            this.setState({
                players:data
            })
        })
        this.props.socket.on('showresults',data=>{
            this.setState({
                showResult:true
            })
            this.winnerFunc();
        })
        this.props.socket.on('newscore',data=>{
            this.setState(state=>{
                const list=[...state.players]
                list.forEach(i=>{
                    if(i.name===data.username){
                        i.score+=data.score;
                    }
                })
                return list;

            })
        })
    }
    winnerFunc=()=>{
        this.score=0;
        this.winner="Everyone";
        this.state.players.forEach(e=>{
            if(e.score>this.score){
                this.winner=e.name;
                this.score=e.score;
            }
        })
    }
    render(){
        return(
            <div>
                <div style={{fontSize:"30px",textAlign:"center",color:"#006060"}}>Scoreboard</div>
                <ul>
                    {this.state.players.map(item => (
                    <li className="list">
                        <div className="list-item">
                        <img src={"https://robohash.org/"+item.avaterID+"?size=48x48"} className="avatar"></img> 
                        <div className="score_info">
                            <div className="name">{item.name}</div>
                            
                        </div>
                        <div className="scores">{item.score}</div>
                        
                        <div></div>
                        </div>
                    </li>
                    ))}
                </ul>
                <Modal show={this.state.showResult} imageCSS={"winnerModal"}>
                    <div className="modal-top">
                        <img class="modal-icon u-imgResponsive" src="https://dl.dropboxusercontent.com/s/e1t2hhowjcrs7f5/100daysui_100icon.png" alt="Trophy" />
                        <div class="modal-header">{this.winner} is the winner!!</div>
                        <button style={{marginBottom:"0px"}} className="send-btn modal-icon" onClick={this.hideModal} id="modal-close">close</button>
                    </div>
                </Modal>
                {/* <div>
                <p>When its your turn to draw, you will have to choose a word from three options and visualize that word in 80 seconds, alternatively when somebody else is drawing you have to type your guess into the chat to gain points, be quick, the earlier you guess a word the more points you get!</p>
                </div> */}
            </div>
        )
    }
}
export default Score;