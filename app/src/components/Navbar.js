import React, { Component } from "react";
import { faBell, faPlus, faUser, faSearch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import './Nav.css';
import MovieDetail from "./MovieDetail";

class Navbar extends Component {
    render() {
        return (
            <React.Fragment>
                <nav className="navbar navbar-expand-sm navbar-dark" style={{backgroundColor:"#032541", fontWeight:"bold", padding:".75rem .75rem"}}>
                    <div className="container" style={{maxWidth:"1300px", paddingLeft:"40px", paddingRight:"40px"}}>
                        <a className="navbar-brand" style={{paddingTop:"0"}} href="/"><img src={require("../static/img/logo.png")} width={154} height={20}/> </a>
                        <button className="navbar-toggler" type="button" data-toggle="collapse"
                                data-target="#navbarsExample07" aria-controls="navbarsExample07" aria-expanded="false"
                                aria-label="Toggle navigation">
                            <span className="navbar-toggler-icon"></span>
                        </button>
                        <div className="collapse navbar-collapse" id="navbarsExample07">
                            <ul className="navbar-nav mr-auto">
                                <li className="nav-item px-2 active">
                                    <a className="nav-link" href="/movie/test">Movies</a>
                                </li>
                                <li className="nav-item px-2 active">
                                    <a className="nav-link" href="#">TV Shows</a>
                                </li>
                                <li className="nav-item px-2 active">
                                    <a className="nav-link" href="#">People</a>
                                </li>
                                <li className="nav-item px-2 active">
                                    <a className="nav-link" href="#">More</a>
                                </li>
                            </ul>
                            <div className="inline my-2 my-md-0">
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
                                    <li className="list-group-item" style={{border:"none", backgroundColor:"transparent",padding:"0 1.5rem"}}>
                                        <FontAwesomeIcon icon={faUser} style={{color:"#fff"}} size="lg"/>
                                    </li>
                                    <li className="list-group-item" style={{border:"none", backgroundColor:"transparent",padding:"0 1.5rem"}}>
                                        <FontAwesomeIcon icon={faSearch} style={{color:"#01B4E4"}} size="lg"/>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </nav>
            </React.Fragment>
        );
    }
}

export default Navbar;