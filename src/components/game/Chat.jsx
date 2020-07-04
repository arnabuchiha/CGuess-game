import React ,{ useState }  from "react";
import sendImg from "../../assets/send.png"
import "./Game.css"
//Add username retrival and replace in chat  
function Chat()
{
    const [msgList,appendList]= useState("Raj : Hi!!Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur velit nisl, finibus vel pulvinar at, cursus id urna.");
    const [textField,changeText]=useState("Msg");
    function handleClick(event)
    {
         const curr_msg=event.target.msg.value;
         if(curr_msg==='')
            {
                event.target.reset()
                event.preventDefault();
                return ;
            }
        const final_msg=msgList+'\nTom Cruise : '+curr_msg;
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
        <form method="POST" onSubmit={handleClick}>
            <input className="input-msg" type="text" name="msg" placeholder="Chat now" />
            <button className="send-btn"  type="submit" ></button>
        </form>        
    </div>);
}

export default Chat;