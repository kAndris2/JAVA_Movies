import React, {Component} from 'react';
import "../static/css/Fonts.css"
import "../static/css/Popular.css"
import moment from "moment";

class Popular extends Component {
    constructor(props) {
        super(props);

        this.state = {
            movies: [],
            isLoaded: false,
            activeItem: 1,
        }

        this.toggleClass = this.toggleClass.bind(this);
        this.streaming = this.streaming.bind(this);
        this.onTv = this.onTv.bind(this);
        this.upcoming = this.upcoming.bind(this);
        this.topRated = this.topRated.bind(this);
        this.getMovies = this.getMovies.bind(this);
        this.handleMovies = this.handleMovies.bind(this);
        this.handleItemClick=this.handleItemClick.bind(this);
    }

    toggleClass(){
        const current = this.state.selected;
        this.setState({selected: !current});
    }

    streaming() {
        this.getMovies("movie", "popular");
    }

    onTv() {
        this.getMovies("tv", "popular");
    }

    upcoming() {
        this.getMovies("movie", "now_playing");
    }

    topRated() {
        this.getMovies("movie", "top_rated");
    }

    async getMovies(where, mode) {
        const response = await fetch(
            `https://api.themoviedb.org/3/${where}/${mode}?` +
            `api_key=${this.props.apiData.key}&` +
            `language=${this.props.apiData.language}&` +
            `page=1&region=${this.props.apiData.region}`
        );
        const movie = await response.json();
        this.handleMovies(movie, where);
    }

    handleMovies(data, where) {
        let myMovies = [];
        if (where !== "movie") {
            data.results.forEach(movie => {
                myMovies.push({
                   id: movie.id,
                   title: movie.name,
                   poster_path: movie.poster_path,
                    vote_average: movie.vote_average,
                    release_date: movie.first_air_date
                });
            });
        }
        else {
            myMovies = data.results;
        }
        this.setState({movies: myMovies, isLoaded: true });
    }
    handleItemClick(index) {
        this.setState({
            activeItem: index,
        })
    }
    componentDidMount() {
        this.streaming();
    }

    render() {
        if (this.state.isLoaded) {
            return (
                <div className="container">
                <section className="inner_content no_pad">
                    <div className="column_wrapper">
                        <div className="content_wrapper no_bottom_pad wrap">
                            <div className="column">
                                <div className="column_header">
                                    <h2>What's Popular</h2>
                                    <div className="selector_wrap">
                                        <div className="selector">

                                            <div onClick={() => { this.streaming(); this.handleItemClick(1)}} className={this.state.activeItem === 1 ? 'anchor selected' : 'anchor'}>
                                                <h3>
                                                    <a href="/#" className="no_click">
                                                        Streaming
                                                        <span className="glyphicons_v2 chevron-down"/>
                                                    </a>
                                                </h3>
                                                <div className={this.state.activeItem === 1 ? "background":"hide"}/>
                                            </div>

                                            <div onClick={() => { this.onTv(); this.handleItemClick(2)}} className={this.state.activeItem === 2 ? 'anchor selected' : 'anchor'}>
                                                <h3>
                                                    <a href="/#" className="no_click" data-panel="popular_scroller" data-group="on-tv">
                                                        On TV
                                                        <span className="glyphicons_v2 chevron-down"/>
                                                    </a>
                                                </h3>
                                                <div className={this.state.activeItem === 2 ? "background":"hide"}/>
                                            </div>

                                            <div onClick={() => { this.topRated(); this.handleItemClick(3)}} className={this.state.activeItem === 3 ? 'anchor selected' : 'anchor'}>
                                                <h3>
                                                    <a href="/#" className="no_click" data-panel="popular_scroller" data-group="for-rent">
                                                        Top Rated
                                                        <span className="glyphicons_v2 chevron-down"/>
                                                    </a>
                                                </h3>
                                                <div className={this.state.activeItem === 3 ? "background":"hide"}/>
                                            </div>

                                            <div onClick={() => { this.upcoming(); this.handleItemClick(4)}} className={this.state.activeItem === 4 ? 'anchor selected' : 'anchor'}>
                                                <h3>
                                                    <a href="/#" className="no_click" data-panel="popular_scroller" data-group="in-theatres">
                                                        In Theaters
                                                        <span className="glyphicons_v2 chevron-down"/>
                                                    </a>
                                                </h3>
                                                <div className={this.state.activeItem === 4 ? "background":"hide"}/>
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
                                                        <a className="image" href={"/movie/" + movie.id}
                                                           title={movie.title}>
                                                            <img alt={movie.title} className="poster"
                                                                 src={"https://image.tmdb.org/t/p/w220_and_h330_face/" + movie.poster_path}/>
                                                        </a>
                                                    </div>
                                                    <div className="options">
                                                        <a className="no_click" href="/#">
                                                            <div className="glyphicons_v2 circle-more white"/>
                                                        </a>
                                                    </div>
                                                </div>
                                                <div className="content">
                                                    <div className="consensus tight">
                                                        <div className="outer_ring">
                                                            <div className="user_score_chart"
                                                                 data-percent={(movie.vote_average) * 10}>
                                                                <div className="percent">
                                                                    <span
                                                                        className={"icon icon-r" + (movie.vote_average) * 10}>
                                                                    </span>
                                                                </div>
                                                                <canvas height="34" width="34"/>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <h2>
                                                        <a href={"/movie/" + movie.id}
                                                           title={movie.title}>{movie.title}</a>
                                                    </h2>
                                                    <p>{moment(movie.release_date).format("YYYY. MMM. D.")}</p>
                                                </div>
                                                <div className="hover"/>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
                </div>
            );
        }
        else {
            return (
                <h1>Lóding van he!</h1>
            )
        }
    }
}

export default Popular;