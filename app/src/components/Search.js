import React, {Component} from 'react';
import './Search.css';

class Search extends Component {
    render() {
        const img_url = this.props.bacdrop;
        const search_bg_img = "linear-gradient(to right, rgba(3,37,65, 0.8) 0%, rgba(3,37,65, 0) 100%), url('//image.tmdb.org/t/p/w1920_and_h600_multi_faces_filter(duotone,032541,01b4e4)"+ img_url +"')";
        return (
            <div className="container" id="search-container" style={{backgroundImage: search_bg_img}}>
                <div className="column-wrapper">
                    <div className="content-wrapper">
                        <div className="title">
                            <h2>Welcome.</h2>
                            <h3>Millions of movies, TV shows and people to discover. Explore now.</h3>
                        </div>
                        <div className="search">
                            <form id="inner_search_form" action="/search" method="get" accept-charset="utf-8">
                                <label style={{width:"100%"}}>
                                    <input dir="auto" id="inner_search_v4" name="query" type="text" tabIndex="1"
                                           autoCorrect="off" autofill="off" autoComplete="off" spellCheck="false"
                                           placeholder="Search for a movie, tv show, person......" value=""/>
                                </label>
                                <input id="submit_btn" type="submit" value="Search"/>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Search;