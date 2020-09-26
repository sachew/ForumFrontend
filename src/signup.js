import React from 'react';
import './App.css';
import axios from 'axios'

class Signup extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            email: "",
            username: "",
            password: "",
            message: ""
        }
        this.usernamechange = this.usernamechange.bind(this)
        this.emailchange = this.emailchange.bind(this)
        this.passwordchange = this.passwordchange.bind(this)
        this.signup = this.signup.bind(this)
    }
    usernamechange(e) {
        this.setState({
            username: e.target.value
        })
    }
    emailchange(e) {
        this.setState({
            email: e.target.value
        })
    }
    passwordchange(e) {
        this.setState({
            password: e.target.value
        })
    }
    signup() {
        var req = {
            method: "POST",
            headers: { "Content-type": "application/json" },
            body: JSON.stringify({
                email: this.state.email,
                username: this.state.username,
                password: this.state.password
            })
        }
        axios.post("http://localhost:5000/api/account/signup", req).then((res) => {
            console.log(res.data)
            if (res.data.success == false) {
                this.setState({
                    message: res.data.message
                })
            } else {
                localStorage.setItem(
                    'token',
                    res.data.token
                )
                setTimeout(() => {
                    window.location.reload()
                }, 1000)
                this.setState({
                    email: "",
                    username: "",
                    password: "",
                    message: ""
                })
            }
        })
    }
    render() {
        return (
            <div>
                <p style={{ color: "red" }}>{this.state.message}</p>
                <p>Signup</p>
                <input type="text" placeholder="Username" value={this.state.username} onChange={this.usernamechange}></input><br></br>
                <input type="email" placeholder="Email" value={this.state.email} onChange={this.emailchange}></input><br></br>
                <input type="password" placeholder="Password" value={this.state.password} onChange={this.passwordchange}></input><br></br>
                <button onClick={this.signup}>signup</button>
            </div>
        )
    }
}

export default Signup