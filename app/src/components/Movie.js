import React, {Component} from 'react';
import '../static/css/Movie.css';

class Movie extends Component {
    render() {
        return (
            <main id="main">
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
                                                        {this.props.movies.map(movie =>
                                                            <div className="card style_1">
                                                                <div className="image">
                                                                    <div className="wrapper">
                                                                        <a className="image" href={"/movie/"+movie.id} title={movie.title}>
                                                                            <img alt={movie.title} className="poster" src={"https://image.tmdb.org/t/p/w220_and_h330_face/"+movie.poster_path}/>
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
            </main>
        );
    }
}

export default Movie;