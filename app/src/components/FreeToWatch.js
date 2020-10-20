import React, {Component} from 'react';
import moment from "moment";
import "../static/css/FreeToWatch.css"

class FreeToWatch extends Component {
    constructor(props) {
        super(props);

        this.state={
            movies:[],
            isLoading:true,
            activeItem:1
        }

        this.today = this.today.bind(this);
        this.week = this.week.bind(this);
        this.handleItemClick = this.handleItemClick.bind(this);
        this.lengthify=this.lengthify.bind(this);
    }

    today() {
        this.getMovies("day");
    }

    week() {
        this.getMovies("week");
    }

    async getMovies(mode) {
        const response = await fetch(
            `https://api.themoviedb.org/3/trending/movie/${mode}?` +
            `api_key=${this.props.apiData.key}&` +
            `language=${this.props.apiData.language}&` +
            `page=1&region=${this.props.apiData.region}`
        );
        const movie = await response.json();
        this.setState({movies: movie.results, isLoading: false });
    }

    componentDidMount() {
        this.today();
    }

    handleItemClick(index) {
        this.setState({
            activeItem: index,
        })
    }

    lengthify(title){
        let str = title;
        if (str.toString().length >= 23) {
            str = str.substring(0,23)+"...";
            return str;
        }
        else {
            return str;
        }
    }

    render() {

        if (this.state.isLoading) {
            return <p>Loading...</p>;
        }
        return (
            <div className={"container"}>
                <section className="inner_content no_pad">
                    <div className="column_wrapper">
                        <div className="content_wrapper no_bottom_pad wrap">
                            <div className="column">
                                <div className="column_header">
                                    <h2>Trending</h2>
                                    <div className="selector_wrap">
                                        <div className="selector">
                                            <div onClick={() => { this.today(); this.handleItemClick(1)}} className={this.state.activeItem === 1 ? 'anchor selected' : 'anchor'}>
                                                <h3>
                                                    <a className="no_click">Today
                                                        <span className="glyphicons_v2 chevron-down"/>
                                                    </a>
                                                </h3>
                                                <div className={this.state.activeItem === 1 ? "background":"hide"}/>
                                            </div>

                                            <div onClick={() => { this.week(); this.handleItemClick(2)}} className={this.state.activeItem === 2 ? 'anchor selected' : 'anchor'}>
                                                <h3>
                                                    <a className="no_click">
                                                        This Week
                                                        <span className="glyphicons_v2 chevron-down"/>
                                                    </a>
                                                </h3>
                                                <div className={this.state.activeItem === 2 ? "background":"hide"}/>
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
                                                           title={movie.title}>{this.lengthify(movie.title)}</a>
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
}

export default FreeToWatch;