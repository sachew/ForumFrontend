import React from "react";
import "./App.css";
import axios from "axios";

class Signin extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: "",
      message: "",
    };

    this.usernamechange = this.usernamechange.bind(this);
    this.passwordchange = this.passwordchange.bind(this);
    this.signin = this.signin.bind(this);
  }

  usernamechange(e) {
    this.setState({
      username: e.target.value,
    });
  }
  passwordchange(e) {
    this.setState({
      password: e.target.value,
    });
  }
  signin() {
    var req = {
      method: "POST",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify({
        username: this.state.username,
        password: this.state.password,
      }),
    };
    var body = {
      username: this.state.username,
      password: this.state.password,
    }
    axios.post("http://localhost:5000/api/account/signin", body).then((res) => {
      console.log(res.data);
      if (res.data.success == false) {
        this.setState({
          message: res.data.message
        });
      } else {
        localStorage.setItem(
          'token',
          res.data.token
        );
        setTimeout(() => {
          window.location.reload()
        }, 1000)
        this.setState({
          username: "",
          password: "",
          message: res.data.message
        });
      }
    });
  }

  render() {
    return (
      <div>
        <p style={{ color: "red" }}>{this.state.message}</p>
        <p>Signin</p>
        <input
          type="text"
          placeholder="Username"
          value={this.state.username}
          onChange={this.usernamechange}
        ></input>
        <br></br>
        <input
          type="password"
          placeholder="Password"
          value={this.state.password}
          onChange={this.passwordchange}
        ></input>
        <br></br>
        <button onClick={this.signin}>signin</button>
      </div>
    );
  }
}

export default Signin;
