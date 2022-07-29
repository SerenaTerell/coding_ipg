import React from 'react'
import '../App.css'


export default function Login(props){

    const [loginData, setLoginData] = React.useState(
        {
            username:"",
            password:""
        }
    )
    const [loginSuccessful, setLoginSuccessful] = React.useState(true)

    function handleChange(event) {
        const {name, value, type, checked} = event.target
        setLoginData(prevLoginData => ({
                ...prevLoginData,
                [name]: type === "checkbox" ? checked : value
        }))
    }

    function submitLogIn(){
        event.preventDefault()
        if(loginData.username === "ipgautomotive" && loginData.password === "carmaker"){
            props.handleLogin()
        }else{
            setLoginSuccessful(false)
        }
    }

    return(
        <div className="login-holder">
            <h1>LogIn</h1>
            <form onSubmit={submitLogIn}>
                <input
                    type="text"
                    placeholder="Username"
                    name= "username"
                    onChange={handleChange}
                    value={loginData.username}
                />
                 <input
                    type="password"
                    placeholder="Password"
                    name= "password"
                    onChange={handleChange}
                    value={loginData.password}
                />
                <button className='login-button'>Submit</button>
                {!loginSuccessful && <h4>Login unseccessful!</h4>}
            </form>
        </div>
    )
}