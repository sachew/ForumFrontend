import React from 'react'
import axios from 'axios'
import './App.css';

class ShowThreads extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            threads: [],
            title: "",
            body: ""
        }

        this.showModal = this.showModal.bind(this)
        this.hideModal = this.hideModal.bind(this)
        this.titlechange = this.titlechange.bind(this)
        this.bodychange = this.bodychange.bind(this)
        this.submit = this.submit.bind(this)
    }

    componentWillMount() {
        axios.get("http://localhost:5000/api/forums/threads").then((res) => {
            this.setState({
                threads: res.data
            })
        })
    }
    showModal() {
        var modal = document.getElementById("mymodal")
        modal.style.display = "block"

    }
    hideModal() {
        var modal = document.getElementById("mymodal")
        modal.style.display = "none"
    }
    titlechange(e) {
        this.setState({
            title: e.target.value
        })
    }

    bodychange(e) {
        this.setState({
            body: e.target.value
        })
    }
    submit() {
        var token = localStorage.getItem('token')
        var req = {
            method: "POST",
            headers: { "Content-type": "application/json" },
            body: JSON.stringify({
                title: this.state.title,
                body: this.state.body,
                userId: token,
                date: new Date().toUTCString()
            })
        }
        axios.post("http://localhost:5000/api/forums/newthread", req).then((res) => {
            if (res.data.success == true) {
                this.hideModal()
                this.setState({
                    title: "",
                    body: ""
                })
            }
        })
    }

    render() {
        var buttonstyle = {
            float: "right"
        }
        var threadlinks = this.state.threads.map((item) => {
            return (<ThreadLink data={item} />)
        })
        var button = ""
        if (this.props.session == true) {
            button = (<button style={buttonstyle} onClick={this.showModal}>New Thread</button>)
        }
        return (
            <div>
                {button}
                <div id="mymodal" class="modalbackground" >
                    <div class="modalbox">
                        <span class="close" onClick={this.hideModal}>&times;</span>
                        <h1>New Thread</h1>
                        <p>Title:</p>
                        <input value={this.state.title} onChange={this.titlechange}></input>
                        <p>Body:</p>
                        <textarea value={this.state.body} onChange={this.bodychange}></textarea>
                        <button onClick={this.submit}>Submit</button>
                    </div>
                </div>
                {threadlinks}
            </div>
        )
    }
}

class ThreadLink extends React.Component {
    constructor(props) {
        super(props)
    }

    render() {
        var threadlinkstyle = {
            textAlign: "left"
        }
        return (
            <div style={threadlinkstyle}>
                <h1>{this.props.data.title}</h1>
            </div>
        )
    }
}

export default ShowThreads