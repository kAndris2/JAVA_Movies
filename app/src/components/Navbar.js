import React, {Component} from "react";
import { faBell, faPlus, faUser, faSearch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from 'axios';
import '../static/css/Nav.css';
import {Dropdown as Drp} from "react-bootstrap";

class Navbar extends Component {
    constructor(props) {
        super(props);

        this.languageHungarian = this.languageHungarian.bind(this);
        this.languageEnglish = this.languageEnglish.bind(this);
        this.languageDeutsch = this.languageDeutsch.bind(this);
        this.setLanguage = this.setLanguage.bind(this);
        //this.handleLogout = this.handleLogout.bind(this);
    }

    handleLogout = () => {
        let user = this.props.pro.user;
        let curr = {
            name:user.name,
            email:user.email,
            password: user.password
        }
        axios.post("http://localhost:3000/api/logout",curr)
            .then(this.props.logout)
    }

    languageHungarian() {
        this.props.languageChange("hu-HU", "HU");
    }

    languageEnglish() {
        this.props.languageChange("en-US", "US");
    }

    languageDeutsch() {
        this.props.languageChange("de-DE", "DE");
    }

    setLanguage() {
        return (
            <Drp>
                <Drp.Toggle
                    variant="success"
                    id="dropdown-basic"
                    style={{
                        marginLeft:"1rem",
                        marginRight:"1rem",
                        fontWeight:"bold",
                        color:"white",
                        fontSize:"1rem",
                        border: "1px solid #fff",
                        borderRadius: "3px",
                        backgroundColor:"transparent",
                        padding:"1px 4px"
                    }}>
                    {this.props.langTitle}
                </Drp.Toggle>

                <Drp.Menu>
                    <Drp.Item onClick={this.languageHungarian} href="#">magyar (hu-HU)</Drp.Item>
                    <Drp.Item onClick={this.languageEnglish} href="#">angol (en-US)</Drp.Item>
                    <Drp.Item onClick={this.languageDeutsch} href="#">német (de-DE)</Drp.Item>
                </Drp.Menu>
            </Drp>
        );
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
                            <span className="navbar-toggler-icon"/>
                        </button>
                        <div className="collapse navbar-collapse" id="navbarsExample07">
                            <ul className="navbar-nav mr-auto">
                                <li className="nav-item px-2 active dropdown">
                                    <a className="nav-link dropdown-toggle"  data-toggle="dropdown" href={"/#"}>Movies</a>
                                    <ul className="dropdown-menu">
                                        <li><a className="dropdown-item" href="/movie">Popular</a></li>
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
                                        <li><a className="dropdown-item" href="/livetv"> On TV </a></li>
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

                                    {this.setLanguage()}

                                    <li className="list-group-item" style={{border:"none", backgroundColor:"transparent",padding:"0 1.5rem"}}>
                                        <FontAwesomeIcon icon={faBell} style={{color:"#fff"}} size="lg"/>
                                    </li>
                                    <li className="nav-item active dropdown" style={{border:"none", backgroundColor:"transparent",padding:"0 1.5rem"}}>
                                        <a className="nav-link dropdown-toggle" data-toggle="dropdown" href="/#"><FontAwesomeIcon icon={faUser} style={{color:"#fff"}} size="lg"/></a>
                                        <ul className="dropdown-menu">
                                            <li><a className="dropdown-item" href={`/u/${this.props.pro.user.name}`}>{this.props.pro.user.name}</a></li>
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
                                <ul className="navbar-nav mr-auto">

                                    {this.setLanguage()}

                                    <li className="nav-item px-2 active">
                                        <a className={"nav-link"} href={"/login"}>Login</a>
                                    </li>

                                    <li className="nav-item px-2 active">
                                        <a className={"nav-link"} href={"/signup"}>Join TMDb</a>
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