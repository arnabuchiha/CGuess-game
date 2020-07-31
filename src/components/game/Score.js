import React, { Component } from 'react';
import "./Game.css"
class Score extends Component{
    constructor(props){
        super(props);
        this.state={
            players:[
                {
                    name:"Rahul",
                    score:20
                },
                {
                    name:"funky",
                    score:200
                }
            ]
        }
        
    }
    componentDidMount(){
        this.props.socket.on('newscore',data=>{
            console.log(data);
            this.setState(state=>{
                const list=[...state.players]
                list.forEach(i=>{
                    if(i.name==="funky"){
                        i.score+=data;
                    }
                })
                return list;

            })
        })
    }
    score=()=>{
        this.props.socket.emit('ans',50);
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
                {/* <div>
                <p>When its your turn to draw, you will have to choose a word from three options and visualize that word in 80 seconds, alternatively when somebody else is drawing you have to type your guess into the chat to gain points, be quick, the earlier you guess a word the more points you get!</p>
                </div> */}
                <button onClick={this.score}>Check</button>
            </div>
        )
    }
}
export default Score;