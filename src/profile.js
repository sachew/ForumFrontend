import React from 'react'
import axios from 'axios'

class Profile extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            username: "",
            email: "",
            birthday: "",
            userinfo: "",
            fullName: "",
            editMode: false
        }

        this.changeMode = this.changeMode.bind(this)
        this.birthdayChange = this.birthdayChange.bind(this)
        this.userInfoChange = this.userInfoChange.bind(this)
        this.fullNameChange = this.fullNameChange.bind(this)
        this.sendChanges = this.sendChanges.bind(this)

    }
    componentWillMount() {
        var token = localStorage.getItem('token')
        axios.get("http://localhost:5000/api/account/getprofile?token=" + token).then((res) => {
            this.setState({
                username: res.data.username,
                email: res.data.email,
                birthday: res.data.birthday,
                userinfo: res.data.userinfo,
                fullName: res.data.fullName
            })
            console.log(this.state.username)
        })
    }

    changeMode() {
        this.setState({
            editMode: !this.state.editMode
        })
    }

    birthdayChange(event) {
        this.setState({
            birthday: event.target.value
        })
    }

    userInfoChange(event) {
        this.setState({
            userinfo: event.target.value
        })
    }

    fullNameChange(event) {
        this.setState({
            fullName: event.target.value
        })
    }

    sendChanges() {
        var body = {
            userId: localStorage.getItem('token'),
            fullName: this.state.fullName,
            birthday: this.state.birthday,
            userinfo: this.state.userinfo
        }
        //do post req
        axios.post("http://localhost:5000/api/account/changeprofile", body).then((res) => {
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
            }
        })
        this.changeMode()
    }

    render() {
        var showPage = (
            <div>
                <p>{this.state.username}</p>
                <p>{this.state.email}</p>
                <p>{this.state.birthday}</p>
                <p>{this.state.userinfo}</p>
                <p>{this.state.fullName}</p>
                <button onClick={this.changeMode}>Edit</button>
            </div>
        )
        if (this.state.editMode == true) {
            showPage = (
                <div>
                    <p>{this.state.username}</p>
                    <p>{this.state.email}</p>
                    <p>Birthday</p>
                    <input value={this.state.birthday} onChange={this.birthdayChange} type="date"></input>
                    <p>User Info</p>
                    <textarea value={this.state.userinfo} onChange={this.userInfoChange} type="text"></textarea>
                    <p>Full Name</p>
                    <input value={this.state.fullName} onChange={this.fullNameChange} type="text"></input>
                    <br></br>
                    <button onClick={this.sendChanges}>Done</button>
                </div>
            )
        }
        return (
            <div>
                {showPage}
            </div>
        )
    }
}

export default Profile