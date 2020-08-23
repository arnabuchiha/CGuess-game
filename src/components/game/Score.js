import React, { Component } from 'react';
import Cookies from 'universal-cookie';
import "./Game.css";
import Modal from "../Modal/Modal";
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
        this.score=-1;
        this.winner="Nobody";
        this.state.players.forEach(e=>{
            if(e.score>=this.score){
                this.winner=e.name;
                this.score=e.score;
            }
        })
    }
    render(){
        return(
            <div>
                <ul>
                    {this.state.players.map(item => (
                    <li className="list">
                        <div className="">{item.name}   :  {item.score}</div>
                    </li>
                    ))}
                </ul>
                <Modal show={this.state.showResult}>
                    <p>{this.winner} is the winner!!</p>
                    <button onClick={this.hideModal} id="modal-close">close</button>
                </Modal>
                {/* <div>
                <p>When its your turn to draw, you will have to choose a word from three options and visualize that word in 80 seconds, alternatively when somebody else is drawing you have to type your guess into the chat to gain points, be quick, the earlier you guess a word the more points you get!</p>
                </div> */}
                <button onClick={this.score}>Check</button>
            </div>
        )
    }
}
export default Score;