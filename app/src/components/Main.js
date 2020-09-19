import React, { Component } from "react";
import moment from "moment";
import {buildStyles, CircularProgressbar} from "react-circular-progressbar";

class Main extends Component {
    render() {
        return (
            <React.Fragment>
                <div id="cards_landscape_wrap-2">
                    <div className="container" style={{maxWidth:"1300px", paddingLeft: "40px", paddingRight: "40px", paddingTop: "30px", paddingBottom: "30px"}}>
                        <div className="row">
                            {this.props.movies.map(movie =>
                                <div key={movie.id} className="col-xs-12 col-sm-6 col-md-3 col-lg-3">
                                    <a href={"/movie/"+movie.id}>
                                        <div className="card-flyer">
                                            <div className="text-box">
                                                <div className="image-box">
                                                    <img style={{position: "relative"}} src={this.props.image_pre + movie.poster_path} alt="" />
                                                </div>
                                                <div className="text-container">
                                                    <h6>{movie.title}</h6>
                                                    <p className="text-muted">{moment(movie.release_date).format("MMM D, YYYY")}</p>
                                                    <div style={{ width: "15%" , position:"absolute", top: "445px"}}>
                                                        <CircularProgressbar
                                                            value={movie.vote_average}
                                                            maxValue={10}
                                                            text={`${movie.vote_average * 10}%`}
                                                            background={true}
                                                            styles={buildStyles({
                                                                strokeLinecap: 'round',
                                                                textSize: '2em',
                                                                pathTransitionDuration: 0.5,
                                                                pathColor: '#23c171',
                                                                textColor: '#ffffff',
                                                                trailColor: '#204629',
                                                                backgroundColor: '#0A1D34',
                                                            })}
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </a>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </React.Fragment>
        );
    }
}

export default Main;