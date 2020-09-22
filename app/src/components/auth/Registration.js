import React, {Component} from 'react';
import axios from 'axios';
class Registration extends Component {
    constructor(props) {
        super(props);

        this.state = {
            email: "",
            password: "",
            password_confirm: "",
            username: "",

            regErrors:""
        }

        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    handleSubmit(event){
        //destruct tho
        const {
            email,
            password,
            password_confirm,
            username
        } = this.state;

        axios.post("http://localhost:3000/api/add_user", {
            username: username,
            email: email,
            password: password
        },
            {withCredentials: true}
        ).then(response => {
            console.log("reg result", response);
        }).catch( error => {
            console.log("reg error", error);
        })
        event.preventDefault();
    }

    handleChange(event) {
        this.setState({
            [event.target.name]: event.target.value
        })
    }
    render() {
        return (
            <div>
                <form onSubmit={this.handleSubmit}>
                    <input
                        type="email"
                        name="email"
                        placeholder="Email"
                        value={this.state.email}
                        onChange={this.handleChange}
                        required
                    />

                    <input
                        type="password"
                        name="password"
                        placeholder="Password"
                        value={this.state.password}
                        onChange={this.handleChange}
                        required
                    />

                    <input
                        type="password"
                        name="password_confirm"
                        placeholder="Confirm Password"
                        value={this.state.password_confirm}
                        onChange={this.handleChange}
                        required
                    />
                    <button type="submit">Reg</button>
                </form>
            </div>
        );
    }
}

export default Registration;