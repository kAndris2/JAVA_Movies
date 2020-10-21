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



        this.getMovies = this.getMovies.bind(this);
        this.getMoviesById = this.getMoviesById.bind(this);
    }

    async componentDidMount() {
        await this.getMoviesById();
    }

    async getMoviesById() {
        const movies = [];
        await axios.get("http://localhost:3000/api/watchlist/" + this.props.user.id)
            .then(resp => {
                resp.data.map(async w => {
                    movies.push(
                        await this.getMovies(w.movieId)
                    );
                })
            });
        this.setState({
            movies:movies,
            loading:false
        });
    }

    async getMovies(id) {
        const response = await fetch('https://api.themoviedb.org/3/movie/' +
                    id +
                    `?api_key=${this.props.apiData.key}` +
                    `&language=${this.props.apiData.language}`);
        return await response.json();
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