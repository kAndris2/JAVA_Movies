import React, {Component} from "react";
import moment from "moment";
import {buildStyles, CircularProgressbar} from "react-circular-progressbar";
import '../static/css/cards.css';
import {faCircle, faPlus, faTimes} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import ReactPlayer from "react-player";
import * as ReactBootstrap from "react-bootstrap";
import '../static/css/Modal.css';


class MovieDetail extends Component {
    state = {
        isLoading: true,
        showHide : false,

        image_post: "https://image.tmdb.org/t/p/w1920_and_h800_multi_faces",
        image_pre: "https://image.tmdb.org/t/p/w500",
        video_pre: "https://youtube.com/watch?v=",

        genres: [],
        companies: [],
        movie: [],

        credits:[],
        certificates: [],

        videos:[]
    };

    async componentDidMount() {
        //movie details
        const response = await fetch('https://api.themoviedb.org/3/movie/'+ this.props.movie_id +'?api_key=04a30d5152c77afe4a81783d17e20316&language=hu-HU');
        const movie = await response.json();

        //main characters and actors
        const cresp = await fetch('https://api.themoviedb.org/3/movie/'+ this.props.movie_id +'/credits?api_key=04a30d5152c77afe4a81783d17e20316');
        const creds = await cresp.json();

        //Age certifications
        const certification = await fetch('https://api.themoviedb.org/3/movie/'+ this.props.movie_id +'/release_dates?api_key=04a30d5152c77afe4a81783d17e20316');
        const cert = await certification.json();

        //Movie videos, trailers
        const trailers = await fetch('https://api.themoviedb.org/3/movie/'+ this.props.movie_id +'/videos?api_key=04a30d5152c77afe4a81783d17e20316&language=hu-HU');
        const vids = await trailers.json();

        this.setState({movie: movie, genres:movie.genres, companies: movie.production_companies,credits:creds.cast, certificates:cert.results ,isLoading: false ,videos:vids.results});
    }

    minutesToHours(num)
    {
        let hours = Math.floor(num / 60);
        let minutes = num % 60;
        return hours + "h " + minutes +"m";
    }

    handleModalShowHide() {
        this.setState({ showHide: !this.state.showHide })
    }
    render() {
        const {movie, genres, companies, isLoading, image_pre,image_post,credits, certificates, showHide,videos, video_pre} = this.state;

        if (isLoading) {
            return <p>Loading...</p>;
        }

        return (
            <React.Fragment>
                {/*<p>{this.props.logged_in_status}</p>*/}
                <div id="cards_landscape_wrap-2" style={{backgroundImage: `url(${image_post + movie.backdrop_path})`, backgroundPosition: "right -200px top", backgroundSize: "cover", backgroundRepeat: "no-repeat"}}>
                    <div className="details">
                        <div className="container" style={{maxWidth: "1300px", padding: "30px 40px"}}>
                            <div className="row">
                                <div className="col-sm-3">
                                    <div className="card-flyer">
                                        <div className="text-box">
                                            <div className="image-box">
                                                <img style={{position: "relative"}} src={image_pre + movie.poster_path} alt="" />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-sm-9 MovieDetailsRight">
                                    <div>
                                        <h2 style={{fontWeight:"700"}}>{movie.title}</h2>
                                    </div>

                                    <div>
                                        {certificates[2].release_dates[0].certification} {certificates[2].iso_3166_1}
                                        {moment(certificates[2].release_dates[0].release_date).format("YYYY/MM/DD")}
                                        <FontAwesomeIcon icon={faCircle} style={{color:"#fff"}} size="xs"/>
                                        {console.log(genres)}
                                        {genres.map((genre , index) =>
                                            index + 1 == genres.length ? genre.name : genre.name + ","
                                        )}
                                        <FontAwesomeIcon icon={faCircle} style={{color:"#fff"}} size="xs"/>
                                        {this.minutesToHours(movie.runtime)}
                                    </div>

                                    <div style={{ width: "7%"}}>
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
                                        User Score
                                    </div>

                                    <div>
                                        <h3>Overview</h3>
                                        {videos.length > 0 &&
                                        <button className="btn btn-primary" onClick={() => this.handleModalShowHide()}>
                                            Launch Trailer
                                        </button>
                                        }
                                        {videos.length === 0 &&
                                        <button className="btn btn-secondary">
                                            No Trailer Available
                                        </button>
                                        }
                                        <p>
                                            {movie.overview}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <ReactBootstrap.Modal show={showHide} dialogClassName={"my-modal"}>
                            <ReactBootstrap.Modal.Header id="modal-header">
                                <div className="text-right">
                                    <button className="close-button" onClick={() => this.handleModalShowHide()}>
                                        <FontAwesomeIcon icon={faTimes} style={{color:"#fff"}} size="lg"/>
                                    </button>
                                </div>
                            </ReactBootstrap.Modal.Header>
                            <ReactBootstrap.Modal.Body id="modal-body">
                                {videos.length > 0 &&
                                <ReactPlayer playing={true} controls={true} width="1280px" height="720px" url={video_pre + videos[0].key}/>
                                }
                            </ReactBootstrap.Modal.Body>
                            {/*<ReactBootstrap.Modal.Footer>

                            </ReactBootstrap.Modal.Footer>*/}
                        </ReactBootstrap.Modal>

                    </div>
                </div>
                <div className="container" style={{maxWidth: "1300px", padding: "30px 40px"}}>
                    <div>
                        <h4>Top Billed Cast</h4>
                        <div id="cards_landscape_wrap-2">
                            <div className="container" style={{maxWidth:"1300px", paddingLeft: "40px", paddingRight: "40px", paddingTop: "30px", paddingBottom: "30px"}}>
                                <div className="row flex-row flex-nowrap">
                                    {credits.map((credit, index) =>
                                        index < 6 ?
                                        <div key={credit.id} className="col-xs-3 col-sm-3 col-md-3 col-lg-2">
                                            <a href={"/person/"+credit.id}>
                                                <div className="card-flyer">
                                                    <div className="text-box">
                                                        <div className="image-box">
                                                            <img src={image_pre + credit.profile_path} alt="" />
                                                        </div>
                                                        <div className="text-container">
                                                            <h6>{credit.name}</h6>
                                                            <p className="text-muted">{credit.character}</p>
                                                        </div>
                                                    </div>
                                                </div>
                                            </a>
                                        </div> : ""
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </React.Fragment>
        );
    }
}

export default MovieDetail;