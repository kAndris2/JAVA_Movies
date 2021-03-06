import React, {Component} from 'react';

class Movie extends Component {
    constructor(props){
        super(props);

        this.state = {
            page: 2,
            movies: this.props.movies,
            isLoading: true
        };

        this.loadMoreMovies = this.loadMoreMovies.bind(this);
    }

    async loadMoreMovies() {
        let page = this.state.page ++;
        const response = await fetch(
            `https://api.themoviedb.org/3/movie/popular?` +
            `api_key=${this.props.apiData.key}&` +
            `language=${this.props.apiData.language}&` +
            `page=${page}&` +
            `region=${this.props.apiData.region}`
        );
        await response.json()
            .then(
                (movie) => {
                   const joined = this.state.movies.concat(movie.results);
                   this.setState({
                      movies : joined,
                      isLoading : false
                   });
                }
            );
    }

    render() {
        return (
            <section className="inner_content">
                <div id="media_v4" className="media discover">
                    <div className="column_wrapper">
                        <div className="content_wrapper">
                            <div className="title">
                                <h2>Popular Movies</h2>
                            </div>
                            <div className="content">
                                <div>
                                    <div className="white_column no_pad">
                                        <section id="media_results" className="panel results">
                                            <div className="media_items results">
                                                <div className="page_wrapper">
                                                    {this.state.movies.map(movie =>
                                                        <div className="card style_1">
                                                            <div className="image">
                                                                <div className="wrapper">
                                                                    <a className="image" href={"/movie/"+movie.id} title={movie.title}>
                                                                        <img
                                                                            className={"poster"}
                                                                            alt={movie.title} className="poster"
                                                                            src={"https://image.tmdb.org/t/p/w220_and_h330_face/"+movie.poster_path}
                                                                        />
                                                                    </a>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    )}
                                                </div>
                                            </div>
                                        </section>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        );
    }
}

export default Movie;