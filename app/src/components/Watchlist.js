import React, {Component} from "react";
import moment from "moment";
import axios from "axios";

class Watchlist extends Component {
    constructor(props) {
        super(props);

        this.state = {
            loading: true,
            movies: []
        }

        this.getStoredIds = this.getStoredIds.bind(this);
        this.handleIdListResponse = this.handleIdListResponse.bind(this);
        this.handleMovieResponse = this.handleMovieResponse.bind(this);
    }

    componentDidMount() {
        this.getStoredIds();
    }

    getStoredIds() {
        axios.get("http://localhost:3000/api/watchlist/" + this.props.user.id)
            .then(this.handleIdListResponse)
    }

    handleIdListResponse(response) {
        Promise.all(response.data.map((w) => axios.get('https://api.themoviedb.org/3/movie/' +
                                                            w.movieId +
                                                            `?api_key=${this.props.apiData.key}` +
                                                            `&language=${this.props.apiData.language}`)))
            .then(this.handleMovieResponse)
    }

    handleMovieResponse(response) {
        const temp = [];
        response.map(movie => {
            temp.push(movie.data)
        })
        this.setState({
            movies:temp,
            loading:false
        })
    }

    render () {
        if (!this.state.loading) {
            return (
                <div className="white_column">
                    <section className="panel">
                        <div className="search_results movie">
                            <div className="results flex">
                                {this.state.movies.map(movie =>
                                    <div key={movie.id} id={movie.id} className="card v4 tight">
                                        <div className="wrapper">
                                            <div className="image">
                                                <div className="poster">
                                                    <a className="result" href={"/movie/" + movie.id}>
                                                        <img alt={movie.title}
                                                             src={"https://image.tmdb.org/t/p/w94_and_h141_bestv2/" + movie.poster_path}
                                                             className="poster"/>
                                                    </a>
                                                </div>
                                            </div>
                                            <div className="details">
                                                <div className="wrapper">
                                                    <div className="title">
                                                        <a className="result" href={"/movie/" + movie.id}>
                                                            <h2>{movie.title}</h2>
                                                        </a>
                                                        <span
                                                            className="release_date">{moment(movie.release_date).format("YYYY. MMM. D.")}</span>
                                                    </div>
                                                </div>
                                                <div className="overview">
                                                    <p>
                                                        {movie.overview}
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                    </section>
                </div>
            );
        }
        else {
            return (
                <h1>Loading...</h1>
            );
        }
    }
}

export default Watchlist;