import React ,{ useState,useEffect }  from "react";
import sendImg from "../../assets/send.png";
import socketIOClient from "socket.io-client";
import "./Game.css"
const ENDPOINT="localhost:4000";
//Add username retrival and replace in chat  
function Chat()
{
    const [msgList,appendList]= useState("Raj : Hi!!Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur velit nisl, finibus vel pulvinar at, cursus id urna.");
    const [textField,changeText]=useState("Msg");
    useEffect(() => {
        const socket = socketIOClient(ENDPOINT);
        socket.on("FromAPI", data => {
          console.log(data);
        });
      }, []);
    function handleClick(event)
    {
         const curr_msg=event.target.msg.value;
         if(curr_msg==='')
            {
                event.target.reset()
                event.preventDefault();
                return ;
            }
      
        // alert('hello');
        appendList(prevValue =>{
            return prevValue+'\nAnany : '+curr_msg;
        });   
        // appendList(<h1>{final_msg}</h1>);     
        event.target.reset()
        event.preventDefault();
    
    }
    return (<div>
        <p className="msg">
        {msgList}
        </p>
        
        <form method="POST" onSubmit={handleClick} >
            <div className="input-group input-msg">
            <input className="form-control" id="inputPassword2 " type="text" name="msg" placeholder="Chat now" />
            <div className="input-group-append">
    <button type="button" className="send-btn" type="submit">Send</button>
        </div>
            </div>
        </form>
                
    </div>);
}

export default Chat;