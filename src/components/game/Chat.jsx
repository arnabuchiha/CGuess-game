import React ,{ Component }  from "react";
// import sendImg from "../../assets/send.png";
// import socketIOClient from "socket.io-client";
import "./Game.css"
// const ENDPOINT="localhost:5000";
//Add username retrival and replace in chat  
class Chat extends Component{
    constructor(props){
        super(props);
        this.state={
            msgList:[{
                user:"System",
                message:"Welcome to CGuess!!"
            }],
            textField:"Msg"
        }
    }
    componentDidMount(){
        this.props.socket.on("newmsg", data => {
            console.log(data)
            this.setState({
                msgList:[data,...this.state.msgList]
            })
            
        this.props.socket.on("joinMsg",data =>{
            console.log('Join msg aaya!!')
            this.setState({
                msgList:this.state.msgList+'\n'+data.user+' has joined the game'
            })
        })
        });
    }
    handleClick=(event)=>
    {
        event.preventDefault();
         const curr_msg=event.target.msg.value;
         if(curr_msg==='')
            {
                event.target.reset()
                event.preventDefault();
                return ;
            }
        this.props.socket.emit('msg',{message:curr_msg,user:this.props.username});
        // alert('hello');
        // appendList(prevValue =>{
        //     return prevValue+'\nAnany : '+curr_msg;
        // });   
        // appendList(<h1>{final_msg}</h1>);     
        event.target.reset()
        
    
    }
    render(){
        return (<div>
            {/* <p className="msg">
            {this.state.msgList}
            </p> */}
            <ul className="msg">
                {this.state.msgList.map(msg => (msg.user==="System")?(
                    <li>
                        <div style={{color:"green"}}>{msg.message}</div>
                    </li>
            ):(
                <li class="admin clearfix">
                    <span class="chat-img left clearfix  mx-2">
                    <img src={"https://robohash.org/"+msg.avaterID+"?size=48x48"} alt="Admin" className="avatar img-circle" />
                    </span>
                    <div class="chat-body clearfix">
                    <div class="header clearfix">
                    <strong class="left primary-font">{msg.user}</strong>
                    </div>
                    <p>
                    {msg.message}
                    </p>
                    </div>
                        {/* <div className="chatmsg-username">{msg.user+" : "}</div>
                        <div className="chatmsg-message">{msg.message}</div> */}
                </li>
            ))}
            </ul>
            <form onSubmit={(e)=>this.handleClick(e)} >
                <div className="input-group input-msg">
                <input className="form-control" id="inputPassword2 " type="text" name="msg" placeholder="Chat now" />
                <div className="input-group-append">
        <button /*type="button"*/ className="send-btn" type="submit">Send</button>
            </div>
                </div>
            </form>
                    
        </div>);
    }
}

export default Chat;