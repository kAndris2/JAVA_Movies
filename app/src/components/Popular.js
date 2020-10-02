import React, {Component} from 'react';
import "./Popular.css";
import "./Fonts.css";
import moment from "moment";
import {buildStyles, CircularProgressbar} from "react-circular-progressbar";

class Popular extends Component {
    constructor(props) {
        super(props);

        this.state = {
            movies:this.props.movies
        }
    }
    render() {
        return (
            <section className="inner_content no_pad">
                <div className="column_wrapper">
                    <div className="content_wrapper no_bottom_pad wrap">
                        <div className="column">
                            <div className="column_header">
                                <h2>What's Popular</h2>
                                <div className="selector_wrap">
                                    <div className="selector">
                                        <div className="anchor selected">
                                            <h3>
                                                <a href="#" className="no_click">Streaming
                                                <span className="glyphicons_v2 chevron-down"></span>
                                                </a>
                                            </h3>
                                            <div className="background"></div>
                                        </div>
                                        <div className="anchor ">
                                            <h3><a href="#" className="no_click" data-panel="popular_scroller"
                                                   data-group="on-tv">On TV <span className="glyphicons_v2 chevron-down"></span></a></h3>
                                            <div className="background hide"></div>
                                        </div>
                                        <div className="anchor ">
                                            <h3><a href="#" className="no_click" data-panel="popular_scroller"
                                                   data-group="for-rent">For Rent <span className="glyphicons_v2 chevron-down"></span></a></h3>
                                        </div>
                                        <div className="anchor">
                                            <h3><a href="#" className="no_click" data-panel="popular_scroller"
                                                   data-group="in-theatres">In Theaters <span className="glyphicons_v2 chevron-down"></span></a></h3>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div id="popular_scroller" className="media discover scroller_wrap should_fade is fading">
                                <div className="column_content flex scroller loaded">
                                    {this.state.movies.map(movie =>
                                        <div key={movie.id} className="card style_1">
                                            <div className="image">
                                                <div className="wrapper">
                                                    <a className="image" href={"/movie/"+movie.id} title={movie.title}>
                                                        <img className="poster" src={"https://image.tmdb.org/t/p/w220_and_h330_face/"+movie.poster_path} />
                                                    </a>
                                                </div>
                                                <div className="options">
                                                    <a className="no_click" href="#">
                                                        <div className="glyphicons_v2 circle-more white"></div>
                                                    </a>
                                                </div>
                                                <div className="content">
                                                    <div className="consensus tight">
                                                        <div class="outer_ring">
                                                            <div className="user_score_chart" data-percent={(movie.vote_average)*10}>
                                                                <div className="percent">
                                                                    <span className={"icon icon-r"+(movie.vote_average)*10}>
                                                                    </span>
                                                                </div>
                                                                <canvas height="34" width="34"/>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <h2>
                                                        <a href={"/movie/"+movie.id} title={movie.title}>{movie.title}</a>
                                                    </h2>
                                                    <p>{movie.release_date}</p>
                                                </div>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        );
    }
}

export default Popular;