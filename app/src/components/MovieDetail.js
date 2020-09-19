import React, { Component } from "react";
import moment from "moment";
import {buildStyles, CircularProgressbar} from "react-circular-progressbar";
import '../cards.css';

class MovieDetail extends Component {
    state = {
        isLoading: true,
        image_post: "https://image.tmdb.org/t/p/w1920_and_h800_multi_faces",
        image_pre: "https://image.tmdb.org/t/p/w500",

        genres: [],
        companies: [],
        movie: [],

        credits:[]
    };

    async componentDidMount() {
        const response = await fetch('https://api.themoviedb.org/3/movie/'+ this.props.movie_id +'?api_key=04a30d5152c77afe4a81783d17e20316&language=hu-HU');
        const movie = await response.json();

        const cresp = await fetch('https://api.themoviedb.org/3/movie/'+ this.props.movie_id +'/credits?api_key=04a30d5152c77afe4a81783d17e20316');
        const creds = await cresp.json();

        this.setState({movie: movie, genres:movie.genres, companies: movie.production_companies,credits:creds.cast, isLoading: false });
    }

    render() {
        const {movie, genres, companies, isLoading, image_pre,image_post,credits} = this.state;

        if (isLoading) {
            return <p>Loading...</p>;
        }

        return (
            <React.Fragment>
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
                                           {/* <div className="text-container">
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
                                            </div>*/}
                                        </div>
                                    </div>
                                </div>
                                <div className="col-sm-9 MovieDetailsRight">
                                    <h2 style={{fontWeight:"700"}}>{movie.title}</h2>
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