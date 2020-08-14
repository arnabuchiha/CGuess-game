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
      };
    componentDidMount(){
        this.props.socket.on('scores',data=>{
            console.log(data)
            this.setState({
                players:data
            })
        })
        this.props.socket.on('showresults',data=>{
            this.setState({
                showResult:true
            })
        })
        this.props.socket.on('newscore',data=>{
            console.log(data);
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
        var score=-1;
        this.winner="Nobody";
        this.state.players.forEach(e=>{
            if(e.score>=score){
                this.winner=e.username;
                score=e.score;
            }
        })
        return this.winner;
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
                <Modal show={this.state.showResult} handleClose={this.hideModal}>
                    <p>{this.winnerFunc} is the winner!!</p>
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