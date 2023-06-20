import { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';

export function RegisterForm(){
    const [username,setUsername]=useState('')
    const [password,setPassword]=useState('')
    const [submitted, setSubmitted] = useState(false);
    const [message,setMessage]=useState('')

    const navigate=useNavigate()
   
    useEffect(()=>{
        if(submitted){
            async function sendData(){
                const response=await fetch('http://localhost:5000/register',{
                    method: 'POST',
                    headers: {
                      'Content-Type': 'application/json'
                    },
                    body:JSON.stringify({
                        username:username,
                        password:password
                    })
                })
        
                const data= await response.json()
                if(!response.ok){
                    throw new Error("server response was not okay")
                }else{
                    const responseMessage=data.message
                    setMessage(responseMessage)
                    if(responseMessage==="registration is successfull"){
                        alert(responseMessage+" you are directed in the login page")
                        navigate(`/`)
                    }else{
                        setSubmitted(false)
                    }
                }
  
            }
    sendData()
        }
    },[submitted,username,password,navigate])

    const handleUsernameChange=(event)=>{
        setUsername(event.target.value)
    }

    const handlePasswordChange=(event)=>{
        setPassword(event.target.value)
    }

    const handleSubmit=(event)=>{
        event.preventDefault()
        setSubmitted(true)
        
    }

    return(
        <form onSubmit={handleSubmit} style={{margin:"100px 300px",border:"1px solid black",padding:"10px 200px"}} >
            <h1>REGISTRATION FORM</h1>
           <table>
            <tbody>
            <tr>
                <td>
                    <label>
                    Username:
                    <input type="text" id="name" value={username} onChange={handleUsernameChange}/>
                    </label>
                </td>
            </tr>
            <tr>
                <td>
                    <label>
                    Password:
                    <input type="text" id="pass" value={password} onChange={handlePasswordChange}/>
                    </label>
                </td>
            </tr>
            <tr>
                <td>
                <input type="submit" value="SUBMIT" />
                </td>
            </tr>
            <tr>
                <td>
                {message}
                </td>
            </tr>

            </tbody>

                    
          </table>
        </form>

        
    )

}
