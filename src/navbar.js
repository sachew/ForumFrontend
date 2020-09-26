import React from 'react'
import Signout from './signout.js'

class Navbar extends React.Component {
    constructor(props) {
        super(props)
        this.state = {

        }
    }

    render() {
        var navbarstyle = {
            display: "flex",
            width: "100%",
            justifyContent: "space-around",
            alignItems: "center"
        }
        var signinsignout = (
            <div>
                <button onClick={this.props.gotosigninpg}>Sign in</button>
                <button onClick={this.props.gotosignuppg}>Sign up</button>
            </div>
        )
        if (this.props.signedin == true) {
            signinsignout = (
                <div>
                    <button onClick={this.props.gotoprofilepg}>Profile</button>
                    <Signout />
                </div>
            )
        }
        return (
            <div style={navbarstyle}>
                <h1 onClick={this.props.gotomainpg}>Sabrina's Forum</h1>
                {signinsignout}
            </div>
        )
    }
}

export default Navbar