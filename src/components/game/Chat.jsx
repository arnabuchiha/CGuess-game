import React ,{ useState }  from "react";
//Add username retrival and replace in chat  
function Chat()
{
    const [msgList,appendList]= useState("Raj:Hi!!");
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
        const final_msg=msgList+'\nTom Cruise:'+curr_msg;
        // alert('hello');
        appendList(prevValue =>{
            return prevValue+'\nAnany:'+curr_msg;
        });   
        // appendList(<h1>{final_msg}</h1>);     
        event.target.reset()
        event.preventDefault();
    
    }
    const mystyle={
        marginTop:'1vh',
        whiteSpace:'pre-wrap',
        backgroundColor:'white',
        height:'92vh',
        borderRadius:'0.7vh',
        fontSize:'40px'
    }

    const inputStyle={
    
        borderRadius:'2vh',
        width:'35vh',
        height:'5vh'
    }
    
    const buttonStyle={

    }
    return (<div>
        <p style={mystyle}>
        {msgList}
        </p>
        <form method="POST" onSubmit={handleClick}>
            <input style={inputStyle} type="text" name="msg" />
            <button style={buttonStyle}  type="submit" >Send</button>
        </form>        
    </div>);
}

export default Chat;