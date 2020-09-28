import React, {Component} from 'react';
import './Search.css';
import moment from "moment";
import {buildStyles, CircularProgressbar} from "react-circular-progressbar";

class Popular extends Component {
    constructor(props) {
        super(props);

        this.state = {

        }
    }
    render() {
        return (
            <div className="container" id="search-container" style={{color:"black"}}>
                <div className="column-wrapper">
                    <div className="content-wrapper">
                        <div className="column">
                            <div className="column-header">
                                <h2>What's popular</h2>
                                <div className="selector_wrap">
                                    <div className="selector">
                                        <div className="anchor selected">
                                            <h3>
                                                <a href="#" className="no_click" data-panel="popular_scroller" data-group="streaming">Streaming
                                                    <span className="glyphicons_v2 chevron-down"/>
                                                </a>
                                            </h3>
                                            <div className="background" style={{left: "0px", width: "111.516px"}}/>
                                        </div>
                                        <div className="anchor">
                                            <h3><a href="#" className="no_click" data-panel="popular_scroller"
                                                   data-group="on-tv">On TV <span className="glyphicons_v2 chevron-down"/></a></h3>
                                            <div className="background hide" style={{left: "0px", width: "111.516px"}}/>
                                        </div>
                                        <div className="anchor">
                                            <h3><a href="#" className="no_click" data-panel="popular_scroller"
                                                   data-group="for-rent">For Rent <span className="glyphicons_v2 chevron-down"/></a></h3>
                                            <div className="background hide" style={{left: "0px", width: "111.516px"}}/>
                                        </div>
                                        <div className="anchor">
                                            <h3><a href="#" className="no_click" data-panel="popular_scroller"
                                                   data-group="in-theatres">In Theaters <span className="glyphicons_v2 chevron-down"/></a></h3>
                                            <div className="background hide" style={{left: "0px", width: "111.516px"}}/>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div id="popular_scroller">
                                <div className="column_content flex scroller ">
                                    {/*<div className="card style_1">
                                        <div className="image">
                                            <div className="wrapper">
                                                <a className="image" href="/tv/69050" title="Riverdale">
                                                    <img className="poster lazyload lazyloaded"
                                                         data-src="//image.tmdb.org/t/p/w220_and_h330_face/4X7o1ssOEvp4BFLim1AZmPNcYbU.jpg"
                                                         data-srcset="//image.tmdb.org/t/p/w220_and_h330_face/4X7o1ssOEvp4BFLim1AZmPNcYbU.jpg 1x, //image.tmdb.org/t/p/w440_and_h660_face/4X7o1ssOEvp4BFLim1AZmPNcYbU.jpg 2x"
                                                         alt=""
                                                         src="//image.tmdb.org/t/p/w220_and_h330_face/4X7o1ssOEvp4BFLim1AZmPNcYbU.jpg"
                                                         srcSet="//image.tmdb.org/t/p/w220_and_h330_face/4X7o1ssOEvp4BFLim1AZmPNcYbU.jpg 1x, //image.tmdb.org/t/p/w440_and_h660_face/4X7o1ssOEvp4BFLim1AZmPNcYbU.jpg 2x"
                                                         data-loaded="true"/>
                                                </a>
                                            </div>
                                            <div className="options" data-id="69050"
                                                 data-object-id="584e483ac3a368322400a39c" data-media-type="tv"
                                                 data-role="tooltip">
                                                <a className="no_click" href="#">
                                                    <div className="glyphicons_v2 circle-more white"></div>
                                                </a>
                                            </div>
                                        </div>
                                        <div className="content">
                                            <div className="consensus tight">
                                                <div className="outer_ring">
                                                    <div className="user_score_chart 584e483ac3a368322400a39c"
                                                         data-percent="86.0" data-track-color="#204529"
                                                         data-bar-color="#21d07a">
                                                        <div className="percent">

                                                            <span className="icon icon-r86"></span>

                                                        </div>
                                                        <canvas height="34" width="34"></canvas>
                                                    </div>
                                                </div>
                                            </div>

                                            <h2><a href="/tv/69050" title="Riverdale">Riverdale</a></h2>
                                            <p>Jan 26, 2017</p>
                                        </div>

                                        <div className="hover 69050"></div>
                                    </div>*/}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Popular;