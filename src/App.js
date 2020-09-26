import React from 'react';
import './App.css';
import Signup from './signup.js'
import Signin from './signin.js'
import Signout from './signout.js'
import axios from 'axios'
import Profile from './profile.js'
import Navbar from './navbar.js'
import ShowThreads from './showthreads';
const webpgstates = {
  MAINPG: "mainpg",
  SIGNINPG: "signinpg",
  SIGNUPPG: "signuppg",
  SIGNEDINPG: "signedinpg"
}

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      session: false,
      token: "",
      webpg: webpgstates.MAINPG
    }
    this.gotosigninpg = this.gotosigninpg.bind(this)
    this.gotosignuppg = this.gotosignuppg.bind(this)
    this.gotomainpg = this.gotomainpg.bind(this)
    this.gotoprofilepg = this.gotoprofilepg.bind(this)
  }
  componentDidMount() {
    var token = localStorage.getItem('token')

    axios.get("http://localhost:5000/api/account/verify?token=" + token).then((res) => {
      console.log(res.data.session)
      if (res.data.session == true) {
        this.setState({
          session: res.data.session,
          webpg: webpgstates.SIGNEDINPG
        })
      }

    })

    // //.catch((error) => {
    //   console.log(error)
    // })
  }
  gotoprofilepg() {
    this.setState({
      webpg: webpgstates.SIGNEDINPG
    })
  }
  gotosigninpg() {
    this.setState({
      webpg: webpgstates.SIGNINPG

    })
  }
  gotosignuppg() {
    this.setState({
      webpg: webpgstates.SIGNUPPG
    })
  }
  gotomainpg() {
    this.setState({
      webpg: webpgstates.MAINPG
    })
  }
  render() {
    console.log(this.state.token)
    var showpage = (
      <div>

      </div>
    )
    switch (this.state.webpg) {
      case webpgstates.MAINPG:
        showpage = (
          <div class="container">

            <h1>Welcome to Sabrina's Forum</h1>
            <ShowThreads session={this.state.session} />
          </div>
        )
        break
      case webpgstates.SIGNUPPG:
        showpage = (
          <div>

            <Signup />
          </div>
        )
        break
      case webpgstates.SIGNINPG:
        showpage = (
          <div>

            <Signin />
          </div>
        )
        break
      case webpgstates.SIGNEDINPG:
        showpage = (
          <div>

            <Profile />

          </div>
        )
        break
    }
    // if (this.state.session == true) {
    //   showpage = (<div>
    //     <h1>You are logged in</h1>
    //     <Profile />
    //     <Signout />
    //   </div>)
    // }
    return (
      <div className="App">
        <Navbar gotosigninpg={this.gotosigninpg} gotosignuppg={this.gotosignuppg} signedin={this.state.session} gotomainpg={this.gotomainpg} gotoprofilepg={this.gotoprofilepg} />
        {showpage}
      </div>
    );
  }

}

export default App;
