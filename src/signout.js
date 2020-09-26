import React from 'react';
import './App.css';
import axios from 'axios'

class Signout extends React.Component {
    constructor(props) {
        super(props)
    }
    signout() {
        var token = localStorage.getItem('token')
        axios.get("http://localhost:5000/api/account/signout?token=" + token).then((res) => {
            if (res.data.success == true) {
                localStorage.removeItem('token')
                window.location.reload()
            }
        })
    }
    render() {
        return (
            <button onClick={this.signout}>Signout</button>
        )
    }
}

export default Signout