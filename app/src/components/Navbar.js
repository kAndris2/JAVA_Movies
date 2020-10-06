import React, {Component} from "react";
import { faBell, faPlus, faUser, faSearch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from 'axios';
import '../static/css/Nav.css';

class Navbar extends Component {
    handleLogout = () => {
        let user = this.props.pro.user;
        let curr = {
            name:user.name,
            email:user.email,
            password: user.password
        }
        /*console.log(curr);*/
        axios.post("http://localhost:3000/api/logout",curr);
    }
    render() {
        return (
            <React.Fragment>

                <nav className="navbar navbar-expand-sm navbar-dark" style={{backgroundColor:"#032541", fontWeight:"bold", padding:".75rem .75rem"}}>
                    <div className="container" style={{maxWidth:"1300px", paddingLeft:"40px", paddingRight:"40px"}}>
                        <a className="navbar-brand" style={{paddingTop:"0"}} href="/"><img alt="asd" src={require("../static/img/logo.png")} width={154} height={20}/> </a>
                        <button className="navbar-toggler" type="button" data-toggle="collapse"
                                data-target="#navbarsExample07" aria-controls="navbarsExample07" aria-expanded="false"
                                aria-label="Toggle navigation">
                            <span className="navbar-toggler-icon"></span>
                        </button>
                        <div className="collapse navbar-collapse" id="navbarsExample07">
                            <ul className="navbar-nav mr-auto">
                                <li className="nav-item px-2 active dropdown">
                                    <a className="nav-link dropdown-toggle"  data-toggle="dropdown" href={"/#"}>Movies</a>
                                    <ul className="dropdown-menu">
                                        <li><a className="dropdown-item" href="/">Popular</a></li>
                                        <li><a className="dropdown-item" href="/"> Now Playing </a></li>
                                        <li><a className="dropdown-item" href="/"> Upcoming </a></li>
                                        <li><a className="dropdown-item" href="/"> Top Rated </a></li>
                                    </ul>
                                </li>
                                <li className="nav-item px-2 active dropdown">
                                    <a className="nav-link dropdown-toggle"  data-toggle="dropdown" href="/#">TV Shows</a>
                                    <ul className="dropdown-menu">
                                        <li><a className="dropdown-item" href="/#">Popular</a></li>
                                        <li><a className="dropdown-item" href="/#"> Airing Today </a></li>
                                        <li><a className="dropdown-item" href="/#"> On TV </a></li>
                                        <li><a className="dropdown-item" href="/#"> Top Rated </a></li>
                                    </ul>
                                </li>
                                <li className="nav-item px-2 active dropdown">
                                    <a className="nav-link dropdown-toggle" data-toggle="dropdown" href="/#">People</a>
                                    <ul className="dropdown-menu">
                                        <li><a className="dropdown-item" href="/#">Popular People</a></li>
                                    </ul>
                                </li>
                                <li className="nav-item px-2 active dropdown">
                                    <a className="nav-link dropdown-toggle" data-toggle="dropdown" href="/#">More</a>
                                    <ul className="dropdown-menu">
                                        <li><a className="dropdown-item" href="/#">Discussions</a></li>
                                        <li><a className="dropdown-item" href="/#">Leaderboard</a></li>
                                        <li><a className="dropdown-item" href="/#">Support</a></li>
                                        <li><a className="dropdown-item" href="/#">API</a></li>
                                    </ul>
                                </li>
                            </ul>
                            <div className="inline my-2 my-md-0">
                                {this.props.logged_in_status === "LOGGED_IN" &&
                                <ul className="list-group list-group-horizontal">
                                    <li className="list-group-item" style={{border:"none", backgroundColor:"transparent",padding:"0 1.5rem"}}>
                                    <FontAwesomeIcon icon={faPlus} style={{color:"#fff"}} size="lg"/>
                                    </li>

                                    <li id="translate" className="list-group-item" style={{marginLeft:"1rem", marginRight:"1rem", fontWeight:"bold", color:"white", fontSize:"1rem", border: "1px solid #fff", borderRadius: "3px", backgroundColor:"transparent",padding:"1px 4px"}}>
                                        EN
                                    </li>
                                    <li className="list-group-item" style={{border:"none", backgroundColor:"transparent",padding:"0 1.5rem"}}>
                                        <FontAwesomeIcon icon={faBell} style={{color:"#fff"}} size="lg"/>
                                    </li>
                                    <li className="nav-item active dropdown" style={{border:"none", backgroundColor:"transparent",padding:"0 1.5rem"}}>
                                        <a className="nav-link dropdown-toggle" data-toggle="dropdown" href="/#"><FontAwesomeIcon icon={faUser} style={{color:"#fff"}} size="lg"/></a>
                                        <ul className="dropdown-menu">
                                            <li><a className="dropdown-item" href="/#">{this.props.pro.user.name}</a></li>
                                            <li><a className="dropdown-item" href="/#">Leaderboard</a></li>
                                            <li><a className="dropdown-item" href="/#">Support</a></li>
                                            <li><a className="dropdown-item" href={"/"} onClick={this.handleLogout}>Logout</a></li>
                                        </ul>
                                    </li>
                                    <li className="list-group-item" style={{border:"none", backgroundColor:"transparent",padding:"0 1.5rem"}}>
                                        <FontAwesomeIcon icon={faSearch} style={{color:"#01B4E4"}} size="lg"/>
                                    </li>
                                </ul>
                                }
                                {this.props.logged_in_status !== "LOGGED_IN" &&
                                <ul className="list-group list-group-horizontal">
                                    <li id="translate" className="list-group-item" style={{marginLeft:"1rem", marginRight:"1rem", fontWeight:"bold", color:"white", fontSize:"1rem", border: "1px solid #fff", borderRadius: "3px", backgroundColor:"transparent",padding:"1px 4px"}}>
                                        EN
                                    </li>
                                    <li className="list-group-item" style={{border:"none", backgroundColor:"transparent",padding:"0 1.5rem"}}>
                                        <a href={"/register"}>Register</a>
                                    </li>
                                    <li className="list-group-item" style={{border:"none", backgroundColor:"transparent",padding:"0 1.5rem"}}>
                                        <a href={"/login"}>Log In</a>
                                    </li>
                                </ul>
                                }
                            </div>
                        </div>
                    </div>
                </nav>
            </React.Fragment>
        );
    }
}

export default Navbar;